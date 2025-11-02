// Location: src/app/(frontend)/artwork/[slug]/page.tsx
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { LanguageToggle } from '@/components/LanguageToggle'

export const dynamic = 'force-dynamic'

// Disable static generation during build
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  // Return empty array to skip static generation
  // Pages will be generated on-demand at runtime
  return []
}

export default async function ArtworkDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const payload = await getPayload({ config })
  
  const { docs: artworks } = await payload.find({
    collection: 'artwork',
    where: {
      slug: { equals: slug },
    },
    depth: 2,
    limit: 1,
  })

  const artwork = artworks[0]

  if (!artwork || artwork.status !== 'published') {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Banner Image */}
      <div className="relative h-[80vh] w-full">
        {artwork.bannerImage && typeof artwork.bannerImage !== 'number' && typeof artwork.bannerImage !== 'string' && (
          <Image
            src={artwork.bannerImage.url || ''}
            alt={artwork.bannerImage.alt || ''}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      </div>

      <div className="max-w-7xl mx-auto px-8 -mt-32 relative z-10">
        {/* Main Info */}
        <div className="bg-black/80 backdrop-blur-sm p-8 md:p-12 rounded-lg">
          <div className="flex flex-wrap gap-3 mb-6">
            {artwork.medium?.map((medium: any) => (
              <span key={medium.id} className="px-3 py-1 bg-white/10 backdrop-blur rounded-full text-sm">
                <LanguageToggle zh={medium.name_zh} en={medium.name_en} />
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <LanguageToggle zh={artwork.author_zh} en={artwork.author_en} />
          </h1>
          
          <p className="text-xl opacity-90 mb-2">{artwork.year}</p>
          
          <p className="text-lg opacity-80 max-w-3xl">
            <LanguageToggle zh={artwork.description_zh} en={artwork.description_en} />
          </p>

          {/* Collaboration Info */}
          {artwork.collaborationType === 'collaborate' && artwork.credits && artwork.credits.length > 0 && (
            <div className="mt-8 pt-8 border-t border-white/10">
              <h3 className="text-sm uppercase tracking-wider opacity-60 mb-3">
                <LanguageToggle zh="創作團隊" en="Credits" />
              </h3>
              <div className="flex flex-wrap gap-3">
                {artwork.credits.map((credit: any, index: number) => (
                  <span key={index} className="text-lg">{credit.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Video Embed */}
        {artwork.videoUrl && (
          <div className="mt-12">
            <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
              <iframe
                src={artwork.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Gallery */}
        {artwork.galleryImages && artwork.galleryImages.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">
              <LanguageToggle zh="作品圖集" en="Gallery" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {artwork.galleryImages.map((item: any, index: number) => (
                <div key={index} className="aspect-square relative bg-gray-900 rounded-lg overflow-hidden">
                  {item.image && typeof item.image !== 'number' && typeof item.image !== 'string' && (
                    <Image
                      src={item.image.url || ''}
                      alt={item.image.alt || ''}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        {(artwork.content_zh || artwork.content_en) && (
          <div className="mt-12 prose prose-invert prose-lg max-w-none">
            <LanguageToggle 
              zh={<div dangerouslySetInnerHTML={{ __html: artwork.content_zh || '' }} />}
              en={artwork.content_en ? <div dangerouslySetInnerHTML={{ __html: artwork.content_en }} /> : null}
            />
          </div>
        )}

        {/* Technologies */}
        {artwork.usedTech && artwork.usedTech.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4">
              <LanguageToggle zh="使用技術" en="Technologies" />
            </h3>
            <div className="flex flex-wrap gap-2">
              {artwork.usedTech.map((tech: any, index: number) => (
                <span key={index} className="px-4 py-2 bg-white/5 rounded-lg">
                  {tech.tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Exhibitions & Awards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          {artwork.exhibitions && artwork.exhibitions.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">
                <LanguageToggle zh="展覽經歷" en="Exhibitions" />
              </h3>
              <div className="space-y-4">
                {artwork.exhibitions.map((exhibition: any, index: number) => (
                  <div key={index} className="border-l-2 border-white/20 pl-4">
                    <p className="font-medium">
                      <LanguageToggle zh={exhibition.name_zh} en={exhibition.name_en} />
                    </p>
                    <p className="text-sm opacity-70">
                      {exhibition.location} • {new Date(exhibition.date).getFullYear()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {artwork.awards && artwork.awards.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">
                <LanguageToggle zh="獲獎紀錄" en="Awards" />
              </h3>
              <div className="space-y-4">
                {artwork.awards.map((award: any, index: number) => (
                  <div key={index} className="border-l-2 border-yellow-500/50 pl-4">
                    <p className="font-medium">
                      <LanguageToggle zh={award.name_zh} en={award.name_en} />
                    </p>
                    <p className="text-sm opacity-70">{award.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Extra Links */}
        {artwork.extraLinks && artwork.extraLinks.length > 0 && (
          <div className="mt-12 mb-16">
            <h3 className="text-xl font-semibold mb-4">
              <LanguageToggle zh="相關連結" en="Related Links" />
            </h3>
            <div className="flex flex-wrap gap-3">
              {artwork.extraLinks.map((link: any, index: number) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white hover:text-black transition"
                >
                  <LanguageToggle zh={link.label_zh} en={link.label_en} />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}