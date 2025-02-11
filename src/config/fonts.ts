import { Fira_Code as FontMono, Inter as FontSans } from 'next/font/google'

export const fontSans = FontSans({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-sans',
})

export const fontMono = FontMono({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-mono',
})
