'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { Session, AuthChangeEvent } from '@supabase/supabase-js'

export default function Navbar() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then((res: { data: { session: Session | null }, error: any }) => {
      setUser(res.data.session?.user ?? null)
    })

    supabase.auth.onAuthStateChange(
      (_: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user ?? null)
      }
    )
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
