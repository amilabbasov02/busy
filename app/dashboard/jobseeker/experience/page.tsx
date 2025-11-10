"use client";
import React, { useState, useEffect } from 'react';
import './experience.css';
import { skills } from '@/app/data/skills';
import BootstrapSelect from '@/app/components/BootstrapSelect';

const ExperiencePage = () => {
    const [experiences, setExperiences] = useState([
        { company: '7329', profession: '6', country: '1', city: '1', start_date: '11--0001', end_date: '11-2025', still_work: true, description: 'ggg' }
    ]);

    const addExperience = () => {
        setExperiences([...experiences, { company: '0', profession: '0', country: '0', city: '0', start_date: '', end_date: '', still_work: false, description: '' }]);
    };

    const removeExperience = (index: number) => {
        const newExperiences = experiences.filter((_, i) => i !== index);
        setExperiences(newExperiences);
    };

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).$) {
      const $ = (window as any).$;
      if ($.fn.select2) {
        $('.skills').select2();
      }
    }
  }, []);

  return (
    <div className="dashboard-content-inner">
          <div className="row">
            <form method="post" encType="multipart/form-data" style={{ width: '100%' }}>
              <div className="col-xl-12">
                <div className="wizard" style={{ marginTop: '30px' }}>
                  <div className="wizard-inner">
                    <div className="connecting-line"></div>
                    <ul className="nav nav-tabs" role="tablist">
                      <li role="presentation" data-step="1" className="disabled">
                        <a href="/dashboard/jobseeker/profile">
                          <span className="round-tab">
                            <i className="head-title">Şəxsi məlumatlar</i>
                            <i className="fas fa-user-edit icon"></i> 1
                          </span>
                        </a>
                      </li>
                      <li role="presentation" data-step="2" className="disabled">
                        <a href="/dashboard/profile/education">
                          <span className="round-tab">
                            <i className="head-title">Təhsil</i>
                            <i className="icon-line-awesome-university icon"></i>2
                          </span>
                        </a>
                      </li>
                      <li role="presentation" data-step="3" className="active">
                        <a href="/dashboard/jobseeker/experience" data-toggle="tab" aria-controls="step3" role="tab">
                          <span className="round-tab">
                            <i className="head-title">İş təcrübəsi</i>
                            <i className="icon-line-awesome-windows icon"></i> 3
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="tab-content" id="main_form">
                    <div className="tab-pane active" role="tabpanel" data-id="step3">
                      <div className="headline" style={{ fontSize: '16px', fontWeight: 600, color: '#333', minHeight: '50px' }}>
                        <span>
                          <i className="icon-line-awesome-windows" style={{ fontSize: '21px', color: '#2a41e8', position: 'relative', top: '2px', marginRight: '4px' }}></i> İş təcrübəsi
                        </span>
                        <span style={{ display: 'inline-block', float: 'right', cursor: 'pointer' }} id="add_new_experience" onClick={addExperience}>
                          <i className="fas fa-plus"></i>
                          Yeni iş təcrübəsi əlavə et
                        </span>
                      </div>
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="submit-field">
                            <h5>Bacarıqlar/biliklər</h5>
                            <select className="skills form-control" multiple name="skills[]">
                                {skills.map(skill => (
                                    <option key={skill.value} value={skill.value} selected={skill.value === '4' || skill.value === '13'}>{skill.label}</option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-xl-12">
                          <div className="experience_div">
                            {experiences.map((exp, index) => (
                                <div className="row" id={`experience_div_${index + 1}`} key={index} style={{ marginBottom: '30px', borderBottom: '1px solid black', paddingBottom: '20px' }}>
                                    <div className="col-12">
                                        <span style={{ float: 'right', display: 'inline-block', marginRight: '30px', cursor: 'pointer' }} className="remove_experience" onClick={() => removeExperience(index)}>
                                            <i className="fas fa-trash " style={{ fontSize: '22px' }}></i>
                                        </span>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="submit-field">
                                            <h5>Şirkət</h5>
                                            <BootstrapSelect name={`exp[company][${index + 1}]`} className="with-border" defaultValue={exp.company}>
                                                <option value="7329"> "Libra” Vəkil Bürosu</option>
                                            </BootstrapSelect>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="submit-field">
                                            <h5>Professiya/peşə</h5>
                                            <BootstrapSelect name={`exp[profession][${index + 1}]`} className="with-border" defaultValue={exp.profession}>
                                                <option value="6">brand management specialist</option>
                                            </BootstrapSelect>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="submit-field">
                                            <h5>Ölkə</h5>
                                            <BootstrapSelect name={`exp[country][${index + 1}]`} className="with-border" defaultValue={exp.country}>
                                                <option value="1">Azərbaycan</option>
                                            </BootstrapSelect>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="submit-field">
                                            <h5>Şəhər</h5>
                                            <BootstrapSelect name={`exp[city][${index + 1}]`} className="with-border" defaultValue={exp.city}>
                                                <option value="1">Bakı</option>
                                            </BootstrapSelect>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 ">
                                        <div className="submit-field">
                                            <h5>Başlama tarixi</h5>
                                            <input type="text" name={`exp[start_date][${index + 1}]`} className="form-control border-white date" placeholder="ay/il" defaultValue={exp.start_date} />
                                        </div>
                                    </div>
                                    <div className="col-xl-3">
                                        <div className="submit-field">
                                            <h5>Qurtarma tarixi</h5>
                                            <input type="text" name={`exp[end_date][${index + 1}]`} className="form-control border-white date" placeholder="ay/il" defaultValue={exp.end_date} />
                                        </div>
                                    </div>
                                    <div className="col-xl-3 ">
                                        <div className="submit-field">
                                            <h5>İndiyə qədər</h5>
                                            <input data-id={`exp-${index + 1}`} type="checkbox" defaultChecked={exp.still_work} className="form-control border-white checkbox" id={`still_work_${index + 1}`} style={{ width: 'auto', height: 'auto' }} name={`exp[still_work][${index + 1}]`} />
                                            <label htmlFor={`still_work_${index + 1}`} style={{ marginTop: '13px' }}>Davam edir</label>
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <div className="submit-field">
                                            <h5>İşdə görülənlər/nailiyyətlər</h5>
                                            <textarea name={`exp[description][${index + 1}]`} className="editor" defaultValue={exp.description}></textarea>
                                        </div>
                                    </div>
                                </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div style={{ width: '100%', textAlign: 'right' }}>
                        <ul className="list-inline">
                          <li>
                            <button type="submit" className="default-btn submitButton next-step ripple-effect big margin-top-30 button-sliding-icon save-experience-btn">
                              Yadda saxla
                              <i className="icon-feather-check"></i>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
  );
};

export default ExperiencePage;