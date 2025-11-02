// Location: src/app/(frontend)/artwork/page.tsx
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'
import { LanguageToggle } from '@/components/LanguageToggle'

export const dynamic = 'force-dynamic'

export default async function ArtworkPage() {
  const payload = await getPayload({ config })
  
  const { docs: artworks } = await payload.find({
    collection: 'artwork',
    where: {
      status: { equals: 'published' },
    },
    sort: '-year',
    depth: 2,
  })

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <LanguageToggle zh="作品" en="Artwork" />
          </h1>
          <p className="text-lg text-white/60 max-w-3xl">
            <LanguageToggle 
              zh="探索新媒體藝術、互動裝置與數位創作的實驗性作品"
              en="Exploring experimental works in new media art, interactive installations, and digital creation"
            />
          </p>
        </div>
        
        {/* Grid Layout - Masonry Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((artwork, index) => (
            <Link 
              key={artwork.id} 
              href={`/artwork/${artwork.slug}`}
              className={`group block ${index % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              <div className="relative overflow-hidden bg-gray-900 h-full">
                <div className={`relative ${index % 5 === 0 ? 'aspect-square' : 'aspect-[4/5]'}`}>
                  {artwork.thumbnail && typeof artwork.thumbnail !== 'number' && typeof artwork.thumbnail !== 'string' && (
                    <Image
                      src={artwork.thumbnail.url || ''}
                      alt={artwork.thumbnail.alt || ''}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-700"
                    />
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition duration-500">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition duration-500">
                      <div className="flex gap-2 mb-3">
                        {artwork.medium?.slice(0, 3).map((medium: any) => (
                          <span key={medium.id} className="text-xs px-2 py-1 bg-white/20 backdrop-blur rounded">
                            <LanguageToggle zh={medium.name_zh} en={medium.name_en} />
                          </span>
                        ))}
                      </div>
                      <p className="text-sm opacity-70 mb-1">{artwork.year}</p>
                      <h3 className="text-xl font-semibold mb-2">
                        <LanguageToggle zh={artwork.author_zh} en={artwork.author_en} />
                      </h3>
                      <p className="text-sm opacity-90 line-clamp-2">
                        <LanguageToggle zh={artwork.description_zh} en={artwork.description_en} />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}