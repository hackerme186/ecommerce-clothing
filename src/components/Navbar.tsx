'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { Session, AuthChangeEvent, User } from '@supabase/supabase-js'

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error('Error getting session:', error.message)
        return
      }
      setUser(data.session?.user ?? null)
    })

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user ?? null)
      }
    )

    // Cleanup subscription to avoid memory leaks
    return () => {
      authListener?.subscription?.unsubscribe?.()
    }
  }, [])

  return (
    <nav className="my-4 flex justify-between">
      <Link href="/">Home</Link>
      {user ? (
        <>
          <Link href="/product/create">Add Product</Link>
          <button
            onClick={() =>
              supabase.auth.signOut().then(() => (window.location.href = '/'))
            }
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </>
      )}
    </nav>
  )
}
