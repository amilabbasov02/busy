"use client";
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import '../vacancies/page.css';

interface Category {
    id: number;
    title: {
        az: string;
    };
    slug: {
        az: string;
    };
}

const fetchCategories = async (): Promise<Category[]> => {
    const response = await fetch(`/api/bff/api/filter/main-categories`);
    const data = await response.json();
    return data.data;
};

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCategories = async () => {
            setLoading(true);
            try {
                const result = await fetchCategories();
                setCategories(result);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            } finally {
                setLoading(false);
            }
        };
        loadCategories();
    }, []);

    return (
        <>
            <Head>
                <title>Bütün Kateqoriyalar</title>
            </Head>
            <div className="container" style={{ marginTop: '50px', marginBottom: '50px' }}>
                <div className="section-headline centered mb-15">
                    <h2>Bütün Kateqoriyalar</h2>
                </div>
                {loading ? (
                    <p>Yüklənir...</p>
                ) : (
                    <div className="categories-container">
                        {categories.map(category => (
                            <Link href={`/category/${category.slug.az}`} className="category-box" key={category.id}>
                                <div className="category-box-content">
                                    <h3>{category.title.az}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
