'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function CreateProduct() {
  const [form, setForm] = useState({ name: '', description: '', price: '' })
  const router = useRouter()

  const handleSubmit = async () => {
    const { data, error } = await supabase.from('products').insert([{
      ...form,
      price: parseFloat(form.price),
      user_id: (await supabase.auth.getSession()).data.session?.user.id
    }])
    if (!error) router.push('/')
  }

  return (
    <div>
      <h1>Create product</h1>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <textarea placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })} />
      <input placeholder="Price" onChange={e => setForm({ ...form, price: e.target.value })} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}
