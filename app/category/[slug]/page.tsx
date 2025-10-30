"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';

declare global {
    interface Window {
        jQuery: any;
    }
}

const CategoryPage = () => {
    const [scriptsLoaded, setScriptsLoaded] = useState(false);

    useEffect(() => {
        if (window.jQuery && (window.jQuery as any).fn.select2) {
            (window.jQuery('.select2') as any).select2();
        }
    }, []);

    // Mock data for vacancies in this category
    const vacancies = [
        { id: 169763, title: 'Sürücü', company: 'Apar (Bike-Sharing Startup)', link: '/vacancies/surucu', date: 'bugün', salary: '-' },
        { id: 169781, title: 'Ofis meneceri', company: 'Softech', link: '/vacancies/ofis-meneceri', date: 'bugün', salary: '-' },
        { id: 169531, title: 'Administrativ Assistant', company: 'Konsis', link: '/vacancies/administrativ-assistant', date: '3 gün əvvəl', salary: '-' },
        { id: 169608, title: 'Ofis meneceri', company: 'Af Holding', link: '/vacancies/ofis-meneceri-af-holding', date: '3 gün əvvəl', salary: '-' },
        { id: 169621, title: 'Resepşn (Gündüz Növbəsi)', company: 'Maestro Boutique Hotel', link: '/vacancies/resepsn-gunduz-novbesi', date: '3 gün əvvəl', salary: '500 -' },
        { id: 169632, title: 'Xadimə', company: 'Kaspi Təhsil Şirkəti', link: '/vacancies/xadime', date: '3 gün əvvəl', salary: '-' },
        { id: 169649, title: 'Personal Assistant', company: 'LV Caspian Ltd', link: '/vacancies/personal-assistant', date: '3 gün əvvəl', salary: '1200 - 1500' },
        { id: 169664, title: 'Call Center Operator (Remote Job)', company: 'Fusion Call', link: '/vacancies/call-center-operator-remote-job', date: '3 gün əvvəl', salary: '-' },
        { id: 169688, title: 'Operator call center', company: 'Azericard', link: '/vacancies/operator-call-center', date: '3 gün əvvəl', salary: '-' },
        { id: 169513, title: 'Reception', company: 'İMC1', link: '/vacancies/reception', date: '4 gün əvvəl', salary: '1000 - 1500' },
    ];

    return (
        <>
            <Head>
                <title>İnzibati (administrativ) işlər sahəsinə aid iş elanları</title>
                <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
            </Head>
            <Script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossOrigin="anonymous" strategy="afterInteractive" />
            <Script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
            <Script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js" strategy="afterInteractive" />
            <div id="wrapper" style={{ overflowY: 'hidden' }}>
                <div className="clearfix"></div>
                <div id="titlebar" className="gradient">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h2>İnzibati (administrativ) işlər sahəsinə aid iş elanları və son vakansiyalar</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-lg-4">
                            <div className="sidebar-container" id="form">
                                <form method="GET" action="/category/inzibati-administrativ-isler">
                                    <div className="sidebar-widget">
                                        <h3>Alt kateqoriyalar</h3>
                                        <select className="select2" data-placeholder="seçilməyib">
                                            <option></option>
                                            <option>Call Center əməkdaşı</option>
                                            <option>Təmizlikçi xadimə</option>
                                            <option>Kuryer</option>
                                            <option>Sürücü</option>
                                            <option>Ofis menecer</option>
                                            <option>Şəxsi katib</option>
                                            <option>Resepşen</option>
                                        </select>
                                    </div>

                                    <div className="sidebar-widget">
                                        <h3>Açar-sözlər</h3>
                                        <select className="select2" data-placeholder="seçilməyib">
                                            <option></option>
                                            {/* Options */}
                                        </select>
                                    </div>

                                    <div className="sidebar-widget">
                                        <h3>Ərazi</h3>
                                        <select className="select2" data-placeholder="seçilməyib">
                                            <option></option>
                                            {/* Options */}
                                        </select>
                                    </div>

                                    <div className="sidebar-widget">
                                        <h3>Məşğulluq növü</h3>
                                        <div className="tags-container">
                                            <div className="tag">
                                                <input type="checkbox" id="type-1" />
                                                <label htmlFor="type-1">Tam ştat (full time)</label>
                                            </div>
                                            <div className="tag">
                                                <input type="checkbox" id="type-2" />
                                                <label htmlFor="type-2">Yarımştat (part time)</label>
                                            </div>
                                            <div className="tag">
                                                <input type="checkbox" id="type-3" />
                                                <label htmlFor="type-3">Layihə/Müvəqqəti</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sidebar-widget">
                                        <div className="clearfix"></div>
                                        <div className="salary margin-top-20">
                                            <h3>Maaş</h3>
                                            <input type="number" id="minimum" name="minimum_salary" placeholder="Minimum maaş" />
                                            <br />
                                            <input type="number" id="maximum" name="maximum_salary" placeholder="Maksimum maaş" />
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <button type="submit" className="button ripple-effect  button-sliding-icon">
                                        Filterlərmək
                                        <i className="icon-feather-check"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="col-xl-9 col-lg-8 content-left-offset">
                            <div className="tasks-list-container margin-top-35">
                                {vacancies.map(job => (
                                    <div className="task-listing" key={job.id}>
                                        <div className="task-listing-details">
                                            <div className="task-listing-description">
                                                <h3 className="task-listing-title"><Link href={job.link}>{job.title}</Link></h3>
                                                <ul className="task-icons">
                                                    <li>
                                                        <Link href={`/company/${job.company.toLowerCase().replace(/\s+/g, '-')}`} className="GrayToBlue">
                                                            <i className="icon-material-outline-business"></i> {job.company}
                                                        </Link>
                                                    </li>
                                                    <li><i className="icon-material-outline-access-time"></i>{job.date}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="task-listing-bid">
                                            <div className="task-listing-bid-inner">
                                                <div className="task-offers">
                                                    <strong>{job.salary}</strong>
                                                </div>
                                                <Link href={job.link} className="button button-sliding-icon ripple-effect">
                                                    Ətraflı <i className="icon-material-outline-arrow-right-alt"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="clearfix"></div>
                                <div className="pagination-container margin-top-30 margin-bottom-60">
                                    <nav className="pagination">
                                        <ul>
                                            <li className="pagination-arrow"><a href="#" className="ripple-effect"><i className="icon-material-outline-keyboard-arrow-left"></i></a></li>
                                            <li><a href="#" className="current-page ripple-effect">1</a></li>
                                            <li><a href="#" className="ripple-effect">2</a></li>
                                            <li className="pagination-arrow"><a href="#" className="ripple-effect"><i className="icon-material-outline-keyboard-arrow-right"></i></a></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryPage;