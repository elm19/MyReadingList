'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    // const errorMessage = error.message === 'Invalid login credentials'
    //   ? 'Invalid email or password'
    //   : error.message

    return { error: error.message }
  }

  // success
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        username: formData.get('name') as string,
      },
    },
  }

  const { data: userData,  error } = await supabase.auth.signUp(data)
  console.log('signup error', error)
  console.log('signup userData', userData)
  if (error) {
    return { error: error.message }
  }
  if (!userData.user) {
      return { error: 'User already exists or signup failed' }
  }
  revalidatePath('/', 'layout')
  redirect('/')
}



export async function signInWithGoogle() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`, // adjust to your deployed URL
    },
  })

  if (error) throw new Error(error.message)

  // Redirect the user to Google's OAuth URL
  redirect(data.url)
}



export async function signout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  console.log('signout')
  redirect('/sign-in')
}
