// Location: src/app/(frontend)/about/page.tsx
import { getPayload } from 'payload'
import config from '@payload-config'
import { LanguageToggle } from '@/components/LanguageToggle'

export default async function AboutPage() {
  const payload = await getPayload({ config })
  
  const about = await payload.findGlobal({
    slug: 'about',
    depth: 1,
  })

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-8 py-24">
        <h1 className="text-6xl font-bold mb-16">
          <LanguageToggle zh="關於" en="About" />
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none">
          <LanguageToggle 
            zh={<div dangerouslySetInnerHTML={{ __html: about?.content_zh || '' }} />}
            en={about?.content_en ? <div dangerouslySetInnerHTML={{ __html: about.content_en }} /> : null}
          />
        </div>
      </div>
    </div>
  )
}