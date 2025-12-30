"use client";
import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import './blog_v2.css';

interface Post {
    id: number;
    title: string;
    image: string;
    slug: string;
}

interface PostsClientProps {
    posts: Post[];
    totalPages: number;
    currentPage: number;
    searchQuery: string;
}

export default function PostsClient({ posts, totalPages, currentPage, searchQuery }: PostsClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchQuery);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (gridRef.current) {
            const grid = gridRef.current;
            const rowHeight = 10;
            const rowGap = 15;

            const resizeGridItem = (item: HTMLElement) => {
                const content = item.querySelector('.post-card-content');
                if (!content) return;
                const contentHeight = content.scrollHeight;
                const imageHeight = item.querySelector('img')?.clientHeight || 0;
                const totalHeight = imageHeight + contentHeight + 15;
                const rowSpan = Math.ceil((totalHeight + rowGap) / (rowHeight + rowGap));
                item.style.gridRowEnd = `span ${rowSpan}`;
            };

            const resizeAllGridItems = () => {
                const allItems = grid.querySelectorAll<HTMLElement>('.post-card-link');
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
    }, [posts]);

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', '1');
        params.set('search', searchTerm);
        router.push(`/blog?${params.toString()}`);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`/blog?${params.toString()}`);
    };

    const renderPagination = () => {
        const pages = [];
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        if (currentPage <= 3) endPage = Math.min(5, totalPages);
        if (currentPage > totalPages - 3) startPage = Math.max(1, totalPages - 4);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <li key={i}>
                    <a href="#" onClick={(e) => { e.preventDefault(); handlePageChange(i); }} className={currentPage === i ? 'current-page' : ''}>
                        {i}
                    </a>
                </li>
            );
        }
        return pages;
    };

    return (
        <>
            <div className="blog-v2-container">
                <div className="hero-section">
                    <h1>Bloqdan axtar</h1>
                    <p>Açar sözlər və ya başlıqlar ilə axtarış et</p>
                    <div className="search-form">
                        <div className="search-input-wrapper">
                            <input
                                type="text"
                                placeholder="Məqalə adı və ya açar söz"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <button className="search-button" onClick={handleSearch}>Axtar</button>
                    </div>
                </div>

                <div className="posts-grid" ref={gridRef}>
                    {posts.map(post => (
                        <Link key={post.id} href={`/blog/${post.slug}`} className="post-card-link">
                            <div className="post-card">
                                <img src={`https://busy.az${post.image}`} alt={post.title} className="post-card-image" />
                                <div className="post-card-content">
                                    <h2 className="post-card-title">{post.title}</h2>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="col-md-12">
                        <div className="pagination-container margin-top-60 margin-bottom-60">
                            <nav className="pagination">
                                <ul>
                                    {currentPage > 1 && (
                                        <li className="pagination-arrow">
                                            <a href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }} className="ripple-effect">
                                                <i className="icon-material-outline-keyboard-arrow-left"></i>
                                            </a>
                                        </li>
                                    )}
                                    {renderPagination()}
                                    {currentPage < totalPages && (
                                        <li className="pagination-arrow">
                                            <a href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }} className="ripple-effect">
                                                <i className="icon-material-outline-keyboard-arrow-right"></i>
                                            </a>
                                        </li>
                                    )}
                                </ul>
                            </nav>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}