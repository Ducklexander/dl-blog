// Location: src/app/(frontend)/contact/page.tsx
import { getPayload } from 'payload'
import config from '@payload-config'
import { LanguageToggle } from '@/components/LanguageToggle'

export default async function ContactPage() {
  const payload = await getPayload({ config })
  
  const contact = await payload.findGlobal({
    slug: 'contact',
    depth: 1,
  })

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-8 py-24">
        <h1 className="text-6xl font-bold mb-16">
          <LanguageToggle zh="聯絡" en="Contact" />
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none mb-12">
          <LanguageToggle 
            zh={<div dangerouslySetInnerHTML={{ __html: contact?.content_zh || '' }} />}
            en={contact?.content_en ? <div dangerouslySetInnerHTML={{ __html: contact.content_en }} /> : null}
          />
        </div>

        {contact?.email && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              <LanguageToggle zh="電子郵件" en="Email" />
            </h2>
            <a href={`mailto:${contact.email}`} className="text-xl hover:opacity-80 transition">
              {contact.email}
            </a>
          </div>
        )}

        {contact?.socialLinks && contact.socialLinks.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              <LanguageToggle zh="社群媒體" en="Social Media" />
            </h2>
            <div className="flex gap-4">
              {contact.socialLinks.map((link: any, index: number) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}