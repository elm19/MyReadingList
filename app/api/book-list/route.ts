// app/api/book-lists/route.ts
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = cookies() // ✅ This should work in App Router
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  
  const { data, error } = await supabase
    .from('book_lists')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}
