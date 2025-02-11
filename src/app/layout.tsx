import '../styles/globals.css'

import { Link } from '@heroui/link'
import clsx from 'clsx'
import type { Metadata, Viewport } from 'next'
import { ReactNode } from 'react'

import { Providers } from '@/app/providers'
import { AppSidebar } from '@/components/app-sidebar'
import { Navbar } from '@/components/navbar'
import { SidebarInset } from '@/components/ui/sidebar'
import { fontSans } from '@/config/fonts'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html suppressHydrationWarning lang="ru">
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'system' }}>
          <AppSidebar className={'border-default-300'} />
          <SidebarInset>
            <div className="relative flex flex-col h-screen w-full">
              <Navbar />
              <main className="container mx-auto max-w-[1536px] px-6 flex-grow">
                {children}
              </main>
              <footer className="w-full flex items-center justify-center py-3">
                <Link
                  isExternal
                  className="flex items-center gap-1 text-current"
                  href="https://heroui.com?utm_source=next-app-template"
                  title="heroui.com homepage"
                >
                  <span className="text-default-600">Powered by</span>
                  <p className="text-primary">HeroUI</p>
                </Link>
              </footer>
            </div>
          </SidebarInset>
        </Providers>
      </body>
    </html>
  )
}
