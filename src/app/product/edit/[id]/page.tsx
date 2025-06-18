'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Product } from '@/types'

export default function EditProduct() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [form, setForm] = useState({ name: '', description: '', price: '' })

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single()

        if (error) {
          console.error('Error fetching product:', error.message)
          return
        }

        if (data) {
          const product = data as Product
          setForm({
            name: product.name,
            description: product.description,
            price: product.price.toString(),
          })
        }
      }
    }

    fetchProduct()
  }, [id])

  const handleSubmit = async () => {
    await supabase
      .from('products')
      .update({
        ...form,
        price: parseFloat(form.price),
      })
      .eq('id', id)
    router.push(`/product/${id}`)
  }

  return (
    <div>
      <h1>Edit product</h1>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        placeholder="Price"
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <button onClick={handleSubmit}>Update</button>
    </div>
  )
}
