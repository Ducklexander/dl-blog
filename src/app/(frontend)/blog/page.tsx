// Location: src/app/(frontend)/blog/page.tsx
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'
import { LanguageToggle } from '@/components/LanguageToggle'

export default async function BlogPage() {
  const payload = await getPayload({ config })
  
  const { docs: posts } = await payload.find({
    collection: 'blog',
    where: {
      status: { equals: 'published' },
    },
    sort: '-createdAt',
    depth: 2,
  })

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-12">
          <LanguageToggle zh="部落格" en="Blog" />
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="group">
              <Link href={`/blog/${post.id}`}>
                <div className="aspect-w-16 aspect-h-9 mb-4 overflow-hidden">
                  {post.thumbnail && typeof post.thumbnail !== 'number' && typeof post.thumbnail !== 'string' && (
                    <Image
                      src={post.thumbnail.url || ''}
                      alt={post.thumbnail.alt || ''}
                      width={400}
                      height={225}
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  )}
                </div>
                <h2 className="text-xl font-semibold mb-2 group-hover:opacity-80">
                  <LanguageToggle zh={post.title_zh} en={post.title_en} />
                </h2>
                <p className="text-gray-400 line-clamp-3">
                  <LanguageToggle zh={post.excerpt_zh} en={post.excerpt_en} />
                </p>
                <div className="mt-4 flex items-center gap-2">
                  {post.blog_category?.map((cat: any) => (
                    <span key={cat.id} className="text-xs px-2 py-1 bg-gray-800 rounded">
                      <LanguageToggle zh={cat.name_zh} en={cat.name_en} />
                    </span>
                  ))}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}