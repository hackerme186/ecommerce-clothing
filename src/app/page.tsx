import { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { supabase } from '@/lib/supabaseClient'

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([])
  useEffect(() => {
    supabase.from('products').select('*').then(({ data }) => data && setProducts(data))
  }, [])

  return (
    <div>
      <h1 className="text-3xl my-4">Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
