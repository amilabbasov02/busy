"use client";
import React from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';

const JobseekersV2Page = () => {
    const jobseekers = [
        { id: 1, name: 'Ayan Babayeva', position: 'Senior Frontend Developer', location: 'Baku, Azerbaijan', skills: ['React', 'Next.js', 'TypeScript'], experience: '5+ Years', photo: '/images/user-avatar-big-01.jpg', slug: 'ayan-babayeva' },
        { id: 2, name: 'Tural Abbasov', position: 'Lead UX/UI Designer', location: 'Remote', skills: ['Figma', 'User Research', 'Prototyping'], experience: '8 Years', photo: '/images/user-avatar-big-02.jpg', slug: 'tural-abbasov' },
        { id: 3, name: 'Nigar Huseynova', position: 'DevOps Engineer', location: 'Ganja, Azerbaijan', skills: ['AWS', 'Docker', 'Kubernetes'], experience: '4 Years', photo: '/images/user-avatar-big-03.jpg', slug: 'nigar-huseynova' },
        { id: 4, name: 'Elvin Mammadov', position: 'Product Manager', location: 'Baku, Azerbaijan', skills: ['Agile', 'Roadmapping', 'Jira'], experience: '7 Years', photo: '/images/user-avatar-placeholder.png', slug: 'elvin-mammadov' },
    ];

    return (
        <div className={styles.pageWrapper}>
            <main className={styles.main}>
                <div className={styles.container}>
                    {/* Search and Filter Section */}
                    <section className={styles.searchSection}>
                        <div className={styles.searchBox}>
                            <input type="text" placeholder="Job title or keyword" />
                            <input type="text" placeholder="Location" />
                            <input type="text" placeholder="Skills (e.g., React, Python)" />
                            <button>Search</button>
                        </div>
                    </section>

                    {/* Categories Section */}
                    <section className={styles.categoriesSection}>
                        <button className={styles.categoryTag}>IT & Development</button>
                        <button className={styles.categoryTag}>Design & Creative</button>
                        <button className={styles.categoryTag}>Marketing & Sales</button>
                        <button className={styles.categoryTag}>Engineering</button>
                        <button className={styles.categoryTag}>Management</button>
                    </section>

                    {/* Jobseekers Grid */}
                    <section className={styles.jobseekersGrid}>
                        {jobseekers.map(seeker => (
                            <Link href={`/jobseeker_v2/${seeker.slug}`} key={seeker.id} className={styles.profileCard}>
                                <div className={styles.cardHeader}>
                                    <Image src={seeker.photo} alt={seeker.name} width={80} height={80} className={styles.profilePhoto} />
                                    <div className={styles.headerText}>
                                        <h3 className={styles.profileName}>{seeker.name}</h3>
                                        <p className={styles.profilePosition}>{seeker.position}</p>
                                    </div>
                                </div>
                                <div className={styles.cardBody}>
                                    <p className={styles.profileInfo}><i className="icon-feather-map-pin"></i> {seeker.location}</p>
                                    <p className={styles.profileInfo}><i className="icon-feather-award"></i> {seeker.experience}</p>
                                    <div className={styles.skills}>
                                        {seeker.skills.map(skill => (
                                            <span key={skill} className={styles.skillTag}>{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </section>
                </div>
            </main>
        </div>
    );
};

export default JobseekersV2Page;