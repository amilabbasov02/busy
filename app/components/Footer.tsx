import Link from 'next/link';

const Footer = () => {
  return (
    <div id="footer">
      {/* Footer Top Section */}
      <div className="footer-top-section">
        <div className="container">
          <div className="footer-rows-container">
            <div className="footer-rows-left">
              <div className="footer-row">
                <div className="footer-row-inner footer-logo">
                  <img src="/images/logo2.png" alt="" />
                </div>
              </div>
            </div>
            <div className="footer-rows-right">
              <div className="footer-row">
                <div className="footer-row-inner">
                  <ul className="footer-social-links">
                    <li><a href="#" title="Facebook" data-tippy-placement="bottom" data-tippy-theme="dark"><i className="icon-brand-facebook-f"></i></a></li>
                    <li><a href="#" title="Twitter" data-tippy-placement="bottom" data-tippy-theme="dark"><i className="icon-brand-twitter"></i></a></li>
                    <li><a href="#" title="Google Plus" data-tippy-placement="bottom" data-tippy-theme="dark"><i className="icon-brand-google-plus-g"></i></a></li>
                    <li><a href="#" title="LinkedIn" data-tippy-placement="bottom" data-tippy-theme="dark"><i className="icon-brand-linkedin-in"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Top Section / End */}

      {/* Footer Middle Section */}
      <div className="footer-middle-section">
        <div className="container">
          <div className="row">
            <div className="col-xl-2 col-lg-2 col-md-3">
              <div className="footer-links">
                <h3>Faydalı Linklər</h3>
                <ul>
                  <li><Link href="/contact"><span>Əlaqə</span></Link></li>
                  <li><Link href="/privacy"><span>Məxfilik Siyasəti</span></Link></li>
                  <li><Link href="/terms"><span>İstifadəçi Razılaşması</span></Link></li>
                </ul>
              </div>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-3">
              <div className="footer-links">
                <h3>Hesabım</h3>
                <ul>
                  <li><Link href="/login"><span>Daxil ol</span></Link></li>
                  <li><Link href="/register"><span>Qeydiyyat</span></Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Middle Section / End */}

      {/* Footer Copyrights */}
      <div className="footer-bottom-section">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              © 2024 <strong>Busy.az</strong>. Bütün hüquqlar qorunur.
            </div>
          </div>
        </div>
      </div>
      {/* Footer Copyrights / End */}
    </div>
  );
};

export default Footer;