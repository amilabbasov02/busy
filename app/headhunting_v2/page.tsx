"use client";
import React, { useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';

const HeadhuntingV2Page = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className={styles.pageWrapper}>
            <main className={styles.main}>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <div className={styles.heroBackground}>
                        <Image src="/images/home-background.jpg" layout="fill" objectFit="cover" alt="Business Professionals" />
                    </div>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>Executive Talent Acquisition Redefined</h1>
                        <p className={styles.heroSubtitle}>Connecting visionary companies with world-class leadership.</p>
                    </div>
                </section>

                {/* Service Overview */}
                <section className={styles.section}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle}>Our Expertise</h2>
                        <div className={styles.grid}>
                            <div className={styles.card}>
                                <i className={`icon-feather-user-check ${styles.cardIcon}`}></i>
                                <h3 className={styles.cardTitle}>C-Level Search</h3>
                                <p className={styles.cardText}>Identifying and attracting top-tier executives to lead your company's future.</p>
                            </div>
                            <div className={styles.card}>
                                <i className={`icon-feather-briefcase ${styles.cardIcon}`}></i>
                                <h3 className={styles.cardTitle}>Board Appointments</h3>
                                <p className={styles.cardText}>Building diverse and effective boards to guide your strategic vision.</p>
                            </div>
                            <div className={styles.card}>
                                <i className={`icon-feather-globe ${styles.cardIcon}`}></i>
                                <h3 className={styles.cardTitle}>Global Talent Mapping</h3>
                                <p className={styles.cardText}>Providing insights into the global talent landscape to inform your hiring strategy.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Process Timeline */}
                <section className={`${styles.section} ${styles.lightBg}`}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle}>Our Process</h2>
                        <div className={styles.timeline}>
                            <div className={styles.timelineItem}>
                                <div className={styles.timelineIcon}>1</div>
                                <h3 className={styles.timelineTitle}>Discovery & Strategy</h3>
                                <p>We partner with you to understand your unique needs and culture.</p>
                            </div>
                            <div className={styles.timelineItem}>
                                <div className={styles.timelineIcon}>2</div>
                                <h3 className={styles.timelineTitle}>Market Research</h3>
                                <p>We conduct a comprehensive search to identify exceptional candidates.</p>
                            </div>
                            <div className={styles.timelineItem}>
                                <div className={styles.timelineIcon}>3</div>
                                <h3 className={styles.timelineTitle}>Candidate Engagement</h3>
                                <p>We rigorously vet and present only the most qualified individuals.</p>
                            </div>
                            <div className={styles.timelineItem}>
                                <div className={styles.timelineIcon}>4</div>
                                <h3 className={styles.timelineTitle}>Integration Support</h3>
                                <p>We ensure a smooth transition for your new executive hire.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className={styles.section}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle}>Success Stories</h2>
                        <div className={`${styles.grid} ${styles.testimonialGrid}`}>
                            <div className={styles.testimonialCard}>
                                <blockquote>“The best headhunting firm we've ever worked with. They found us a CEO who has transformed our company.”</blockquote>
                                <cite>— Leyla H., Tech Industry Leader</cite>
                            </div>
                            <div className={styles.testimonialCard}>
                                <blockquote>“Their process is meticulous and their understanding of our industry is unparalleled. Highly recommended.”</blockquote>
                                <cite>— Anar M., Finance Director</cite>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Form */}
                <section className={`${styles.section} ${styles.darkBg}`}>
                    <div className={styles.container}>
                        <h2 className={`${styles.sectionTitle} ${styles.lightText}`}>Partner With Us</h2>
                        <p className={styles.sectionSubtitle}>Ready to find your next leader? Get in touch.</p>
                        <form className={styles.contactForm}>
                            <div className={styles.formGroup}>
                                <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleInputChange} required />
                                <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleInputChange} required />
                            </div>
                            <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleInputChange} rows={5} required></textarea>
                            <button type="submit" className={styles.submitBtn}>Send Inquiry</button>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HeadhuntingV2Page;