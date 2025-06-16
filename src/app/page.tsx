<<<<<<< HEAD
'use client';
=======
'use client'
>>>>>>> 764af88 (Your commit message)

import { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { supabase } from '@/lib/supabaseClient'
<<<<<<< HEAD

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([])
  useEffect(() => {
    supabase.from('products').select('*').then(({ data }) => data && setProducts(data))
=======
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
>>>>>>> 764af88 (Your commit message)
  }, [])

  return (
    <div>
      <h1 className="text-3xl my-4">Products</h1>
      <div className="grid grid-cols-3 gap-4">
<<<<<<< HEAD
        {products.map(p => <ProductCard key={p.id} product={p} />)}
=======
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
>>>>>>> 764af88 (Your commit message)
      </div>
    </div>
  )
}
