import { Metadata } from 'next';
import { cachedFetchUpstream } from '@/lib/http/cachedFetchUpstream';
import BlogPostClient from './BlogPostClient';

interface Category { id: number; name: string; }
interface Tag { id: number; slug: string; title: { az: string } }
interface PostData {
  title: string;
  image: string;
  content: string;
  created_at: string;
  slug: string;
  categories: { category: Category }[];
  tags: { tag: Tag }[];
}
interface RelatedPost { id: number; title: string; image: string; slug: string; categories: { category: Category }[]; }

const upstreamHost = 'https://api.busy.az';

const fetchPost = async (slug: string) => {
  const res = await cachedFetchUpstream(`${upstreamHost}/api/posts/${slug}`);
  if (!res.ok) return null;
  return res.json();
};

const truncate = (text: string, len = 160) => {
  if (!text) return '';
  const clean = text.replace(/<[^>]+>/g, '');
  return clean.length > len ? `${clean.slice(0, len)}...` : clean;
};

type BlogSlugParams = { slug: string };

export async function generateMetadata({ params }: { params: Promise<BlogSlugParams> }): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchPost(slug);
  const post: PostData | null = data?.post ?? null;
  const title = post?.title ? `${post.title} | Blog` : 'Blog yazısı';
  const description = truncate(post?.content ?? 'Blog məzmunu');
  const url = `/blog/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images: post?.image ? [`https://busy.az${post.image}`] : undefined },
    twitter: { title, description, images: post?.image ? [`https://busy.az${post.image}`] : undefined },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<BlogSlugParams> }) {
  const { slug } = await params;
  const data = await fetchPost(slug);
  const post: PostData | null = data?.post ?? null;
  const relatedPosts: RelatedPost[] = data?.relatedPosts ?? [];
  return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
}
