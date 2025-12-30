"use client";
import React from 'react';
import Link from 'next/link';

const mockCompanies = [
  { id: 1, name: 'Tech Solutions Inc.', status: 'active' },
  { id: 2, name: 'Innovate Co.', status: 'active' },
  { id: 3, name: 'Creative Minds LLC', status: 'pending' },
];

const ManageCompaniesPage = () => {

  const handleDelete = (companyId: number) => {
    if (window.confirm('Bu şirkəti silmək istədiyinizə əminsiniz?')) {
      // API call to delete the company would go here
      console.log(`Deleting company with id: ${companyId}`);
      // On success, you would refetch the companies or remove it from the state
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
                  <li>
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
                  <li className="active">
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
                    <a href="/dashboard/profile/settings">
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
            <h3>Şirkətləri idarə et</h3>
          </div>

          <div className="row">
            <div className="col-xl-12">
              <div className="dashboard-box margin-top-0">
                <div className="headline">
                  <h3><i className="icon-material-outline-business-center"></i> Şirkətlərim</h3>
                </div>
                <div className="content">
                  <ul className="dashboard-box-list">
                    {mockCompanies.map(company => (
                      <li key={company.id}>
                        <div className="job-listing">
                          <div className="job-listing-details">
                            <div className="job-listing-description">
                              <h3 className="job-listing-title"><a href="#">{company.name}</a></h3>
                              <div className="job-listing-footer">
                                <ul>
                                   <li>
                                    {company.status === 'active' 
                                      ? <span className="dashboard-status-button green"><i className="icon-material-outline-check-circle"></i> Aktiv</span> 
                                      : <span className="dashboard-status-button yellow"><i className="icon-material-outline-access-time"></i> Gözləmədə</span>}
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="buttons-to-right">
                          <Link href={`/dashboard/companies/edit/${company.id}`} className="button green ripple-effect ico" title="Redaktə et" data-tippy-placement="top"><i className="icon-feather-edit"></i></Link>
                          <button onClick={() => handleDelete(company.id)} className="button red ripple-effect ico" title="Sil" data-tippy-placement="top"><i className="icon-feather-trash-2"></i></button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCompaniesPage;
