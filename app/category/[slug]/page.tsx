"use client";
import { useEffect, useState, Suspense } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useSearchParams, useParams } from 'next/navigation';
import NewAdvancedSearchFilters from '../../components/NewAdvancedSearchFilters';
import '../../vacancies/page.css';

interface Vacancy {
    id: number;
    title: string;
    slug: string;
    company: {
        id: number;
        title: string;
        logo: string;
        slug: string;
    };
    location: string;
    time: string;
    logo: string;
    isPremium: boolean;
    employmentType: string;
    category: string;
    salary: number;
    salaryType: 'net' | 'gross';
    jobField: string;
    deadline: string;
    is_prime: number;
}

const timeAgo = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " il əvvəl";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " ay əvvəl";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " gün əvvəl";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " saat əvvəl";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " dəqiqə əvvəl";
    return "bir neçə saniyə əvvəl";
};

const generateSlug = (text: string) => {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

const fetchVacancies = async (page: number, filters: any): Promise<{ vacancies: Vacancy[], total: number }> => {
    let query = `page=${page}&per_page=40`;
    if (filters.categories?.length > 0) {
        query += `&categories[]=${filters.categories[0]}`;
    }
    
    console.log(`FETCHING URL: /api/bff/api/vacancies?${query}`);
    const response = await fetch(`/api/bff/api/vacancies?${query}`);
    const data = await response.json();
    console.log('API RESPONSE:', data);

    if (!data || !Array.isArray(data.vacancies)) {
        return { vacancies: [], total: 0 };
    }

    const vacancies = data.vacancies.map((v: any) => ({
        id: v.id,
        slug: v.slug || generateSlug(v.job_title),
        title: v.job_title,
        logo: (v.company && typeof v.company.logo === 'string') ? (v.company.logo.startsWith('http') ? v.company.logo : `https://busy.az${v.company.logo}`) : '/images/company-logo-placeholder.png',
        company: v.company || { id: v.id, title: 'Şirkət məlumatı yoxdur', logo: '/images/company-logo-placeholder.png', slug: '#' },
        location: v.city_rels?.[0]?.city?.title?.az || 'Məkan qeyd edilməyib',
        time: timeAgo(v.created_at),
        isPremium: v.is_prime === 1,
        deadline: v.published || v.created_at || new Date().toISOString(),
        is_prime: v.is_prime,
    }));
    
    vacancies.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return { vacancies, total: data.count || 0 };
};

function CategoryVacanciesContent() {
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(true);
    const [appliedFilters, setAppliedFilters] = useState<any>(null);
    const [totalPages, setTotalPages] = useState(0);
    const [categoryName, setCategoryName] = useState('');
    const [initialCategoryFilter, setInitialCategoryFilter] = useState<any>(null);
    const searchParams = useSearchParams();
    const params = useParams();
    const page = searchParams.get('page') || '1';
    const currentPage = parseInt(page, 10);
    const slug = params.slug as string;
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        const initializeCategoryAndFetch = async () => {
            if (!slug) return;
            setLoading(true);

            try {
                console.log(`Fetching categories for slug: ${slug}`);
                const catResponse = await fetch(`/api/bff/api/filter/main-categories`);
                const catData = await catResponse.json();
                console.log("Categories API response:", catData);

                let currentCategory = null;
                if (catData && Array.isArray(catData.data)) {
                    currentCategory = catData.data.find((cat: any) => cat.slug.az === slug);
                    console.log("Found category:", currentCategory);
                }

                if (currentCategory) {
                    setCategoryName(`${currentCategory.title.az} sahəsinə aid iş elanları`);
                    const initialFilter = { categories: [currentCategory.id] };
                    setInitialCategoryFilter(initialFilter);
                    
                    const result = await fetchVacancies(currentPage, initialFilter);
                    setVacancies(result.vacancies);
                    setTotalPages(Math.ceil(result.total / 40));
                } else {
                    setCategoryName("Kateqoriya tapılmadı");
                }
            } catch (error) {
                console.error("Error during initialization or fetch:", error);
            } finally {
                setLoading(false);
            }
        };

        initializeCategoryAndFetch();
    }, [slug, currentPage]);

    const handleSearch = (filters: any) => {
        setAppliedFilters(filters);
    };

    return (
        <>
           <Head>
                <title>{categoryName ? categoryName : 'Vakansiyalar'}</title>
            </Head>
            <div id="titlebar" className="gradient">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>{categoryName}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container page-content">
                <div className={`main-layout ${!isFilterOpen ? 'sidebar-closed' : ''}`}>
                    <div className="filter-sidebar">
                        <button className="filter-toggle-button" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                            {isFilterOpen ? <i className="icon-feather-x"></i> : <i className="icon-feather-filter"></i>}
                        </button>
                        <NewAdvancedSearchFilters onSearch={handleSearch} layout="vertical" initialFilters={initialCategoryFilter} />
                    </div>
                    <div className="job-listings">
                        {loading ? <p>Yüklənir...</p> : vacancies.map(vacancy => {
                            let isExpired = false;
                            if (isClient) {
                                const deadlineDate = new Date(vacancy.deadline);
                                const now = new Date();
                                const daysDifference = (now.getTime() - deadlineDate.getTime()) / (1000 * 3600 * 24);
                                isExpired = daysDifference > 30;
                            }

                            return (
                                <div key={vacancy.id} className={`job-card ${vacancy.isPremium ? 'premium' : ''} ${isExpired ? 'expired-vacancy' : ''}`}>
                                    {vacancy.isPremium && <div className="premium-badge">Premium</div>}
                                    <div className="job-card-content">
                                        <div className="job-card-header">
                                            <img src={vacancy.logo} alt={`${vacancy.company.title} logo`} />
                                            <div className="job-card-title">
                                                <h3><Link href={vacancy.slug ? `/vacancies/${vacancy.id}/${vacancy.slug}` : '#'}>{vacancy.title}</Link></h3>
                                                <div className="job-card-meta">
                                                    <p>{vacancy.company.title}</p>
                                                    <span><i className="icon-material-outline-location-on"></i> {vacancy.location}</span>
                                                    <span><i className="icon-material-outline-access-time"></i> {vacancy.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="job-card-buttons">
                                        <Link href={vacancy.slug ? `/vacancies/${vacancy.id}/${vacancy.slug}` : '#'} className="button button-sliding-icon">
                                            {isExpired ? 'Daxil ol' : 'Müraciət et'} <i className="icon-material-outline-arrow-right-alt"></i>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                        <div className="pagination-container">
                            <nav className="pagination">
                                <ul>
                                    {currentPage > 1 && (
                                        <li className="pagination-arrow">
                                            <Link href={`/category/${slug}?page=${currentPage - 1}`}>
                                                <i className="icon-material-outline-keyboard-arrow-left"></i>
                                            </Link>
                                        </li>
                                    )}
                                    {getPaginationItems(currentPage, totalPages).map((item, index) => {
                                        if (typeof item === 'number') {
                                            return (
                                                <li key={item}>
                                                    <Link href={`/category/${slug}?page=${item}`} className={currentPage === item ? 'current-page' : ''}>
                                                        {item}
                                                    </Link>
                                                </li>
                                            );
                                        }
                                        return <li key={`dots-${index}`} className="pagination-dots"><span>...</span></li>;
                                    })}
                                    {currentPage < totalPages && (
                                        <li className="pagination-arrow">
                                            <Link href={`/category/${slug}?page=${currentPage + 1}`}>
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

const getPaginationItems = (currentPage: number, totalPages: number) => {
    const pageNeighbours = 2;
    const totalNumbers = (pageNeighbours * 2) + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
        const startPage = Math.max(2, currentPage - pageNeighbours);
        const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
        let pages: (number | string)[] = range(startPage, endPage);

        const hasLeftSpill = startPage > 2;
        const hasRightSpill = (totalPages - endPage) > 1;
        const spillOffset = totalNumbers - (pages.length + 1);

        switch (true) {
            case (hasLeftSpill && !hasRightSpill): {
                const extraPages = range(startPage - spillOffset, startPage - 1);
                pages = ["...", ...extraPages, ...pages];
                break;
            }
            case (!hasLeftSpill && hasRightSpill): {
                const extraPages = range(endPage + 1, endPage + spillOffset);
                pages = [...pages, ...extraPages, "..."];
                break;
            }
            case (hasLeftSpill && hasRightSpill):
            default: {
                pages = ["...", ...pages, "..."];
                break;
            }
        }
        return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
};

const range = (from: number, to: number, step = 1) => {
    let i = from;
    const range = [];
    while (i <= to) {
        range.push(i);
        i += step;
    }
    return range;
};

export default function CategoryPage() {
  return (
      <div className="job-search-portal">
        <Suspense fallback={<div className="container"><p>Yüklənir...</p></div>}>
            <CategoryVacanciesContent />
        </Suspense>
      </div>
  );
}
