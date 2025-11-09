import Sidebar from './components/Sidebar';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard-container" style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh' }}>
      <Sidebar />
      <div className="dashboard-content-container" style={{ flexGrow: 1 }}>
        <div className="dashboard-content-inner" style={{ padding: '20px' }}>
          {children}
          <div id="footer">
            <div className="footer-middle-section" style={{ borderBottom: '1px solid #484848' }}>
              <div className="container">
                <div className="row">
                  {/* Static Footer Content Placeholder */}
                  <div className="col-md-3">
                    <div className="footer-links">
                      <h4>For Candidates</h4>
                      <ul>
                        <li><a href="#">Browse Jobs</a></li>
                        <li><a href="#">Browse Categories</a></li>
                        <li><a href="#">Submit Resume</a></li>
                        <li><a href="#">Candidate Dashboard</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="footer-links">
                      <h4>For Employers</h4>
                      <ul>
                        <li><a href="#">Post a Job</a></li>
                        <li><a href="#">Browse Candidates</a></li>
                        <li><a href="#">Employer Dashboard</a></li>
                        <li><a href="#">Packages</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="footer-links">
                      <h4>Helpful Links</h4>
                      <ul>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Use</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="footer-links">
                      <h4>Account</h4>
                      <ul>
                        <li><a href="#">Log In</a></li>
                        <li><a href="#">My Account</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-top-section">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="footer-rows-container">
                      <div className="row">
                        <div className="col-md-3 col-xl-3 col-lg-3 col-sm-12">
                          <div className="footer-rows-left">
                            <div className="footer-row">
                              <div className="footer-row-inner footer-logo"></div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-xl-6 col-lg-6 col-sm-12 resp-m-0" style={{ paddingTop: '2.4%' }}>
                          <div className="footer-row" style={{ width: '100%' }}>
                            <div className="footer-row-inner" style={{ width: '100%' }}>
                              <ul className="footer-social-links" style={{ display: 'flex', justifyContent: 'center' }}>
                                <li><a href="#" className="fb-icon" title="Facebook" target="_blank"><i className="icon-brand-facebook-f"></i></a></li>
                                <li><a href="#" className="lnk-icon" title="LinkedIn" target="_blank"><i className="icon-brand-linkedin-in"></i></a></li>
                                <li><a href="#" className="ins-icon" title="Instagram" target="_blank"><i className="icon-brand-instagram"></i></a></li>
                                <li><a href="#" className="twt-icon" title="Twitter" target="_blank"><i className="icon-brand-twitter"></i></a></li>
                                <li><a href="#" className="youtube-icon" title="Youtube" target="_blank"><i className="icon-brand-youtube"></i></a></li>
                                <li><a href="#" className="lnk-icon" title="Telegram" target="_blank"><i className="icon-brand-telegram"></i></a></li>
                              </ul>
                              <div className="clearfix"></div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3 col-xl-3 col-lg-3 col-sm-12" style={{ paddingTop: '2%' }}>
                          <div className="footer-row-inner">
                            {/* Language switcher will need to be a client component */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-bottom-section">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    © {new Date().getFullYear()} <strong>Busy.az.</strong> All Rights Reserved.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}