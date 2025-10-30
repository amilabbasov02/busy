"use client";
import { useState } from 'react';
import Head from 'next/head';
import './blog_v2.css';

interface Post {
    id: number;
    title: string;
    image: string;
    category: string;
    excerpt: string;
    featured?: boolean;
}

const allPosts: Post[] = [
    { id: 1, title: "Texnologiyada Ən Son Trendlər", image: "/images/blog-01a.jpg", category: "Texnologiya", excerpt: "2025-ci ilin texnoloji yenilikləri və gələcəyə baxış.", featured: true },
    { id: 2, title: "Effektiv Karyera Quruculuğu", image: "/images/blog-02a.jpg", category: "Karyera", excerpt: "Karyera pillələrini sürətlə qalxmaq üçün 5 əsas addım." },
    { id: 3, title: "Dizaynın Psixologiyası", image: "/images/blog-03a.jpg", category: "Dizayn", excerpt: "Rənglərin və formaların istifadəçi davranışına təsiri." },
    { id: 4, title: "Startup Dünyasında Uğur", image: "/images/blog-04a.jpg", category: "Biznes", excerpt: "Kiçik büdcə ilə böyük işlər görməyin sirləri." },
    { id: 5, title: "Mental Sağlamlıq və İş Həyatı", image: "/images/blog-05a.jpg", category: "Sağlamlıq", excerpt: "İş yerində stressi azaltmaq və motivasiyanı artırmaq." },
    { id: 6, title: "Gələcəyin Proqramlaşdırma Dilləri", image: "/images/blog-06a.jpg", category: "Texnologiya", excerpt: "Hansı proqramlaşdırma dilləri gələcəkdə daha çox tələb olunacaq?" },
    { id: 7, title: "Evdən İşləməyin Üstünlükləri", image: "/images/blog-07a.jpg", category: "Karyera", excerpt: "Remote işin məhsuldarlığa və həyat keyfiyyətinə təsirləri." },
];

export default function BlogV2() {
    const [posts, setPosts] = useState<Post[]>(allPosts.slice(0, 4));
    const [hasMore, setHasMore] = useState(allPosts.length > 4);

    const loadMorePosts = () => {
        const currentLength = posts.length;
        const newPosts = allPosts.slice(currentLength, currentLength + 3);
        setPosts([...posts, ...newPosts]);
        if (currentLength + 3 >= allPosts.length) {
            setHasMore(false);
        }
    };

    const featuredPost = allPosts.find(p => p.featured);
    const otherPosts = posts.filter(p => !p.featured);

    return (
        <>
            <Head>
                <title>Modern Blog</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </Head>
            <div className="blog-v2-container">
                <main className="blog-v2-main">
                    {featuredPost && (
                        <section className="featured-post-area">
                            <div className="featured-post-card">
                                <img src={featuredPost.image} alt={featuredPost.title} className="featured-post-image" />
                                <div className="featured-post-overlay">
                                    <div className="featured-post-content">
                                        <span className="featured-post-category">{featuredPost.category}</span>
                                        <h1 className="featured-post-title">{featuredPost.title}</h1>
                                        <p className="featured-post-excerpt">{featuredPost.excerpt}</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    <section className="posts-grid-area">
                        <div className="posts-grid">
                            {otherPosts.map(post => (
                                <div key={post.id} className="post-card">
                                    <div className="post-card-image-container">
                                        <img src={post.image} alt={post.title} className="post-card-image" />
                                    </div>
                                    <div className="post-card-content">
                                        <span className="post-card-category">{post.category}</span>
                                        <h2 className="post-card-title">{post.title}</h2>
                                        <p className="post-card-excerpt">{post.excerpt}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {hasMore && (
                        <div className="load-more-container">
                            <button onClick={loadMorePosts} className="load-more-button">
                                Daha Çox Yüklə
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}