"use client";
import React from 'react';
import Sidebar from '@/app/dashboard/components/Sidebar';

const SubscriptionsPage = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-content-container">
        <div className="dashboard-content-inner">
          <div className="dashboard-headline">
              <h3>İdarə et Abunəliyim</h3>
              <nav id="breadcrumbs" className="dark d-none">
                  <ul>
                      <li><a href="https://busy.az">Baş səhifə</a></li>
                      <li><a href="/dashboard">İdarə paneli</a></li>
                      <li><a href="/dashboard/jobs">İdarə et Abunəliyim</a></li>
                  </ul>
              </nav>
          </div>

          <div className="row">
              <div className="col-xl-12">
                  <div className="dashboard-box margin-top-0">
                      <div className="headline">
                          <h3><i className="icon-material-outline-business-center"></i> Abunəliklərim</h3>
                      </div>
                      <div className="content">
                          <ul className="dashboard-box-list">
                              <li>
                                  <div className="job-listing">
                                      <div className="job-listing-details">
                                          <div className="job-listing-description">
                                              <h3 className="job-listing-title">Busy 100</h3>
                                              <div className="job-listing-footer">
                                                  <ul>
                                                      <li><i className="icon-material-outline-date-range"></i> 01.01.1970</li>
                                                      <li><i className="icon-material-outline-date-range"></i> 01.01.1970</li>
                                                  </ul>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </li>
                              <li>
                                  <div className="job-listing">
                                      <div className="job-listing-details">
                                          <div className="job-listing-description">
                                              <h3 className="job-listing-title">Busy 25</h3>
                                              <div className="job-listing-footer">
                                                  <ul>
                                                      <li><i className="icon-material-outline-date-range"></i> 01.01.1970</li>
                                                      <li><i className="icon-material-outline-date-range"></i> 01.01.1970</li>
                                                  </ul>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsPage;
