"use client";
import { useEffect, useState, useRef } from 'react';
import NewAdvancedSearchFilters from './components/NewAdvancedSearchFilters';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';


interface FaqItem {
    id: number;
    title: { az: string };
    content: { az: string };
}

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

interface Features {
    [key: string]: string | boolean;
}

interface Plan {
    name: string;
    price: string;
    link: string;
    features: Features;
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
    let query = `page=${page}&per_page=5`;

    if (filters.employmentType?.length > 0) {
        filters.employmentType.forEach((id: number) => query += `&employment_type[]=${id}`);
    }
    if (filters.is_prime) {
        query += `&is_prime=${filters.is_prime}`;
    }
    if (filters.minimum_salary) {
        query += `&minimum_salary=${filters.minimum_salary}`;
    }
    
    const response = await fetch(`/api/bff/api/vacancies?${query}`);
    const data = await response.json();

    if (!data || !Array.isArray(data.vacancies)) {
        return { vacancies: [], total: 0 };
    }

    let vacancies = data.vacancies.map((v: any) => {
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
        };
    });

    if (filters.is_prime) {
        vacancies = vacancies.filter((v: Vacancy) => v.is_prime === 1);
    }
    
    vacancies.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    
    return { vacancies, total: data.count || 0 };
};


declare global {
  interface Window {
    jQuery: any;
  }
}

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [isAdvancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const [activeJobTab, setActiveJobTab] = useState(0);
  const blankSectionRef = useRef<HTMLElement>(null);
  const [isBlankSectionActive, setBlankSectionActive] = useState(false);
  const [activeHowItTab, setActiveHowItTab] = useState(0);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [employmentTypes, setEmploymentTypes] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [faqData, setFaqData] = useState<FaqItem[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
  const [cities, setCities] = useState<any[]>([]);
  const [professions, setProfessions] = useState<any[]>([]);
  const [openAccordionGroup, setOpenAccordionGroup] = useState<string | null>(null);

  const toggleAccordionGroup = (groupName: string) => {
    if (openAccordionGroup === groupName) {
      setOpenAccordionGroup(null);
    } else {
      setOpenAccordionGroup(groupName);
    }
  };

  const toggleFaq = (index: number) => {
    if (openFaq === index) {
        setOpenFaq(null);
    } else {
        setOpenFaq(index);
    }
  };

  useEffect(() => {
    // Fetch pricing data

    // Fetch FAQ data
    fetch('/api/bff/api/faq')
        .then(res => res.json())
        .then(data => {
            console.log('FAQ Data:', data);
            if (data && Array.isArray(data.faqs)) {
                setFaqData(data.faqs);
            }
        });
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
        try {
            const [catResponse, empResponse, citiesResponse, professionsResponse] = await Promise.all([
                fetch(`/api/bff/api/filter/main-categories`),
                fetch(`/api/bff/api/filter/employment-types`),
                fetch('/api/bff/api/filter/cities'),
                fetch('/api/bff/api/filter/professions?per_page=30')
            ]);
            const catData = await catResponse.json();
            const empData = await empResponse.json();
            const citiesData = await citiesResponse.json();
            const professionsData = await professionsResponse.json();

            if (catData && Array.isArray(catData.data)) {
                setCategories(catData.data);
            }
            if (empData && Array.isArray(empData.data)) {
                setEmploymentTypes(empData.data);
            }
            if (citiesData && Array.isArray(citiesData.data)) {
                setCities(citiesData.data);
            }
            if (professionsData && Array.isArray(professionsData.data)) {
                setProfessions(professionsData.data);
            }
        } catch (error) {
            console.error("Failed to fetch initial data:", error);
        }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const loadVacancies = async () => {
        setLoading(true);
        let filters: { is_prime?: number; minimum_salary?: number; employmentType?: number[] } = {};
        if (activeJobTab === 1) { // Premium
            filters = { is_prime: 1 };
        } else if (activeJobTab === 2) { // Yüksek maaşlı
            filters = { minimum_salary: 2000 };
        } else if (activeJobTab === 3) { // Könüllü
            const volunteerType = employmentTypes.find(type => type.title.az.toLowerCase().includes('könüllü'));
            if (volunteerType) {
                filters = { employmentType: [volunteerType.id] };
            }
        }

        try {
            const result = await fetchVacancies(1, filters);
            setVacancies(result.vacancies);
        } catch (error) {
            console.error("Failed to fetch vacancies:", error);
        } finally {
            setLoading(false);
        }
    };

    // Wait for employmentTypes to be loaded before fetching volunteer jobs
    if (activeJobTab === 3 && employmentTypes.length === 0) {
        // Initially, load default vacancies until employment types are fetched
        if (vacancies.length === 0) {
            fetchVacancies(1, {}).then(result => setVacancies(result.vacancies)).finally(() => setLoading(false));
        }
        return;
    }
    loadVacancies();
  }, [activeJobTab, employmentTypes]);

  useEffect(() => {
    // This effect runs once on component mount to initialize scripts for elements that are always visible.
    if (typeof window.jQuery !== 'undefined') {
      const $ = window.jQuery;
      
      // Initialize the selectpicker for the main search bar
      $('.intro-banner-search-form .selectpicker').selectpicker({
        noneSelectedText: "seçilməyib"
      });
    }
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      if (blankSectionRef.current && !isBlankSectionActive) {
        const { top } = blankSectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (top < windowHeight * 0.8) {
          setBlankSectionActive(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isBlankSectionActive]);

  useEffect(() => {
  }, []);

  useEffect(() => {
    if (typeof window.jQuery !== 'undefined') {
      const $ = window.jQuery;
      $('.how_it .clicked_tab_btn').on('click', function (this: HTMLElement) {
        const tabId = $(this).data('id');
        setActiveHowItTab(tabId);
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window.jQuery !== 'undefined') {
      const $ = window.jQuery;
      $('.collapse_btn').off('click').on('click', function (this: HTMLElement) {
        $(this).toggleClass('clp_clicked');
        $(this).next('.collapse_content').slideToggle();
      });
    }
  }, []);

  const allFeatures = [
    "Vakansiya sayı",
    "Premium gün sayı",
    "Baxış statistikası",
    "Şirkət məlumatlarına düzəliş",
    "Qalereyaya şəkil əlavə etmək",
    "Vakansiyanı silmək",
    "Bank köçürməsi ilə ödəniş",
    "Video/frame əlavə etmək",
    "Anonim rəyləri silmək",
    "Sosial mediada paylaşmaq",
    "Xüsusi sosial media kontenti",
    "Bir hesabdan çox şirkəti idarə etmək",
    "HR-branding üçün məqalələr"
  ];

  const plans: Plan[] = [
    {
        name: 'Busy 25',
        price: '25₼',
        link: '/order/4',
        features: {
            "Vakansiya sayı": "1",
            "Premium gün sayı": "1",
            "Baxış statistikası": true,
            "Şirkət məlumatlarına düzəliş": true,
            "Qalereyaya şəkil əlavə etmək": true,
            "Vakansiyanı silmək": true,
            "Bank köçürməsi ilə ödəniş": false,
            "Video/frame əlavə etmək": false,
            "Anonim rəyləri silmək": false,
            "Sosial mediada paylaşmaq": false,
            "Xüsusi sosial media kontenti": false,
            "Bir hesabdan çox şirkəti idarə etmək": false,
            "HR-branding üçün məqalələr": false
        }
    },
    {
        name: 'Busy 100',
        price: '100₼',
        link: '/order/5',
        features: {
            "Vakansiya sayı": "5",
            "Premium gün sayı": "3",
            "Baxış statistikası": true,
            "Şirkət məlumatlarına düzəliş": true,
            "Qalereyaya şəkil əlavə etmək": true,
            "Vakansiyanı silmək": true,
            "Bank köçürməsi ilə ödəniş": true,
            "Video/frame əlavə etmək": true,
            "Anonim rəyləri silmək": true,
            "Sosial mediada paylaşmaq": false,
            "Xüsusi sosial media kontenti": false,
            "Bir hesabdan çox şirkəti idarə etmək": false,
            "HR-branding üçün məqalələr": false
        }
    },
    {
        name: 'Busy 450',
        price: '450₼',
        link: '/order/6',
        features: {
            "Vakansiya sayı": "30",
            "Premium gün sayı": "7",
            "Baxış statistikası": true,
            "Şirkət məlumatlarına düzəliş": true,
            "Qalereyaya şəkil əlavə etmək": true,
            "Vakansiyanı silmək": true,
            "Bank köçürməsi ilə ödəniş": true,
            "Video/frame əlavə etmək": true,
            "Anonim rəyləri silmək": true,
            "Sosial mediada paylaşmaq": true,
            "Xüsusi sosial media kontenti": true,
            "Bir hesabdan çox şirkəti idarə etmək": false,
            "HR-branding üçün məqalələr": false
        }
    },
    {
        name: 'Enterprise',
        price: 'Razılaşma',
        link: 'mailto:support@busy.az',
        features: {
            "Vakansiya sayı": "Limitsiz",
            "Premium gün sayı": "14-30",
            "Baxış statistikası": true,
            "Şirkət məlumatlarına düzəliş": true,
            "Qalereyaya şəkil əlavə etmək": true,
            "Vakansiyanı silmək": true,
            "Bank köçürməsi ilə ödəniş": true,
            "Video/frame əlavə etmək": true,
            "Anonim rəyləri silmək": true,
            "Sosial mediada paylaşmaq": true,
            "Xüsusi sosial media kontenti": true,
            "Bir hesabdan çox şirkəti idarə etmək": true,
            "HR-branding üçün məqalələr": true
        }
    }
  ];
  
  return (
      <>
        <Head>
          <title>Ana Səhifə</title>
        </Head>
  
        <div className="intro-banner">
          <div className="container">
            <div className="row">
              <div className="col-md-12 headline-slogan">
                <div className="banner-headline">
                  <h3>
                    <strong>Bizi işlə dost edir</strong>
                    <br />
                    <span>Azərbaycanın #1 iş axtarma saytı</span>
                  </h3>
                </div>
              </div>
            </div>
            <form action="/search" method="GET">
              <div className="row">
                <div className="col-md-12">
                  <div className="intro-banner-search-form" style={{ marginTop: '95px' }}>
                    <div className="intro-search-field with-label">
                      <label htmlFor="intro-keywords" className="field-title ripple-effect">istədiyin işin adını axtarışa ver</label>
                      <input id="intro-keywords" type="text" name="q" placeholder="vakansiyanın adı yaxud açar-söz" autoComplete="off" />
                    </div>
                    <div className="intro-search-select">
                        <select className="selectpicker" name="type" data-width="180px">
                            <option value="vacancy">Vakansiya</option>
                            <option value="company">Şirkət</option>
                            <option value="skill">Bilik</option>
                            <option value="profession">İxtisas</option>
                        </select>
                    </div>
                    <div className="intro-search-button">
                      <button className="button ripple-effect" role="submit">axtar</button>
                    </div>
                  </div>
                  <div className="accordion">
                    <div className={`accordion-panel ${isAdvancedSearchOpen ? 'accordion-expanded' : ''}`} style={{ border: 'none' }}>
                      <h3 className="accordion-header" onClick={() => setAdvancedSearchOpen(!isAdvancedSearchOpen)} style={{ cursor: 'pointer' }}>
                        <i className="fas fa-search"></i>&nbsp;Ətraflı axtarış
                        <span id="arrow"><i className={`fas ${isAdvancedSearchOpen ? 'fa-caret-up' : 'fa-caret-down'}`} style={{ color: '#777777' }}></i></span>
                      </h3>
                      <div className="accordion-body" id="accordion-body" style={{ display: isAdvancedSearchOpen ? 'block' : 'none' }}>
                          <NewAdvancedSearchFilters onSearch={(filters) => console.log(filters)} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="section gray">
          <div className="container" style={{ paddingTop: '20px' }}>
            <div className="row">
              <div className="col-xl-12">
                {/* Section Headline */}
                <div className="benefit_tabs">
                  <div className="section-headline mt-0 mb-35 p-0 flex_head">
                    <div className="tab_head_items">
                      <h2 className={`latest_btn clicked_tab_btn ${activeJobTab === 0 ? 'active' : ''}`} onClick={() => setActiveJobTab(0)} data-id="0">Son vakansiyalar</h2>
                      <h2 className={`latest_btn clicked_tab_btn ${activeJobTab === 1 ? 'active' : ''}`} onClick={() => setActiveJobTab(1)} data-id="1">Premium</h2>
                      <h2 className={`latest_btn clicked_tab_btn ${activeJobTab === 2 ? 'active' : ''}`} onClick={() => setActiveJobTab(2)} data-id="2">Yüksək maaşlı</h2>
                      <h2 className={`latest_btn clicked_tab_btn ${activeJobTab === 3 ? 'active' : ''}`} onClick={() => setActiveJobTab(3)} data-id="3">Könüllü (volontyor)</h2>
                    </div>
                  </div>
                  <div className="bf_tb_content">
                    <div className={`bf_tb_items active`} role="tabpanel">
                      <div className="listings-container compact-list-layout mt-35">
                          {loading ? <p>Yüklənir...</p> : vacancies.length > 0 ? vacancies.map(vacancy => (
                              <div className="job-listing with-apply-button" key={vacancy.id}>
                                  <div className="job-listing-details">
                                      <div className="job-listing-description">
                                          <h3 className="job-listing-title ">
                                              <Link className="LinkDark" href={`/${vacancy.id}/${vacancy.slug}`}>{vacancy.title}</Link>
                                          </h3>
                                          <div className="job-listing-footer">
                                              <ul>
                                                  <li>
                                                      <Link className="GrayToBlue" href={`/company/${vacancy.company.slug}`}>
                                                          <i className="icon-material-outline-business"></i>{vacancy.company.title}
                                                      </Link>
                                                  </li>
                                                  <li><i className="icon-material-outline-access-time"></i>{vacancy.time}</li>
                                              </ul>
                                          </div>
                                      </div>
                                      {vacancy.isPremium && (
                                          <a className="list-apply-button " style={{ background: '#aaf674', color: '#000', marginRight: '5px', textAlign: 'center', fontWeight: 700 }} href="#">Premium</a>
                                      )}
                                      <Link className="list-apply-button ripple-effect" href={`/${vacancy.id}/${vacancy.slug}`}>Ətraflı</Link>
                                  </div>
                              </div>
                          )) : <p>Bu filter üçün vakansiya tapılmadı.</p>}
                      </div>
                      <div className=" mt-5 mb-35" style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
                        <a href="/vacancies" className="button ripple-effect  button-sliding-icon margin-bottom-40" style={{ width: '260px', color: 'rgb(255, 255, 255)' }}>
                          Bütün vakansiyalar
                          <i className="icon-feather-check"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="faq-container">
                  {/* Sectors Accordion */}
                  <div className={`faq-item ${openAccordionGroup === 'sectors' ? 'open' : ''}`} onClick={() => toggleAccordionGroup('sectors')}>
                    <div className="faq-question">
                      Sektora görə iş elanları
                    </div>
                    <div className="faq-answer">
                      <div className="row">
                        {categories.map(category => (
                          <div className="col-md-3" key={category.id}>
                            <Link href={`/vacancies?categories[]=${category.id}`}>{category.title.az}</Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Regions Accordion */}
                  <div className={`faq-item ${openAccordionGroup === 'regions' ? 'open' : ''}`} onClick={() => toggleAccordionGroup('regions')}>
                    <div className="faq-question">
                      Rayonlara görə iş elanları
                    </div>
                    <div className="faq-answer">
                      <div className="row">
                        {cities.map(city => (
                          <div className="col-md-3" key={city.id}>
                             <Link href={`/vacancies?cities[]=${city.id}`}>{city.title.az}</Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Professions Accordion */}
                  <div className={`faq-item ${openAccordionGroup === 'professions' ? 'open' : ''}`} onClick={() => toggleAccordionGroup('professions')}>
                    <div className="faq-question">
                      İxtisaslara görə iş elanları
                    </div>
                    <div className="faq-answer">
                       <div className="row">
                        {professions.map((profession: any) => (
                          <div className="col-md-3" key={profession.id}>
                            <Link href={`/vacancies?professions[]=${profession.id}`}>{profession.title}</Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section gray pb-75" style={{ paddingTop: '50px' }}>
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="tg_custom_wrap">
                  <div className="tg_custom_title">
                    İş axtarışlarına vaxt itirmə!
                  </div>
                  <div className="tg_custom_hd">
                    Telegram bot-a abunə ol, həyatını asanlaşdır!
                  </div>
                  <div className="tg_custom_short_info">
                    Sən işi yox, iş səni səni tapsın!
                    <br />
                    Məhz özünə uyğun vakansiyaları seç!
                  </div>
                  <div className="tg_custom_subs_item">
                    <div className="subs_item_buttons">
                      <svg role="presentation" className="tg_arrow-icon" style={{ fill: '#1f5bff' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 180"><path d="M54.1 109c-.8 0-1.6-.4-2-1.1-.8-1.1-.5-2.7.6-3.5 1.3-.9 6.8-4 11.6-6.6-15.9-1.3-29.2-8.3-38.5-20.2C8.9 56 8.5 24.1 13.2 3.4c.3-1.3 1.7-2.2 3-1.9 1.3.3 2.2 1.7 1.9 3-4.5 19.6-4.2 49.8 11.6 70 9 11.5 21.5 17.7 37.2 18.4l-1.8-2.3c-1.4-1.7-2.7-3.4-4.1-5.1-.7-.9-1.5-1.9-2.3-2.9-.9-1.1-.7-2.6.4-3.5 1.1-.9 2.6-.7 3.5.4 0 0 0 .1.1.1l6.4 7.9c.5.5.9 1.1 1.4 1.7 1.5 1.8 3.1 3.6 4.4 5.6 0 .1.1.1.1.2.1.3.2.5.3.8v.6c0 .2-.1.4-.2.6-.1.1-.1.3-.2.4-.1.2-.3.4-.5.6-.1.1-.3.2-.5.3-.1 0-.1.1-.2.1-1.2.6-16 8.6-18.1 10-.5.5-1 .6-1.5.6z"></path></svg>
                      <a href="https://t.me/Busy_az_bot" className="tg_subs_link">Abunə ol</a>
                    </div>
                  </div>
                </div>
              </div>
  
            </div>
          </div>
        </div>
        <section className={`blank ${isBlankSectionActive ? 'active' : ''}`} ref={blankSectionRef}>
          <svg viewBox="4981.03955078125 4637.0380859375 1457.7606201171875 842.4442138671875">
            <path fill="#4417e2" fillOpacity="1" stroke="#4417e2" strokeOpacity="0" strokeWidth="0.8" fillRule="evenodd" id="tSvgf259782529" d="M 5978.103373750775 4637.837743432731 C 5978.103373750775 4637.837743432731 6438 5478.682182685068 6438 5478.682182685068 C 6438 5478.682182685068 4981.839205526477 5209.682182685068 4981.839205526477 5209.682182685068 C 4981.839205526477 5209.682182685068 4981.839205526477 4637.837743432731 4981.839205526477 4637.837743432731C 4981.839205526477 4637.837743432731 5978.103373750775 4637.837743432731 5978.103373750775 4637.837743432731 Z"></path>
            <defs>
              <mask maskUnits="userSpaceOnUse" id="tSvgf259782529m" data-svg-id="tSvgHighlight">
                <rect x="0" y="0" width="12000.0009765625" height="10000" fill="#4417e2"></rect>
                <path fill="#4417e2" fillOpacity="1" stroke="#4417e2" strokeOpacity="0" strokeWidth="0.8" fillRule="evenodd" data-svg-name="path" data-svg-id="f259782529" d="M 5978.103373750775 4637.837743432731 C 5978.103373750775 4637.837743432731 6420.154439171337 5209.682182685068 6420.154439171337 5209.682182685068 C 6420.154439171337 5209.682182685068 4981.839205526477 5209.682182685068 4981.839205526477 5209.682182685068 C 4981.839205526477 5209.682182685068 4981.839205526477 4637.837743432731 4981.839205526477 4637.837743432731C 4981.839205526477 4637.837743432731 5978.103373750775 4637.837743432731 5978.103373750775 4637.837743432731 Z"></path>
              </mask>
            </defs>
          </svg>
          <div className="container">
            <h3>
              Headhunt xidmətləri
            </h3>
            <p>
              Şirkətlərə "çətin" namizədləri
              <br />
              tapmaqda kömək edirik.
            </p>
            <a href="/31-headhunting-xidmeti-azerbaycanda">
              MARAQLIDIR
            </a>
            <img src="/images/lupa.png" alt="" />
          </div>
        </section>
  
        <div className="section mt-65">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="section-headline centered mb-15">
                  <h2>Kateqoriyalar</h2>
                  <span onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)} style={{ cursor: 'pointer', userSelect: 'none' }}>
                    <span style={{ display: 'inline' }}>{isCategoriesExpanded ? 'Kiçilt' : 'Böyüt'}</span>
                    <span style={{ display: 'inline' }}> <i className={`fas ${isCategoriesExpanded ? 'fa-caret-up' : 'fa-caret-down'}`} style={{ color: '#777777' }}></i> </span>
                  </span>
                </div>
                <div className="section-headline mt-0 mb-25">
                  <a href="/categories" className="headline-link">Bütün kateqoriyalar</a>
                </div>
                <div className="categories-container">
                  {categories.slice(0, isCategoriesExpanded ? 12 : 4).map(category => (
                      <Link href={`/category/${category.slug.az}`} className="category-box" key={category.id}>
                          <div className="category-box-content">
                              <h3>{category.title.az}</h3>
                          </div>
                      </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <section className="section how_it">
          <div className="container">
            <div className="row align-items-center benefit_tabs">
              <div className="col-lg-6">
                <div className="section-title me-5 text-start">
                  <h3 className="title">3 addımdaca həyatını asanlaşdır</h3>
                  <p className="text-muted text-start">Yaxşı iş tapmaq üçün elə də çox şey lazım deyil. Pulsuz-parasız, rahat şəkildə arzuladığınız işi tapın.</p>
                  <div className="process-menu nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a className={`nav-link clicked_tab_btn ${activeHowItTab === 0 ? 'active' : ''}`} data-id="0" href="javascript:void(0);" role="tab">
                      <div className="d-flex">
                        <div className="number flex-shrink-0">
                          1
                        </div>
                        <div className="flex-grow-1 text-start ms-3 start_text_item">
                          <h5 className="fs-18">Qeydiyyatdan keç</h5>
                          <p className="text-muted mb-0 text-start">Sadəcə e-mailə gələn aktivləşdirmə keçidinə basmaq bəs edir.</p>
                        </div>
                      </div>
                    </a>
                    <a className={`nav-link clicked_tab_btn ${activeHowItTab === 1 ? 'active' : ''}`} data-id="1" href="javascript:void(0);" role="tab">
                      <div className="d-flex">
                        <div className="number flex-shrink-0">
                          2
                        </div>
                        <div className="flex-grow-1 text-start ms-3 start_text_item">
                          <h5 className="fs-18">İstədiyin vəzifələri təyin et</h5>
                          <p className="text-muted mb-0 text-start">Hansı ixtisaslarda iş olanda sizə bildiriş gəlsin? Bax, həmin arzuladığın peşələri seç.</p>
                        </div>
                      </div>
                    </a>
                    <a className={`nav-link clicked_tab_btn ${activeHowItTab === 2 ? 'active' : ''}`} data-id="2" href="javascript:void(0);" role="tab">
                      <div className=" d-flex">
                        <div className="number flex-shrink-0">
                          3
                        </div>
                        <div className="flex-grow-1 text-start ms-3 start_text_item">
                          <h5 className="fs-18">Müraciət et</h5>
                          <p className="text-muted mb-0 text-start">Telefonuna gələcək bildirişlərə klik et. MÜraciət etdiyin iş xeyirli olsun.</p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              {/*end col*/}
              <div className="col-lg-6">
                <div className="tab-content bf_tb_content">
                  <div className={`tab-pane bf_tb_items ${activeHowItTab === 0 ? 'active' : ''}`} role="tabpanel" data-id="0">
                    <img src="/images/block-1.jpeg" alt="" className="img-fluid" />
                  </div>
                  <div className={`tab-pane bf_tb_items ${activeHowItTab === 1 ? 'active' : ''}`} role="tabpanel" data-id="1">
                    <img src="/images/block-2.jpeg" alt="" className="img-fluid" />
                  </div>
                  <div className={`tab-pane bf_tb_items ${activeHowItTab === 2 ? 'active' : ''}`} role="tabpanel" data-id="2">
                    <img src="/images/block-3.jpeg" alt="" className="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
            {/*end row*/}
          </div>
          {/*end container*/}
        </section>
  

        <div className="section-full bg-white content-inner-1 recent-jobs" style={{ position: 'relative', overflow: 'hidden', padding: '120px 0' }}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-7">
                        <div className="section-head style-1">
                            <h6>Recent Job</h6>
                            <h5 className="section-title-2" style={{ fontSize: '2.5rem', lineHeight: '1.3', color: '#333' }}>Over all 10,00+ Talented People Registered in Our Website </h5>
                            <p style={{ fontSize: '1.1rem', color: '#666' }}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                            <a className="button ripple-effect" href="/register">Join Now</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-5" style={{ position: 'absolute', top: 0, right: 0, height: '100%', width: '50%'}}>
                <div className="dz-job-media" style={{ position: 'relative', height: '100%' }}>
                    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} width="892" height="733" viewBox="0 0 892 733" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M61.3623 116.435C23.5447 121.128 -3.30874 155.589 1.38355 193.406L44.2694 539.047C47.5755 565.692 65.66 586.895 89.2844 595.456C95.1286 598.219 101.463 600.202 108.175 601.249L941.587 731.348C979.239 737.225 1014.53 711.467 1020.4 673.815L1050.07 483.78L1053.09 483.404C1090.91 478.712 1117.77 444.251 1113.07 406.433L1070.19 60.7929C1065.5 22.9753 1031.03 -3.87817 993.217 0.81412L61.3623 116.435Z" fill="#2E55FA"></path>
                    </svg>
                    <img alt="" src="/images/man1-BuNCiUFy.png" style={{ position: 'absolute', bottom: 0, right: '40%', zIndex: 2, maxHeight: '95%' }} />
                </div>
            </div>
        </div>
        <div className="section how_it">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="section-headline centered margin-top-60 margin-bottom-35">
                            <h3>Tez-tez verilən suallar (FAQ)</h3>
                        </div>
                        <div className="faq-container">
                            {faqData.map((faq, index) => (
                                <div className={`faq-item ${openFaq === index ? 'open' : ''}`} key={faq.id} onClick={() => toggleFaq(index)}>
                                    <div className="faq-question">
                                        {faq.title.az}
                                    </div>
                                    <div className="faq-answer" dangerouslySetInnerHTML={{ __html: faq.content.az }}>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="section pb-75 pt-60">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="section-headline centered mt-0 mb-35">
                  <h2>Qiymətlər</h2>
                </div>
              </div>
              <div className="col-xl-12">
                <div className="pricing-table-container">
                  <table className="basic-table pricing-table">
                      <thead>
                          <tr>
                              <th>Xüsusiyyətlər</th>
                              {plans.map(plan => <th key={plan.name}>{plan.name}</th>)}
                          </tr>
                      </thead>
                      <tbody>
                          {allFeatures.map(feature => (
                              <tr key={feature}>
                                  <td>{feature}</td>
                                  {plans.map(plan => (
                                      <td key={plan.name} className="text-center">
                                          {typeof plan.features[feature] === 'boolean' ? (
                                              plan.features[feature] ? <span className="pricing-check">✓</span> : <span className="pricing-cross">✗</span>
                                          ) : (
                                              plan.features[feature]
                                          )}
                                      </td>
                                  ))}
                              </tr>
                          ))}
                      </tbody>
                      <tfoot>
                          <tr>
                              <td>Qiymət</td>
                              {plans.map(plan => <td key={plan.name} className="text-center"><strong>{plan.price}</strong></td>)}
                          </tr>
                          <tr>
                              <td></td>
                              {plans.map(plan => (
                                  <td key={plan.name} className="text-center">
                                      <Link href={plan.link} className="button">Sifariş et</Link>
                                  </td>
                              ))}
                          </tr>
                      </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
