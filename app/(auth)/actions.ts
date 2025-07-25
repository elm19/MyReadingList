'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    const errorMessage = error.message === 'Invalid login credentials'
      ? 'Invalid email or password'
      : error.message

    return { error: errorMessage }
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

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    const errorMessage = error.message === 'User already registered'
      ? 'An account with this email already exists'
      : error.message === 'Password should be at least 6 characters'
      ? 'Password must be at least 6 characters long'
      : error.message

    return { error: errorMessage }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
