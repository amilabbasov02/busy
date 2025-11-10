"use client";
import React, { useState } from 'react';
import Sidebar from '@/app/dashboard/components/Sidebar';

const BookmarksPage = () => {
  const [activeTab, setActiveTab] = useState('vacancies');

  return (
    <>
        <div className="dashboard-headline">
            <h3>Gözaltılar</h3>
        </div>

        <div className="row">
            <div className="col-xl-12">
                <div className="dashboard-box margin-top-0">
                    <div className="headline">
                        <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('vacancies'); }} className={`button ripple-effect ${activeTab === 'vacancies' ? '' : 'gray'}`}><i className="icon-material-outline-business-center"></i> Gözaltı etdiyim vakansiyalar</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('resumes'); }} className={`button ripple-effect ${activeTab === 'resumes' ? '' : 'gray'}`}><i className="icon-material-outline-face"></i> Gözaltı etdiyim rezümelər</a>
                    </div>

                    <div className="content">
                        {activeTab === 'vacancies' && (
                            <ul className="dashboard-box-list">
                                <li id="bookmarked-vacancy-60135">
                                    <div className="job-listing">
                                        <div className="job-listing-details">
                                            <div className="job-listing-description">
                                                <h3 className="job-listing-title"><a href="https://busy.az/vacancy/60135/satis-mutexessisi">Satış Mütəxəssisi</a></h3>
                                                <div className="job-listing-footer">
                                                    <ul>
                                                        <li><i className="icon-material-outline-business"></i>  Bakı Sığorta </li>
                                                        <li><i className="icon-material-outline-access-time"></i>  5 il əvvəl</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="bookmark-icon bookmarked" data-model-id="60135" data-model-type="1"></span>
                                </li>
                            </ul>
                        )}
                        {activeTab === 'resumes' && (
                            <ul className="dashboard-box-list">
                                <li>
                                    <div className="freelancer-overview">
                                        <div className="freelancer-overview-inner">
                                            <div className="freelancer-avatar">
                                                <a href="#"><img src="/images/user-avatar-placeholder.png" alt="" /></a>
                                            </div>
                                            <div className="freelancer-name">
                                                <h4 style={{ textAlign: 'left' }}><a href="#">Aysel Memmedova</a></h4>
                                                <span>UI/UX Designer</span>
                                                <div className="freelancer-rating">
                                                    <div className="star-rating" data-rating="5.0"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="bookmark-icon bookmarked"></span>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default BookmarksPage;