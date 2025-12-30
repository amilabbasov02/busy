"use client";
import { useEffect, useState, Suspense } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import NewAdvancedSearchFilters from '../components/NewAdvancedSearchFilters';
import './page.css';

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
    salary_from?: number;
    salary_to?: number;
    currency?: {
        code: string;
    };
    jobField: string;
    deadline: string;
    is_prime: number;
}

interface Profession {
    id: number;
    title: string;
}

interface City {
    id: number;
    title: {
        az: string;
    };
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
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
};

const fetchVacancies = async (page: number, filters: any): Promise<{ vacancies: Vacancy[], total: number }> => {
    let query = `page=${page}&per_page=40`;

    if (filters.employmentType?.length > 0) {
        filters.employmentType.forEach((id: number) => query += `&employment_type[]=${id}`);
    }
    if (filters.categories?.length > 0) {
        filters.categories.forEach((id: number) => query += `&categories[]=${id}`);
    }
    if (filters.professions?.length > 0) {
        filters.professions.forEach((id: number) => query += `&professions[]=${id}`);
    }
    if (filters.cities?.length > 0) {
        filters.cities.forEach((id: number) => query += `&cities[]=${id}`);
    }
    if (filters.experience?.length > 0) {
        filters.experience.forEach((id: number) => query += `&experiences[]=${id}`);
    }
    if (filters.minSalary) query += `&minimum_salary=${filters.minSalary}`;
    if (filters.maxSalary) query += `&maximum_salary=${filters.maxSalary}`;
    if (filters.keyword) query += `&keyword=${encodeURIComponent(filters.keyword)}`;
    if (filters.location) query += `&location=${encodeURIComponent(filters.location)}`;
    
    console.log(`FETCHING URL: /api/bff/api/vacancies?${query}`);
    const response = await fetch(`/api/bff/api/vacancies?${query}`);
    const data = await response.json();
    console.log('Vacancies API Response:', data);

    if (!data || !Array.isArray(data.vacancies)) {
        return { vacancies: [], total: 0 };
    }

    const vacancies = data.vacancies.map((v: any) => {
        const companyLogo = (v.company && typeof v.company.logo === 'string')
            ? (v.company.logo.startsWith('http') ? v.company.logo : `https://busy.az${v.company.logo}`)
            : '/images/company-logo-placeholder.png';

        const company = v.company || {
            id: v.id,
            title: 'Şirkət məlumatı yoxdur',
            logo: companyLogo,
            slug: '#'
        };
        company.logo = companyLogo;

        return {
            id: v.id,
            slug: v.slug || generateSlug(v.job_title),
            title: v.job_title,
            logo: companyLogo,
            company: company,
            location: v.city_rels?.[0]?.city?.title?.az || 'Məkan qeyd edilməyib',
            time: timeAgo(v.created_at),
            isPremium: v.is_prime === 1,
            deadline: v.published || v.created_at || new Date().toISOString(),
            is_prime: v.is_prime,
            salary_from: v.salary_from,
            salary_to: v.salary_to,
            currency: v.currency,
        };
    });
    
    vacancies.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    
    return { vacancies, total: data.count || 0 };
};

function VacanciesV2Content() {
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(true);
    const [appliedFilters, setAppliedFilters] = useState<any>({ employmentType: [], categories: [], professions: [], cities: [], minSalary: '', maxSalary: '', salaryType: '', experience: [], keyword: '', location: '' });
    const [totalPages, setTotalPages] = useState(0);
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const page = searchParams.get('page') || '1';
    const currentPage = parseInt(page, 10);
    const [isClient, setIsClient] = useState(false);
    const [viewMode, setViewMode] = useState('list');

    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');

    const [professions, setProfessions] = useState<Profession[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [isKeywordDropdownOpen, setIsKeywordDropdownOpen] = useState(false);
    const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

    const [professionsPage, setProfessionsPage] = useState(1);
    const [hasMoreProfessions, setHasMoreProfessions] = useState(true);
    const [debouncedProfessionSearch, setDebouncedProfessionSearch] = useState('');
    const [professionsLoading, setProfessionsLoading] = useState(false);

    const [citiesPage, setCitiesPage] = useState(1);
    const [hasMoreCities, setHasMoreCities] = useState(true);
    const [debouncedCitySearch, setDebouncedCitySearch] = useState('');
    const [citiesLoading, setCitiesLoading] = useState(false);

    const [selectedProfession, setSelectedProfession] = useState<Profession | null>(null);
    const [selectedCity, setSelectedCity] = useState<City | null>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        const fetchProfessions = async () => {
            if (!hasMoreProfessions) return;
            if (debouncedProfessionSearch.length < 3) {
                setProfessions([]);
                return;
            }
            setProfessionsLoading(true);
            try {
                const response = await fetch(`/api/bff/api/filter/professions?page=${professionsPage}&search=${debouncedProfessionSearch}&per_page=25`);
                const data = await response.json();
                
                if (data && Array.isArray(data.data)) {
                    setProfessions(prev => professionsPage === 1 ? data.data : [...prev, ...data.data]);
                    setHasMoreProfessions(data.next_page_url !== null);
                } else {
                    setHasMoreProfessions(false);
                }
            } catch (error) {
                console.error("Failed to fetch professions:", error);
                setHasMoreProfessions(false);
            } finally {
                setProfessionsLoading(false);
            }
        };
        if (debouncedProfessionSearch.length >= 3) {
            fetchProfessions();
        }
    }, [professionsPage, debouncedProfessionSearch, hasMoreProfessions]);

    useEffect(() => {
        const fetchCities = async () => {
            if (!hasMoreCities) return;
            if (debouncedCitySearch.length < 3) {
                setCities([]);
                return;
            }
            setCitiesLoading(true);
            try {
                const response = await fetch(`/api/bff/api/filter/cities?page=${citiesPage}&search=${debouncedCitySearch}&per_page=25`);
                const data = await response.json();

                if (data && Array.isArray(data.data)) {
                    setCities(prev => citiesPage === 1 ? data.data : [...prev, ...data.data]);
                    setHasMoreCities(data.next_page_url !== null);
                } else {
                    setHasMoreCities(false);
                }
            } catch (error) {
                console.error("Failed to fetch cities:", error);
                setHasMoreCities(false);
            } finally {
                setCitiesLoading(false);
            }
        };
        if (debouncedCitySearch.length >= 3) {
            fetchCities();
        }
    }, [citiesPage, debouncedCitySearch, hasMoreCities]);


    useEffect(() => {
        const fetchAndSetVacancies = async () => {
            setLoading(true);
            
            const filtersToApply: any = {
                employmentType: searchParams.getAll('employment_type[]').map(id => parseInt(id, 10)),
                categories: searchParams.getAll('categories[]').map(id => parseInt(id, 10)),
                professions: searchParams.getAll('professions[]').map(id => parseInt(id, 10)),
                cities: searchParams.getAll('cities[]').map(id => parseInt(id, 10)),
                experience: searchParams.getAll('experiences[]').map(id => parseInt(id, 10)),
                minSalary: searchParams.get('minimum_salary') || '',
                maxSalary: searchParams.get('maximum_salary') || '',
                keyword: searchParams.get('keyword') || '',
                location: searchParams.get('location') || ''
            };

            try {
                const result = await fetchVacancies(currentPage, filtersToApply);
                setVacancies(result.vacancies);
                setTotalPages(Math.ceil(result.total / 40));

                const emptyFilters = { employmentType: [], categories: [], professions: [], cities: [], minSalary: '', maxSalary: '', salaryType: '', experience: [], keyword: '', location: '' };
                setAppliedFilters({ ...emptyFilters, ...filtersToApply });

            } catch (error) {
                console.error("Failed to fetch vacancies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAndSetVacancies();
    }, [searchParams, currentPage]);

    const handleSearch = (filters: any) => {
        const newQuery = new URLSearchParams();

        if (filters.employmentType?.length > 0) {
            filters.employmentType.forEach((id: number) => newQuery.append('employment_type[]', id.toString()));
        }
        if (filters.categories?.length > 0) {
            filters.categories.forEach((id: number) => newQuery.append('categories[]', id.toString()));
        }
        if (filters.professions?.length > 0) {
            filters.professions.forEach((id: number) => newQuery.append('professions[]', id.toString()));
        }
        if (filters.cities?.length > 0) {
            filters.cities.forEach((id: number) => newQuery.append('cities[]', id.toString()));
        }
        if (filters.experience?.length > 0) {
            filters.experience.forEach((id: number) => newQuery.append('experiences[]', id.toString()));
        }
        if (filters.minSalary) newQuery.append('minimum_salary', filters.minSalary);
        if (filters.maxSalary) newQuery.append('maximum_salary', filters.maxSalary);
        if (filters.keyword) newQuery.append('keyword', filters.keyword);
        if (filters.location) newQuery.append('location', filters.location);
        
        router.push(`${pathname}?${newQuery.toString()}`);
    };

    const handleSimpleSearch = () => {
        const newFilters = {
            ...appliedFilters,
            professions: selectedProfession ? [selectedProfession.id] : [],
            keyword: selectedProfession ? '' : keyword,
            cities: selectedCity ? [selectedCity.id] : [],
            location: selectedCity ? '' : location,
        };
        handleSearch(newFilters);
    };

    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setKeyword(value);
        if (selectedProfession && selectedProfession.title !== value) {
            setSelectedProfession(null);
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedProfessionSearch(keyword);
            setProfessions([]);
            setProfessionsPage(1);
            setHasMoreProfessions(true);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [keyword]);

    const handleProfessionSelect = (profession: Profession) => {
        setKeyword(profession.title);
        setSelectedProfession(profession);
        setIsKeywordDropdownOpen(false);
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocation(value);
        if (selectedCity && selectedCity.title.az !== value) {
            setSelectedCity(null);
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedCitySearch(location);
            setCities([]);
            setCitiesPage(1);
            setHasMoreCities(true);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [location]);

    const handleCitySelect = (city: City) => {
        setLocation(city.title.az);
        setSelectedCity(city);
        setIsLocationDropdownOpen(false);
    };

    return (
        <>
            <div style={{ padding: '120px 0', backgroundColor: '#f8f8f8' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="banner-headline" style={{ textAlign: 'left' }}>
                                <h1 style={{textAlign: 'left', fontSize: '36px', fontWeight: '700', marginBottom: '15px', color: '#000' }}>Sənin üçün ən yaxşı işi tap</h1>
                                <p style={{ fontSize: '16px', color: '#777' }}>Azərbaycanda minlərlə iş elanı arasında axtarış et</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="intro-banner-search-form" style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
                                <div className="intro-search-field" style={{flex: '1', position: 'relative'}}>
                                    <input
                                        type="text"
                                        className="intro-field"
                                        placeholder="Vəzifə adı və ya açar söz"
                                        value={keyword}
                                        onChange={handleKeywordChange}
                                        onFocus={() => {
                                            setIsKeywordDropdownOpen(true);
                                        }}
                                        onBlur={() => setTimeout(() => setIsKeywordDropdownOpen(false), 200)}
                                        style={{width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '3px'}}
                                    />
                                    {isKeywordDropdownOpen && keyword.length >= 3 && (
                                        <div className="search-dropdown" onScroll={(e: React.UIEvent<HTMLDivElement>) => {
                                            const target = e.currentTarget;
                                            if (target.scrollHeight - target.scrollTop <= target.clientHeight + 50) {
                                                if(hasMoreProfessions && !professionsLoading) {
                                                    setProfessionsPage(prevPage => prevPage + 1);
                                                }
                                            }
                                        }}>
                                            <ul>
                                                {professionsLoading && professions.length === 0 ? (
                                                    <li>Yüklənir...</li>
                                                ) : professions.length > 0 ? (
                                                    professions.map(p => (
                                                        <li key={p.id} onClick={() => handleProfessionSelect(p)}>
                                                            {p.title}
                                                        </li>
                                                    ))
                                                ) : (
                                                    null
                                                )}
                                                {professionsLoading && professions.length > 0 && <li>Yüklənir...</li>}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="intro-search-field" style={{flex: '1', position: 'relative'}}>
                                    <input
                                        type="text"
                                        className="intro-field"
                                        placeholder="Şəhər və ya rayon"
                                        value={location}
                                        onChange={handleLocationChange}
                                        onFocus={() => {
                                            setIsLocationDropdownOpen(true);
                                        }}
                                        onBlur={() => setTimeout(() => setIsLocationDropdownOpen(false), 200)}
                                        style={{width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '3px'}}
                                    />
                                     {isLocationDropdownOpen && location.length >= 3 && (
                                        <div className="search-dropdown" onScroll={(e: React.UIEvent<HTMLDivElement>) => {
                                            const target = e.currentTarget;
                                            if (target.scrollHeight - target.scrollTop <= target.clientHeight + 50) {
                                                if(hasMoreCities && !citiesLoading) {
                                                    setCitiesPage(prevPage => prevPage + 1);
                                                }
                                            }
                                        }}>
                                            <ul>
                                                {citiesLoading && cities.length === 0 ? (
                                                    <li>Yüklənir...</li>
                                                ) : cities.length > 0 ? (
                                                    cities.map(c => (
                                                        <li key={c.id} onClick={() => handleCitySelect(c)}>
                                                            {c.title.az}
                                                        </li>
                                                    ))
                                                ) : (
                                                    null
                                                )}
                                                {citiesLoading && cities.length > 0 && <li>Yüklənir...</li>}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="intro-search-button">
                                    <button className="button ripple-effect" onClick={handleSimpleSearch}>Axtar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container page-content" style={{ marginTop: '50px' }}>
                <div className={`main-layout ${viewMode === 'card' ? 'card-view-active' : ''} ${!isFilterOpen || viewMode === 'card' ? 'sidebar-closed' : ''}`}>
                    {viewMode === 'list' && (
                        <div className="filter-sidebar">
                            <button className="filter-toggle-button" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                                {isFilterOpen ? <i className="icon-feather-x"></i> : <i className="icon-feather-filter"></i>}
                            </button>
                            <NewAdvancedSearchFilters onSearch={handleSearch} layout="vertical" initialFilters={appliedFilters} />
                        </div>
                    )}
                    <div className="job-listings">
                        <div className="view-mode-toggle">
                            <button onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'active' : ''}>
                                <i className="icon-feather-list"></i>
                            </button>
                            <button onClick={() => setViewMode('card')} className={viewMode === 'card' ? 'active' : ''}>
                                <i className="icon-feather-grid"></i>
                            </button>
                        </div>

                        {loading ? <p>Yüklənir...</p> : vacancies.length > 0 ? (
                            <div className={`listings-container view-mode-${viewMode}`}>
                                {vacancies.map(vacancy => {
                                    let isExpired = false;
                                    if (isClient) {
                                        const deadlineDate = new Date(vacancy.deadline);
                                        const now = new Date();
                                        const daysDifference = (now.getTime() - deadlineDate.getTime()) / (1000 * 3600 * 24);
                                        isExpired = daysDifference > 30;
                                    }

                                    if (viewMode === 'list') {
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
                                                                {(vacancy.salary_from || vacancy.salary_to) && (
                                                                    <span>
                                                                        <i className="icon-material-outline-attach-money"></i>
                                                                        {vacancy.salary_from && vacancy.salary_to ? `${vacancy.salary_from} - ${vacancy.salary_to}` : vacancy.salary_from || vacancy.salary_to} {vacancy.currency?.code}
                                                                    </span>
                                                                )}
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
                                    } else {
                                        return (
                                            <Link key={vacancy.id} href={vacancy.slug ? `/vacancies/${vacancy.id}/${vacancy.slug}` : '#'} className="vacancy-card-link">
                                                <div className="vacancy-grid-card">
                                                    <div className="vacancy-card-top">
                                                        <span>{vacancy.time}</span>
                                                        <button className="bookmark-button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); /* Add bookmark logic here */ }}>
                                                            <i className="icon-feather-heart"></i>
                                                        </button>
                                                    </div>
                                                    <div className="vacancy-card-body">
                                                        <div className="vacancy-card-company">{vacancy.company.title}</div>
                                                        <h3 className="vacancy-card-title">{vacancy.title}</h3>
                                                    </div>
                                                    <div className="vacancy-card-tags">
                                                        <span>{vacancy.location}</span>
                                                        {/* Additional tags like experience can be added here if available */}
                                                    </div>
                                                    <div className="vacancy-card-footer">
                                                        <div className="vacancy-card-salary">
                                                            {(vacancy.salary_from || vacancy.salary_to) ?
                                                                `${vacancy.salary_from || ''} - ${vacancy.salary_to || ''} ${vacancy.currency?.code || ''}`.replace(' -  ', '') : 'Maaş qeyd edilməyib'}
                                                        </div>
                                                        <div className="vacancy-card-actions">
                                                            {vacancy.isPremium && <span className="premium-icon">👑</span>}
                                                            <div className="details-button">
                                                                <i className="icon-feather-arrow-up-right"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    }
                                })}
                            </div>
                        ) : <p>Uyğun vakansiya yoxdur</p>}
                        {vacancies.length > 0 && (
                            <div className="pagination-container">
                                <nav className="pagination">
                                    <ul>
                                        {currentPage > 1 && (
                                            <li className="pagination-arrow">
                                                <Link href={`/vacancies?page=${currentPage - 1}`}>
                                                    <i className="icon-material-outline-keyboard-arrow-left"></i>
                                                </Link>
                                            </li>
                                        )}
                                        {getPaginationItems(currentPage, totalPages).map((item, index) => {
                                            if (typeof item === 'number') {
                                                return (
                                                    <li key={item}>
                                                        <Link href={`/vacancies?page=${item}`} className={currentPage === item ? 'current-page' : ''}>
                                                            {item}
                                                        </Link>
                                                    </li>
                                                );
                                            }
                                            return <li key={`dots-${index}`} className="pagination-dots"><span>...</span></li>;
                                        })}
                                        {currentPage < totalPages && (
                                            <li className="pagination-arrow">
                                                <Link href={`/vacancies?page=${currentPage + 1}`}>
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

export default function VacanciesV2() {
  return (
    <>
      <Head>
        <title>Vakansiyalar | İş elanları</title>
        <link rel="stylesheet" href="https://unpkg.com/inter-ui/inter.css" />
      </Head>

      <div className="job-search-portal">
        <Suspense fallback={<div className="container"><p>Yüklənir...</p></div>}>
            <VacanciesV2Content />
        </Suspense>
      </div>
    </>
  );
}
