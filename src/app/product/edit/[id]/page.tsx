'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Product } from '@/types'

export default function EditProduct() {
  const { id } = useParams()
  const router = useRouter()
  const [form, setForm] = useState({ name: '', description: '', price: '' })

  useEffect(() => {
  if (id) {
    supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
      .then((res: { data: Product | null; error: any }) => {
        const data = res.data as Product
        if (data) {
          setForm({
            name: data.name,
            description: data.description,
            price: data.price.toString(),
          })
        }
      })
  }
}, [id])

  const handleSubmit = async () => {
    await supabase.from('products').update({
      ...form,
      price: parseFloat(form.price)
    }).eq('id', id)
    router.push(`/product/${id}`)
  }

  return (
    <div>
      <h1>Edit product</h1>
      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      <input placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
      <button onClick={handleSubmit}>Update</button>
    </div>
  )
}
