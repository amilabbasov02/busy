"use client";
import React, { useEffect, useState } from 'react';
import NewAdvancedSearchFilters from '../../../components/NewAdvancedSearchFilters';

const AdvancedSearchPage = () => {
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [allMockResults, setAllMockResults] = useState<any[]>([]);
    const [isAdvancedSearchOpen, setAdvancedSearchOpen] = useState(true);


    useEffect(() => {
        // Add CSS files
        const cssFiles = [
            '/css/style.css',
            '/css/colors/blue.css',
        ];
        cssFiles.forEach(file => {
            if (!document.querySelector(`link[href="${file}"]`)) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = file;
                document.head.appendChild(link);
            }
        });

        if (typeof window.jQuery !== 'undefined') {
            const $ = window.jQuery;
            $('.selectpicker').selectpicker({
                noneSelectedText: "seçilməyib"
            });
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock search results with pagination
        const allResults = Array.from({ length: 25 }, (_, i) => ({
            id: i + 1,
            title: `Nümunə Vakansiya ${i + 1}`,
            date: `${i % 3 + 1} gün əvvəl`,
            salary: `${500 + i * 50} AZN`,
            link: '#'
        }));
        setAllMockResults(allResults);
        setTotalPages(Math.ceil(allResults.length / 10));
        setCurrentPage(1); // Reset to first page on new search
    };

    useEffect(() => {
        const start = (currentPage - 1) * 10;
        const end = start + 10;
        setSearchResults(allMockResults.slice(start, end));
    }, [currentPage, allMockResults]);

    return (
        <div id="wrapper" style={{ overflowY: 'hidden' }}>
            <div className="clearfix"></div>
            <div className="intro-banner" style={{padding: '150px 0 105px 0', backgroundColor: '#f9f9f9'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 headline-slogan">
                        <div className="banner-headline" style={{marginBottom: '35px'}}>
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
                            <div className="intro-banner-search-form" style={{ marginTop: '20px' }}>
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
            <div className="container">
                <div className="margin-top-70"></div>

                {searchResults.length > 0 && (
                    <div className="tasks-list-container margin-top-35">
                        {searchResults.map(job => (
                            <a href={job.link} key={job.id} className="task-listing">
                                <div className="task-listing-details">
                                    <div className="task-listing-description">
                                        <h3 className="task-listing-title">{job.title}</h3>
                                        <ul className="task-icons">
                                            <li><i className="icon-material-outline-access-time"></i> {job.date}</li>
                                        </ul>
                                        <p className="task-listing-text">Peşələr</p>
                                    </div>
                                </div>
                                <div className="task-listing-bid">
                                    <div className="task-listing-bid-inner">
                                        <div className="task-offers">
                                            <strong>{job.salary}</strong>
                                        </div>
                                        <span className="button button-sliding-icon ripple-effect">Bax <i className="icon-material-outline-arrow-right-alt"></i></span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}

                {searchResults.length > 0 && (
                    <div className="clearfix"></div>
                )}
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
    );
};

export default AdvancedSearchPage;