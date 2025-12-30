"use client";
import React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
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

async function getProfessionVacancies(slug: string, page: number = 1, perPage: number = 10) {
    const res = await fetch(`/api/bff/api/professions/${slug}/vacancies?page=${page}&perPage=${perPage}`);
    if (!res.ok) {
        throw new Error('Failed to fetch profession vacancies');
    }
    return res.json();
}

import { useSearchParams } from 'next/navigation';

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

const ProfessionPage = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const slug = params.slug as string;
    const page = parseInt(searchParams.get('page') || '1', 10);

    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [professionName, setProfessionName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            setLoading(true);
            getProfessionVacancies(slug, page, 10).then(data => {
                console.log('API response:', data);
                setVacancies(data.vacancies || []);
                setTotalPages(Math.ceil((data.vacancies_count || 0) / 10));
                setProfessionName(slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
                setLoading(false);
            });
        }
    }, [slug, page]);

    if (loading) {
        return <div>Yüklənir...</div>;
    }

    return (
        <>
            <div id="titlebar" className="gradient margin-bottom-45">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 style={{ textAlign: 'center' }}>{professionName} vakansiyası üçün iş elanları</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
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
                                        <Link href={`/vacancy/${vacancy.slug || vacancy.id}`} className="button ripple-effect">Ətraflı</Link>
                                    </div>
                                ))
                            ) : (
                                <p>Hazırda aktiv vakansiya yoxdur.</p>
                            )}

                            {totalPages > 1 && (
                                <div className="pagination-container">
                                    <nav className="pagination">
                                        <ul>
                                            {page > 1 && (
                                                <li className="pagination-arrow">
                                                    <Link href={`/professions/${slug}?page=${page - 1}`}>
                                                        <i className="icon-material-outline-keyboard-arrow-left"></i>
                                                    </Link>
                                                </li>
                                            )}
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                                <li key={p}>
                                                    <Link href={`/professions/${slug}?page=${p}`} className={page === p ? 'current-page' : ''}>
                                                        {p}
                                                    </Link>
                                                </li>
                                            ))}
                                            {page < totalPages && (
                                                <li className="pagination-arrow">
                                                    <Link href={`/professions/${slug}?page=${page + 1}`}>
                                                        <i className="icon-material-outline-keyboard-arrow-right"></i>
                                                    </Link>
                                                </li>
                                            )}
                                        </ul>
                                    </nav>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfessionPage;
