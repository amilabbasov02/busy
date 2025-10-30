"use client";
import { useState, useMemo } from 'react';
import './jobseekers.css';
import Head from 'next/head';
import Link from 'next/link';

const JobseekersPage = () => {
    const [accordionOpen, setAccordionOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12; // 6 columns * 2 rows

    // Mock data for jobseekers - expanded for pagination
    const allJobseekers = useMemo(() => [
        { id: 1, name: 'Bəxtiyar Məmmədov', profession: 'SMM manager', link: '/jobseekers/bakhtiyar-mammadov', flag: 'pl.svg', country: 'Poland' },
        { id: 2, name: 'Cavid Şahbazov', profession: 'mağaza satıcısı', link: '/jobseekers/javid-shahbazov', flag: 'pl.svg', country: 'Poland' },
        { id: 3, name: 'Murad Baytev', profession: 'HR specialist', link: '/jobseekers/murad-baytev', flag: 'pl.svg', country: 'Poland' },
        { id: 4, name: 'İlkin Bayramov', profession: 'malyar', link: '/jobseekers/ilkin-bayramov', flag: 'pl.svg', country: 'Poland' },
        { id: 5, name: 'Orxan Rzayev', profession: 'tir sürücusü', link: '/jobseekers/orkhan-rzayev', flag: 'pl.svg', country: 'Poland' },
        { id: 6, name: 'Təbriz Muğbilov', profession: 'accountant', link: '/jobseekers/tabriz-mugbilov', flag: 'pl.svg', country: 'Poland' },
        { id: 7, name: 'Arif Cəfərov', profession: 'sürücü', link: '/jobseekers/arif-jafarov', flag: 'pl.svg', country: 'Poland' },
        { id: 8, name: 'Rəfail İsgəndərov', profession: 'yük maşını sürücüsü', link: '/jobseekers/rafail-iskandarov', flag: 'pl.svg', country: 'Poland' },
        { id: 9, name: 'Nurlan Muradov', profession: 'sürücü', link: '/jobseekers/nurlan-muradov', flag: 'pl.svg', country: 'Poland' },
        { id: 10, name: 'Oqtay Əliyev', profession: 'inşaat mühəndisi', link: '/jobseekers/oqtay-aliyev', flag: 'pl.svg', country: 'Poland' },
        { id: 11, name: 'Habil Mirzəyev', profession: 'baş mühasib', link: '/jobseekers/habil-mirzayev', flag: 'pl.svg', country: 'Poland' },
        { id: 12, name: 'Narmin Babayeva', profession: 'fransız dili müəllimi', link: '/jobseekers/narmin-babayeva', flag: 'pl.svg', country: 'Poland' },
        { id: 13, name: 'Sema Bağırova', profession: 'aqronom', link: '/jobseekers/sema-bagirova', flag: 'pl.svg', country: 'Poland' },
        { id: 14, name: 'Humay Abasova', profession: 'mühasib', link: '/jobseekers/humay-abasova', flag: 'pl.svg', country: 'Poland' },
        { id: 15, name: 'Xatirə Məmmədova', profession: 'personal assistant', link: '/jobseekers/khatira-mammadova', flag: 'pl.svg', country: 'Poland' },
    ], []);

    const totalPages = Math.ceil(allJobseekers.length / itemsPerPage);

    const currentJobseekers = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return allJobseekers.slice(startIndex, endIndex);
    }, [currentPage, allJobseekers, itemsPerPage]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <li key={i}>
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); handlePageChange(i); }}
                        className={currentPage === i ? 'current-page ripple-effect' : 'ripple-effect'}
                    >
                        {i}
                    </a>
                </li>
            );
        }
        return pages;
    };


    return (
        <>
            <Head>
                <title>İşaxtaranlar</title>
            </Head>
            <div id="wrapper" style={{ overflowY: 'hidden' }}>
                <div className="clearfix"></div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="accordion">
                                <div className="accordion-panel" style={{ border: 'none' }}>
                                    <h1 className="jobseeker_head">İşaxtaranlar</h1>
                                    <h2 className="accordion-header font-20" onClick={() => setAccordionOpen(!accordionOpen)} style={{ cursor: 'pointer' }}>
                                        <i className="fas fa-search"></i>&nbsp;Ətraflı axtarış
                                        <span id="arrow">
                                            <i className={`fas ${accordionOpen ? 'fa-caret-up' : 'fa-caret-down'}`}></i>
                                        </span>
                                    </h2>
                                    <div className="accordion-body" style={{ display: accordionOpen ? 'block' : 'none' }}>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-12">
                                                    <form method="get" action="#" className="adv_search_form">
                                                        <div className="row">
                                                            <div>
                                                                <div className="section-headline mt-25 margin-bottom-35">
                                                                    <h5>Açar-kəlmələr ilə axtarış</h5>
                                                                </div>
                                                                <input type="text" name="q" placeholder="axtar" />
                                                            </div>
                                                            <div>
                                                                <div className="section-headline mt-25 margin-bottom-35">
                                                                    <h5>minimum yaş</h5>
                                                                </div>
                                                                <input type="number" min="15" max="70" name="minimum_age" />
                                                            </div>
                                                            <div>
                                                                <div className="section-headline mt-25 margin-bottom-35">
                                                                    <h5>maksimum yaş</h5>
                                                                </div>
                                                                <input type="number" min="15" max="70" name="maximum_age" />
                                                            </div>
                                                            <div className="margin-top-20" style={{ textAlign: 'center' }}>
                                                                <input type="submit" className="custom-submit-input" style={{ color: '#ffffff !important' }} value="Axtar" />
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-12 col-lg-12">
                            <div className="freelancers-container freelancers-grid-layout margin-top-35 row">
                                {currentJobseekers.map(seeker => (
                                    <div className="freelancer" key={seeker.id}>
                                        <div className="freelancer-overview">
                                            <div className="freelancer-overview-inner">
                                                <div className="freelancer-avatar">
                                                    <Link href={seeker.link}>
                                                        <img src="/site/images/user-avatar-placeholder.png" alt={seeker.name} />
                                                    </Link>
                                                </div>
                                                <div className="freelancer-name">
                                                    <h4>
                                                        <Link href={seeker.link}>
                                                            {seeker.name}
                                                            <img className="flag" src={`/images/flags/${seeker.flag}`} alt={seeker.country} title={seeker.country} />
                                                        </Link>
                                                    </h4>
                                                    <span style={{ textTransform: 'capitalize' }}>{seeker.profession}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="freelancer-details">
                                            <Link href={seeker.link} className="button button-sliding-icon ripple-effect">
                                                Profilə bax <i className="icon-material-outline-arrow-right-alt"></i>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="clearfix"></div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="pagination-container margin-top-60 margin-bottom-60 d-flex justify-content-center">
                                        <nav className="pagination">
                                            <ul>
                                                {currentPage > 1 && (
                                                    <li className="pagination-arrow">
                                                        <a href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }} className="ripple-effect">
                                                            <i className="icon-material-outline-keyboard-arrow-left"></i>
                                                        </a>
                                                    </li>
                                                )}
                                                {renderPagination()}
                                                {currentPage < totalPages && (
                                                    <li className="pagination-arrow">
                                                        <a href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }} className="ripple-effect">
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
            </div>
        </>
    );
};

export default JobseekersPage;