// Location: src/app/(frontend)/dev/page.tsx
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'
import { LanguageToggle } from '@/components/LanguageToggle'

export default async function DevPage() {
  const payload = await getPayload({ config })
  
  const { docs: posts } = await payload.find({
    collection: 'dev',
    where: {
      status: { equals: 'published' },
    },
    sort: '-createdAt',
    depth: 2,
  })

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <LanguageToggle zh="開發" en="Development" />
          </h1>
          <p className="text-lg text-white/60 max-w-3xl">
            <LanguageToggle 
              zh="技術探索、開發筆記與創意編程"
              en="Technical explorations, development notes, and creative coding"
            />
          </p>
        </div>
        
        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="group">
              <Link href={`/dev/${post.slug}`}>
                <div className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition duration-300">
                  <div className="aspect-video relative">
                    {post.thumbnail && typeof post.thumbnail !== 'number' && typeof post.thumbnail !== 'string' && (
                      <Image
                        src={post.thumbnail.url || ''}
                        alt={post.thumbnail.alt || ''}
                        fill
                        className="object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex gap-2 mb-3">
                      {post.dev_category?.slice(0, 2).map((cat: any) => (
                        <span key={cat.id} className="text-xs px-2 py-1 bg-white/10 rounded">
                          <LanguageToggle zh={cat.name_zh} en={cat.name_en} />
                        </span>
                      ))}
                    </div>
                    
                    <h2 className="text-2xl font-semibold mb-3 group-hover:opacity-80 transition">
                      <LanguageToggle zh={post.title_zh} en={post.title_en} />
                    </h2>
                    
                    <p className="text-white/60 line-clamp-3 mb-4">
                      <LanguageToggle zh={post.excerpt_zh} en={post.excerpt_en} />
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-white/40">
                      <time dateTime={post.createdAt}>
                        {new Date(post.createdAt).toLocaleDateString('zh-TW', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                      <span className="group-hover:translate-x-1 transition">
                        <LanguageToggle zh="閱讀更多 →" en="Read more →" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}