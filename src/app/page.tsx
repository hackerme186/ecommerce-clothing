'use client'

import { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { supabase } from '@/lib/supabaseClient'
import type { Product } from '@/types'

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .then(({ data }) => {
        if (data) setProducts(data as Product[]) // dùng type assertion nếu cần
      })
  }, [])

  return (
    <div>
      <h1 className="text-3xl my-4">Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
