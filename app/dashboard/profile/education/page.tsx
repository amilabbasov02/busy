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
                          <div className="tab-content" id="main_form">
                            <div className="tab-pane active" role="tabpanel" data-id="step2">
                                <div className="headline" style={{ fontSize: '16px', fontWeight: 600, color: '#333', minHeight: '50px' }}>
                                    <span>
                                        <i className="icon-line-awesome-language" style={{ fontSize: '21px', color: '#2a41e8', position: 'relative', top: '2px', marginRight: '4px' }}></i>
                                        Dil bilikləri
                                    </span>
                                    <span style={{ float: 'right' }} id="add_new_lang">
                                        <i className="fas fa-plus"></i>
                                        Dil biliyi əlavə et
                                    </span>
                                </div>
                                <div className="languages_div">
                                    <div className="row " id="lang_div_1">
                                        <input type="hidden" name="lang[selected][1]" defaultValue="yes" className="selected" />
                                        <div className="col-xl-1"></div>
                                        <div className="col-xl-5 ">
                                            <div className="submit-field">
                                                <h5>Dil</h5>
                                                <select name="lang[lang][1]" className="js-example-basic-single with-border form-control" style={{ height: '48px !important' }}>
                                                    <option value="0">Seçilməyib</option>
                                                    <option value="1">Azərbaycan</option>
                                                    <option value="2" selected>İngilis</option>
                                                    <option value="3">Rus</option>
                                                    <option value="4">Fransız</option>
                                                    <option value="5">Alman</option>
                                                    <option value="6">Ərəb</option>
                                                    <option value="7">İspan</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-xl-5">
                                            <div className="submit-field">
                                                <h5>Dili bilmək səviyyəsi</h5>
                                                <select name="lang[skill][1]" className="js-example-basic-single with-border form-control" style={{ height: '48px !important' }}>
                                                    <option value="0">Seçilməyib</option>
                                                    <option value="1">A1 – Başlanğıc (Beginner)</option>
                                                    <option value="3">A2 – Zəif (Elementary)</option>
                                                    <option value="4" selected>B1 – Orta (Intermediate)</option>
                                                    <option value="5">B2 – Ortadan üstün (Upper Intermediate)</option>
                                                    <option value="6">C1 – Qabaqcıl (Advanced)</option>
                                                    <option value="7">C2 – Mükəmməl (Proficiency)</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-xl-1">
                                            <div className="submit-field">
                                                <span style={{ display: 'inline-block', marginTop: '42px' }} className="remove_language" data-lang-div="1">
                                                    <i className="fas fa-trash " style={{ fontSize: '22px' }}></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          </div>
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