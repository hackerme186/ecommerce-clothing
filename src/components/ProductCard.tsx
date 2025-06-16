import Link from 'next/link'
<<<<<<< HEAD

export default function ProductCard({ product }: any) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="border p-4 rounded hover:shadow">
        <img src={product.image_url || '/placeholder.png'} alt={product.name} className="h-48 w-full object-cover" />
=======
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="border p-4 rounded hover:shadow">
        <img
          src={product.image_url || '/placeholder.png'}
          alt={product.name}
          className="h-48 w-full object-cover"
        />
>>>>>>> 764af88 (Your commit message)
        <h2 className="text-xl">{product.name}</h2>
        <p>${product.price}</p>
      </div>
    </Link>
  )
}
