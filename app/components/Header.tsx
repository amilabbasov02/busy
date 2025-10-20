"use client";
import Link from 'next/link';

const Header = () => {
  return (
    <>
      <header id="header-container" className="fullwidth" style={{ position: 'fixed' }}>
          <div id="header">
              <div className="container">
                  <div className="left-side">
                      <div id="logo">
                          <a href="/"><img src="/storage/uploads/OgQWs1lHRAONazsERFcm7OY4I1pksVYsEaQxFcIl.webp" alt="Busy.az website logo" /></a>
                      </div>
                      <nav id="navigation">
                          <ul id="responsive">
                          <li>
                              <Link href="/vacancies" data-dropdown-id="header-dropdown-1">Vakansiyalar</Link>
                          </li>
                          <li>
                              <Link href="/blog" data-dropdown-id="header-dropdown-30">Məqalələr</Link>
                          </li>
                          <li>
                              <Link href="/jobseekers" data-dropdown-id="header-dropdown-36">İşaxtaranlar üçün</Link>
                              <ul className="dropdown-nav" data-dropdown-id="header-dropdown-36">
                                 <li>
                                   <Link href="/search/vacancy/advanced">Ətraflı axtarış</Link>
                                 </li>
                                 <li>
                                   <Link href="/companies">Şirkətlər</Link>
                                 </li>
                                 <li>
                                   <Link href="/professions">İxtisaslar</Link>
                                 </li>
                              </ul>
                          </li>
                          <li>
                              <a href="#" data-dropdown-id="header-dropdown-37">İşəgötürənlər üçün</a>
                              <ul className="dropdown-nav" data-dropdown-id="header-dropdown-37">
                                 <li>
                                   <Link href="/pricing">Qiymətlər</Link>
                                 </li>
                                 <li>
                                   <Link href="/31-headhunting-xidmeti-azerbaycanda">Headhunting</Link>
                                 </li>
                                 <li>
                                   <Link href="/jobseekers">CV-lər</Link>
                                 </li>
                              </ul>
                          </li>
                          <li>
                              <Link href="/3-haqqimizda" data-dropdown-id="header-dropdown-51">Haqqımızda</Link>
                          </li>
                          </ul>
                      </nav>
                      <div className="clearfix"></div>
                  </div>
                  <div className="right-side">
                      <nav id="navigation" style={{ paddingRight: '35px' }}>
                          <ul className="">
                              <li>
                                  <Link href="/6-pricing" className="button ripple-effect" style={{ color: 'white' }}>+ Vakansiya yarat</Link>
                              </li>
                          </ul>
                      </nav>
                      <div className="header-widget">
                          <div className="header-notifications-trigger">
                              <Link href="/login">
                                  <div className="user-avatar status-online"><img src="/site/images/user-avatar-placeholder.png" alt="" /></div>
                              </Link>
                          </div>
                      </div>
                      <span className="mmenu-trigger">
                          <button className="hamburger hamburger--collapse" type="button">
                              <span className="hamburger-box">
                                  <span className="hamburger-inner"></span>
                              </span>
                          </button>
                      </span>
                  </div>
              </div>
          </div>
      </header>
      <div className="clearfix"></div>
    </>
  );
};

export default Header;