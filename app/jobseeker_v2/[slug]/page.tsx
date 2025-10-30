"use client";
import React from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const JobseekerProfilePage = () => {
    const params = useParams();
    const slug = params.slug || 'jobseeker-name';

    return (
        <div className={styles.pageWrapper}>
            <main className={styles.main}>
                <div className={styles.container}>
                    {/* Hero Section */}
                    <section className={styles.hero}>
                        <div className={styles.heroContent}>
                            <div className={styles.profileImage}>
                                <Image src="/images/user-avatar-big-01.jpg" alt="Profile Photo" width={150} height={150} />
                            </div>
                            <div className={styles.heroText}>
                                <h1>Ayan Babayeva</h1>
                                <h2>Senior Frontend Developer</h2>
                                <p>Passionate about building modern, responsive, and user-friendly web applications. 5+ years of experience in the tech industry.</p>
                                <div className={styles.heroButtons}>
                                    <button className={styles.btnPrimary}>Download CV</button>
                                    <button className={styles.btnSecondary}>Contact</button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className={styles.mainGrid}>
                        {/* Left Column */}
                        <div className={styles.leftColumn}>
                            <div className={styles.card}>
                                <h3>Skills</h3>
                                <div className={styles.skillsGrid}>
                                    <span className={styles.skill}>React</span>
                                    <span className={styles.skill}>Next.js</span>
                                    <span className={styles.skill}>TypeScript</span>
                                    <span className={styles.skill}>JavaScript (ES6+)</span>
                                    <span className={styles.skill}>HTML5 & CSS3</span>
                                    <span className={styles.skill}>GraphQL</span>
                                </div>
                            </div>
                            <div className={styles.card}>
                                <h3>Education</h3>
                                <div className={styles.educationItem}>
                                    <h4>BSc in Computer Science</h4>
                                    <p>Baku State University | 2014 - 2018</p>
                                </div>
                            </div>
                            <div className={styles.card}>
                                <h3>Certifications</h3>
                                <div className={styles.certItem}>
                                    <h4>Advanced React</h4>
                                    <p>Coursera | 2021</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className={styles.rightColumn}>
                            <div className={styles.card}>
                                <h3>Work Experience</h3>
                                <div className={styles.experienceItem}>
                                    <h4>Senior Frontend Developer</h4>
                                    <p>Tech Solutions Inc. | 2020 - Present</p>
                                    <ul>
                                        <li>Led the development of a new e-commerce platform using Next.js.</li>
                                        <li>Mentored junior developers and conducted code reviews.</li>
                                        <li>Improved website performance by 30% through code optimization.</li>
                                    </ul>
                                </div>
                                <div className={styles.experienceItem}>
                                    <h4>Frontend Developer</h4>
                                    <p>Web Innovators | 2018 - 2020</p>
                                    <ul>
                                        <li>Developed and maintained client websites using React.</li>
                                        <li>Collaborated with designers to implement responsive designs.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.card}>
                                <h3>Video Introduction</h3>
                                <div className={styles.videoPlaceholder}>
                                    <i className="icon-feather-play"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default JobseekerProfilePage;