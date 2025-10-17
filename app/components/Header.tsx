"use client";
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  // Mock authentication status
  const isAuthenticated = false; 

  return (
    <>
      <header id="header-container" className="fullwidth">
        <div id="header">
          <div className="container">
            <div className="left-side">
              <div id="logo">
                <Link href="/"><Image src="/images/logo.png" alt="Busy.az website logo" width={100} height={40} /></Link>
              </div>
              <nav id="navigation">
                <ul id="responsive">
                  {/* Static Menu Items */}
                  <li><Link href="/vacancies">Vakansiyalar</Link></li>
                  <li><Link href="/companies">Şirkətlər</Link></li>
                  <li><Link href="/resumes">CV-lər</Link></li>
                  <li><Link href="/blog">Bloq</Link></li>
                </ul>
              </nav>
              <div className="clearfix"></div>
            </div>
            <div className="right-side">
              <nav id="navigation" style={{ paddingRight: '35px' }}>
                <ul className="">
                  <li>
                    <Link href={isAuthenticated ? "/dashboard/jobs/create" : "/6-pricing"} className="button ripple-effect" style={{ color: 'white' }}>+ İş elanı yarat</Link>
                  </li>
                </ul>
              </nav>
              <div className="header-widget">
                {isAuthenticated ? (
                  <div className="header-notifications user-menu">
                    <div className="header-notifications-trigger">
                      <a href="#">
                        <div className="user-avatar status-online">
                          <Image src="/site/images/user-avatar-small-01.jpg" alt="" width={40} height={40} />
                        </div>
                      </a>
                    </div>
                    <div className="header-notifications-dropdown">
                      {/* Dropdown content here */}
                    </div>
                  </div>
                ) : (
                  <div className="header-notifications-trigger">
                    <Link href="/login">
                      <div className="user-avatar status-online"><Image src="/images/user-avatar-placeholder.png" alt="" width={40} height={40} /></div>
                    </Link>
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