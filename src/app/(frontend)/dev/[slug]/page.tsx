// Location: src/app/(frontend)/dev/[slug]/page.tsx
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

export default async function DevDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const payload = await getPayload({ config })
  
  const { docs: posts } = await payload.find({
    collection: 'dev',
    where: {
      slug: { equals: slug },
    },
    depth: 2,
    limit: 1,
  })

  const post = posts[0]

  if (!post || post.status !== 'published') {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Similar structure to Blog Detail but with dev-specific styling */}
      <div className="relative h-[60vh] w-full">
        {post.coverImage && typeof post.coverImage !== 'number' && typeof post.coverImage !== 'string' && (
          <Image
            src={post.coverImage.url || ''}
            alt={post.coverImage.alt || ''}
            fill
            className="object-cover opacity-50"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-2 mb-4">
              {post.dev_category?.map((cat: any) => (
                <span key={cat.id} className="text-sm px-3 py-1 bg-purple-500/20 backdrop-blur rounded-full">
                  <LanguageToggle zh={cat.name_zh} en={cat.name_en} />
                </span>
              ))}
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <LanguageToggle zh={post.title_zh} en={post.title_en} />
            </h1>
            <p className="text-lg opacity-90">
              <LanguageToggle zh={post.excerpt_zh} en={post.excerpt_en} />
            </p>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-8 py-16">
        <div className="prose prose-invert prose-lg max-w-none">
          <LanguageToggle 
            zh={<div dangerouslySetInnerHTML={{ __html: post.content_zh || '' }} />}
            en={post.content_en ? <div dangerouslySetInnerHTML={{ __html: post.content_en }} /> : null}
          />
        </div>

        {post.dev_tag && post.dev_tag.length > 0 && (
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-wrap gap-2">
              {post.dev_tag.map((tag: any) => (
                <Link
                  key={tag.id}
                  href={`/dev?tag=${tag.slug}`}
                  className="text-sm px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full hover:bg-purple-500/20 transition"
                >
                  #<LanguageToggle zh={tag.name_zh} en={tag.name_en} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}