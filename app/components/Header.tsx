"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    router.push('/');
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <header id="header-container" className="fullwidth" style={{ position: 'fixed' }}>
          <div id="header">
              <div className="container">
                  <div className="left-side">
                      <div id="logo">
                          <Link href="/"><img src="/images/logo.webp" alt="Busy.az website logo" /></Link>
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
                                   <Link href="/headhunting">Headhunting</Link>
                                 </li>
                                 <li>
                                   <Link href="/jobseekers">CV-lər</Link>
                                 </li>
                              </ul>
                          </li>
                          <li>
                              <Link href="/about" data-dropdown-id="header-dropdown-51">Haqqımızda</Link>
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
                        {isLoggedIn ? (
                          <div className={`header-notifications user-menu ${isDropdownOpen ? 'active' : ''}`}>
                            <div className="header-notifications-trigger">
                                <a href="#" onClick={toggleDropdown}>
                                    <div className="user-avatar status-online">
                                        <img src="/images/user-avatar-placeholder.png" alt="" />
                                    </div>
                                </a>
                            </div>
                            <div className="header-notifications-dropdown">
                                <div className="user-status">
                                    <div className="user-details">
                                        <div className="user-avatar status-online"><img src="/images/user-avatar-placeholder.png" alt="" /></div>
                                        <div className="user-name">
                                             Busy Admin <span>Admin</span>
                                        </div>
                                    </div>
                                </div>
                                <ul className="user-menu-small-nav">
                                    <li>
                                        <Link href="/(admin)/dashboard"><i className="icon-material-outline-dashboard"></i>İdarə paneli</Link>
                                    </li>
                                    <li><Link href="/dashboard/settings"><i className="icon-material-outline-settings"></i>Ayarlar</Link></li>
                                    <li><a href="#" onClick={handleLogout}><i className="icon-material-outline-power-settings-new"></i> Çıxış</a></li>
                                </ul>
                            </div>
                          </div>
                        ) : (
                          <div className="header-widget">
                            <Link href="/login" className="log-in-button"><i className="icon-feather-log-in"></i><span>Daxil ol</span></Link>
                          </div>
                        )}
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