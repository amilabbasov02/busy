"use client";
import ReactSlider from 'react-slider';
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
    salary: number;
    salaryType: 'net' | 'gross';
    jobField: string;
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
        salary: 1000 + i * 100,
        salaryType: i % 2 === 0 ? 'net' : 'gross',
        jobField: ['Texnologiya', 'Marketinq', 'Satış', 'Dizayn', 'Maliyyə'][i % 5],
    }));
    
    const fetchVacancies = (page: number, filters: any, itemsPerPage: number = 10): Promise<{ vacancies: Vacancy[], total: number }> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const filtered = allVacancies.filter(v => {
                    if (filters.employmentType?.length > 0 && !filters.employmentType.includes(v.employmentType)) return false;
                    if (filters.category?.length > 0 && !filters.category.includes(v.category)) return false;
                    if (filters.jobField?.length > 0 && !filters.jobField.includes(v.jobField)) return false;
                    if (filters.company?.length > 0 && !filters.company.includes(v.company)) return false;
                    if (filters.minSalary && v.salary < filters.minSalary) return false;
                    if (filters.maxSalary && v.salary > filters.maxSalary) return false;
                    if (filters.salaryType && v.salaryType !== filters.salaryType) return false;
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
    const [filters, setFilters] = useState<any>({ employmentType: [], category: [], minSalary: '', maxSalary: '', salaryType: '', jobField: [], company: [] });
    const [totalPages, setTotalPages] = useState(0);
    const searchParams = useSearchParams();
    const page = searchParams.get('page') || '1';
    const currentPage = parseInt(page, 10);

    const [availableEmploymentTypes, setAvailableEmploymentTypes] = useState<string[]>([]);
    const [availableCategories, setAvailableCategories] = useState<string[]>([]);
    const [availableJobFields, setAvailableJobFields] = useState<string[]>([]);
    const [availableCompanies, setAvailableCompanies] = useState<string[]>([]);

    const handleFilterChange = (category: string, value: string) => {
        setFilters((prevFilters: any) => {
            if (['minSalary', 'maxSalary', 'salaryType'].includes(category)) {
                return { ...prevFilters, [category]: value };
            }
            const currentCategoryFilters = prevFilters[category] || [];
            const newCategoryFilters = currentCategoryFilters.includes(value)
                ? currentCategoryFilters.filter((item: string) => item !== value)
                : [...currentCategoryFilters, value];
            return { ...prevFilters, [category]: newCategoryFilters };
        });
    };

    useEffect(() => {
        const getUniqueValues = (key: keyof Vacancy) => [...new Set(allVacancies.map(v => v[key]))] as string[];
        setAvailableEmploymentTypes(getUniqueValues('employmentType'));
        setAvailableCategories(getUniqueValues('category'));
        setAvailableJobFields(getUniqueValues('jobField'));
        setAvailableCompanies(getUniqueValues('company'));
    }, []);

    useEffect(() => {
        const updateAvailableFilters = () => {
            const activeFilters = Object.keys(filters).filter(key => {
                const value = filters[key];
                return (Array.isArray(value) && value.length > 0) || (typeof value === 'string' && value && !['minSalary', 'maxSalary', 'salaryType'].includes(key));
            });
    
            const getFilteredVacancies = (excludeKey: string) => {
                let tempVacancies = [...allVacancies];
                activeFilters.forEach(key => {
                    if (key !== excludeKey) {
                        const filterValue = filters[key];
                        if (Array.isArray(filterValue) && filterValue.length > 0) {
                            tempVacancies = tempVacancies.filter(v => filterValue.includes(v[key as keyof Vacancy]));
                        }
                    }
                });
                return tempVacancies;
            };
    
            const getUniqueValues = (vacancies: Vacancy[], key: keyof Vacancy) => [...new Set(vacancies.map(v => v[key]))] as string[];
    
            setAvailableEmploymentTypes(getUniqueValues(getFilteredVacancies('employmentType'), 'employmentType'));
            setAvailableCategories(getUniqueValues(getFilteredVacancies('category'), 'category'));
            setAvailableJobFields(getUniqueValues(getFilteredVacancies('jobField'), 'jobField'));
            setAvailableCompanies(getUniqueValues(getFilteredVacancies('company'), 'company'));
        };
    
        updateAvailableFilters();
    
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
                    <div className="filter-sidebar-inner">
                        <button className="filter-close-button" onClick={() => setIsFilterOpen(false)}>&times;</button>
                        <h3>Filterlər</h3>
                        <div className="filter-widget">
                            <details open>
                                <summary>Məşğulluq növü</summary>
                                <div className="checkbox-list-wrapper">
                                    <ul className="filter-list checkbox-list">
                                        {availableEmploymentTypes.map((type, index) => (
                                            <li key={type}>
                                                <input type="checkbox" id={`type${index}`} onChange={() => handleFilterChange('employmentType', type)} checked={filters.employmentType.includes(type)} />
                                                <label htmlFor={`type${index}`}>{type}</label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </details>
                        </div>
                        <div className="filter-widget">
                            <details open>
                                <summary>İş kateqoriyaları</summary>
                                <input type="text" placeholder="İş kateqoriyasını axtar" className="filter-search-input" />
                                <div className="checkbox-list-wrapper">
                                    <ul className="filter-list checkbox-list">
                                        {availableCategories.map((cat, index) => (
                                            <li key={cat}>
                                                <input type="checkbox" id={`cat${index}`} onChange={() => handleFilterChange('category', cat)} checked={filters.category.includes(cat)} />
                                                <label htmlFor={`cat${index}`}>{cat}</label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </details>
                            </div>
                            <div className="filter-widget">
                                <details open>
                                    <summary>Maaş</summary>
                                    <div className="salary-filter">
                                        <div className="salary-slider">
                                            <ReactSlider
                                                className="horizontal-slider"
                                                thumbClassName="slider-thumb"
                                                trackClassName="slider-track"
                                                defaultValue={[filters.minSalary || 0, filters.maxSalary || 5000]}
                                                ariaLabel={['Lower thumb', 'Upper thumb']}
                                                ariaValuetext={state => `Thumb value ${state.valueNow}`}
                                                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                                                pearling
                                                minDistance={100}
                                                onChange={(value) => {
                                                    handleFilterChange('minSalary', value[0]);
                                                    handleFilterChange('maxSalary', value[1]);
                                                }}
                                                min={0}
                                                max={5000}
                                            />
                                        </div>
                                        <div className="salary-type">
                                            <input type="radio" id="net" name="salaryType" value="net" onChange={(e) => handleFilterChange('salaryType', e.target.value)} />
                                            <label htmlFor="net">Net</label>
                                            <input type="radio" id="gross" name="salaryType" value="gross" onChange={(e) => handleFilterChange('salaryType', e.target.value)} />
                                            <label htmlFor="gross">Brüt</label>
                                        </div>
                                    </div>
                                </details>
                            </div>
                            <div className="filter-widget">
                                <details open>
                                    <summary>İş Sahələri</summary>
                                    <div className="checkbox-list-wrapper">
                                        <ul className="filter-list checkbox-list">
                                            {availableJobFields.map((field, index) => (
                                                <li key={field}>
                                                    <input type="checkbox" id={`field${index}`} onChange={() => handleFilterChange('jobField', field)} checked={filters.jobField.includes(field)} />
                                                    <label htmlFor={`field${index}`}>{field}</label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </details>
                            </div>
                            <div className="filter-widget">
                                <details open>
                                    <summary>Şirkətlər</summary>
                                    <div className="checkbox-list-wrapper">
                                        <ul className="filter-list checkbox-list">
                                            {availableCompanies.map((company, index) => (
                                                <li key={company}>
                                                    <input type="checkbox" id={`company${index}`} onChange={() => handleFilterChange('company', company)} checked={filters.company.includes(company)} />
                                                    <label htmlFor={`company${index}`}>{company}</label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </details>
                            </div>
                    </div>
                </div>
                <div className="job-listings">
                    {loading ? <p>Yüklənir...</p> : vacancies.map(vacancy => (
                        <div key={vacancy.id} className={`job-card ${vacancy.isPremium ? 'premium' : ''}`}>
                            {vacancy.isPremium && <div className="premium-badge">Premium</div>}
                            <div className="job-card-header">
                                <img src={vacancy.logo} alt={`${vacancy.company} logo`} />
                                <div className="job-card-title">
                                    <h3><Link href={vacancy.href}>{vacancy.title}</Link></h3>
                                    <p>{vacancy.company}</p>
                                </div>
                            </div>
                            <div className="job-card-details">
                                <span><i className="icon-material-outline-location-on"></i> {vacancy.location}</span>
                                <span><i className="icon-material-outline-access-time"></i> {vacancy.time}</span>
                            </div>
                            <Link href={vacancy.href} className="button button-sliding-icon">Ətraflı <i className="icon-material-outline-arrow-right-alt"></i></Link>
                        </div>
                    ))}
                    <div className="pagination-container">
                        <nav className="pagination">
                            <ul>
                                {currentPage > 1 && (
                                    <li className="pagination-arrow">
                                        <Link href={`/vacancies_v2?page=${currentPage - 1}`}>
                                            <i className="icon-material-outline-keyboard-arrow-left"></i>
                                        </Link>
                                    </li>
                                )}
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                    <li key={p}>
                                        <Link href={`/vacancies_v2?page=${p}`} className={currentPage === p ? 'current-page' : ''}>
                                            {p}
                                        </Link>
                                    </li>
                                ))}
                                {currentPage < totalPages && (
                                    <li className="pagination-arrow">
                                        <Link href={`/vacancies_v2?page=${currentPage + 1}`}>
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
    );
}

export default function VacanciesV2() {
    const [positionValue, setPositionValue] = useState('');
    const [locationValue, setLocationValue] = useState('');
    const [isPositionDropdownOpen, setIsPositionDropdownOpen] = useState(false);
    const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
    const positions = ['Frontend Developer', 'Backend Developer', 'Project Manager', 'UI/UX Designer'];
    const locations = ['Bakı', 'Sumqayıt', 'Gəncə', 'Mingəçevir'];

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
            <div className="search-form">
                <div className="search-input-wrapper">
                    <input
                        type="text"
                        placeholder="Vəzifə adı və ya açar söz"
                        value={positionValue}
                        onChange={(e) => setPositionValue(e.target.value)}
                        onFocus={() => setIsPositionDropdownOpen(true)}
                        onBlur={() => setTimeout(() => setIsPositionDropdownOpen(false), 200)}
                    />
                    {isPositionDropdownOpen && (
                        <div className="search-dropdown">
                            <ul>
                                {positions.filter(p => p.toLowerCase().includes(positionValue.toLowerCase())).map(pos => (
                                    <li key={pos} onMouseDown={() => { setPositionValue(pos); setIsPositionDropdownOpen(false); }}>
                                        {pos}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="search-input-wrapper">
                    <input
                        type="text"
                        placeholder="Şəhər və ya rayon"
                        value={locationValue}
                        onChange={(e) => setLocationValue(e.target.value)}
                        onFocus={() => setIsLocationDropdownOpen(true)}
                        onBlur={() => setTimeout(() => setIsLocationDropdownOpen(false), 200)}
                    />
                    {isLocationDropdownOpen && (
                        <div className="search-dropdown">
                            <ul>
                                {locations.filter(l => l.toLowerCase().includes(locationValue.toLowerCase())).map(loc => (
                                    <li key={loc} onMouseDown={() => { setLocationValue(loc); setIsLocationDropdownOpen(false); }}>
                                        {loc}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <button className="button">Axtar</button>
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