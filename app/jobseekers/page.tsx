"use client";
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const JobseekersPage = () => {
    const [accordionOpen, setAccordionOpen] = useState(false);
    const [jobseekers, setJobseekers] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // Mock data
    const allJobseekers = [
        { id: 19811, name: 'Bəxtiyar Məmmədov', profession: 'SMM manager', link: 'https://busy.az/jobseeker/19811' },
        { id: 19798, name: 'Cavid Şahbazov', profession: 'mağaza satıcısı', link: 'https://busy.az/jobseeker/19798' },
        { id: 19797, name: 'Murad Baytev', profession: 'HR specialist', link: 'https://busy.az/jobseeker/19797' },
    ];

    useEffect(() => {
        setTotalPages(Math.ceil(allJobseekers.length / 10));
        setJobseekers(allJobseekers.slice((currentPage - 1) * 10, currentPage * 10));
    }, [currentPage]);

    return (
        <>
            <Head>
                <title>İşaxtaranlar</title>
            </Head>
            <div id="wrapper" style={{ overflowY: 'hidden' }}>
                <div className="clearfix"></div>
                <div className="margin-top-70"></div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="accordion">
                                <div className="accordion-panel" style={{ border: 'none' }}>
                                    <h1 className="jobseeker_head">İşaxtaranlar</h1>
                                    <h2 className="accordion-header font-20" onClick={() => setAccordionOpen(!accordionOpen)}>
                                        <i className="fas fa-search"></i>&nbsp;Ətraflı axtarış
                                        <span id="arrow">
                                            <i className={`fas ${accordionOpen ? 'fa-caret-up' : 'fa-caret-down'}`}></i>
                                        </span>
                                    </h2>
                                    <div className="accordion-body" style={{ display: accordionOpen ? 'block' : 'none' }}>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-12">
                                                    <form method="get" action="https://busy.az/jobseekers" className="adv_search_form">
                                                        <div className="row">
                                                            <div className="col-xl-4 col-md-4">
                                                                <div className="section-headline mt-25 margin-bottom-35">
                                                                    <h5>Açar-kəlmələr ilə axtarış</h5>
                                                                </div>
                                                                <input type="text" name="q" placeholder="axtar" />
                                                            </div>
                                                            {/* Other filters would go here */}
                                                            <div className="col-xl-12 col-md-12 margin-top-20" style={{ textAlign: 'center' }}>
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
                            <div className="freelancers-container freelancers-grid-layout margin-top-35">
                                {jobseekers.map(seeker => (
                                    <div className="freelancer" key={seeker.id}>
                                        <div className="freelancer-overview">
                                            <div className="freelancer-overview-inner">
                                                <div className="freelancer-avatar">
                                                    <a href={seeker.link} target="_blank"><img className="lozad" data-src="/site/images/user-avatar-placeholder.png" alt="" src="/site/images/user-avatar-placeholder.png" data-loaded="true" /></a>
                                                </div>
                                                <div className="freelancer-name">
                                                    <h4><a href={seeker.link} target="_blank">{seeker.name}</a></h4>
                                                    <span style={{ textTransform: 'capitalize' }}>{seeker.profession}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="freelancer-details">
                                            <a href={seeker.link} target="_blank" className="button button-sliding-icon ripple-effect">Profilə bax <i className="icon-material-outline-arrow-right-alt"></i></a>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="clearfix"></div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="pagination-container margin-top-60 margin-bottom-60">
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
            </div>
        </>
    );
};

export default JobseekersPage;