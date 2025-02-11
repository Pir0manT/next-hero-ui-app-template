'use client'

import { HeroUIProvider, SupportedCalendars } from '@heroui/system'
import { GregorianCalendar } from '@internationalized/date'
import { useRouter } from 'next/navigation'
import type { ThemeProviderProps } from 'next-themes'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import * as React from 'react'

function createCalendar(identifier: SupportedCalendars) {
  switch (identifier) {
    case 'gregory':
      return new GregorianCalendar()
    default:
      throw new Error(`Unsupported calendar ${identifier}`)
  }
}

export interface ProvidersProps {
  children: React.ReactNode
  themeProps?: ThemeProviderProps
}

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter()

  return (
    <HeroUIProvider
      createCalendar={createCalendar}
      locale={'ru-ru'}
      navigate={router.push}
    >
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </HeroUIProvider>
  )
}
