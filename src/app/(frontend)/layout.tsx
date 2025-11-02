// Location: src/app/(frontend)/layout.tsx
// 修改: 添加 LanguageProvider 和 Header
import React from 'react'
import { LanguageProvider } from '@/context/LanguageContext'
import { Header } from '@/components/Header'
import './styles.css'

export const metadata = {
  description: 'DuckL - New Media Artist',
  title: 'DuckL Blog',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Header />
          <main className="pt-16">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  )
}