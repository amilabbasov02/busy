"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

interface Education {
  id: number;
  user_id: number;
  university_name: string;
  start_date: string;
  end_date: string;
  still_student: string;
}

interface Experience {
  id: number;
  user_id: number;
  company_id?: number;
  city_id?: number;
  country_id?: number;
  company_name?: string;
  position?: string;
  start_date?: string;
  end_date?: string;
  still_work?: string;
  still_working?: string;
  description?: string;
  profession?: {
    id: number;
    title: string;
    slug: string;
  } | null;
  company?: {
    id: number;
    title: string;
    slug: string;
  } | null;
}

interface Skill {
  id: number;
  user_id: number;
  tag_id: number;
  tag: {
    id: number;
    title: string;
  };
}

interface DesiredJob {
  id: number;
  user_id: number;
  profession_id: number;
  profession: {
    id: number;
    title: string;
    slug: string;
  } | null;
}

export interface Jobseeker {
  id: number;
  name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  gender: number;
  mobile: string;
  avatar: string | null;
  address: string;
  desired_salary_fixed: number | null;
  desired_currency: number;
  desired_jobs: DesiredJob[];
  skills: Skill[];
  educations: Education[];
  experiences: Experience[];
  currency: {
    id: number;
    title: {
      en: string;
      az: string;
      ru: string;
    };
  };
}

interface ApiResponse {
  data: Jobseeker;
}

interface Props {
  params: { id: string };
  initialJobseeker?: Jobseeker | null;
}

const JobseekerDetailPage = ({ params, initialJobseeker }: Props) => {
  const [jobseeker, setJobseeker] = useState<Jobseeker | null>(initialJobseeker ?? null);
  const [loading, setLoading] = useState(!initialJobseeker);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (initialJobseeker) return;
    const fetchJobseeker = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/bff/api/jobseeker/${params.id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch jobseeker data');
        }
        
        const data: ApiResponse = await response.json();
        setJobseeker(data.data);
      } catch (err) {
        console.error('Error fetching jobseeker:', err);
        setError('İşaxtaran məlumatları yüklənərkən xəta baş verdi. Zəhmət olmasa bir az sonra yenidən cəhd edin.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobseeker();
  }, [params.id, initialJobseeker]);
  
  const calculateAge = (dateOfBirth: string): number => {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    
    return age;
  };
  
  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('az-AZ', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Məlumatlar yüklənir...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>Xəta</h2>
        <p>{error}</p>
        <Link href="/jobseekers_v2" className={styles.backLink}>
          İşaxtaranlara qayıt
        </Link>
      </div>
    );
  }

  if (!jobseeker) {
    return (
      <div className={styles.errorContainer}>
        <h2>İşaxtaran tapılmadı</h2>
        <Link href="/jobseekers_v2" className={styles.backLink}>
          İşaxtaranlara qayıt
        </Link>
      </div>
    );
  }
  
  const fullName = `${jobseeker.name || ''} ${jobseeker.last_name || ''}`.trim();
  const age = jobseeker.date_of_birth ? calculateAge(jobseeker.date_of_birth) : null;
  const avatarSrc = jobseeker.avatar || "/images/user-avatar-placeholder.png";
  
  const professionTitles = jobseeker.desired_jobs
    ?.filter(job => job.profession)
    .map(job => job.profession?.title)
    .filter(Boolean) || [];
    
  const primaryProfession = professionTitles.length > 0 ? professionTitles[0] : "Vəzifə qeyd edilməyib";

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <Link href="/jobseekers_v2" className={styles.backButton}>
          <i className="fas fa-arrow-left"></i> İşaxtaranlara qayıt
        </Link>
      </div>

      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <div className={styles.profileImage}>
            <Image 
              src={avatarSrc}
              alt={fullName}
              width={150}
              height={150}
              className={styles.avatar}
              unoptimized
            />
          </div>
          <div className={styles.profileInfo}>
            <h1 className={styles.profileName}>{fullName}</h1>
            <h2 className={styles.profileTitle}>{primaryProfession}</h2>
            
            <div className={styles.profileMeta}>
              {jobseeker.address && (
                <div className={styles.metaItem}>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{jobseeker.address}</span>
                </div>
              )}
              
              {age && (
                <div className={styles.metaItem}>
                  <i className="fas fa-birthday-cake"></i>
                  <span>{age} yaş</span>
                </div>
              )}
              
              {jobseeker.desired_salary_fixed && (
                <div className={styles.metaItem}>
                  <i className="fas fa-money-bill-wave"></i>
                  <span>{jobseeker.desired_salary_fixed} {jobseeker.currency?.title.az || 'AZN'}</span>
                </div>
              )}
            </div>
            
            <div className={styles.contactButtons}>
              {jobseeker.mobile && (
                <a href={`tel:${jobseeker.mobile}`} className={styles.contactButton}>
                  <i className="fas fa-phone"></i> Zəng et
                </a>
              )}
              {jobseeker.email && (
                <a href={`mailto:${jobseeker.email}`} className={styles.contactButton}>
                  <i className="fas fa-envelope"></i> Email göndər
                </a>
              )}
            </div>
          </div>
        </div>
        
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tabButton} ${activeTab === 'overview' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Ümumi məlumat
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'experience' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('experience')}
            >
              İş təcrübəsi
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'education' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('education')}
            >
              Təhsil
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'skills' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('skills')}
            >
              Bacarıqlar
            </button>
          </div>
          
          <div className={styles.tabContent}>
            {activeTab === 'overview' && (
              <div className={styles.overviewTab}>
                <div className={styles.sectionHeading}>
                  <h3>İstədiyi vəzifələr</h3>
                </div>
                <div className={styles.professionsList}>
                  {professionTitles.length > 0 ? (
                    <div className={styles.tagCloud}>
                      {professionTitles.map((title, index) => (
                        <span key={index} className={styles.professionTag}>
                          {title}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p>Vəzifə qeyd edilməyib</p>
                  )}
                </div>
                
                <div className={styles.sectionHeading}>
                  <h3>Əlaqə məlumatları</h3>
                </div>
                <div className={styles.contactInfo}>
                  {jobseeker.mobile && (
                    <div className={styles.contactItem}>
                      <i className="fas fa-phone"></i>
                      <span>{jobseeker.mobile}</span>
                    </div>
                  )}
                  {jobseeker.email && (
                    <div className={styles.contactItem}>
                      <i className="fas fa-envelope"></i>
                      <span>{jobseeker.email}</span>
                    </div>
                  )}
                  {jobseeker.address && (
                    <div className={styles.contactItem}>
                      <i className="fas fa-map-marker-alt"></i>
                      <span>{jobseeker.address}</span>
                    </div>
                  )}
                </div>
                
                <div className={styles.sectionHeading}>
                  <h3>Əmək haqqı gözləntiləri</h3>
                </div>
                <div className={styles.salaryInfo}>
                  {jobseeker.desired_salary_fixed ? (
                    <p>{jobseeker.desired_salary_fixed} {jobseeker.currency?.title.az || 'AZN'}</p>
                  ) : (
                    <p>Qeyd edilməyib</p>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'experience' && (
              <div className={styles.experienceTab}>
                <div className={styles.sectionHeading}>
                  <h3>İş təcrübəsi</h3>
                </div>
                {jobseeker.experiences && jobseeker.experiences.length > 0 ? (
                  <div className={styles.timelineContainer}>
                    {jobseeker.experiences.map((exp) => (
                      <div key={exp.id} className={styles.timelineItem}>
                        <div className={styles.timelineDot}></div>
                        <div className={styles.timelineContent}>
                          <h4>{exp.position || exp.profession?.title || 'Vəzifə qeyd edilməyib'}</h4>
                          <h5>{exp.company_name || exp.company?.title || 'Şirkət qeyd edilməyib'}</h5>
                          <div className={styles.timelinePeriod}>
                            {exp.start_date && (
                              <>
                                <span>{formatDate(exp.start_date)}</span>
                                <span> — </span>
                                <span>
                                  {(exp.still_working === "yes" || exp.still_work === "yes") ? "İndiyədək" : exp.end_date ? formatDate(exp.end_date) : ""}
                                </span>
                              </>
                            )}
                          </div>
                          {exp.description && 
                            <div 
                              className={styles.experienceDescription} 
                              dangerouslySetInnerHTML={{ __html: exp.description }} 
                            />
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={styles.noData}>İş təcrübəsi qeyd edilməyib</p>
                )}
              </div>
            )}
            
            {activeTab === 'education' && (
              <div className={styles.educationTab}>
                <div className={styles.sectionHeading}>
                  <h3>Təhsil</h3>
                </div>
                {jobseeker.educations && jobseeker.educations.length > 0 ? (
                  <div className={styles.timelineContainer}>
                    {jobseeker.educations.map((edu) => {
                      // Parse the university name which might be in JSON format
                      let universityName = edu.university_name;
                      try {
                        const parsedName = JSON.parse(edu.university_name);
                        universityName = parsedName.az || parsedName.en || parsedName.ru || edu.university_name;
                      } catch {
                        // If parsing fails, use the original string
                      }
                      
                      return (
                        <div key={edu.id} className={styles.timelineItem}>
                          <div className={styles.timelineDot}></div>
                          <div className={styles.timelineContent}>
                            <h4>{universityName}</h4>
                            <div className={styles.timelinePeriod}>
                              {edu.start_date && (
                                <>
                                  <span>{formatDate(edu.start_date)}</span>
                                  <span> — </span>
                                  <span>
                                    {edu.still_student === "yes" ? "İndiyədək" : edu.end_date ? formatDate(edu.end_date) : ""}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className={styles.noData}>Təhsil məlumatları qeyd edilməyib</p>
                )}
              </div>
            )}
            
            {activeTab === 'skills' && (
              <div className={styles.skillsTab}>
                <div className={styles.sectionHeading}>
                  <h3>Bacarıqlar</h3>
                </div>
                {jobseeker.skills && jobseeker.skills.length > 0 ? (
                  <div className={styles.tagCloud}>
                    {jobseeker.skills.map((skill) => (
                      <span key={skill.id} className={styles.skillTag}>
                        {skill.tag.title}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className={styles.noData}>Bacarıqlar qeyd edilməyib</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobseekerDetailPage;
