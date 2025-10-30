"use client";
import { useEffect, useState, Suspense } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Post {
    id: number;
    title: string;
    image: string;
    href: string;
}

const allPosts: Post[] = Array.from({ length: 32 }, (_, i) => ({
    id: i + 1,
    title: `Blog Başlığı ${i + 1} (Səhifə ${Math.floor(i / 16) + 1})`,
    image: `/storage/posts/1760094428.jpg`,
    href: '#',
}));

const fetchPosts = (page: number, itemsPerPage: number = 16): Promise<Post[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            resolve(allPosts.slice(start, end));
        }, 300);
    });
};

function BlogContent() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const page = searchParams.get('page') || '1';
    const currentPage = parseInt(page, 10);
    const totalPages = Math.ceil(allPosts.length / 16);

    useEffect(() => {
        setLoading(true);
        fetchPosts(currentPage).then(data => {
            setPosts(data);
            setLoading(false);
        });
    }, [currentPage]);

    return (
        <>
            <div className="grid_content" style={{ position: 'relative', height: 'auto' }}>
                <div id="post-area" className="grid d-flex flex-wrap">
                    {loading ? (
                        <p>Yüklənir...</p>
                    ) : (
                        posts.map(post => (
                            <div key={post.id} className="grid-item gr_padding">
                                <a href={post.href} className="grid_link">
                                    <div className="grid_img">
                                        <img src={post.image} alt={post.title} />
                                    </div>
                                    <div className="gr_news_content">
                                        <h3 className="news_head_gr ">
                                            {post.title}
                                        </h3>
                                    </div>
                                </a>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <div className="clearfix"></div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="pagination-container margin-top-60 margin-bottom-60 d-flex justify-content-center">
                            <nav className="pagination">
                                <ul>
                                    {currentPage > 1 && (
                                        <li className="pagination-arrow">
                                            <Link href={`/blog?page=${currentPage - 1}`} className="ripple-effect">
                                                <i className="icon-material-outline-keyboard-arrow-left"></i>
                                            </Link>
                                        </li>
                                    )}
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                        <li key={p}>
                                            <Link href={`/blog?page=${p}`} className={currentPage === p ? 'current-page ripple-effect' : 'ripple-effect'}>
                                                {p}
                                            </Link>
                                        </li>
                                    ))}
                                    {currentPage < totalPages && (
                                        <li className="pagination-arrow">
                                            <Link href={`/blog?page=${currentPage + 1}`} className="ripple-effect">
                                                <i className="icon-material-outline-keyboard-arrow-right"></i>
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default function Blog() {
    return (
        <>
            <Head>
                <title>Bloq</title>
            </Head>
            <div id="wrapper" style={{ overflowY: 'hidden' }}>
                <div className="clearfix"></div>
                <div id="titlebar" className="white margin-bottom-30">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1>Bloq</h1>
                                <nav id="breadcrumbs" className="dark d-none">
                                    <ul>
                                        <li><a href="">Baş səhifə</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <Suspense fallback={<div>Yüklənir...</div>}>
                    <BlogContent />
                </Suspense>
            </div>
        </>
    );
}