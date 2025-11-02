// Location: src/components/Header.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { useAuth } from '@/hooks/useAuth'

export function Header() {
  const { language, setLanguage } = useLanguage()
  const { user, logout } = useAuth()

  return (
    <header className="fixed top-0 w-full bg-black text-white z-50 px-6 py-4">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold hover:opacity-80">
          DuckL
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link href="/about" className="hover:opacity-80 transition">
            {language === 'en' ? 'About' : '關於'}
          </Link>
          <Link href="/blog" className="hover:opacity-80 transition">
            {language === 'en' ? 'Blog' : '部落格'}
          </Link>
          <Link href="/artwork" className="hover:opacity-80 transition">
            {language === 'en' ? 'Artwork' : '作品'}
          </Link>
          <Link href="/dev" className="hover:opacity-80 transition">
            {language === 'en' ? 'Dev' : '開發'}
          </Link>
          <Link href="/contact" className="hover:opacity-80 transition">
            {language === 'en' ? 'Contact' : '聯絡'}
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* User Auth */}
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm">{user.name || user.email}</span>
              {user.role === 'admin' && (
                <Link href="/admin" className="text-sm hover:opacity-80">
                  Admin
                </Link>
              )}
              <button onClick={logout} className="text-sm hover:opacity-80">
                {language === 'en' ? 'Logout' : '登出'}
              </button>
            </div>
          ) : (
            <Link href="/login" className="hover:opacity-80">
              {language === 'en' ? 'Login' : '登入'}
            </Link>
          )}

          {/* Language Toggle */}
          <div className="flex items-center space-x-2 border-l pl-4">
            <button
              onClick={() => setLanguage('zh')}
              className={`${language === 'zh' ? 'font-bold' : 'opacity-60'} hover:opacity-100`}
            >
              ZH
            </button>
            <span>/</span>
            <button
              onClick={() => setLanguage('en')}
              className={`${language === 'en' ? 'font-bold' : 'opacity-60'} hover:opacity-100`}
            >
              EN
            </button>
          </div>

          {/* Search Icon */}
          <button className="hover:opacity-80">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}