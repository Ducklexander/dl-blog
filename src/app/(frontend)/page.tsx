// Location: src/app/(frontend)/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import { LanguageToggle } from '@/components/LanguageToggle'

export default async function HomePage() {
  const payload = await getPayload({ config })
  
  // Get latest blog posts
  const { docs: latestPosts } = await payload.find({
    collection: 'blog',
    where: { status: { equals: 'published' } },
    limit: 3,
    sort: '-createdAt',
  })

  // Get featured artworks
  const { docs: featuredArtworks } = await payload.find({
    collection: 'artwork',
    where: { status: { equals: 'published' } },
    limit: 3,
    sort: '-year',
  })

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black" />
        <div className="relative z-10 text-center">
          <h1 className="text-7xl md:text-9xl font-bold mb-6 tracking-tight">
            DuckL
          </h1>
          <p className="text-xl md:text-2xl opacity-70">
            <LanguageToggle zh="新媒體藝術家" en="New Media Artist" />
          </p>
          <div className="mt-12 flex gap-4 justify-center">
            <Link 
              href="/artwork" 
              className="px-8 py-3 bg-white text-black font-medium hover:bg-opacity-90 transition"
            >
              <LanguageToggle zh="探索作品" en="Explore Works" />
            </Link>
            <Link 
              href="/about" 
              className="px-8 py-3 border border-white hover:bg-white hover:text-black transition"
            >
              <LanguageToggle zh="了解更多" en="Learn More" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      {featuredArtworks.length > 0 && (
        <section className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-12">
              <LanguageToggle zh="精選作品" en="Featured Works" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredArtworks.map((artwork) => (
                <Link key={artwork.id} href={`/artwork/${artwork.slug}`} className="group">
                  <div className="aspect-square relative overflow-hidden bg-gray-900">
                    {artwork.thumbnail && typeof artwork.thumbnail !== 'number' && typeof artwork.thumbnail !== 'string' && (
                      <Image
                        src={artwork.thumbnail.url || ''}
                        alt={artwork.thumbnail.alt || ''}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition duration-300">
                      <p className="text-sm opacity-70">{artwork.year}</p>
                      <p className="font-semibold">
                        <LanguageToggle zh={artwork.description_zh} en={artwork.description_en} />
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Blog Posts */}
      {latestPosts.length > 0 && (
        <section className="py-24 px-8 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-4xl font-bold">
                <LanguageToggle zh="最新文章" en="Latest Posts" />
              </h2>
              <Link href="/blog" className="text-white/70 hover:text-white transition">
                <LanguageToggle zh="查看全部 →" en="View All →" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <article key={post.id} className="group">
                  <Link href={`/blog/${post.id}`}>
                    <div className="aspect-video relative overflow-hidden bg-gray-900 mb-4">
                      {post.thumbnail && typeof post.thumbnail !== 'number' && typeof post.thumbnail !== 'string' && (
                        <Image
                          src={post.thumbnail.url || ''}
                          alt={post.thumbnail.alt || ''}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-300"
                        />
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:opacity-80 transition">
                      <LanguageToggle zh={post.title_zh} en={post.title_en} />
                    </h3>
                    <p className="text-white/60 line-clamp-2">
                      <LanguageToggle zh={post.excerpt_zh} en={post.excerpt_en} />
                    </p>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}