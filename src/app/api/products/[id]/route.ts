import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { data } = await supabase.from('products').select('*').eq('id', params.id).single()
  return NextResponse.json(data)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const updates = await req.json()
  const { data } = await supabase.from('products').update(updates).eq('id', params.id)
  return NextResponse.json(data)
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { data } = await supabase.from('products').delete().eq('id', params.id)
  return NextResponse.json(data)
}
