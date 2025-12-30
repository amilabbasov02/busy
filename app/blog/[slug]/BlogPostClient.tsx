"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

// --- Interfaces ---
interface Category { id: number; name: string; }
interface Tag {
    id: number;
    slug: string;
    title: {
        az: string;
    };
}
interface PostData {
    title: string;
    image: string;
    content: string;
    created_at: string;
    slug: string;
    categories: { category: Category }[];
    tags: { tag: Tag }[];
}
interface RelatedPost {
    id: number;
    title: string;
    image: string;
    slug: string;
    categories: { category: Category }[];
}

interface BlogPostClientProps {
    post: PostData | null;
    relatedPosts?: RelatedPost[];
}

// --- Helper Function ---
function calculateReadTime(content: string): number {
    const wordsPerMinute = 200;
    const text = content.replace(/<[^>]*>/g, '');
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}

export default function PostPage({ post: initialPost, relatedPosts: initialRelated = [] }: BlogPostClientProps) {
    const [post, setPost] = useState<PostData | null>(initialPost);
    const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>(initialRelated);
    const [error] = useState<string | null>(null);
    const [fontSize, setFontSize] = useState(1.125); // Initial font size in rem
    const articleRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (articleRef.current) {
            const elements = articleRef.current.querySelectorAll('p, span');
            elements.forEach((el) => {
                (el as HTMLElement).style.fontSize = `${fontSize}rem`;
            });
        }
    }, [fontSize, post]);

    const handleFontSizeChange = (direction: 'increase' | 'decrease') => {
        setFontSize(prevSize => {
            if (direction === 'increase') return Math.min(prevSize + 0.1, 1.5);
            return Math.max(prevSize - 0.1, 0.8);
        });
    };

    const handleFontReset = () => {
        setFontSize(1.125); // Reset to initial value
    };

    if (error) return <div className={styles.container}>{error}</div>;
    if (!post) return <div className={styles.container}>Post tapılmadı.</div>;

    const postDate = new Date(post.created_at).toLocaleDateString('az-AZ', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    const readTime = calculateReadTime(post.content);
    const primaryCategory = post.categories?.[0]?.category;
    const postUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <>
            <div className={styles.container}>
                <main>
                    <header className={styles.titleBlock}>
                        {primaryCategory && <div className={styles.categoryTag}>{primaryCategory.name}</div>}
                        <h1 className={styles.postTitle}>{post.title}</h1>
                        <div className={styles.metaInfo}>
                            <div className={styles.authorInfo}>
                                <img src="/images/company-logo-placeholder.png" alt="Author" className={styles.authorAvatar} />
                                <span>Busy.az</span>
                            </div>
                            <div className={styles.metaItem}>{postDate}</div>
                            <div className={styles.metaItem}>{readTime} dəqiqə oxu</div>
                        </div>
                    </header>

                    <img src={`https://busy.az${post.image}`} alt={post.title} className={styles.heroImage} />

                    <div className={styles.infoBar}>
                        <div className={styles.shareButtons}>
                            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${postUrl}`} target="_blank" rel="noopener noreferrer" className={styles.iconButton} title="LinkedIn'de Paylaş"><i className="icon-brand-linkedin-in"></i></a>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`} target="_blank" rel="noopener noreferrer" className={styles.iconButton} title="Facebook'da Paylaş"><i className="icon-brand-facebook-f"></i></a>
                            <a href={`https://twitter.com/intent/tweet?url=${postUrl}&text=${post.title}`} target="_blank" rel="noopener noreferrer" className={styles.iconButton} title="Twitter'da Paylaş"><i className="icon-brand-twitter"></i></a>
                        </div>
                        <div className={styles.fontControls}>
                            <button onClick={() => handleFontSizeChange('decrease')} className={`${styles.iconButton} ${styles.fontControlButton}`}>-</button>
                            <button onClick={handleFontReset} className={`${styles.iconButton} ${styles.fontControlButton}`} title="Sıfırla"><i className="icon-feather-rotate-cw"></i></button>
                            <button onClick={() => handleFontSizeChange('increase')} className={`${styles.iconButton} ${styles.fontControlButton}`}>+</button>
                        </div>
                    </div>

                    <article ref={articleRef} className={styles.articleContent} dangerouslySetInnerHTML={{ __html: post.content }} />

                    {post.tags && post.tags.length > 0 && (
                        <section className={styles.tagsSection}>
                            {post.tags.map(({ tag }) => (
                                <Link key={tag.id} href={`/blog/tag/${tag.slug}`} className={styles.tagChip}>
                                    {tag.title.az}
                                </Link>
                            ))}
                        </section>
                    )}

                    {relatedPosts && relatedPosts.length > 0 && (
                        <section className={styles.relatedArticles}>
                            <h2 className={styles.relatedTitle}>Oxşar məqalələr</h2>
                            <div className={styles.relatedGrid}>
                                {relatedPosts.slice(0, 3).map(related => (
                                    <Link key={related.id} href={`/blog/post/${related.slug}`} className={styles.relatedCard}>
                                        <div className={styles.relatedImageContainer}>
                                            <img src={`https://busy.az${related.image}`} alt={related.title} className={styles.relatedImage} />
                                        </div>
                                        {related.categories?.[0]?.category && <p className={styles.relatedCardCategory}>{related.categories[0].category.name}</p>}
                                        <h3 className={styles.relatedCardTitle}>{related.title}</h3>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </>
    );
}
