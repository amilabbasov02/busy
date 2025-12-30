"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const CompanySidebar = () => {
  const pathname = usePathname();

  return (
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
                <li className={pathname.startsWith('/dashboard/jobs') ? 'active' : ''}>
                  <Link href="/dashboard/jobs">
                    <i className="icon-material-outline-business-center"></i>
                    Vakansiyaları idarə et
                  </Link>
                </li>
                <li className={pathname === '/dashboard/jobs/create' ? 'active' : ''}>
                  <Link href="/dashboard/jobs/create">
                    <i className="icon-material-outline-business-center"></i>
                    Vakansiya yarat
                  </Link>
                </li>
              </ul>

              <ul data-submenu-title="Şirkətlər">
                <li className={pathname.startsWith('/dashboard/companies') ? 'active' : ''}>
                  <Link href="/dashboard/companies">
                    <i className="icon-material-outline-business-center"></i>
                    Şirkətlər
                  </Link>
                </li>
                <li className={pathname === '/dashboard/companies/create' ? 'active' : ''}>
                  <Link href="/dashboard/companies/create">
                    <i className="icon-material-outline-business-center"></i>
                    Şirkət yarat
                  </Link>
                </li>
              </ul>

              <ul data-submenu-title="Hesab">
                <li className={pathname === '/dashboard/subscriptions' ? 'active' : ''}>
                  <Link href="/dashboard/subscriptions">
                    <i className="icon-material-outline-rate-review"></i>
                    Abunəliyim
                  </Link>
                </li>
                <li className={pathname === '/dashboard/transactions' ? 'active' : ''}>
                  <Link href="/dashboard/transactions">
                    <i className="icon-material-outline-receipt"></i>
                    Tranzaksiya tarixçəsi
                  </Link>
                </li>
                <li className={pathname === '/dashboard/reviews' ? 'active' : ''}>
                  <Link href="/dashboard/reviews">
                    <i className="icon-material-outline-rate-review"></i>
                    Rəylər
                  </Link>
                </li>
                <li className={pathname === '/dashboard/bookmarks' ? 'active' : ''}>
                  <Link href="/dashboard/bookmarks">
                    <i className="icon-material-outline-star-border"></i>
                    Gözaltılar
                  </Link>
                </li>
                <li className={pathname === '/dashboard/profile/settings' ? 'active' : ''}>
                  <Link href="/dashboard/profile/settings">
                    <i className="icon-material-outline-supervisor-account"></i>
                    Profil ayarları
                  </Link>
                </li>
                <li>
                  <a href="#" onClick={() => {
                    // TODO: wire to AuthContext.logout (current layout still has legacy logout form)
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
  );
};

export default CompanySidebar;
