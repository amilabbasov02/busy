"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

const CompanyProfileV2 = () => {
    const params = useParams();
    const slug = params.slug || 'company-name';

    return (
        <div className={styles.profilePage}>
            <main className={styles.mainContent}>
                {/* Banner Section */}
                <header className={styles.banner}>
                    <Image
                        src="/images/home-background-02.jpg"
                        alt="Company Banner"
                        fill
                        style={{objectFit: 'cover'}}
                    />
                    <div className={styles.glassmorphism}>
                        <div className={styles.companyHeader}>
                            <div className={styles.companyLogo}>
                                <Image
                                    src="/images/company-logo-01.png"
                                    alt="Company Logo"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <div className={styles.companyInfo}>
                                <h1>{slug.toString().replace(/-/g, ' ')}</h1>
                                <p>Engineering the future, one line of code at a time.</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className={styles.mainGrid}>
                    {/* Left Column */}
                    <div className={styles.leftColumn}>
                        <section className={`${styles.section} ${styles.aboutSection}`}>
                            <h2>About Us</h2>
                            <p>
                                We are a forward-thinking tech company specializing in creating innovative solutions that drive progress. Our team is composed of passionate developers, designers, and strategists dedicated to excellence.
                            </p>
                        </section>

                        <section className={styles.section}>
                            <h2>Contact Information</h2>
                            <ul className={styles.contactList}>
                                <li><i className="icon-feather-globe"></i> <a href="https://example.com" target="_blank" rel="noopener noreferrer">example.com</a></li>
                                <li><i className="icon-feather-mail"></i> <a href="mailto:contact@example.com">contact@example.com</a></li>
                                <li><i className="icon-feather-phone"></i> <span>+1 234 567 890</span></li>
                            </ul>
                        </section>
                    </div>

                    {/* Right Column */}
                    <div className={styles.rightColumn}>
                        <section className={styles.section}>
                            <h2>Open Positions (3)</h2>
                            <div className={styles.jobListings}>
                                <div className={styles.jobCard}>
                                    <h3>Senior Frontend Developer</h3>
                                    <p>Remote / Full-time</p>
                                    <Link href="#" className={styles.jobLink}>View Job</Link>
                                </div>
                                <div className={styles.jobCard}>
                                    <h3>Lead UX/UI Designer</h3>
                                    <p>Baku, Azerbaijan / Full-time</p>
                                    <Link href="#" className={styles.jobLink}>View Job</Link>
                                </div>
                                <div className={styles.jobCard}>
                                    <h3>DevOps Engineer</h3>
                                    <p>Remote / Contract</p>
                                    <Link href="#" className={styles.jobLink}>View Job</Link>
                                </div>
                            </div>
                        </section>

                        <section className={styles.section}>
                            <h2>From Our Employees</h2>
                            <div className={styles.testimonials}>
                                <div className={styles.testimonialCard}>
                                    <blockquote>
                                        “An amazing place to grow and learn. The culture is all about collaboration and innovation.”
                                    </blockquote>
                                    <cite>– Aida, Software Engineer</cite>
                                </div>
                                <div className={styles.testimonialCard}>
                                    <blockquote>
                                        “The projects are challenging and rewarding. I feel like my work truly makes an impact.”
                                    </blockquote>
                                    <cite>– Tural, Product Manager</cite>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CompanyProfileV2;