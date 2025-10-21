"use client";
import React, { useEffect, useState } from 'react';

const AdvancedSearchPage = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        professions: [],
        cities: [],
        worktypes: [],
        educations: [],
        experiences: '',
        minimum_salary: '',
        maximum_salary: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [allMockResults, setAllMockResults] = useState<any[]>([]);

    useEffect(() => {
        // Add CSS files
        const cssFiles = [
            '/css/style.css',
            '/css/colors/blue.css',
            '/css/advsearch.css'
        ];
        cssFiles.forEach(file => {
            if (!document.querySelector(`link[href="${file}"]`)) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = file;
                document.head.appendChild(link);
            }
        });

        // Initialize selectpicker and destroy on unmount
        const initSelectPicker = () => {
            if (typeof (window as any)?.$?.fn?.selectpicker === 'function') {
                (window as any).$('.selectpicker').selectpicker();
                return true;
            }
            return false;
        };

        const intervalId = setInterval(() => {
            if (initSelectPicker()) {
                clearInterval(intervalId);
            }
        }, 100);

        // Cleanup function
        return () => {
            clearInterval(intervalId);
            if (typeof (window as any)?.$?.fn?.selectpicker === 'function') {
                if ((window as any).$('.selectpicker').data('selectpicker')) {
                    (window as any).$('.selectpicker').selectpicker('destroy');
                }
            }
        };
    }, []);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.getAttribute('data-text');
        if (text) {
            setSelectedCategories(prev =>
                e.target.checked ? [...prev, text] : prev.filter(c => c !== text)
            );
        }
    };

    const selectAllCategories = () => {
        const allCategories: string[] = [];
        const checkboxes = document.querySelectorAll('.chb input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            (checkbox as HTMLInputElement).checked = true;
            const text = (checkbox as HTMLInputElement).getAttribute('data-text');
            if (text) {
                allCategories.push(text);
            }
        });
        setSelectedCategories(allCategories);
    };

    const unselectAllCategories = () => {
        const checkboxes = document.querySelectorAll('.chb input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            (checkbox as HTMLInputElement).checked = false;
        });
        setSelectedCategories([]);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock search results
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

    const handleClearAndClose = () => {
        unselectAllCategories();
        setIsPopupOpen(false);
    };

    return (
        <div id="wrapper" style={{ overflowY: 'hidden' }}>
            <div className="clearfix"></div>
            <div id="titlebar" className="gradient">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Ətraflı axtarış</h2>
                            <nav id="breadcrumbs" className="dark d-none">
                                <ul itemScope itemType="http://schema.org/BreadcrumbList">
                                    <li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                        <a itemProp="item" href="">
                                            Baş səhifə
                                            <meta itemProp="position" content="1" />
                                            <meta itemProp="name" content="Baş səhifə" />
                                        </a>
                                    </li>
                                    <li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                        <a itemProp="item" href="/search">
                                            Axtar
                                            <meta itemProp="position" content="2" />
                                            <meta itemProp="name" content="Axtar" />
                                        </a>
                                    </li>
                                    <li style={{ display: 'none' }} itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                                        <a itemProp="item" href="/search/vacancy/advanced">
                                            Ətraflı axtarış
                                            <meta itemProp="position" content="3" />
                                            <meta itemProp="name" content="Ətraflı axtarış" />
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container overflow-hidden">
                <form method="get" action="" className="adv_search_form" onSubmit={handleSubmit}>
                    <input type="hidden" name="search" value="yes" />
                    <div className="row">
                        <div className="sidebar-widget col-xl-4 col-md-4">
                            <div className="section-headline margin-top-25 margin-bottom-12">
                                <h5>Kateqoriyalar</h5>
                            </div>
                            <div id="selectionDisplay">
                                {selectedCategories.map((category, index) => (
                                    <span key={index}>{category}</span>
                                ))}
                            </div>
                            <input className="search" type="text" readOnly placeholder="Kateqoriyalar" onClick={() => setIsPopupOpen(true)} />

                            <div className={`pop-up ${isPopupOpen ? 'active_pop' : ''}`}>
                                <div className="pop-bg" onClick={() => setIsPopupOpen(false)}></div>
                                <div className="pop form-group address_form_group" id="adJsslot_id">
                                    <div className="form-select" id="slot_id">
                                        <div className="region ">
                                            <label className="chb country" htmlFor="slot_id166">
                                                <input style={{ marginBottom: '0px !important' }} type="checkbox" data-text="Müştəri xidmətləri" name="categories[]" value="166" id="slot_id166" data-id="166" onChange={handleCategoryChange} checked={selectedCategories.includes('Müştəri xidmətləri')} />
                                                <span>Müştəri xidmətləri</span>
                                            </label>
                                        </div>
                                        <div className="region  sub_items ">
                                            <b>
                                                <img src="/site/images/arrow.svg" alt="" />
                                            </b>
                                            <label className="chb country" htmlFor="slot_id3">
                                                <input style={{ marginBottom: '0px !important' }} type="checkbox" data-text="Mühasibat, idarəetmə uçotu, maliyyə" name="categories[]" value="3" id="slot_id3" data-id="3" onChange={handleCategoryChange} checked={selectedCategories.includes('Mühasibat, idarəetmə uçotu, maliyyə')} />
                                                <span>Mühasibat, idarəetmə uçotu, maliyyə</span>
                                            </label>
                                            <div className="selectable">
                                                <label className="chb" htmlFor="slot_id26">
                                                    <input type="checkbox" style={{ marginBottom: '0px !important' }} data-text="Mühasib" name="categories[]" value="26" id="slot_id26" data-id="26" onChange={handleCategoryChange} checked={selectedCategories.includes('Mühasib')} />
                                                    <span>&nbsp;Mühasib</span>
                                                </label>
                                                <label className="chb" htmlFor="slot_id27">
                                                    <input type="checkbox" style={{ marginBottom: '0px !important' }} data-text="Audit" name="categories[]" value="27" id="slot_id27" data-id="27" onChange={handleCategoryChange} checked={selectedCategories.includes('Audit')} />
                                                    <span>&nbsp;Audit</span>
                                                </label>
                                            </div>
                                       </div>
                                   </div>
                                   <div className="all_select_change" style={{ display: 'block' }}>
                                       <label className="all_slc_items all_unslc" onClick={handleClearAndClose}>
                                           <input type="radio" name="fullSelect" />
                                           <span>Bağla</span>
                                       </label>
                                       <label className="all_slc_items all_slc" onClick={() => setIsPopupOpen(false)}>
                                           <input type="radio" name="fullSelect" />
                                           <span>Seçin</span>
                                       </label>
                                   </div>
                               </div>
                           </div>
                       </div>

                       <div className="col-xl-4 col-md-4">
                           <div className="section-headline margin-top-25 margin-bottom-12">
                               <h5>İxtisaslar</h5>
                           </div>
                           <div className="btn-group bootstrap-select show-tick">
                               <select className="selectpicker" name="professions[]" data-live-search="true" multiple title="seçilməyib">
                                   <option value="113">.NET developer</option>
                                   <option value="1833">1C accountant</option>
                               </select>
                           </div>
                       </div>

                       <div className="col-xl-4 col-md-4">
                           <div className="section-headline margin-top-25 margin-bottom-12">
                               <h5>Bölgə</h5>
                           </div>
                           <div className="btn-group bootstrap-select show-tick">
                               <select className="selectpicker" name="cities[]" data-live-search="true" multiple title="seçilməyib">
                                   <option value="1">Bakı</option>
                                   <option value="2">Sumqayıt</option>
                               </select>
                           </div>
                       </div>

                       <div className="col-xl-4 col-md-4 margin-bottom-10">
                           <div className="section-headline margin-top-25 margin-bottom-12">
                               <h5>Məşğulluq növü</h5>
                           </div>
                           <div className="btn-group bootstrap-select show-tick">
                               <select className="selectpicker" name="worktypes[]" data-live-search="true" multiple title="seçilməyib">
                                   <option value="1">Tam ştat (full time)</option>
                                   <option value="2">Yarımştat (part time)</option>
                               </select>
                           </div>
                       </div>

                       <div className="col-xl-4 col-md-4">
                           <div className="section-headline margin-top-25 margin-bottom-12">
                               <h5>Təhsil</h5>
                           </div>
                           <div className="btn-group bootstrap-select show-tick">
                               <select className="selectpicker" name="educations[]" data-live-search="true" multiple title="seçilməyib">
                                   <option value="2">Orta</option>
                                   <option value="7">Ali</option>
                               </select>
                           </div>
                       </div>

                       <div className="col-xl-4 col-md-4">
                           <div className="section-headline margin-top-25 margin-bottom-12">
                               <h5>İş təcrübəsi (minimum il)</h5>
                           </div>
                           <div className="btn-group bootstrap-select">
                               <select className="selectpicker" name="experiences[]ssa" data-live-search="true" title="Seçilməyib" defaultValue="0">
                                   <option value="0" disabled>Seçilməyib</option>
                                   <option value="1">Tələb olunmur</option>
                               </select>
                           </div>
                       </div>

                        <div className="col-xl-2 col-md-2">
                            <div className="section-headline margin-top-25" style={{ marginBottom: '13px' }}>
                                <h5>Minimum maaş</h5>
                            </div>
                            <input type="number" name="minimum_salary" id="minimum" placeholder="minimum" onChange={handleFormChange} />
                        </div>

                        <div className="col-xl-2 col-md-2">
                            <div className="section-headline margin-top-25 " style={{ marginBottom: '13px' }}>
                                <h5>Maksimum maaş</h5>
                            </div>
                            <input type="number" name="maximum_salary" id="maximum" placeholder="maximum" onChange={handleFormChange} />
                        </div>

                        <div className="col-xl-12 col-md-12 margin-top-20">
                            <button type="submit" className="button ripple-effect button-sliding-icon" style={{ width: '125.297px' }}>
                                Göndər
                                <i className="icon-feather-check"></i>
                            </button>
                        </div>
                    </div>
                </form>
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