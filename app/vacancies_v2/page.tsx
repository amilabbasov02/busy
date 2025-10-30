"use client";
import { useEffect, useState, Suspense } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Vacancy {
    id: number;
    title: string;
    company: string;
    location: string;
    time: string;
    logo: string;
    isPremium: boolean;
    href: string;
    employmentType: string;
    category: string;
}

const allVacancies: Vacancy[] = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: `Vakansiya Başlığı ${i + 1}`,
    company: `Şirkət ${i + 1}`,
    location: 'Bakı',
    time: `${(i % 5) + 1} gün əvvəl`,
    logo: '/images/company-logo-placeholder.png',
    isPremium: i % 4 === 0,
    href: '#',
    employmentType: ['Tam iş günü', 'Yarım iş günü', 'Distant', 'Sərbəst', 'Təcrübə', 'Müvəqqəti', 'Könüllü', 'Hibrid', 'Növbəli'][i % 9],
    category: ['İnzibati', 'Maliyyə', 'IT', 'Tibb və Əczaçılıq', 'Sənaye və istehsalat', 'Turizm və restoran', 'Hüquq', 'Marketinq', 'Satış'][i % 9],
}));

const fetchVacancies = (page: number, filters: any, itemsPerPage: number = 10): Promise<{ vacancies: Vacancy[], total: number }> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const filtered = allVacancies.filter(v => {
                if (filters.employmentType?.length > 0 && !filters.employmentType.includes(v.employmentType)) return false;
                if (filters.category?.length > 0 && !filters.category.includes(v.category)) return false;
                const positionMatch = filters.position ? v.title.toLowerCase().includes(filters.position.toLowerCase()) || v.company.toLowerCase().includes(filters.position.toLowerCase()) : true;
                const locationMatch = filters.location ? v.location.toLowerCase().includes(filters.location.toLowerCase()) : true;
                if (!positionMatch || !locationMatch) return false;
                return true;
            });
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            resolve({ vacancies: filtered.slice(start, end), total: filtered.length });
        }, 300);
    });
};

function VacanciesV2Content() {
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isPositionDropdownOpen, setIsPositionDropdownOpen] = useState(false);
    const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
    const [positionValue, setPositionValue] = useState('');
    const [locationValue, setLocationValue] = useState('');
    const [filters, setFilters] = useState<any>({ employmentType: [], category: [], position: '', location: '' });
    const [totalPages, setTotalPages] = useState(0);
    const searchParams = useSearchParams();
    const page = searchParams.get('page') || '1';
    const currentPage = parseInt(page, 10);

    const positions = ['Frontend Developer', 'Backend Developer', 'Project Manager', 'UI/UX Designer'];
    const locations = ['Bakı', 'Sumqayıt', 'Gəncə', 'Mingəçevir'];

    const handleFilterChange = (category: string, value: string) => {
        setFilters((prevFilters: any) => {
            const currentCategoryFilters = prevFilters[category] || [];
            const newCategoryFilters = currentCategoryFilters.includes(value)
                ? currentCategoryFilters.filter((item: string) => item !== value)
                : [...currentCategoryFilters, value];
            return { ...prevFilters, [category]: newCategoryFilters };
        });
    };

    const handleSearch = () => {
        setFilters((prevFilters: any) => ({
            ...prevFilters,
            position: positionValue,
            location: locationValue,
        }));
    };

    useEffect(() => {
        setLoading(true);
        fetchVacancies(currentPage, filters).then(result => {
            setVacancies(result.vacancies);
            setTotalPages(Math.ceil(result.total / 10));
            setLoading(false);
        });
    }, [currentPage, filters]);

    return (
        <div className="container page-content">
            <button className="filter-toggle-button" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                <i className="icon-feather-filter"></i> Filterlər
            </button>
            <div className="main-layout">
                <div className={`filter-sidebar ${isFilterOpen ? 'open' : ''}`}>
                    {/* ... filter content ... */}
                </div>
                <div className="job-listings">
                    {loading ? <p>Yüklənir...</p> : vacancies.map(vacancy => (
                        <div key={vacancy.id} className={`job-card ${vacancy.isPremium ? 'premium' : ''}`}>
                            {/* ... vacancy card content ... */}
                        </div>
                    ))}
                    <div className="pagination-container">
                        {/* ... pagination content ... */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function VacanciesV2() {
  return (
    <>
      <Head>
        <title>Vakansiyalar | İş elanları</title>
        <link rel="stylesheet" href="https://unpkg.com/inter-ui/inter.css" />
      </Head>

      <div className="job-search-portal">
        <div className="hero-section">
          <div className="container">
            <h1>Sənin üçün ən yaxşı işi tap</h1>
            <p>Azərbaycanda minlərlə iş elanı arasında axtarış et</p>
            {/* Search form can be a separate component if it doesn't use searchParams */}
            <div className="search-form">
                {/* ... search form content ... */}
            </div>
          </div>
        </div>
        <Suspense fallback={<div className="container"><p>Yüklənir...</p></div>}>
            <VacanciesV2Content />
        </Suspense>
      </div>
    </>
  );
}