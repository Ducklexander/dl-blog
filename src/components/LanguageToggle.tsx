// Location: src/components/LanguageToggle.tsx
'use client'

import { useLanguage } from '@/context/LanguageContext'
import { ReactNode } from 'react'

interface LanguageToggleProps {
  zh?: string | ReactNode | null
  en?: string | ReactNode | null
}

export function LanguageToggle({ zh, en }: LanguageToggleProps) {
  const { language, t } = useLanguage()
  
  // If zh or en are ReactNodes (not strings), render them directly based on language
  if (typeof zh !== 'string' || typeof en !== 'string') {
    return <>{language === 'zh' ? zh : (en || zh)}</>
  }
  
  // Otherwise use the t function for strings
  return <>{t(zh || undefined, en || undefined)}</>
}