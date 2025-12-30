"use client";
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from './page.module.css';

interface Post {
    id: number;
    title: string;
    image: string;
    slug: string;
}

interface TagClientProps {
    slug: string;
    initialPosts: Post[];
    initialTotalPages: number;
    initialTagName: string;
}

export default function TagPage({ slug, initialPosts, initialTotalPages, initialTagName }: TagClientProps) {
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [tagName, setTagName] = useState(initialTagName);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [fontSize, setFontSize] = useState(16); // Default font size
    const [totalPages, setTotalPages] = useState(initialTotalPages);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (currentPage === 1) return;
        const fetchPostsByTag = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/bff/api/posts/tag/${slug}?per_page=20&page=${currentPage}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                const postsArray = data.posts || [];
                setPosts(postsArray);
                setTagName(data.tag?.title || slug);
                setTotalPages(Math.ceil(data.count / data.per_page));
            } catch (error) {
                console.error("Failed to fetch posts:", error);
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchPostsByTag();
    }, [slug, currentPage]);

    // Masonry effect
    useEffect(() => {
        if (!loading && gridRef.current) {
            const grid = gridRef.current;
            const rowHeight = 10;
            const rowGap = 15;

            const resizeGridItem = (item: HTMLElement) => {
                const content = item.querySelector(`.${styles.postCardContent}`);
                if (!content) return;
                const contentHeight = content.scrollHeight;
                const imageHeight = item.querySelector('img')?.clientHeight || 0;
                const totalHeight = imageHeight + contentHeight + 15;
                const rowSpan = Math.ceil((totalHeight + rowGap) / (rowHeight + rowGap));
                item.style.gridRowEnd = `span ${rowSpan}`;
            };

            const resizeAllGridItems = () => {
                const allItems = grid.querySelectorAll<HTMLElement>(`.${styles.postCardLink}`);
                allItems.forEach(resizeGridItem);
            };

            const images = Array.from(grid.querySelectorAll('img'));
            if (images.length === 0) {
                resizeAllGridItems();
                return;
            }
            
            Promise.all(images.map(img => {
                if (img.complete) return Promise.resolve();
                return new Promise(resolve => { img.onload = img.onerror = resolve; });
            })).then(() => {
                resizeAllGridItems();
            });

            window.addEventListener('resize', resizeAllGridItems);
            return () => window.removeEventListener('resize', resizeAllGridItems);
        }
    }, [loading, posts]);

    const renderPagination = () => {
        const pages = [];
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        if (currentPage <= 3) endPage = Math.min(5, totalPages);
        if (currentPage > totalPages - 3) startPage = Math.max(1, totalPages - 4);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <li key={i}>
                    <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(i); }} className={currentPage === i ? styles.currentPage : ''}>
                        {i}
                    </a>
                </li>
            );
        }
        return pages;
    };

    return (
        <>
            <Head>
                <title>{tagName} haqqında məqalələr - Busy.az Blog</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
            </Head>
            <div className={styles.blogV2Container}>
                <div className={styles.heroSection}>
                    <h1>"{tagName}" haqqında məqalələr</h1>
                    <div className={styles.fontSizeControls}>
                        <button onClick={() => setFontSize(prev => prev + 1)}>+</button>
                        <button onClick={() => setFontSize(prev => prev - 1)}>-</button>
                        <button onClick={() => setFontSize(16)}>Reset</button>
                    </div>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>Yüklənir...</div>
                ) : (
                    <>
                        <div className={styles.postsGrid} ref={gridRef}>
                            {posts.map(post => (
                                <Link key={post.id} href={`/blog/${post.slug}`} className={styles.postCardLink}>
                                    <div className={styles.postCard}>
                                        <img src={`https://busy.az${post.image}`} alt={post.title} className={styles.postCardImage} />
                                        <div className={styles.postCardContent} style={{ fontSize: `${fontSize}px` }}>
                                            <h2 className={styles.postCardTitle}>{post.title}</h2>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="col-md-12">
                                <div className={`${styles.paginationContainer} ${styles.marginTop60} ${styles.marginBottom60}`}>
                                    <nav className={styles.pagination}>
                                        <ul>
                                            {currentPage > 1 && (
                                                <li className={styles.paginationArrow}>
                                                    <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(currentPage - 1); }} className="ripple-effect">
                                                        <i className="icon-material-outline-keyboard-arrow-left"></i>
                                                    </a>
                                                </li>
                                            )}
                                            {renderPagination()}
                                            {currentPage < totalPages && (
                                                <li className={styles.paginationArrow}>
                                                    <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(currentPage + 1); }} className="ripple-effect">
                                                        <i className="icon-material-outline-keyboard-arrow-right"></i>
                                                    </a>
                                                </li>
                                            )}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}
