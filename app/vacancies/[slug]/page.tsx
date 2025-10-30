"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
    ssr: false,
});
import '../../globals.css';
import './vacancy.css';

const VacancyDetailPage = () => {
  const [showEmail, setShowEmail] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleApplyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowEmail(true);
  };

  return (
    <div id="wrapper" style={{ overflowY: 'hidden' }}>
      <div className="clearfix"></div>
      <div className="single-page-header" style={{backgroundImage: "url('/uploads/categories/8987-editor-at-busyaz-retail-sales65d6fd506fad3.png')"}}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="single-page-header-inner">
                <div className="left-side">
                  <div className="header-image">
                    <Link href="/company/ram-solutions">
                      <img className="lozad" src="/images/company-logo-05.png" data-loaded="true" />
                    </Link>
                  </div>
                  <div className="header-details">
                    <h1>Satış mütəxəssisi</h1>
                    <ul>
                      <li><Link href="/company/ram-solutions"><i className="icon-material-outline-business"></i> Ram Solutions</Link></li>
                      <li className="d-block">
                        <div>
                          <span>Elanın qoyulma tarixi: 27.10.2025</span>
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

      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-8 content-right-offset">
            <div className="single-page-section">
              <h2 className="margin-bottom-25"><b>İşin təsviri</b></h2>
              <p><strong>Vəzifələr:</strong></p>
              <ul>
                <li>Instagram, TikTok, WhatsApp və digər onlayn platformalardan daxil olan müştəri sorğularını operativ və peşəkar şəkildə cavablandırmaq</li>
                <li>Müştəri ehtiyaclarını analiz edərək uyğun məhsul təklif etmək və satışı bağlamaq</li>
                <li>Potensial müştərilərlə etik, inandırıcı və mehriban ünsiyyət qurmaq</li>
                <li>Satış sonrası əlaqə saxlamaq və müştəri məmnuniyyətini qorumaq</li>
                <li>Gündəlik satış və sorğu hesabatlarını təqdim etmək</li>
              </ul>
              <p><strong>Tələblər:</strong></p>
              <ul>
                <li>Cins: Xanım</li>
                <li>Yaş: 22–28</li>
                <li>Satış sahəsində minimum 3 il iş təcrübəsi</li>
                <li>Sosial media və online yazışmalarla işləmə bacarığı</li>
                <li>Yazılı və şifahi ünsiyyət bacarığı</li>
                <li>Satışa fokuslanmış, məsuliyyətli və çevik yanaşma</li>
                <li>Komanda ilə işləmə bacarığı</li>
              </ul>
              <p><strong>Biz təklif edirik:</strong></p>
              <ul>
                <li>Fiks əmək haqqı + satışdan bonus (ümumi minimum 1100 AZN və daha çox)</li>
                <li>Satış bacarıqlarını inkişaf etdirmək üçün təlim və mentor dəstəyi</li>
                <li>Rahat və peşəkar iş mühiti</li>
                <li>Yüksəlmə və inkişaf imkanı</li>
              </ul>
              <p>(Online sorğuların cavablandırılması və satışa çevrilməsi üzrə)<br />
                🧭 İş yeri: Bakı, Nərimanov rayonu, Çinar Park Biznes Mərkəzi<br />
                🕒 İş qrafiki: Həftə içi 5 gün, saat 10:00 – 18:00<br />
                💸 Əmək haqqı: Fiks + bonus (ümumi minimum 1100 AZN-dən başlayaraq)</p>
              <p>📩 Müraciət üçün:<br />
                CV və ya qısa təqdimat mesajınızı göndərin:<br />
                📱 <a href="tel:+994554581626" target="_blank">+994554581626</a><br />
                📧 <a href="mailto:ramgroupcompany@gmail.com" target="_blank">ramgroupcompany@gmail.com</a><br />
                🗓️ Mövzu hissəsində “Satış Mütəxəssisi” yazılması mütləqdir.</p>
            </div>
            <div className="single-page-section">
              <h3 className="margin-bottom-25">Ram Solutions tərəfindən digər vakansiyalar</h3>
              <ul className="list-3 color hoverables">
                <li><Link href="/vacancies/169734/qrafik-dizayner-satis-yonumlu-dizayner"><span>Qrafik dizayner (Satış yönümlü Dizayner)</span></Link></li>
                <li><Link href="/vacancies/167920/digital-marketing-sosial-media-mutexessisi"><span>Digital Marketing (Sosial Media) Mütəxəssisi</span></Link></li>
                <li><Link href="/vacancies/165949/digital-marketing-sosial-media-mutexessisi"><span>Digital Marketing (Sosial Media) Mütəxəssisi</span></Link></li>
                <li><Link href="/vacancies/164906/sosial-media-reklamlari-uzre-mutexessis-xanimlar-ucun"><span>Sosial Media Reklamları üzrə Mütəxəssis (Xanımlar üçün)</span></Link></li>
                <li><Link href="/vacancies/163246/reqemsal-marketinq-mutexessisi"><span>Rəqəmsal Marketinq Mütəxəssisi</span></Link></li>
              </ul>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4">
            <div className="sidebar-container">
              {!showEmail ? (
                <a href="#" onClick={handleApplyClick} className="upgrade_premium_button apply applyButton appeal">
                  <span className="b_apply">Müraciət et <i className="icon-material-outline-arrow-right-alt"></i></span>
                </a>
              ) : (
                <a href="mailto:ramgroupcompany@gmail.com" className="upgrade_premium_button apply applyButton appeal_email" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#fff' }} className="b_apply">ramgroupcompany@gmail.com</span>
                </a>
              )}
              <a href="#" className="upgrade_premium_button ">
                <span className="open_this_modal">Elanı irəli çək <i className="icon-material-outline-arrow-right-alt"></i></span>
              </a>
              <div className="sidebar-widget" style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
              </div>
              <div className="sidebar-widget" id="apply_methods" style={{ display: 'none' }}>
                <div className="job-overview">
                  <div className="job-overview-headline"><i className="icon-line-awesome-info "></i>Müraciət detalları</div>
                  <div className="job-overview-inner">
                    <ul>
                      <li>
                        <i className="icon-line-awesome-envelope"></i>
                        <span>E-mail</span>
                        <h5><a href="mailto:ramgroupcompany@gmail.com">ramgroupcompany@gmail.com</a></h5>
                      </li>
                      <li>
                        <i className="icon-line-awesome-phone"></i>
                        <span>Telefon</span>
                        <h5><a href="tel:+994-55-4581626">+994-55-4581626</a></h5>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="sidebar-widget">
                <div className="job-overview">
                  <div className="job-overview-headline"><i className="icon-line-awesome-info "></i>İş detalları</div>
                  <div className="job-overview-inner">
                    <ul>
                      <li>
                        <i className="icon-line-awesome-mars-stroke"></i>
                        <span>Cins</span>
                        <h5>qadın</h5>
                      </li>
                      <li>
                        <i className="icon-material-outline-location-on"></i>
                        <span>Yer</span>
                        <h5>Bakı</h5>
                      </li>
                      <li>
                        <i className="icon-material-outline-business-center"></i>
                        <span>Məşğulluq növü</span>
                        <h5>Tam ştat (full time)</h5>
                      </li>
                      <li>
                        <i className="icon-material-outline-business-center"></i>
                        <span>Yaş</span>
                        <h5>22 - 28 </h5>
                      </li>
                      <li>
                        <i className="icon-line-awesome-euro"></i>
                        <span>Maaş</span>
                        <h5> 1100</h5>
                      </li>
                      <li>
                        <i className="icon-material-outline-date-range"></i>
                        <span>Elanın qoyulma tarixi</span>
                        <h5>27.10.2025</h5>
                      </li>
                      <li>
                        <i className="icon-material-outline-date-range"></i>
                        <span>Son müraciət tarixi</span>
                        <h5>27.11.2025</h5>
                      </li>
                      <li>
                        <i className="icon-line-awesome-windows"></i>
                        <span>İş bacarıqları</span>
                        <div className="task-tags">
                          <span>satış</span>
                          <span>sales</span>
                        </div>
                      </li>
                      <li>
                        <i className="icon-line-awesome-windows"></i>
                        <span>Vəzifələr</span>
                        <div className="task-tags">
                          <Link href="/professions/satis-temsilcisi"><span>satış təmsilçisi</span></Link>
                          <Link href="/professions/sales-specialist"><span>sales specialist</span></Link>
                          <Link href="/professions/satis-meslehetcisi"><span>satış məsləhətçisi</span></Link>
                          <Link href="/professions/sales-assistant"><span>sales assistant</span></Link>
                          <Link href="/professions/sales-advisor"><span>sales advisor</span></Link>
                          <Link href="/professions/sales-representative"><span>sales representative</span></Link>
                          <Link href="/professions/satis-mutexessisi"><span>satış mütəxəssisi</span></Link>
                          <Link href="/professions/satisa-destek-uzre-mutexessis"><span>satışa dəstək üzrə mütəxəssis</span></Link>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="sidebar-widget">
                <a href="https://t.me/busy_az_vakansiyalar" className="tlg_links">
                  <div className="tlg_icn"></div>
                  <div className="tlg_content">
                    Vakansiylar barədə məlumatı ən tez bizim <span>Telegram kanalında </span> izləyə bilərsiniz.
                  </div>
                </a>
              </div>
              <div className="sidebar-widget">
                <div className="copy-url">
                  <input id="copy-url" type="text" value={currentUrl} className="with-border" readOnly />
                  <button className="copy-url-button ripple-effect" data-clipboard-target="#copy-url"><i className="icon-material-outline-file-copy"></i></button>
                </div>
                <div className="share-buttons margin-top-25">
                  <div className="share-buttons-trigger"><i className="icon-feather-share-2"></i></div>
                  <div className="share-buttons-content">
                    <span>Maraqlıdır?? <strong>Paylaş!</strong></span>
                    <ul className="share-buttons-icons">
                      <li>
                        <a href={`https://www.facebook.com/sharer.php?u=${currentUrl}`} target="_blank" style={{ backgroundColor: 'rgb(59, 89, 152)' }}><i className="icon-brand-facebook-f"></i></a>
                      </li>
                      <li>
                        <a href={`https://twitter.com/intent/tweet?url=${currentUrl}`} target="_blank" style={{ backgroundColor: 'rgb(29, 161, 242)' }}><i className="icon-brand-twitter"></i></a>
                      </li>
                      <li>
                        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`} target="_blank" style={{ backgroundColor: 'rgb(0, 119, 181)' }}><i className="icon-brand-linkedin-in"></i></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
            <div className="col-md-12">
                <div className="single-page-section">
                    <h3 className="margin-bottom-25">Oxşar vakansiyalar</h3>
                    <OwlCarousel className="listings-container grid-layout similarjobs" loop margin={30} nav items={2}>
                        <Link href="/vacancies/satis-meneceri" className="job-listing">
                            <div className="job-listing-details">
                                <div className="job-listing-company-logo">
                                    <img src="/images/company-logo-05.png" alt="MEARAJ TRAVEL MMC" />
                                </div>
                                <div className="job-listing-description">
                                    <h5 className="job-listing-company">MEARAJ TRAVEL MMC</h5>
                                    <h4 className="job-listing-title">Satış meneceri</h4>
                                </div>
                            </div>
                            <div className="job-listing-footer">
                                <ul><li><i className="icon-material-outline-access-time"></i> bugün</li></ul>
                            </div>
                        </Link>
                        <Link href="/vacancies/satis-meneceri-dental-implantlar" className="job-listing">
                            <div className="job-listing-details">
                                <div className="job-listing-company-logo">
                                    <img src="/images/company-logo-05.png" alt="Karal Medical Group" />
                                </div>
                                <div className="job-listing-description">
                                    <h5 className="job-listing-company">Karal Medical Group</h5>
                                    <h4 className="job-listing-title">Satış Meneceri (Dental Implantlar)</h4>
                                </div>
                            </div>
                            <div className="job-listing-footer">
                                <ul><li><i className="icon-material-outline-access-time"></i> bugün</li></ul>
                            </div>
                        </Link>
                    </OwlCarousel>
                </div>
            </div>
        </div>
    
        <div className="row">
            <div className="col-md-12">
                <div className="single-page-section">
                    <h3 className="margin-bottom-25">Seçilmiş iş elanları</h3>
                    <OwlCarousel className="listings-container grid-layout similarjobs" loop margin={30} nav items={2}>
                        <Link href="/vacancies/1c-proqrami-uzre-it-mutexessis" className="job-listing">
                            <div className="job-listing-details">
                                <div className="job-listing-company-logo">
                                    <img src="/storage/companies/1761561709.0e076421-698c-4e9f-82ea-6f4487670282.jpeg" alt="Muradlı-M MMC (Panda Boya)" />
                                </div>
                                <div className="job-listing-description">
                                    <h5 className="job-listing-company">Muradlı-M MMC (Panda Boya)</h5>
                                    <h4 className="job-listing-title">1C proqramı üzrə İT mütəxəssis</h4>
                                </div>
                            </div>
                            <div className="job-listing-footer">
                                <ul><li><i className="icon-material-outline-access-time"></i> bugün</li></ul>
                            </div>
                        </Link>
                        <Link href="/vacancies/qrafik-dizayner-satis-yonumlu-dizayner" className="job-listing">
                            <div className="job-listing-details">
                                <div className="job-listing-company-logo">
                                    <img src="/images/company-logo-05.png" alt="Ram Solutions" />
                                </div>
                                <div className="job-listing-description">
                                    <h5 className="job-listing-company">Ram Solutions</h5>
                                    <h4 className="job-listing-title">Qrafik dizayner (Satış yönümlü Dizayner)</h4>
                                </div>
                            </div>
                            <div className="job-listing-footer">
                                <ul><li><i className="icon-material-outline-access-time"></i> bugün</li></ul>
                            </div>
                        </Link>
                    </OwlCarousel>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default VacancyDetailPage;