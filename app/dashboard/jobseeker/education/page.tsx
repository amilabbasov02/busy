"use client";
import React, { useState } from 'react';
import './education.css';
import BootstrapSelect from '@/app/components/BootstrapSelect';

const EducationPage = () => {
  const [languages, setLanguages] = useState([
    { lang: '2', skill: '4' }
  ]);

  const [educations, setEducations] = useState([
    { university_name: '-', degree: '0', faculty_name: '', country: '0', city: '0', start_date: '2025', end_date: '2025', still_student: false }
  ]);

  const addLanguage = () => {
    setLanguages([...languages, { lang: '0', skill: '0' }]);
  };

  const removeLanguage = (index: number) => {
    const newLanguages = languages.filter((_, i) => i !== index);
    setLanguages(newLanguages);
  };

  const addEducation = () => {
    setEducations([...educations, { university_name: '0', degree: '0', faculty_name: '', country: '0', city: '0', start_date: '', end_date: '', still_student: false }]);
  };

  const removeEducation = (index: number) => {
    const newEducations = educations.filter((_, i) => i !== index);
    setEducations(newEducations);
  };

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
                            <a href="/dashboard/jobseeker/profile">
                              <span className="round-tab">
                                <i className="head-title">Şəxsi məlumatlar</i>
                                <i className="fas fa-user-edit icon"></i> 1
                              </span>
                            </a>
                          </li>
                          <li role="presentation" data-step="2" className="active">
                            <a href="/dashboard/jobseeker/education" data-toggle="tab" aria-controls="step2" role="tab" aria-expanded={false}>
                              <span className="round-tab">
                                <i className="head-title">Təhsil</i>
                                <i className="icon-line-awesome-university icon"></i>2
                              </span>
                            </a>
                          </li>
                          <li role="presentation" data-step="3" className="disabled">
                            <a href="/dashboard/jobseeker/experience">
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
                            <span style={{ float: 'right', cursor: 'pointer' }} id="add_new_lang" onClick={addLanguage}>
                              <i className="fas fa-plus"></i>
                              Dil biliyi əlavə et
                            </span>
                          </div>
                          <div className="languages_div">
                            {languages.map((lang, index) => (
                              <div className="row" id={`lang_div_${index + 1}`} key={index}>
                                <input type="hidden" name={`lang[selected][${index + 1}]`} defaultValue="yes" className="selected" />
                                <div className="col-xl-1"></div>
                                <div className="col-xl-5 ">
                                  <div className="submit-field">
                                    <h5>Dil</h5>
                                    <select name={`lang[lang][${index + 1}]`} className="js-example-basic-single with-border form-control" style={{ height: '48px !important' }} defaultValue={lang.lang}>
                                      <option value="0">Seçilməyib</option>
                                      <option value="1">Azərbaycan</option>
                                      <option value="2">İngilis</option>
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
                                    <select name={`lang[skill][${index + 1}]`} className="js-example-basic-single with-border form-control" style={{ height: '48px !important' }} defaultValue={lang.skill}>
                                      <option value="0">Seçilməyib</option>
                                      <option value="1">A1 – Başlanğıc (Beginner)</option>
                                      <option value="3">A2 – Zəif (Elementary)</option>
                                      <option value="4">B1 – Orta (Intermediate)</option>
                                      <option value="5">B2 – Ortadan üstün (Upper Intermediate)</option>
                                      <option value="6">C1 – Qabaqcıl (Advanced)</option>
                                      <option value="7">C2 – Mükəmməl (Proficiency)</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-xl-1">
                                  <div className="submit-field">
                                    <span style={{ display: 'inline-block', marginTop: '42px', cursor: 'pointer' }} className="remove_language" onClick={() => removeLanguage(index)}>
                                      <i className="fas fa-trash " style={{ fontSize: '22px' }}></i>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="headline" style={{ fontSize: '16px', fontWeight: 600, color: '#333', minHeight: '50px' }}>
                            <span>
                              <i className="icon-line-awesome-university" style={{ fontSize: '21px', color: '#2a41e8', position: 'relative', top: '2px', marginRight: '4px' }}></i>
                              Təhsil
                            </span>
                            <span style={{ display: 'inline-block', float: 'right', cursor: 'pointer' }} id="add_new_education" onClick={addEducation}>
                              <i className="fas fa-plus"></i>
                              Yeni təhsil əlavə et
                            </span>
                          </div>

                          <div className="row">
                            <div className="education_div">
                              {educations.map((edu, index) => (
                                <div className="row" id={`education_div_${index + 1}`} key={index} style={{ marginBottom: '30px', borderBottom: '1px solid black' }}>
                                  <input type="hidden" name={`edu[selected][${index + 1}]`} defaultValue="yes" className="selected" />
                                  <div className="col-12">
                                    <span style={{ float: 'right', display: 'inline-block', marginRight: '30px', cursor: 'pointer' }} className="remove_education" onClick={() => removeEducation(index)}>
                                      <i className="fas fa-trash " style={{ fontSize: '22px' }}></i>
                                    </span>
                                  </div>
                                  <div className="col-xl-6">
                                    <div className="submit-field">
                                      <h5>Məktəb</h5>
                                      <select name={`edu[university_name][${index + 1}]`} className="js-example-basic-single with-border form-control" style={{ height: '48px !important' }} defaultValue={edu.university_name}>
                                        <option value="0">Seçilməyib</option>
                                        <option value="-">-</option>
                                        <option value="2">Azərbaycan Dövlət Neft və Sənaye Universiteti</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-xl-4">
                                    <div className="submit-field">
                                      <h5>Təhsil dərəcəsi</h5>
                                      <select name={`edu[degree][${index + 1}]`} className="with-border form-control" style={{ height: '48px !important' }} defaultValue={edu.degree}>
                                        <option value="0">Seçilməyib</option>
                                        <option value="2">Orta</option>
                                        <option value="7">Ali</option>
                                        <option value="3">Natamam ali</option>
                                        <option value="4">Ali (bakalavr)</option>
                                        <option value="5">Ali (Magistr)</option>
                                        <option value="6">Elmlər doktoru</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-xl-8">
                                    <div className="submit-field">
                                      <h5>Fakültə</h5>
                                      <input type="text" name={`edu[faculty_name][${index + 1}]`} placeholder="Məsələn, Beynəlxalq Münasibətlər" className="with-border faculty" defaultValue={edu.faculty_name} autoComplete="off" />
                                    </div>
                                  </div>
                                  <div className="col-xl-4"></div>
                                  <div className="col-xl-4">
                                    <div className="submit-field">
                                      <h5>Ölkə</h5>
                                      <select name={`edu[country][${index + 1}]`} className="js-example-basic-single country with-border form-control" style={{ height: '48px !important' }} defaultValue={edu.country}>
                                        <option value="0">Seçilməyib</option>
                                        <option value="1">Azərbaycan</option>
                                        <option value="2">Rusiya</option>
                                        <option value="29">Almaniya</option>
                                        <option value="248">Türkiyə</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-xl-4">
                                    <div className="submit-field">
                                      <h5>Şəhər</h5>
                                      <select name={`edu[city][${index + 1}]`} className="js-example-basic-single city with-border form-control" style={{ height: '48px !important' }} defaultValue={edu.city}>
                                        <option value="0">Seçilməyib</option>
                                        <option value="1">Bakı</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-xl-4"></div>
                                  <div className="col-xl-3 ">
                                    <div className="submit-field">
                                      <h5>Başlama tarixi</h5>
                                      <input type="text" name={`edu[start_date][${index + 1}]`} className="form-control border-white date" placeholder="dashboard.date_placeholder_edu" defaultValue={edu.start_date} />
                                    </div>
                                  </div>
                                  <div className="col-xl-3 exp-1">
                                    <div className="submit-field">
                                      <h5>Qurtarma tarixi</h5>
                                      <input type="text" name={`edu[end_date][${index + 1}]`} className="form-control border-white date" placeholder="dashboard.date_placeholder_edu" defaultValue={edu.end_date} />
                                    </div>
                                  </div>
                                  <div className="col-xl-3 ">
                                    <div className="submit-field">
                                      <h5>Davam edir</h5>
                                      <input data-id={`exp-${index + 1}`} type="checkbox" defaultChecked={edu.still_student} value="yes" className="form-control border-white checkbox" id={`still_student_${index + 1}`} style={{ width: 'auto', height: 'auto' }} name={`edu[still_student][${index + 1}]`} />
                                      <label htmlFor={`still_student_${index + 1}`} style={{ marginTop: '13px' }}>hələ tələbəyəm</label>
                                    </div>
                                  </div>
                                  <div className="col-xl-12">
                                    <div className="submit-field">
                                      <h5>Təhsil haqda qeydlər
                                        <i className="fas fa-info-circle" data-tippy-placement="top" data-tippy-content="dashboard.education_description_info">
                                        </i>
                                      </h5>
                                      <textarea name={`edu[description][${index + 1}]`} className="editor"></textarea>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="col-xl-12">
                            <ul className="list-inline pull-right"style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                <li>
                                    <button type="submit" id="save_education" className="default-btn next-step ripple-effect big margin-top-30 button-sliding-icon  next-step" style={{ backgroundColor: '#303030 !important', color: '#fff !important',padding: '5px',cursor: 'pointer' }}>
                                        Yadda saxla
                                        <i className="icon-feather-check"></i>
                                    </button>
                                </li>
                                <li>
                                    <button type="submit" className="default-btn submitButton next-step ripple-effect big margin-top-30 button-sliding-icon nextbtn" data-step-to="3" data-step="2" style={{ backgroundColor: '#2a41e8 !important', color: '#fff !important',padding: '5px',cursor: 'pointer' }}>
                                        Yadda saxla & Davam et
                                        <i className="icon-feather-arrow-right"></i>
                                    </button>
                                </li>
                            </ul>
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
