import { Metadata } from 'next';
import { cachedFetchUpstream } from '@/lib/http/cachedFetchUpstream';
import TagClient from './TagClient';

interface Post { id: number; title: string; image: string; slug: string; }

const upstreamHost = 'https://api.busy.az';

const fetchTagPosts = async (slug: string) => {
  const res = await cachedFetchUpstream(`${upstreamHost}/api/posts/tag/${slug}?per_page=20&page=1`);
  if (!res.ok) return null;
  return res.json();
};

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  // Next.js 15.5 type-checking may expect params to be Promise-like in PageProps.
  // `await` works for both Promise and plain objects.
  const { slug } = await params;
  const data = await fetchTagPosts(slug);
  const tagTitle = data?.tag?.title ?? slug;
  const title = `Teq: ${tagTitle}`;
  const description = `"${tagTitle}" teqi üzrə məqalələr.`;
  const url = `/blog/tag/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { title, description },
  };
}

export default async function TagPage({ params }: { params: any }) {
  const { slug } = await params;
  const data = await fetchTagPosts(slug);
  const posts: Post[] = data?.posts ?? [];
  const totalPages = data?.per_page ? Math.ceil((data?.count ?? 0) / data.per_page) : 0;
  const tagTitle = data?.tag?.title ?? slug;
  return <TagClient slug={slug} initialPosts={posts} initialTotalPages={totalPages} initialTagName={tagTitle} />;
}
