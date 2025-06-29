import '@/styles/globals.css'
import Navbar from '@/components/Navbar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="container mx-auto">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
