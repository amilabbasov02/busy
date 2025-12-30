import { Suspense } from 'react';
import { Metadata } from 'next';
import PostsClient from './PostsClient';
import Loading from './loading';
import { cachedFetchUpstream } from '@/lib/http/cachedFetchUpstream';

interface SearchParams {
    search?: string;
    page?: string;
}

async function fetchPosts(searchParams: SearchParams) {
    const { search = '', page = '1' } = searchParams;
    let url = `https://api.busy.az/api/posts?per_page=20&page=${page}`;
    if (search) {
        url += `&search=${search}`;
    }
    try {
        const response = await cachedFetchUpstream(url, { cache: 'no-store' });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        return { data: [], count: 0, per_page: 20 };
    }
}

export const metadata: Metadata = {
    title: 'Blog - Busy.az',
    description: 'Busy.az blogunda karyera və iş dünyası haqqında məqalələr.',
    alternates: { canonical: '/blog' },
    openGraph: {
        title: 'Blog - Busy.az',
        description: 'Busy.az blogunda karyera və iş dünyası haqqında məqalələr.',
        url: '/blog',
    },
    twitter: {
        title: 'Blog - Busy.az',
        description: 'Busy.az blogunda karyera və iş dünyası haqqında məqalələr.',
    },
};

export default async function BlogPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const sp = await searchParams;
    const { data: posts, count, per_page } = await fetchPosts(sp);
    const totalPages = Math.ceil(count / per_page);

    return (
        <Suspense fallback={<Loading />}>
            <PostsClient
                posts={posts}
                totalPages={totalPages}
                currentPage={parseInt(sp.page || '1', 10)}
                searchQuery={sp.search || ''}
            />
        </Suspense>
    );
}
