'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function CreateProductPage() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    image: '',
    price: ''
  })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase.from('products').insert([
      {
        ...form,
        price: parseFloat(form.price),
        user_id: (await supabase.auth.getSession()).data.session?.user.id
      }
    ])

    if (error) {
      alert('Error creating product: ' + error.message)
    } else {
      router.push('/')
    }
  }

  return (
    <div>
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" />
        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
