"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import './job-alerts.css';

interface JobAlertVacancy {
    id: number;
    title: string;
    criteria: string;
    date: string;
}

const JobAlertsPage = () => {
    const [vacancies, setVacancies] = useState<JobAlertVacancy[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const sampleData: JobAlertVacancy[] = [
            { id: 1, title: "Social Media Expert", criteria: "Lorem Ipsum is simply dummy text.", date: "December 15, 2018" },
            { id: 2, title: "Web Designer", criteria: "Lorem Ipsum is simply dummy text.", date: "November 10, 2018" },
            { id: 3, title: "Finance Accountant", criteria: "Lorem Ipsum is simply dummy text.", date: "October 5, 2018" },
            { id: 4, title: "Social Media Expert", criteria: "Lorem Ipsum is simply dummy text.", date: "December 15, 2018" },
            { id: 5, title: "Web Designer", criteria: "Lorem Ipsum is simply dummy text.", date: "November 10, 2018" },
        ];
        setVacancies(sampleData);
        setLoading(false);
    }, []);

    return (
        <>
            <div className="dashboard-headline">
                <h3>JOB ALERTS</h3>
            </div>

                <div className="row">
                    <div className="col-xl-12">
                        {loading ? (
                            <p>Yüklənir...</p>
                        ) : vacancies.length > 0 ? (
                            <table className="job-alerts-table">
                                <thead>
                                    <tr>
                                        <th>Premium jobs</th>
                                        <th>Criterias</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vacancies.map(vacancy => (
                                        <tr key={vacancy.id}>
                                            <td className="job-title">{vacancy.title}</td>
                                            <td className="job-criteria">{vacancy.criteria}</td>
                                            <td>{vacancy.date}</td>
                                            <td>
                                                <div className="action-buttons">
                                                    <a href="#" className="button blue ripple-effect ico" title="Bax" data-tippy-placement="left"><i className="icon-feather-eye"></i></a>
                                                    <a href="#" className="button red ripple-effect ico" title="Sil" data-tippy-placement="left"><i className="icon-feather-trash-2"></i></a>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="notification notice" style={{ margin: '20px' }}>
                                <p>Profilinizə uyğun yeni iş elanı tapılmadı.</p>
                            </div>
                        )}
                    </div>
            </div>
        </>
    );
};

export default JobAlertsPage;