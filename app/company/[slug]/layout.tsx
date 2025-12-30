import React from 'react';
import styles from './page.module.css';
import './page.css';
import { Company } from './CompanyContext';
import CompanyProvider from './CompanyProvider';
import CompanyNavigation from './CompanyNavigation';
import { cachedFetchUpstream } from '@/lib/http/cachedFetchUpstream';

async function getCompany(slug: string): Promise<Company | null> {
    try {
        const res = await cachedFetchUpstream(`https://api.busy.az/api/companies/${slug}/detail`, { next: { revalidate: 3600 } });
        if (!res.ok) {
            return null;
        }
        return res.json();
    } catch (error) {
        console.error("Failed to fetch company details:", error);
        return null;
    }
}

export default async function CompanyLayout({
    children,
    params,
}: {
    children: React.ReactNode,
    // Next.js version/type-check differs across routes; allow both Promise and plain object.
    params: any
}) {
    const { slug } = await params;
    const company = await getCompany(slug);

    if (!company) {
        return <div>Company not found.</div>;
    }

    return (
        <CompanyProvider value={company}>
            <div className={styles.profilePage}>
                <main className={styles.mainContent}>
                    <header className={styles.banner}>
                        <div className={styles.glassmorphism}>
                            <div className={styles.companyHeader}>
                                <div className={styles.companyIdentity}>
                                    <div className={styles.companyLogo}>
                                        <img
                                            src={`https://busy.az${company.logo}` || "/images/company-logo-01.png"}
                                            alt={`${company.title} Logo`}
                                            width="100"
                                            height="100"
                                        />
                                    </div>
                                    <div className={styles.companyInfo}>
                                        <h1>{company.title}</h1>
                                        <div className={styles.companyMeta}>
                                            <div className={styles.companyRating}>
                                                <i className="icon-material-outline-star"></i> {company.rating || 'N/A'}
                                            </div>
                                            <button className={styles.favoriteButton}>
                                                <i className="icon-feather-heart"></i> Seçilmişlərə əlavə et
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    <CompanyNavigation slug={slug} vacancies_count={company.vacancies_count} />
                    
                    {children}
                </main>
            </div>
        </CompanyProvider>
    );
}
