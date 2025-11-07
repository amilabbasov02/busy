"use client";
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const BootstrapSelect = dynamic(() => import('../../../../components/BootstrapSelect'), { ssr: false });
import { skills } from '../../../../data/skills';
import { professions } from '../../../../data/professions';

declare global {
    interface Window {
        $: any;
    }
}

// Mock data for a single job - in a real app, you'd fetch this
const mockJobs = [
  { id: 1, job_title: 'Frontend Developer', employment_type: '1', category_id: ['3', '26'], company_id: '4168', country_id: '1', city_id: ['1'], salary_type: '1', salary_start: '1500', salary_end: '2500', salary_currency: 'AZN', gender: '1', age_start: '25', age_end: '35', education: ['7'], required_experience: '5', work_schedule: ['1'], deadline: '2024-12-31', job_description: 'We are looking for a skilled Frontend Developer.', phone: '123456789', mobile: '0551234567', email: 'test@example.com', skills: ['react', 'js'], seotags: ['developer'] },
  { id: 2, job_title: 'Backend Developer', employment_type: '1', category_id: ['3'], company_id: '6337', country_id: '1', city_id: ['2'], salary_type: '2', salary_start: '2000', salary_end: '', salary_currency: 'AZN', gender: '2', age_start: '28', age_end: '40', education: ['5'], required_experience: '7', work_schedule: ['1', '4'], deadline: '2024-11-30', job_description: 'We need a Backend Developer.', phone: '', mobile: '', email: 'backend@example.com', skills: ['nodejs', 'php'], seotags: ['backend-dev'] },
];


const EditJobPage = ({ params }: { params: { id: string } }) => {
  const jobId = params.id;
  const isInitialMount = useRef(true);

  const [formData, setFormData] = useState({
    job_title: '',
    employment_type: '',
    category_id: [],
    company_id: '',
    country_id: '1',
    city_id: [],
    salary_type: '1',
    salary_start: '',
    salary_end: '',
    salary_currency: 'AZN',
    gender: '',
    age_start: '',
    age_end: '',
    education: [],
    required_experience: '',
    work_schedule: [],
    deadline: '',
    job_description: '',
    phone: '',
    mobile: '',
    email: '',
    skills: [],
    seotags: []
  });

  useEffect(() => {
    // Fetch job data based on jobId
    const jobToEdit = mockJobs.find(job => job.id.toString() === jobId);
    if (jobToEdit) {
      // @ts-ignore
      setFormData(jobToEdit);
    }
  }, [jobId]);

  useEffect(() => {
    setTimeout(() => {
      if (typeof window !== 'undefined' && window.$ && window.$.fn.selectpicker) {
        if (isInitialMount.current) {
          window.$('.selectpicker').selectpicker();
          isInitialMount.current = false;
        } else {
          window.$('.selectpicker').selectpicker('refresh');
        }
      }
    }, 100);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if ('multiple' in e.target && e.target.multiple) {
      const options = (e.target as HTMLSelectElement).options;
      const selectedValues: string[] = [];
      for (let i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          selectedValues.push(options[i].value);
        }
      }
      setFormData(prevState => ({
        ...prevState,
        [name]: selectedValues
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  return (
    <div className="dashboard-container">
      
      <div className="dashboard-sidebar">
        <div className="dashboard-sidebar-inner" data-simplebar>
            <div className="dashboard-nav-container">
                <a href="#" className="dashboard-responsive-nav-trigger">
                    <span className="hamburger hamburger--collapse">
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                        </span>
                    </span>
                    <span className="trigger-title">İdarə paneli</span>
                </a>
                
                <div className="dashboard-nav">
                    <div className="dashboard-nav-inner">
                        <ul data-submenu-title="İş vakansiyaları">
                            <li className="active">
                                <Link href="/dashboard/jobs">
                                    <i className="icon-material-outline-business-center"></i>
                                    Vakansiyaları idarə et
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/jobs/create">
                                    <i className="icon-material-outline-business-center"></i>
                                    Vakansiya yarat
                                </Link>
                            </li>
                        </ul>

                        <ul data-submenu-title="Şirkətlər">
                            <li>
                                <Link href="/dashboard/companies">
                                    <i className="icon-material-outline-business-center"></i>
                                    Şirkətlər
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/companies/create">
                                    <i className="icon-material-outline-business-center"></i>
                                    Şirkət yarat
                                </Link>
                            </li>
                        </ul>

                        <ul data-submenu-title="Hesab">
                            <li>
                                <Link href="/dashboard/subscriptions">
                                    <i className="icon-material-outline-rate-review"></i>
                                    Abunəliyim
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/reviews">
                                    <i className="icon-material-outline-rate-review"></i>
                                    Rəylər
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/bookmarks">
                                    <i className="icon-material-outline-star-border"></i>
                                    Gözaltılar
                                </Link>
                            </li>
                            <li>
                                <a href="https://busy.az/dashboard/profile/settings">
                                    <i className="icon-material-outline-supervisor-account"></i>
                                    Profil ayarları
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={() => {
                                    const form = document.getElementById('logoutform');
                                    if (form) {
                                        (form as HTMLFormElement).submit();
                                    }
                                }}>
                                    <i className="icon-material-outline-power-settings-new"></i>
                                    Çıxış
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="dashboard-content-container">
        <div className="dashboard-content-inner">
          <div className="dashboard-headline">
            <h3>Vakansiyanı redaktə et</h3>
          </div>

          <div className="row">
            <div className="col-xl-12">
              <div className="dashboard-box margin-top-0">
                <div className="headline">
                  <h3><i className="icon-feather-folder-plus"></i> Vakansiya məlumatları</h3>
                </div>
                <form action={`/dashboard/jobs/edit/${jobId}`} id="jobs_form" method="post">
                  <div className="content with-padding padding-bottom-10">
                    <div className="row">
                      <div className="col-xl-8">
                        <div className="submit-field">
                          <h5>Vakansiyanın adı</h5>
                          <input type="text" name="job_title" value={formData.job_title} onChange={handleChange} required className="with-border" />
                        </div>
                      </div>
                      <div className="col-xl-4">
                        <div className="submit-field">
                          <h5>İş tipi</h5>
                          <BootstrapSelect className="selectpicker with-border" name="employment_type" value={formData.employment_type} onChange={handleChange} required title="İş tipi">
                            <option value="1">Tam ştat (full time)</option>
                            <option value="2">Yarımştat (part time)</option>
                            <option value="3">Layihə/Müvəqqəti</option>
                            <option value="4">Könüllü (volontyor)</option>
                            <option value="5">Təcrübəçi (stajor, intern)</option>
                            <option value="7">Əlillər üçün</option>
                          </BootstrapSelect>
                        </div>
                      </div>

                      <div className="col-xl-6">
                        <div className="submit-field">
                          <h5>İşin kateqoriyası <small>(*birden cox secim)</small></h5>
                          <BootstrapSelect className="selectpicker with-border" data-tippy-content="İşin kateqoriyası" data-live-search="true" name="category_id" value={formData.category_id} onChange={handleChange} data-size="7" title="Select Category" multiple>
                            <option value="">Select Category</option>
                            <option value="3" style={{ fontWeight: 'bold' }}>Mühasibat, idarəetmə uçotu, maliyyə</option>
                            <option value="26"> &nbsp; &nbsp; Mühasib</option>
                            <option value="27"> &nbsp; &nbsp; Audit</option>
                            <option value="28"> &nbsp; &nbsp; Vergi</option>
                            <option value="29"> &nbsp; &nbsp; Xəzinədarlıq</option>
                            <option value="30"> &nbsp; &nbsp; Əmək haqqı uçotu</option>
                            <option value="31"> &nbsp; &nbsp; Maliyyə nəzarəti</option>
                            <option value="32"> &nbsp; &nbsp; Economist</option>
                            <option value="33"> &nbsp; &nbsp; Credit Control</option>
                            <option value="34"> &nbsp; &nbsp; Cost Accountant</option>
                            <option value="35"> &nbsp; &nbsp; Accounting Management</option>
                            <option value="36"> &nbsp; &nbsp; Kassir, inkassator</option>
                            <option value="44"> &nbsp; &nbsp; Katib</option>
                            <option value="68"> &nbsp; &nbsp; İpoteka</option>
                            <option value="70"> &nbsp; &nbsp; Risklər</option>
                            <option value="4" style={{ fontWeight: 'bold' }}>İnzibati (administrativ) işlər</option>
                            <option value="37"> &nbsp; &nbsp; Call Center əməkdaşı</option>
                            <option value="38"> &nbsp; &nbsp; Təmizlikçi xadimə</option>
                            <option value="39"> &nbsp; &nbsp; Kuryer</option>
                            <option value="40"> &nbsp; &nbsp; Sürücü</option>
                            <option value="41"> &nbsp; &nbsp; Ofis menecer</option>
                            <option value="42"> &nbsp; &nbsp; Şəxsi katib</option>
                            <option value="43"> &nbsp; &nbsp; Resepşen</option>
                            <option value="45"> &nbsp; &nbsp; Tərcüməçi sinxron</option>
                            <option value="46"> &nbsp; &nbsp; Tərcüməçi yazılı</option>
                            <option value="111"> &nbsp; &nbsp; Account management, client service</option>
                            <option value="112"> &nbsp; &nbsp; Administration and Maintenance</option>
                          </BootstrapSelect>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="submit-field" id="company_div">
                          <h5>İşəgötürən şirkət</h5>
                          <BootstrapSelect className="selectpicker with-border" data-tippy-content="İşəgötürən şirkət" required data-live-search="true" name="company_id" value={formData.company_id} onChange={handleChange} data-size="7" title="İşəgötürən şirkət">
                            <option value="">İşəgötürən şirkət</option>
                            <option value="4168">Azərbaycan Sənaye Korporasiyası</option>
                            <option value="6337">Azbadam MMC</option>
                            <option value="6649">Baytarlıq Klinikası</option>
                            <option value="12791">tttt</option>
                          </BootstrapSelect>
                        </div>
                      </div>

                      <div className="col-xl-6">
                        <div className="submit-field">
                          <h5>Ölkə</h5>
                          <div className="input-with-icon">
                            <div id="autocomplete-container">
                              <BootstrapSelect name="country_id" data-live-search="true" data-tippy-content="Ölkə" className="selectpicker with-border" title="Ölkə" value={formData.country_id} onChange={handleChange}>
                                <option value="">Ölkə</option>
                                <option value="1"> Azərbaycan</option>
                                <option value="2"> Rusiya</option>
                                <option value="29"> Almaniya</option>
                                <option value="248"> Türkiyə</option>
                              </BootstrapSelect>
                            </div>
                            <i className="icon-material-outline-location-on"></i>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="submit-field">
                          <h5>Şəhər <small>(*birden cox secim)</small></h5>
                          <div className="input-with-icon">
                            <div id="autocomplete-container">
                              <BootstrapSelect name="city_id" multiple data-live-search="true" data-tippy-content="Şəhər" className="selectpicker with-data-ajax with-border" title="Şəhər" value={formData.city_id} onChange={handleChange}>
                                <option value="1">Bakı</option>
                                <option value="2">Sumqayıt</option>
                                <option value="3">Abşeron rayonu/Xırdalan</option>
                                <option value="4">Ağcabədi</option>
                                <option value="5">Ağdam</option>
                                <option value="6">Ağdaş</option>
                                <option value="7">Ağstafa</option>
                                <option value="8">Ağsu</option>
                                <option value="9">Astara</option>
                                <option value="10">Babək</option>
                                <option value="11">Balakən</option>
                                <option value="12">Bərdə</option>
                                <option value="13">Beyləqan</option>
                                <option value="14">Biləsuvar</option>
                                <option value="15">Cəbrayıl</option>
                                <option value="16">Cəlilabad</option>
                                <option value="17">Culfa</option>
                                <option value="18">Daşkəsən</option>
                                <option value="19">Füzuli</option>
                                <option value="20">Gədəbəy</option>
                                <option value="21">Gəncə</option>
                                <option value="22">Goranboy</option>
                                <option value="23">Göyçay</option>
                                <option value="24">Göygöl</option>
                                <option value="25">Hacıqabul</option>
                                <option value="26">İmişli</option>
                                <option value="27">İsmayıllı</option>
                                <option value="28">Kəlbəcər</option>
                                <option value="29">Kəngərli</option>
                                <option value="30">Kürdəmir</option>
                                <option value="31">Laçın</option>
                                <option value="32">Lənkəran</option>
                                <option value="34">Lerik</option>
                                <option value="35">Masallı</option>
                                <option value="36">Mingəçevir</option>
                                <option value="37">Naftalan</option>
                                <option value="38">Neftçala</option>
                                <option value="39">Oğuz</option>
                                <option value="40">Ordubad</option>
                                <option value="41">Qax</option>
                                <option value="42">Qazax</option>
                                <option value="43">Qəbələ</option>
                                <option value="44">Qobustan</option>
                                <option value="45">Quba</option>
                                <option value="46">Qubadlı</option>
                                <option value="47">Qusar</option>
                                <option value="48">Saatlı</option>
                                <option value="49">Sabirabad</option>
                                <option value="50">Şabran</option>
                                <option value="51">Şahbuz</option>
                                <option value="52">Salyan</option>
                                <option value="53">Şamaxı</option>
                                <option value="54">Samux</option>
                                <option value="55">Sədərək</option>
                                <option value="56">Şəki</option>
                                <option value="58">Şəmkir</option>
                                <option value="59">Şərur</option>
                                <option value="60">Şirvan</option>
                                <option value="61">Siyəzən</option>
                                <option value="62">Şuşa</option>
                                <option value="63">Tərtər</option>
                                <option value="64">Tovuz</option>
                                <option value="65">Ucar</option>
                                <option value="66">Xaçmaz</option>
                                <option value="67">Xankəndi</option>
                                <option value="68">Xızı</option>
                                <option value="69">Xocalı</option>
                                <option value="70">Xocavənd</option>
                                <option value="71">Yardımlı</option>
                                <option value="72">Yevlax</option>
                                <option value="74">Zaqatala</option>
                                <option value="75">Zəngilan</option>
                                <option value="76">Zərdab</option>
                                <option value="77">Azərbaycan</option>
                                <option value="78">Naxçıvan</option>
                              </BootstrapSelect>
                            </div>
                            <i className="icon-material-outline-location-on"></i>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="submit-field">
                          <h5>Əmək haqqı növü</h5>
                          <BootstrapSelect name="salary_type" className="with-border selectpicker" id="salary_type" value={formData.salary_type} onChange={handleChange}>
                            <option value="1">Maaş aralığı</option>
                            <option value="2">Sabit maaş</option>
                            <option value="3">Razılaşma əsasında</option>
                          </BootstrapSelect>
                        </div>
                      </div>
                      <div className="col-xl-4" id="salary_changable_div">
                        <div className="submit-field">
                          <h5>Maaş</h5>
                          <div className="row">
                            <div className="col-xl-6">
                              <input className="with-border" type="text" placeholder="Min" name="salary_start" id="min_salary" value={formData.salary_start} onChange={handleChange} />
                            </div>
                            <div className="col-xl-6">
                              <input className="with-border" type="text" placeholder="Max" name="salary_end" id="max_salary" value={formData.salary_end} onChange={handleChange} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-2">
                        <div className="submit-field">
                          <h5>&nbsp;</h5>
                          <BootstrapSelect name="salary_currency" data-tippy-content="Valyuta" className="with-border" style={{ paddingTop: '12px' }} value={formData.salary_currency} onChange={handleChange}>
                            <option value="AZN">AZN</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                          </BootstrapSelect>
                        </div>
                      </div>
                      <div className="col-xl-6">
                          <div className="submit-field">
                              <h5>Cins</h5>
                              <BootstrapSelect className="selectpicker with-border" data-size="7" name="gender" title="Cins" value={formData.gender} onChange={handleChange}>
                                  <option value="">Cins</option>
                                  <option value="1">Hamısı</option>
                                  <option value="2">Kişi</option>
                                  <option value="3">Qadın</option>
                              </BootstrapSelect>
                          </div>
                      </div>
                      <div className="col-xl-3">
                          <div className="submit-field">
                              <h5>Minimum yaş</h5>
                              <input type="number" data-tippy-content="Minimum yaş" placeholder="Minimum yaş" name="age_start" className="with-border" value={formData.age_start} onChange={handleChange} />
                          </div>
                      </div>
                      <div className="col-xl-3">
                          <div className="submit-field">
                              <h5>Maksimum yaş</h5>
                              <input type="number" data-tippy-content="Maksimum yaş" placeholder="Maksimum yaş" name="age_end" className="with-border" value={formData.age_end} onChange={handleChange} />
                          </div>
                      </div>
                      <div className="col-xl-6">
                          <div className="submit-field">
                              <h5>Təhsil <small>(*birden cox secim)</small></h5>
                              <BootstrapSelect className="selectpicker with-border" data-size="7" name="education" title="Təhsil" value={formData.education} onChange={handleChange} multiple>
                                  <option value="">Təhsil</option>
                                  <option value="2">Orta</option>
                                  <option value="7">Ali</option>
                                  <option value="3">Natamam ali</option>
                                  <option value="4">Ali (bakalavr)</option>
                                  <option value="5">Ali (Magistr)</option>
                                  <option value="6">Elmlər doktoru</option>
                              </BootstrapSelect>
                          </div>
                      </div>
                      <div className="col-xl-6">
                          <div className="submit-field">
                              <h5>İş təcrübəsi (minimum il)</h5>
                              <BootstrapSelect className="selectpicker with-border" data-size="7" name="required_experience" title="İş təcrübəsi (minimum il)" value={formData.required_experience} onChange={handleChange}>
                                  <option value="">İş təcrübəsi (minimum il)</option>
                                  <option value="1">Tələb olunmur</option>
                                  <option value="3">1</option>
                                  <option value="4">2</option>
                                  <option value="5">3</option>
                                  <option value="6">4</option>
                                  <option value="7">5</option>
                                  <option value="8">6</option>
                                  <option value="9">7</option>
                                  <option value="10">10</option>
                              </BootstrapSelect>
                          </div>
                      </div>
                      <div className="col-xl-6">
                          <div className="submit-field">
                              <h5>Iş rejimi <small>(*birden cox secim)</small></h5>
                              <BootstrapSelect className="selectpicker with-border" data-size="7" name="work_schedule" title="Iş rejimi" value={formData.work_schedule} onChange={handleChange} multiple>
                                  <option value="">Iş rejimi</option>
                                  <option value="1">Tam iş günü</option>
                                  <option value="2">Növbəli iş qrafiki</option>
                                  <option value="3">Flexible schedule</option>
                                  <option value="4">Məsafədən iş</option>
                                  <option value="5">Vaxtyor metodu</option>
                              </BootstrapSelect>
                          </div>
                      </div>
                      <div className="col-xl-6">
                          <div className="submit-field">
                              <h5>Dedlayn (son müraciət tarixi)</h5>
                              <input id="deadline" type="date" className="form-control" name="deadline" value={formData.deadline} onChange={handleChange} />
                          </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="submit-field">
                          <h5>Job Description</h5>
                          <textarea cols={30} rows={5} name="job_description" className="with-border editor" value={formData.job_description} onChange={handleChange}></textarea>
                          <div className="uploadButton margin-top-30">
                              <input className="uploadButton-input" type="file" accept="image/*, application/pdf" id="upload" multiple />
                              <label className="uploadButton-button ripple-effect" htmlFor="upload">Fayl yüklə</label>
                              <span className="uploadButton-file-name">İşi təsvir etmək üçün ehtiyac olarsa əlavə fayl da yükləyə bilərsiniz.</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6">
                          <div className="submit-field">
                              <h5>Ofis telefonu</h5>
                              <input type="text" data-tippy-content="Ofis telefonu" placeholder="Ofis telefonu" name="phone" className="with-border" value={formData.phone} onChange={handleChange} />
                          </div>
                      </div>
                      <div className="col-xl-6">
                          <div className="submit-field">
                              <h5>Mobil telefon</h5>
                              <input type="text" data-tippy-content="Mobil telefon" placeholder="Mobil telefon" name="mobile" className="with-border" value={formData.mobile} onChange={handleChange} />
                          </div>
                      </div>
                      <div className="col-xl-6">
                          <div className="submit-field">
                              <h5>E-mail</h5>
                              <input type="email" data-tippy-content="E-mail" placeholder="E-mail" name="email" className="with-border" value={formData.email} onChange={handleChange} />
                          </div>
                      </div>
                      <div className="col-xl-6"></div>
                      <div className="col-xl-12 ">
                          <div className="submit-field">
                              <h5>Bacarıqlar/biliklər <small>(*birden cox secim)</small></h5>
                              <BootstrapSelect name="skills" multiple data-tippy-content="Bacarıqlar/biliklər" title="Bacarıqlar/biliklər" className="skills with-border" data-live-search="true" value={formData.skills} onChange={handleChange}>
                                {skills.map(skill => (
                                  <option key={skill.value} value={skill.value}>{skill.label}</option>
                                ))}
                              </BootstrapSelect>
                          </div>
                      </div>
                      <div className="col-xl-12 ">
                          <div className="submit-field">
                              <h5>Professiya <small>(*birden cox secim)</small></h5>
                              <BootstrapSelect name="seotags" multiple data-tippy-content="Professiya" className="profession with-border" data-live-search="true" title="Professiya" value={formData.seotags} onChange={handleChange}>
                                {professions.map(profession => (
                                  <option key={profession.value} value={profession.value}>{profession.label}</option>
                                ))}
                              </BootstrapSelect>
                          </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-xl-12 margin-bottom-10">
              <button type="submit" className="button ripple-effect big margin-top-30" style={{ float: 'right' }}>
                <i className="icon-feather-save"></i> Dəyişiklikləri yadda saxla
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditJobPage;