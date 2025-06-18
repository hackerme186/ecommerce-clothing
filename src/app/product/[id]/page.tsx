'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Product } from '@/types'
import Image from 'next/image'

export default function ProductDetail() {
  const id = useParams().id as string
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching product:', error)
        return
      }

      setProduct(data)
    }

    if (id) fetchProduct()
  }, [id])

  if (!product) return <div>Loading...</div>

  return (
    <div>
      <Image
        src={product.image_url || '/placeholder.png'}
        alt={product.name}
        width={600}
        height={400}
        className="h-64 object-cover w-full"
      />
      <h1 className="text-3xl my-2">{product.name}</h1>
      <p className="my-2">${product.price}</p>
      <p className="my-4">{product.description}</p>
      <button className="mr-2" onClick={() => router.push(`/product/edit/${id}`)}>Edit</button>
      <button
        onClick={async () => {
          await fetch(`/api/products/${id}`, { method: 'DELETE' })
          router.push('/')
        }}
      >
        Delete
      </button>
    </div>
  )
}
