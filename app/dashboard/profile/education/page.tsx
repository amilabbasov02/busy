"use client";
import React, { useState } from 'react';
import './education.css';
import BootstrapSelect from '@/app/components/BootstrapSelect';

const EducationPage = () => {
  // This is a static representation. The dynamic logic for adding/removing fields needs to be implemented.
  return (
    <div className="dashboard-content-inner">
          <div className="row">
            <form method="post" encType="multipart/form-data" style={{ width: '100%' }}>
              <input type="hidden" name="_token" defaultValue="L7get7cMWykZpQ7KWiVK3EOesgC4EUb2zuxJYwSV" />
              <input type="hidden" id="saving_fields" name="saving_fields" />
              <div className="col-xl-12">
                <section className="">
                  <div className="container-fluid">
                    <div className="row ">
                      <div className="col-md-12">
                        <a id="top"></a>
                        <div className="wizard" style={{ marginTop: '30px' }}>
                          <div className="wizard-inner">
                            <div className="connecting-line"></div>
                            <ul className="nav nav-tabs" role="tablist">
                              <li role="presentation" data-step="1" className="disabled">
                                <a href="https://busy.az/dashboard/jobseeker/profile">
                                  <span className="round-tab">
                                    <i className="head-title">Şəxsi məlumatlar</i>
                                    <i className="fas fa-user-edit icon"></i> 1
                                  </span>
                                </a>
                              </li>
                              <li role="presentation" data-step="2" className="active">
                                <a href="https://busy.az/dashboard/jobseeker/education" data-toggle="tab" aria-controls="step2" role="tab" aria-expanded={false}>
                                  <span className="round-tab">
                                    <i className="head-title">Təhsil</i>
                                    <i className="icon-line-awesome-university icon"></i>2
                                  </span>
                                </a>
                              </li>
                              <li role="presentation" data-step="3" className="disabled">
                                <a href="https://busy.az/dashboard/jobseeker/experience">
                                  <span className="round-tab">
                                    <i className="head-title">İş təcrübəsi</i>
                                    <i className="icon-line-awesome-windows icon"></i> 3
                                  </span>
                                </a>
                              </li>
                            </ul>
                          </div>
                          {/* The rest of your provided HTML structure goes here */}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </form>
          </div>
        </div>
  );
};

export default EducationPage;