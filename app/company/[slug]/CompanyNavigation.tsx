"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './page.module.css';

interface CompanyNavigationProps {
    slug: string;
    vacancies_count: number;
}

export default function CompanyNavigation({ slug, vacancies_count }: CompanyNavigationProps) {
    const pathname = usePathname();

    return (
        <div className={styles.tabNavigation}>
            <Link href={`/company/${slug}`} className={pathname === `/company/${slug}` ? styles.activeTab : ''}>
                Şirkət haqqında
            </Link>
            <Link href={`/company/${slug}/vacancies`} className={pathname.includes('/vacancies') ? styles.activeTab : ''}>
                Vakansiyalar
            </Link>
        </div>
    );
}