"use client";
import React, { useState } from 'react';
import DropifyInput from '@/app/components/DropifyInput';
import BootstrapSelect from '@/app/components/BootstrapSelect';
import './jobseeker-profile.css';

const JobseekerProfilePage = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className=" margin-top-0">
            <div className="content with-padding padding-bottom-0">
              <div className="wizard" style={{ marginTop: '30px' }}>
                <div className="wizard-inner">
                  <div className="connecting-line"></div>
                  <ul className="nav nav-tabs" role="tablist">
                    <li role="presentation" data-step="1" className="active">

                      <a href="#" data-toggle="tab" aria-controls="step1" role="tab" aria-expanded="true"><span className="round-tab">
                        <i className="head-title">
                          Şəxsi məlumatlar
                        </i>
                        <i className="fas fa-user-edit icon"></i> 1
                      </span>
                      </a>
                    </li>
                    <li role="presentation" data-step="2">
                      <a href="https://busy.az/dashboard/jobseeker/education">
                        <span className="round-tab">
                          <i className="head-title">
                            Təhsil
                          </i>
                          <i className="icon-line-awesome-university icon"></i>2
                        </span>
                      </a>
                    </li>
                    <li role="presentation" data-step="3">
                      <a href="https://busy.az/dashboard/jobseeker/experience"><span className="round-tab">
                        <i className="head-title">
                          İş təcrübəsi
                        </i>
                        <i className="icon-line-awesome-windows icon"></i> 3
                      </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form method="post" encType="multipart/form-data" style={{ width: '100%' }}>
          <div className="col-xl-12">
            <div className="dashboard-box margin-top-0">
              <div className="headline">
                <h3><i className="icon-material-outline-person-pin"></i> Fərdi məlumatlar</h3>
              </div>
              <div className="content with-padding padding-bottom-0">
                <div className="row">
                  <div className="col-xl-6">
                    <div className="submit-field">
                      <h5>Ad <span className="text-danger">*</span></h5>
                      <input type="text" name="name" className="with-border" defaultValue="Amil" />
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="submit-field">
                      <h5>Soyad <span className="text-danger">*</span></h5>
                      <input type="text" name="last_name" className="with-border" defaultValue="Abbasov" />
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="submit-field">
                      <h5>Cins</h5>
                      <BootstrapSelect className="with-border" defaultValue="Kişi">
                        <option>Kişi</option>
                        <option>Qadın</option>
                      </BootstrapSelect>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="submit-field">
                      <h5>Doğum tarixi <span className="text-danger">*</span></h5>
                      <input type="date" name="date_of_birth" className="with-border" defaultValue="2002-08-03" />
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="submit-field">
                      <h5>Ölkə</h5>
                      <BootstrapSelect className="with-border" defaultValue="Azərbaycan">
                        <option>Azərbaycan</option>
                        <option>Rusiya</option>
                        <option>Almaniya</option>
                        <option>Türkiyə</option>
                      </BootstrapSelect>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="submit-field">
                      <h5>Şəhər</h5>
                      <BootstrapSelect className="with-border" defaultValue="Bakı">
                        <option>Bakı</option>
                        <option>Sumqayıt</option>
                        <option>Gəncə</option>
                      </BootstrapSelect>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="submit-field">
                      <h5>Mobil telefon <span className="text-danger">*</span></h5>
                      <input type="text" name="mobile" className="with-border" defaultValue="+994-50-9676327" />
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="submit-field">
                      <h5>E-mail</h5>
                      <input type="text" name="jobseeker_email" className="with-border" placeholder="E-mailini daxil et" />
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="submit-field">
                      <h5>İşləmək istədiyim sahə</h5>
                      <BootstrapSelect className="with-border" multiple>
                        <option>IT</option>
                        <option>Marketinq</option>
                        <option>Dizayn</option>
                      </BootstrapSelect>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="submit-field">
                      <h5>Arzuladığım iş</h5>
                      <BootstrapSelect className="with-border" multiple>
                        <option>Proqramçı</option>
                        <option>Marketoloq</option>
                        <option>Dizayner</option>
                      </BootstrapSelect>
                    </div>
                  </div>
                  <div className="col-xl-4">
                    <div className="submit-field">
                      <h5>Əməkhaqqı növü</h5>
                      <BootstrapSelect className="with-border" defaultValue="Razılaşma əsasında">
                        <option>Razılaşma əsasında</option>
                        <option>Sabit maaş</option>
                        <option>Maaş aralığı</option>
                      </BootstrapSelect>
                    </div>
                  </div>
                  <div className="col-xl-4">
                    <div className="submit-field">
                      <h5>Valyuta</h5>
                      <BootstrapSelect className="with-border" defaultValue="AZN">
                        <option>AZN</option>
                        <option>USD</option>
                        <option>EUR</option>
                      </BootstrapSelect>
                    </div>
                  </div>
                  <div className="col-xl-4">
                    <div className="submit-field">
                      <h5>Görünürlülük</h5>
                      <BootstrapSelect className="with-border" defaultValue="Hamı">
                        <option>Hamı</option>
                        <option>Yalnız özüm</option>
                        <option>Saytda qeydiyyatdan keçənlər</option>
                      </BootstrapSelect>
                    </div>
                  </div>
                  <div className="col-xl-12">
                    <div className="submit-field">
                      <h5>Profil şəkli</h5>
                      <DropifyInput name="profile_pic" id="profile_pic" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-box">
              <div className="headline" onClick={() => setIsAccordionOpen(!isAccordionOpen)} style={{ cursor: 'pointer' }}>
                <h3><i className="icon-material-outline-add-circle-outline"></i> Əlavə məlumatlar</h3>
              </div>
              {isAccordionOpen && (
                <div className="content with-padding">
                  <div className="row">
                    <div className="col-xl-6">
                      <div className="submit-field">
                        <h5>Evlilik vəziyyəti</h5>
                        <BootstrapSelect className="with-border" defaultValue="Qeyd olunmayıb">
                          <option>Evlidir</option>
                          <option>Evli deyil</option>
                          <option>Qeyd olunmayıb</option>
                        </BootstrapSelect>
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="submit-field">
                        <h5>Uşaqlar</h5>
                        <BootstrapSelect className="with-border" defaultValue="qeyd edilməyib">
                          <option>Yoxdur</option>
                          <option>Var</option>
                          <option>qeyd edilməyib</option>
                        </BootstrapSelect>
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <div className="submit-field">
                        <h5>Yaşayış ünvanı</h5>
                        <input type="text" name="address" className="with-border" placeholder="Yaşayış ünvanı" />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="submit-field">
                        <h5>Ev telefonu</h5>
                        <input type="text" name="phone" className="with-border" />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="submit-field">
                        <h5>Linkedin</h5>
                        <input type="text" name="linkedin" className="with-border" />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="submit-field">
                        <h5>Facebook</h5>
                        <input type="text" name="facebook" className="with-border" />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="submit-field">
                        <h5>Instagram</h5>
                        <input type="text" name="instagram" className="with-border" />
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <div className="submit-field">
                        <h5>Sürücülük vəsiqəsi</h5>
                        <div className="radio">
                          <input id="license_yes" name="license_check" type="radio" value="1" />
                          <label htmlFor="license_yes"><span className="radio-label"></span> Var</label>
                        </div>
                        <div className="radio" style={{ marginLeft: '15px' }}>
                          <input id="license_no" name="license_check" type="radio" value="0" defaultChecked />
                          <label htmlFor="license_no"><span className="radio-label"></span> Yoxdur</label>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <div className="submit-field">
                        <h5>Qısa təsvir <i className="help-icon" data-tippy-placement="right" title="Qısa təsvir"></i></h5>
                        <textarea name="resume" cols={30} rows={5} className="with-border"></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-xl-12">
            <ul className="list-inline pull-right">
              <li>
                <button type="submit" id="save_personal" className="default-btn next-step ripple-effect big margin-top-30 button-sliding-icon  next-step" style={{ backgroundColor: '#303030 !important', color: '#fff !important' }}>
                  Yadda saxla
                  <i className="icon-feather-check"></i>
                </button>
              </li>
              <li>
                <button type="submit" className="default-btn submitButton  next-step ripple-effect big margin-top-30 button-sliding-icon nextbtn" style={{ backgroundColor: '#2a41e8 !important', color: '#fff !important' }}>
                  Yadda saxla & Davam et
                  <i className="icon-feather-arrow-right"></i>
                </button>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </>
  );
};

export default JobseekerProfilePage;