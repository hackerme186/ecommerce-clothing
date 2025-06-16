import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function GET() {
  const { data } = await supabase.from('products').select('*')
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const body = await req.json()
  await supabase.auth.getSession()
  const { data, error } = await supabase.from('products').insert([
    { ...body, user_id: (await supabase.auth.getSession()).data.session?.user.id }
  ])
  return error ? NextResponse.json({ error }) : NextResponse.json(data)
}
