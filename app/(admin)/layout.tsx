import Script from 'next/script';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="az">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
        <title>Admin Panel</title>
        <link href="/components/core/img/favicon.png" rel="shortcut icon" />
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,700,700i,900" rel="stylesheet" />
        
        {/* VENDORS */}
        <link rel="stylesheet" type="text/css" href="/vendors/bootstrap/dist/css/bootstrap.css" />
        <link rel="stylesheet" type="text/css" href="/vendors/font-feathericons/dist/feather.css" />
        <link rel="stylesheet" type="text/css" href="/vendors/font-awesome/css/font-awesome.min.css" />
        
        {/* AIR UI */}
        <link rel="stylesheet" type="text/css" href="/components/vendors/style.css" />
        <link rel="stylesheet" type="text/css" href="/components/core/style.css" />
        <link rel="stylesheet" type="text/css" href="/components/menu-left/style.css" />
        <link rel="stylesheet" type="text/css" href="/components/topbar/style.css" />
        <link rel="stylesheet" type="text/css" href="/components/footer/style.css" />
      </head>
      <body className="air__menu--gray">
        <div className="air__initialLoading"></div>
        <div className="air__layout air__layout--hasSider">
          
          {/* Static Menu Placeholder */}
          <div className="air__menuLeft">
            <div className="air__menuLeft__outer">
              <a href="javascript: void(0);" className="air__menuLeft__logo">
                <div className="air__menuLeft__logo__name">BUSY.AZ</div>
              </a>
              <div className="air__menuLeft__container air__customScroll">
                <ul className="air__menuLeft__list">
                  <li className="air__menuLeft__category">
                    <span>Main</span>
                  </li>
                  <li className="air__menuLeft__item">
                    <a href="/dashboard" className="air__menuLeft__link">
                      <i className="fe fe-home air__menuLeft__icon"></i>
                      <span>Dashboard</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="air__layout">
            {/* Static Header Placeholder */}
            <div className="air__layout__header">
              <div className="air__utils__header">
                <div className="air__topbar">
                  <div className="dropdown mr-auto d-none d-md-block"></div>
                  <div className="dropdown">
                    <a href="#" className="dropdown-toggle text-nowrap" data-toggle="dropdown" aria-expanded="false" data-offset="5,15">
                      <img className="dropdown-toggle-avatar" src="/components/core/img/avatars/avatar-2.png" alt="User avatar" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="air__layout__content">
              <div className="air__utils__content">
                {children}
              </div>
            </div>

            {/* Static Footer Placeholder */}
            <div className="air__layout__footer">
              <div className="air__footer">
                <div className="air__footer__inner">
                  <p>&copy; {new Date().getFullYear()} Busy.az</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Script src="https://code.jquery.com/jquery-3.3.1.min.js" strategy="beforeInteractive" />
        <Script src="/vendors/bootstrap/dist/js/bootstrap.js" strategy="lazyOnload" />
        <Script src="/components/core/index.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}