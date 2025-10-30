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
}

const allVacancies: Vacancy[] = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: `Vakansiya Başlığı ${i + 1} (Səhifə ${Math.floor(i / 10) + 1})`,
    company: `Şirkət ${i + 1}`,
    location: 'Bakı',
    time: `${(i % 5) + 1} gün əvvəl`,
    logo: '/site/images/company-logo-05.png',
    isPremium: i % 4 === 0,
    href: '#',
}));

const fetchVacancies = (page: number, itemsPerPage: number = 10): Promise<Vacancy[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            resolve(allVacancies.slice(start, end));
        }, 300); // Simulate network delay
    });
};

function VacanciesContent() {
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const page = searchParams.get('page') || '1';
    const currentPage = parseInt(page, 10);
    const totalPages = Math.ceil(allVacancies.length / 10);

    useEffect(() => {
        setLoading(true);
        fetchVacancies(currentPage).then(data => {
            setVacancies(data);
            setLoading(false);
        });
    }, [currentPage]);

    return (
        <div className="col-md-9">
            <div className="listings-container compact-list-layout margin-top-35 margin-bottom-35">
                {loading ? (
                    <p>Yüklənir...</p>
                ) : (
                    vacancies.map(vacancy => (
                        <Link key={vacancy.id} href={`/vacancies/${vacancy.id}`} className="job-listing with-apply-button">
                            <div className="job-listing-details">
                                <div className="job-listing-company-logo">
                                    <img className="lozad" data-src={vacancy.logo} alt={`${vacancy.company} logo`} src={vacancy.logo} data-loaded="true" />
                                </div>
                                <div className="job-listing-description">
                                    <h3 className="job-listing-title">{vacancy.title}</h3>
                                    <div className="job-listing-footer">
                                    <ul>
                                        <li>
                                            <i className="icon-material-outline-business"></i>{vacancy.company}
                                        </li>
                                        <li>
                                            <i className="icon-material-outline-location-on"></i>{vacancy.location}
                                        </li>
                                        <li><i className="icon-material-outline-access-time"></i>{vacancy.time}</li>
                                    </ul>
                                    </div>
                                </div>
                                <div>
                                    {vacancy.isPremium && <div className="list-apply-button ripple-effect" style={{ background: '#aaf674', color: '#000', marginRight: '5px', textAlign: 'center', fontWeight: 700 }}>Premium</div>}
                                    <span className="list-apply-button ripple-effect">Ətraflı</span>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
            <div className="clearfix"></div>
            <div className="row">
              <div className="col-md-12">
                <div className="pagination-container margin-top-60 margin-bottom-60">
                  <nav className="pagination">
                    <ul>
                        {currentPage > 1 && (
                            <li className="pagination-arrow">
                                <Link href={`/vacancies?page=${currentPage - 1}`} className="ripple-effect">
                                    <i className="icon-material-outline-keyboard-arrow-left"></i>
                                </Link>
                            </li>
                        )}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                            <li key={p}>
                                <Link href={`/vacancies?page=${p}`} className={currentPage === p ? 'current-page ripple-effect' : 'ripple-effect'}>
                                    {p}
                                </Link>
                            </li>
                        ))}
                        {currentPage < totalPages && (
                            <li className="pagination-arrow">
                                <Link href={`/vacancies?page=${currentPage + 1}`} className="ripple-effect">
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

export default function Vacancies() {
  return (
    <>
      <Head>
        <title>Vakansiyalar | İş elanları</title>
      </Head>
      <div className="clearfix"></div>
      <div id="titlebar" className="gradient">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>Vakansiyalar | İş elanları</h1>
              <nav id="breadcrumbs" className="dark d-none">
                <ul>
                  <li><a href="">Baş səhifə</a></li>
                  <li><a href="/vacancies">Vakansiyalar | İş elanları</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
            <Suspense fallback={<div className="col-md-9"><p>Yüklənir...</p></div>}>
                <VacanciesContent />
            </Suspense>
          <div className="col-md-3" id="filterable">
            {/* Filter sidebar can be added here */}
          </div>
        </div>
      </div>
      <div className="margin-top-70"></div>
    </>
  )
}