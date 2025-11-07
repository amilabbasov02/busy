"use client";

const DashboardPage = () => {
  return (
    <div className="dashboard-container" style={{ height: '871px' }}>
      <div className="dashboard-sidebar">
        <div className="dashboard-sidebar-inner">
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
                    <a href="/dashboard/jobs">
                      <i className="icon-material-outline-business-center"></i>
                      Vakansiyaları idarə et
                    </a>
                  </li>
                  <li>
                    <a href="/dashboard/jobs/create">
                      <i className="icon-material-outline-business-center"></i>
                      Vakansiya yarat
                    </a>
                  </li>
                </ul>
                <ul data-submenu-title="Şirkətlər">
                  <li>
                    <a href="/dashboard/companies">
                      <i className="icon-material-outline-business-center"></i>
                      Şirkətlər
                    </a>
                  </li>
                  <li>
                    <a href="/dashboard/companies/create">
                      <i className="icon-material-outline-business-center"></i>
                      Şirkət yarat
                    </a>
                  </li>
                </ul>
                <ul data-submenu-title="Hesab">
                  <li>
                    <a href="/dashboard/subscriptions">
                      <i className="icon-material-outline-rate-review"></i>
                      Abunəliyim
                    </a>
                  </li>
                  <li>
                    <a href="/dashboard/reviews">
                      <i className="icon-material-outline-rate-review"></i>
                      Rəylər
                    </a>
                  </li>
                  <li>
                    <a href="/dashboard/bookmarks">
                      <i className="icon-material-outline-star-border"></i>
                      Gözaltılar
                    </a>
                  </li>
                  <li>
                    <a href="https://busy.az/dashboard/profile/settings">
                      <i className="icon-material-outline-supervisor-account"></i>
                      Profil ayarları
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={(e) => { e.preventDefault(); const form = document.getElementById('logoutform') as HTMLFormElement; if(form) form.submit(); }}>
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
            <h3>Salam, Busy Admin!</h3>
            <span>Salam</span>
            <nav id="breadcrumbs" className="dark d-none">
              <ul>
                <li><a href="#">Baş səhifə</a></li>
                <li>İdarə paneli</li>
              </ul>
            </nav>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="dashboard-box main-box-in-row">
                <div className="headline">
                  <h3><i className="icon-feather-bar-chart-2"></i> Profile View</h3>
                </div>
                <div className="content">
                  <div className="chart">
                    <canvas id="chart" width="100" height="45"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;