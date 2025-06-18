'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import type { Session, AuthChangeEvent, User } from '@supabase/supabase-js'

export default function Navbar() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) throw error
        setUser(session?.user ?? null)
      } catch (error) {
        console.error('Session error:', error)
      } finally {
        setLoading(false)
      }
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user ?? null)
      }
    )

    checkSession()

    return () => subscription?.unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (loading) return null

  return (
    <nav className="bg-white shadow-sm py-4 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          E-Commerce
        </Link>

        <div className="flex gap-6 items-center">
          {user ? (
            <>
              <Link
                href="/product/create"
                className="hover:text-blue-600 transition-colors"
              >
                Add Product
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hover:text-blue-600 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="hover:text-blue-600 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
