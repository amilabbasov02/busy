"use client";
import { useEffect, useState } from 'react';
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
    // Add mock properties for filtering
    employmentType: ['Tam iş günü', 'Yarım iş günü', 'Distant', 'Sərbəst', 'Təcrübə', 'Müvəqqəti', 'Könüllü', 'Hibrid', 'Növbəli'][i % 9],
    category: ['İnzibati', 'Maliyyə', 'IT', 'Tibb və Əczaçılıq', 'Sənaye və istehsalat', 'Turizm və restoran', 'Hüquq', 'Marketinq', 'Satış'][i % 9],
}));

const fetchVacancies = (page: number, filters: any, itemsPerPage: number = 10): Promise<{ vacancies: Vacancy[], total: number }> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const filtered = allVacancies.filter(v => {
                // Checkbox filters
                if (filters.employmentType?.length > 0 && !filters.employmentType.includes(v.employmentType)) {
                    return false;
                }
                if (filters.category?.length > 0 && !filters.category.includes(v.category)) {
                    return false;
                }

                // Text search filters
                const positionMatch = filters.position ? v.title.toLowerCase().includes(filters.position.toLowerCase()) || v.company.toLowerCase().includes(filters.position.toLowerCase()) : true;
                const locationMatch = filters.location ? v.location.toLowerCase().includes(filters.location.toLowerCase()) : true;

                if (!positionMatch || !locationMatch) {
                    return false;
                }
                
                return true;
            });

            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            resolve({ vacancies: filtered.slice(start, end), total: filtered.length });
        }, 300);
    });
};

export default function VacanciesV2() {
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
    <>
      <Head>
        <title>Vakansiyalar | İş elanları</title>
        <link rel="stylesheet" href="https://unpkg.com/inter-ui/inter.css" />
      </Head>

      <div className="job-search-portal">
        {/* <!-- Hero Section --> */}
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
                <button className="button" onClick={handleSearch}>Axtar</button>
            </div>
          </div>
        </div>

        <div className="container page-content">
          <button className="filter-toggle-button" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <i className="icon-feather-filter"></i> Filterlər
          </button>

          {/* <!-- Main Content --> */}
          <div className="main-layout">
            {/* <!-- Filter Sidebar --> */}
            <div className={`filter-sidebar ${isFilterOpen ? 'open' : ''}`}>
              <div className="filter-sidebar-inner">
                <button className="filter-close-button" onClick={() => setIsFilterOpen(false)}>&times;</button>
                <h3>Filterlər</h3>
                
                <div className="filter-widget">
                    <details open>
                        <summary>Məşğulluq növü</summary>
                        <div className="checkbox-list-wrapper">
                            <ul className="filter-list checkbox-list">
                                {['Tam iş günü', 'Yarım iş günü', 'Distant', 'Sərbəst', 'Təcrübə', 'Müvəqqəti', 'Könüllü', 'Hibrid', 'Növbəli'].map((type, index) => (
                                    <li key={type}>
                                        <input type="checkbox" id={`type${index}`} onChange={() => handleFilterChange('employmentType', type)} />
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
                                {['İnzibati', 'Maliyyə', 'IT', 'Tibb və Əczaçılıq', 'Sənaye və istehsalat', 'Turizm və restoran', 'Hüquq', 'Marketinq', 'Satış'].map((cat, index) => (
                                    <li key={cat}>
                                        <input type="checkbox" id={`cat${index}`} onChange={() => handleFilterChange('category', cat)} />
                                        <label htmlFor={`cat${index}`}>{cat}</label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </details>
                </div>

                <div className="filter-widget">
                    <details>
                        <summary>İşlər</summary>
                        <input type="text" placeholder="Peşəni axtar" className="filter-search-input" />
                        <div className="checkbox-list-wrapper">
                            <ul className="filter-list checkbox-list">
                                <li><input type="checkbox" id="job1" /><label htmlFor="job1">Mühasib</label></li>
                                <li><input type="checkbox" id="job2" /><label htmlFor="job2">Audit</label></li>
                                <li><input type="checkbox" id="job3" /><label htmlFor="job3">Kredit mütəxəssisi</label></li>
                                <li><input type="checkbox" id="job4" /><label htmlFor="job4">Sığorta mütəxəssisi</label></li>
                                <li><input type="checkbox" id="job5" /><label htmlFor="job5">İnvestisiya mütəxəssisi</label></li>
                                <li><input type="checkbox" id="job6" /><label htmlFor="job6">Maliyyə analitiki</label></li>
                                <li><input type="checkbox" id="job7" /><label htmlFor="job7">Bank işçisi</label></li>
                                <li><input type="checkbox" id="job8" /><label htmlFor="job8">Risk meneceri</label></li>
                                <li><input type="checkbox" id="job9" /><label htmlFor="job9">Ofis meneceri</label></li>
                            </ul>
                        </div>
                    </details>
                </div>

                <div className="filter-widget">
                    <details>
                        <summary>Minimum təcrübə</summary>
                        {/* Placeholder for experience */}
                    </details>
                </div>

                <div className="filter-widget">
                    <details>
                        <summary>Maaş aralığı</summary>
                        <div className="salary-range-placeholder">
                            <span>500 AZN</span> - <span>3500 AZN</span>
                        </div>
                    </details>
                </div>

              </div>
            </div>

            {/* <!-- Job Listings --> */}
            <div className="job-listings">
              {loading ? (
                <p>Yüklənir...</p>
              ) : (
                vacancies.map(vacancy => (
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
                ))
              )}

              {/* <!-- Pagination --> */}
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
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                      <li key={p}>
                        <Link href={`/vacancies?page=${p}`} className={currentPage === p ? 'current-page' : ''}>
                          {p}
                        </Link>
                      </li>
                    ))}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}