import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: "Champaran's Jayka — Taste Like Home",
    template: "%s | Champaran's Jayka",
  },
  description:
    "Experience the authentic flavours of Champaran at Champaran's Jayka. Home-style cooking, rich spices, and an atmosphere that feels just like home.",
  keywords: [
    "Champaran's Jayka",
    "Champaran food",
    "taste like home",
    "authentic Indian restaurant",
    "home-style cooking",
    "Bihari cuisine",
    "reservation",
  ],
  icons: {
    icon: [
      { url: 'https://qhidayelxwxwppfqqjdk.supabase.co/storage/v1/object/public/images/favicon.png.jpeg', type: 'image/jpeg' },
    ],
    apple: 'https://qhidayelxwxwppfqqjdk.supabase.co/storage/v1/object/public/images/favicon.png.jpeg',
    shortcut: 'https://qhidayelxwxwppfqqjdk.supabase.co/storage/v1/object/public/images/favicon.png.jpeg',
  },
  openGraph: {
    title: "Champaran's Jayka — Taste Like Home",
    description:
      "Experience the authentic flavours of Champaran at Champaran's Jayka. Home-style cooking, rich spices, and an atmosphere that feels just like home.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Champaran's Jayka — Taste Like Home",
    description:
      "Experience the authentic flavours of Champaran at Champaran's Jayka. Home-style cooking, rich spices, and an atmosphere that feels just like home.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-dark text-foreground antialiased">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'rgb(22 16 12)',
              border: '1px solid rgb(45 35 28)',
              color: 'rgb(245 240 235)',
            },
          }}
        />
      </body>
    </html>
  )
}
