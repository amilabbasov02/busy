"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const UserSidebar = () => {
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
              <ul data-submenu-title="Profil">
                <li className={pathname === '/dashboard/jobseeker/profile' ? 'active' : ''}>
                  <Link href="/dashboard/jobseeker/profile">
                    <i className="icon-material-outline-person"></i>
                    Fərdi məlumatlar
                  </Link>
                </li>
                <li className={pathname === '/dashboard/profile/education' ? 'active' : ''}>
                  <Link href="/dashboard/profile/education">
                    <i className="icon-material-outline-school"></i>
                    Təhsil
                  </Link>
                </li>
                <li className={pathname === '/dashboard/profile/experience' ? 'active' : ''}>
                  <Link href="/dashboard/profile/experience">
                    <i className="icon-material-outline-business-center"></i>
                    İş təcrübəsi
                  </Link>
                </li>
              </ul>

              <ul data-submenu-title="Hesab">
                <li className={pathname === '/dashboard/bookmarks' ? 'active' : ''}>
                  <Link href="/dashboard/bookmarks">
                    <i className="icon-material-outline-star-border"></i>
                    Gözaltılar
                  </Link>
                </li>
                <li className={pathname === '/dashboard/reviews' ? 'active' : ''}>
                  <Link href="/dashboard/reviews">
                    <i className="icon-material-outline-rate-review"></i>
                    Rəylər
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

export default UserSidebar;