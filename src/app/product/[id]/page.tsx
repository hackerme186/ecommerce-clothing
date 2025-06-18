'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Product } from '@/types'
import Image from 'next/image'

export default function ProductDetail() {
  const { id } = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error
        
        setProduct(data)
      } catch (error) {
        console.error('Error fetching product:', error)
        router.push('/404')
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchProduct()
  }, [id, router])

  if (loading) return <div className="text-center p-8">Loading...</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="relative aspect-square mb-6">
        <Image
          src={product?.image_url || '/placeholder.png'}
          alt={product?.name || 'Product image'}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>
      
      <h1 className="text-4xl font-bold mb-4">{product?.name}</h1>
      <p className="text-2xl text-primary mb-6">${product?.price}</p>
      <p className="text-gray-600 mb-8">{product?.description}</p>

      <div className="flex gap-4">
        <button
          onClick={() => router.push(`/product/edit/${id}`)}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit Product
        </button>
        
        <button
          onClick={async () => {
            try {
              await fetch(`/api/products/${id}`, { method: 'DELETE' })
              router.push('/')
            } catch (error) {
              console.error('Delete failed:', error)
            }
          }}
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete Product
        </button>
      </div>
    </div>
  )
}
