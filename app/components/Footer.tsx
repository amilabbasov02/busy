import Link from 'next/link';

const Footer = () => {
  return (
    <div id="footer">
      <div className="footer-middle-section" style={{ borderBottom: '1px solid #484848' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="footer-links">
                <h4>For Candidates</h4>
                <ul>
                  <li><Link href="/vacancies">Browse Jobs</Link></li>
                  <li><Link href="/categories">Browse Categories</Link></li>
                  <li><Link href="/jobseekers">Browse Candidates</Link></li>
                  <li><Link href="/dashboard/jobseeker/profile">Candidate Dashboard</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-md-3">
              <div className="footer-links">
                <h4>For Employers</h4>
                <ul>
                  <li><Link href="/dashboard/jobs/create">Post a Job</Link></li>
                  <li><Link href="/jobseekers">Browse Candidates</Link></li>
                  <li><Link href="/dashboard">Employer Dashboard</Link></li>
                  <li><Link href="/pricing">Packages</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-md-3">
              <div className="footer-links">
                <h4>Helpful Links</h4>
                <ul>
                  <li><Link href="/contact">Contact</Link></li>
                  <li><Link href="/privacy">Privacy Policy</Link></li>
                  <li><Link href="/terms">Terms of Use</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-md-3">
              <div className="footer-links">
                <h4>Account</h4>
                <ul>
                  <li><Link href="/login">Log In</Link></li>
                  <li><Link href="/dashboard/profile/settings">My Account</Link></li>
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
                        <div className="footer-row-inner footer-logo">
                          <img src="/images/logo2.png" alt="Busy.az" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-xl-6 col-lg-6 col-sm-12 resp-m-0" style={{ paddingTop: '2.4%' }}>
                    <div className="footer-row" style={{ width: '100%' }}>
                      <div className="footer-row-inner" style={{ width: '100%' }}>
                        <ul className="footer-social-links" style={{ display: 'flex', justifyContent: 'center' }}>
                          <li><a href="#" className="fb-icon" title="Facebook" target="_blank" rel="noreferrer"><i className="icon-brand-facebook-f"></i></a></li>
                          <li><a href="#" className="lnk-icon" title="LinkedIn" target="_blank" rel="noreferrer"><i className="icon-brand-linkedin-in"></i></a></li>
                          <li><a href="#" className="ins-icon" title="Instagram" target="_blank" rel="noreferrer"><i className="icon-brand-instagram"></i></a></li>
                          <li><a href="#" className="twt-icon" title="Twitter" target="_blank" rel="noreferrer"><i className="icon-brand-twitter"></i></a></li>
                          <li><a href="#" className="youtube-icon" title="Youtube" target="_blank" rel="noreferrer"><i className="icon-brand-youtube"></i></a></li>
                          <li><a href="#" className="lnk-icon" title="Telegram" target="_blank" rel="noreferrer"><i className="icon-brand-telegram"></i></a></li>
                        </ul>
                        <div className="clearfix"></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-xl-3 col-lg-3 col-sm-12" style={{ paddingTop: '2%' }}>
                    <div className="footer-row-inner">
                      {/* language switcher placeholder */}
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
  );
};

export default Footer;
