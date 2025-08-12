import './globals.css'

export const metadata = {
  title: 'Todo Master - Advanced Task Management',
  description: 'Beautiful and powerful todo app built with Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}