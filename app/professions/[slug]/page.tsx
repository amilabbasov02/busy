"use client";
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Vacancy {
    id: number;
    title: string;
    company: string;
    logo: string;
    date: string;
    link: string;
    professionSlug: string;
}

const allVacancies: Vacancy[] = [
    { id: 43342, title: 'ACCA üzrə müəllim', company: 'Vision Academy', logo: '/storage/companies/1690982428picture1.png', date: '2370 gün əvvəl', link: 'https://busy.az/vacancy/43342/acca-uzre-muellim', professionSlug: 'acca-instructor' },
    { id: 34080, title: 'ACCA Tutor', company: 'Imza Group', logo: '/storage/uploads/image/1974titled.png', date: '2688 gün əvvəl', link: 'https://busy.az/vacancy/34080/acca-tutor', professionSlug: 'acca-instructor' },
    { id: 31809, title: 'ACCA Instructor (F2, F3, F7, F9)', company: 'BRIDGE Academy', logo: '/storage/uploads/image/1800titled.png', date: '2784 gün əvvəl', link: 'https://busy.az/vacancy/31809/acca-instructor-f2-f3-f7-f9', professionSlug: 'acca-instructor' },
    { id: 1, title: 'Backend Developer', company: 'Tech Solutions', logo: '/images/company-logo-placeholder.png', date: '1 gün əvvəl', link: '#', professionSlug: 'backend-developer' },
    { id: 2, title: 'Senior Backend Developer', company: 'Innovate Co', logo: '/images/company-logo-placeholder.png', date: '2 gün əvvəl', link: '#', professionSlug: 'backend-developer' },
];

const ProfessionPage = () => {
    const params = useParams();
    const slug = params.slug as string;

    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [professionName, setProfessionName] = useState('');

    useEffect(() => {
        if (slug) {
            const formattedName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            setProfessionName(formattedName);

            const filtered = allVacancies.filter(v => v.professionSlug === slug);
            setTotalPages(Math.ceil(filtered.length / 10)); // 10 items per page
            setVacancies(filtered.slice((currentPage - 1) * 10, currentPage * 10));
        }
    }, [slug, currentPage]);

    return (
        <>
            <Head>
                <title>{professionName} vakansiyası üçün iş elanları</title>
            </Head>

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
                        <div className="listings-container compact-list-layout margin-top-35 margin-bottom-35">
                            {vacancies.map(job => (
                                <a href={job.link} target="_blank" className="job-listing with-apply-button" id={`vacancy-${job.id}`} key={job.id}>
                                    <div className="job-listing-details">
                                        <div className="job-listing-company-logo">
                                            <img className="lozad" data-src={job.logo} alt="" src={job.logo} data-loaded="true" />
                                        </div>
                                        <div className="job-listing-description">
                                            <h3 className="job-listing-title">{job.title}</h3>
                                            <div className="job-listing-footer">
                                                <ul>
                                                    <li><i className="icon-material-outline-business"></i>{job.company}</li>
                                                    <li><i className="icon-material-outline-access-time"></i>{job.date}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                        
                        <div className="clearfix"></div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="pagination-container margin-top-30 margin-bottom-60">
                                    <nav className="pagination">
                                        <ul>
                                            {currentPage > 1 && (
                                                <li className="pagination-arrow">
                                                    <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(currentPage - 1); }} className="ripple-effect">
                                                        <i className="icon-material-outline-keyboard-arrow-left"></i>
                                                    </a>
                                                </li>
                                            )}
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                                <li key={p}>
                                                    <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p); }} className={currentPage === p ? 'current-page ripple-effect' : 'ripple-effect'}>
                                                        {p}
                                                    </a>
                                                </li>
                                            ))}
                                            {currentPage < totalPages && (
                                                <li className="pagination-arrow">
                                                    <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(currentPage + 1); }} className="ripple-effect">
                                                        <i className="icon-material-outline-keyboard-arrow-right"></i>
                                                    </a>
                                                </li>
                                            )}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="margin-top-70"></div>
        </>
    );
};

export default ProfessionPage;