// Location: src/app/(frontend)/blog/[id]/page.tsx
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { LanguageToggle } from '@/components/LanguageToggle'

export const dynamic = 'force-dynamic'

// Disable static generation during build
export async function generateStaticParams() {
  // Return empty array to skip static generation
  // Pages will be generated on-demand at runtime
  return []
}

export default async function BlogDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params
  const payload = await getPayload({ config })
  
  try {
    const post = await payload.findByID({
      collection: 'blog',
      id: id,
      depth: 2,
    })

    if (!post || post.status !== 'published') {
      notFound()
    }

    return (
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <div className="relative h-[70vh] w-full">
          {post.coverImage && typeof post.coverImage !== 'number' && typeof post.coverImage !== 'string' && (
            <Image
              src={post.coverImage.url || ''}
              alt={post.coverImage.alt || ''}
              fill
              className="object-cover opacity-70"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-2 mb-4">
                {post.blog_category?.map((cat: any) => (
                  <span key={cat.id} className="text-sm px-3 py-1 bg-white/20 backdrop-blur rounded-full">
                    <LanguageToggle zh={cat.name_zh} en={cat.name_en} />
                  </span>
                ))}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                <LanguageToggle zh={post.title_zh} en={post.title_en} />
              </h1>
              <p className="text-lg opacity-90 max-w-2xl">
                <LanguageToggle zh={post.excerpt_zh} en={post.excerpt_en} />
              </p>
              <div className="mt-6 text-sm opacity-70">
                {new Date(post.createdAt).toLocaleDateString('zh-TW', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
                {post.author && typeof post.author !== 'number' && typeof post.author !== 'string' && (
                  <span className="ml-4">• {post.author.name || post.author.email}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <article className="max-w-4xl mx-auto px-8 py-16">
          <div className="prose prose-invert prose-lg max-w-none">
            <LanguageToggle 
              zh={<div dangerouslySetInnerHTML={{ __html: post.content_zh || '' }} />}
              en={post.content_en ? <div dangerouslySetInnerHTML={{ __html: post.content_en }} /> : null}
            />
          </div>

          {/* Tags */}
          {post.blog_tag && post.blog_tag.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                {post.blog_tag.map((tag: any) => (
                  <Link
                    key={tag.id}
                    href={`/blog?tag=${tag.slug}`}
                    className="text-sm px-4 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition"
                  >
                    #<LanguageToggle zh={tag.name_zh} en={tag.name_en} />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Back Button */}
        <div className="max-w-4xl mx-auto px-8 pb-16">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <LanguageToggle zh="返回部落格" en="Back to Blog" />
          </Link>
        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
}