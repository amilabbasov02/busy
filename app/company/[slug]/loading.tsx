import React from 'react';
import styles from './page.module.css';

export default function Loading() {
    return (
        <div className={styles.profilePage}>
            <main className={styles.mainContent}>
                <header className={styles.banner}>
                    <div className={styles.glassmorphism}>
                        <div className={styles.companyHeader}>
                            <div className={styles.companyIdentity}>
                                <div className={styles.companyLogo}>
                                    <div className="skeleton skeleton-logo"></div>
                                </div>
                                <div className={styles.companyInfo}>
                                    <div className="skeleton skeleton-title"></div>
                                    <div className="skeleton skeleton-meta"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className={styles.tabNavigation}>
                    <div className="skeleton skeleton-tab"></div>
                    <div className="skeleton skeleton-tab"></div>
                </div>
                
                <div className={styles.tabContent}>
                    <div className="skeleton skeleton-line"></div>
                    <div className="skeleton skeleton-line"></div>
                    <div className="skeleton skeleton-line"></div>
                </div>
            </main>
        </div>
    );
}