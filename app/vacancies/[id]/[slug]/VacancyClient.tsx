"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

interface VacancyDetails {
    id: number;
    job_title: string;
    slug: string;
    content: {
        content: string;
    };
    salary_start: number | null;
    salary_end: number | null;
    published: string;
    deadline: string;
    email: string;
    is_prime: number;
    company: {
        id: number;
        title: string;
        logo: string;
        slug: string;
    };
    city_rels: {
        city: {
            id: number;
            title: { az: string; en: string; ru: string; };
        }
    }[];
    category: {
        id: number;
        title: { az: string; en: string; ru: string; };
        slug: { az: string; en: string; ru: string; };
    };
    skills: {
        tag: {
            id: number;
            title: string;
        }
    }[];
    professions: {
        professions_id: number;
        profession: {
            id: number;
            title: string;
            slug: string;
        };
    }[];
    employment_type: {
        id: number;
        title: { az: string; en: string; ru: string; };
    };
}

// Server page returns a subset of fields; keep this client tolerant.
interface VacancyClientProps {
    vacancy: any;
    similarVacancies?: any[];
}

const VacancyPage = ({ vacancy: initialVacancy, similarVacancies: initialSimilar = [] }: VacancyClientProps) => {
    const [vacancy, setVacancy] = useState<VacancyDetails | null>(initialVacancy);
    const [similarVacancies, setSimilarVacancies] = useState<VacancyDetails[]>(initialSimilar);
    const [showEmail, setShowEmail] = useState(false);

    useEffect(() => {
        if (!vacancy?.professions?.[0]?.profession?.id || initialSimilar.length) return;
        const fetchSimilarVacancies = async () => {
            try {
                const professionId = vacancy.professions[0].profession.id;
                const response = await fetch(`/api/bff/api/vacancies?profession_id=${professionId}&limit=5`);
                const data = await response.json();
                setSimilarVacancies(data.vacancies.filter((v: VacancyDetails) => v.id !== vacancy.id));
            } catch (error) {
                console.error("Failed to fetch similar vacancies:", error);
            }
        };
        fetchSimilarVacancies();
    }, [vacancy, initialSimilar.length]);

    if (!vacancy) {
        return <div className="container"><p>Vakansiya tapılmadı.</p></div>;
    }

    const companyLogo = (vacancy.company?.logo?.startsWith('http') ? vacancy.company.logo : `https://busy.az${vacancy.company.logo}`) || '/images/company-logo-placeholder.png';

    const handleApplyClick = () => {
        if (!showEmail) {
            setShowEmail(true);
        } else {
            window.location.href = `mailto:${vacancy?.email}`;
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <img src={companyLogo} alt={vacancy.company?.title} className={styles.companyLogo} />
                    <div className={styles.headerInfo}>
                        <h1 className={styles.jobTitle}>{vacancy.job_title}</h1>
                        <Link href={`/company/${vacancy.company?.slug}`} className={styles.companyName}>{vacancy.company?.title}</Link>
                    </div>
                    <div className={styles.actions}>
                        <button onClick={handleApplyClick} className={styles.applyButton}>
                            {showEmail ? vacancy?.email : 'Müraciət Et'}
                        </button>
                        <a href="#" className={styles.saveButton}>Yadda Saxla</a>
                    </div>
                </div>

                <div className={styles.mainContent}>
                    <div className={styles.jobDetails}>
                        <div className={styles.contentBlock}>
                            <h2 className={styles.contentTitle}>İşin Təsviri</h2>
                            <div className={styles.jobDescription} dangerouslySetInnerHTML={{ __html: vacancy.content.content }} />
                        </div>
                    </div>

                    <aside className={styles.sidebar}>
                        <div className={styles.sidebarWidget}>
                            <h3 className={styles.sidebarTitle}>İş detalları</h3>
                            <ul className={styles.jobDetailsList}>
                                {vacancy.city_rels && vacancy.city_rels.length > 0 && (
                                    <li><strong>Yer:</strong> <span>{vacancy.city_rels.map(cr => cr.city.title.az).join(', ')}</span></li>
                                )}
                                <li><strong>Məşğulluq növü:</strong> <span>{vacancy.employment_type?.title?.az}</span></li>
                                <li><strong>Maaş:</strong> <span>{vacancy.salary_start && vacancy.salary_end ? `${vacancy.salary_start} - ${vacancy.salary_end} AZN` : `Razılaşma yolu ilə`}</span></li>
                                <li><strong>Yayım tarixi:</strong> <span>{new Date(vacancy.published).toLocaleDateString()}</span></li>
                                <li><strong>Son müraciət:</strong> <span>{new Date(vacancy.deadline).toLocaleDateString()}</span></li>
                            </ul>
                        </div>

                        {vacancy.skills && vacancy.skills.length > 0 && (
                            <div className={styles.sidebarWidget}>
                                <h3 className={styles.sidebarTitle}>İş bacarıqları</h3>
                                <div className={styles.tagsContainer}>
                                    {vacancy.skills.map(skill => (
                                        <Link key={skill.tag.id} href={`/vacancies?skill=${encodeURIComponent(skill.tag.title)}`} className={styles.tag}>
                                            {skill.tag.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {vacancy.professions && vacancy.professions.length > 0 && (
                            <div className={styles.sidebarWidget}>
                                <h3 className={styles.sidebarTitle}>Vəzifələr</h3>
                                <div className={styles.tagsContainer}>
                                    {vacancy.professions.map(item => (
                                        item.profession?.title && (
                                            <Link key={item.profession.id} href={`/vacancies?profession=${encodeURIComponent(item.profession.title)}`} className={styles.tag}>
                                                {item.profession.title}
                                            </Link>
                                        )
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        <div className={styles.sidebarWidget}>
                            <h3 className={styles.sidebarTitle}>Kateqoriya</h3>
                            <div className={styles.tagsContainer}>
                                {vacancy.category?.title?.az && (
                                    <Link href={`/vacancies?category=${encodeURIComponent(vacancy.category.slug.az)}`} className={styles.tag}>
                                        {vacancy.category.title.az}
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className={styles.sidebarWidget}>
                            <h3 className={styles.sidebarTitle}>Paylaş</h3>
                            <div className={styles.shareButtons}>
                                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className={styles.shareButton}><i className="icon-brand-linkedin-in"></i></a>
                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className={styles.shareButton}><i className="icon-brand-facebook-f"></i></a>
                                <a href={`https://twitter.com/intent/tweet?url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className={styles.shareButton}><i className="icon-brand-twitter"></i></a>
                                <a href={`mailto:?subject=${encodeURIComponent(vacancy.job_title)}&body=${window.location.href}`} target="_blank" rel="noopener noreferrer" className={styles.shareButton}><i className="icon-feather-mail"></i></a>
                            </div>
                        </div>
                    </aside>
                </div>

                {similarVacancies.length > 0 && (
                    <div className={styles.similarJobsSection}>
                        <h2 className={styles.sectionTitle}>Bənzər Vakansiyalar</h2>
                        <div className={styles.similarJobsGrid}>
                            {similarVacancies.map(job => (
                                <Link href={`/vacancies/${job.id}/${job.slug}`} key={job.id} className={styles.similarJobCard}>
                                    <img src={(job.company?.logo?.startsWith('http') ? job.company.logo : `https://busy.az${job.company.logo}`) || '/images/company-logo-placeholder.png'} alt={job.company?.title} />
                                    <div className={styles.similarJobInfo}>
                                        <h4>{job.job_title}</h4>
                                        <p>{job.company?.title}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VacancyPage;
