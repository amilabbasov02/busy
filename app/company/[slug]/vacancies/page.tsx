"use client";
import React from 'react';
import Link from 'next/link';
import './page.css';

interface Vacancy {
    id: number;
    job_title: string;
    slug: string | null;
    created_at: string;
    is_premium?: boolean;
    company?: { title: string, logo: string };
    city?: { title: string };
}

interface ApiResponse {
    vacancies: Vacancy[];
    vacancies_count: number;
}

const ITEMS_PER_PAGE = 10;

async function fetchVacancies(slug: string, page: number): Promise<ApiResponse> {
    try {
        const response = await fetch(`/api/bff/api/companies/${slug}/vacancies?page=${page}`, { next: { revalidate: 3600 } });
        if (!response.ok) {
            throw new Error('Failed to fetch vacancies');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching vacancies:', error);
        return { vacancies: [], vacancies_count: 0 };
    }
}

function timeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = seconds / 86400;
    if (interval > 1) return `${Math.floor(interval)} gün əvvəl`;
    interval = seconds / 3600;
    if (interval > 1) return `${Math.floor(interval)} saat əvvəl`;
    interval = seconds / 60;
    if (interval > 1) return `${Math.floor(interval)} dəqiqə əvvəl`;
    return `Bir neçə saniyə əvvəl`;
}

import { useSearchParams, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function VacanciesPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const slug = params.slug as string;
    const page = searchParams.get('page') || '1';
    const currentPage = parseInt(Array.isArray(page) ? page[0] : page, 10);

    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            setLoading(true);
            fetchVacancies(slug, currentPage).then(data => {
                setVacancies(data.vacancies || []);
                setTotalPages(Math.ceil((data.vacancies_count || 0) / ITEMS_PER_PAGE));
                setLoading(false);
            });
        }
    }, [slug, currentPage]);

    if (loading) {
        return <div>Yüklənir...</div>;
    }

    return (
        <div className="job-listings">
            {vacancies.length > 0 ? (
                vacancies.map((vacancy: Vacancy) => (
                    <div key={vacancy.id} className={`job-card ${vacancy.is_premium ? 'premium' : ''}`}>
                        {vacancy.is_premium && <div className="premium-badge">Premium</div>}
                        <div className="job-card-header">
                            <div className="job-card-title">
                                <h3><Link href={`/vacancy/${vacancy.slug || vacancy.id}`}>{vacancy.job_title}</Link></h3>
                            </div>
                        </div>
                        <div className="job-card-details">
                            {vacancy.city?.title && <span><i className="icon-material-outline-location-on"></i> {vacancy.city.title}</span>}
                            <span><i className="icon-material-outline-access-time"></i> {timeAgo(vacancy.created_at)}</span>
                        </div>
                        <Link href={`/vacancy/${vacancy.slug || vacancy.id}`} className="button button-sliding-icon">Ətraflı <i className="icon-material-outline-arrow-right-alt"></i></Link>
                    </div>
                ))
            ) : (
                <p>Hazırda aktiv vakansiya yoxdur.</p>
            )}

            {totalPages > 1 && (
                <div className="pagination-container">
                    <nav className="pagination">
                        <ul>
                            {currentPage > 1 && (
                                <li className="pagination-arrow">
                                    <Link href={`/company/${slug}/vacancies?page=${currentPage - 1}`}>
                                        <i className="icon-material-outline-keyboard-arrow-left"></i>
                                    </Link>
                                </li>
                            )}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                <li key={p}>
                                    <Link href={`/company/${slug}/vacancies?page=${p}`} className={currentPage === p ? 'current-page' : ''}>
                                        {p}
                                    </Link>
                                </li>
                            ))}
                            {currentPage < totalPages && (
                                <li className="pagination-arrow">
                                    <Link href={`/company/${slug}/vacancies?page=${currentPage + 1}`}>
                                        <i className="icon-material-outline-keyboard-arrow-right"></i>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
}
