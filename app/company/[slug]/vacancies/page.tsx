"use client";
import Script from "next/script";
import styles from "./page.module.css";
import { useParams } from "next/navigation";
import Link from "next/link";

const CompanyVacanciesPage = () => {
  const params = useParams();
  const slug = params.slug;

  return (
    <div className={styles.companyVacancies}>
      <div id="wrapper" style={{ overflowY: "hidden", paddingTop: "82px" }}>
        <div className="clearfix"></div>

        <div
          className="single-page-header"
          data-background-image="/storage/uploads/KEwXYJOmeA3ApwhIehLOi0yRMNFjfo3EGros70Xf.webp"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="single-page-header-inner">
                  <div className="left-side">
                    <div className="header-image">
                      <img
                        className="lozad"
                        data-src="/storage/uploads/image/AAgro.jpg"
                        alt=""
                        src="/storage/uploads/image/AAgro.jpg"
                        data-loaded="true"
                      />
                    </div>
                    <div className="header-details">
                      <h1>
                        A Agro <span></span>
                      </h1>
                    </div>
                  </div>
                  <div className="right-side" style={{ maxWidth: "35%" }}>
                    <nav id="breadcrumbs" className="white" style={{ display: "none" }}>
                      <ul>
                        <li>
                          <Link href="/">Baş səhifə</Link>
                        </li>
                        <li>
                          <Link href="/companies">Şirkətlər</Link>
                        </li>
                        <li>
                          <Link href={`/company/${slug}`}>A Agro</Link>
                        </li>
                        <li>Vakansiyalar</li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="background-image-container"
            style={{
              backgroundImage:
                "url('/storage/uploads/KEwXYJOmeA3ApwhIehLOi0yRMNFjfo3EGros70Xf.webp')",
            }}
          ></div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-8 content-right-offset">
              <nav className="nav nav-pills nav-justified">
                <Link
                  className="button ripple-effect-dark gray"
                  href={`/company/${slug}`}
                >
                  Şirkət haqqında
                </Link>
                <Link
                  className="button ripple-effect"
                  href={`/company/${slug}/vacancies`}
                >
                  Vakansiyalar
                </Link>
              </nav>
              <br />
              <div className="boxed-list margin-bottom-60">
                <div className="boxed-list-headline">
                  <h3>
                    <i className="icon-material-outline-business-center"></i>{" "}
                    Vakansiyalar
                  </h3>
                </div>
                <div className="listings-container compact-list-layout">
                  <Link
                    href="/vacancy/19058/intern-konullu-maliyye-sobesi"
                    className="job-listing"
                  >
                    <div className="job-listing-details">
                      <div className="job-listing-description">
                        <h3 className="job-listing-title">
                          {" "}
                          Intern (könüllü) / maliyyə şöbəsi
                        </h3>
                        <div className="job-listing-footer">
                          <ul><li>3796 gün əvvəl</li></ul>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/vacancy/7790/technologist"
                    className="job-listing"
                  >
                    <div className="job-listing-details">
                      <div className="job-listing-description">
                        <h3 className="job-listing-title"> Technologist</h3>
                        <div className="job-listing-footer">
                          <ul><li>4748 gün əvvəl</li></ul>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/vacancy/7789/finance-manager"
                    className="job-listing"
                  >
                    <div className="job-listing-details">
                      <div className="job-listing-description">
                        <h3 className="job-listing-title"> Finance Manager</h3>
                        <div className="job-listing-footer">
                          <ul><li>4748 gün əvvəl</li></ul>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/vacancy/7788/procurement-specialist"
                    className="job-listing"
                  >
                    <div className="job-listing-details">
                      <div className="job-listing-description">
                        <h3 className="job-listing-title">
                          {" "}
                          Procurement Specialist
                        </h3>
                        <div className="job-listing-footer">
                          <ul><li>4748 gün əvvəl</li></ul>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4">
              <div className="sidebar-container">
                <div className="sidebar-widget">
                  <h3>Dostlarınla paylaş</h3>

                  <button className="bookmark-button margin-bottom-25">
                    <span className="bookmark-icon"></span>
                    <span className="bookmark-text">Gözaltına sal</span>
                    <span className="bookmarked-text">company.Bookmarked</span>
                  </button>

                  <div className="copy-url">
                    <input
                      id="copy-url"
                      type="text"
                      defaultValue=""
                      className="with-border"
                    />
                    <button
                      className="copy-url-button ripple-effect"
                      data-clipboard-target="#copy-url"
                      data-tippy-placement="top"
                      data-tippy=""
                      data-original-title="Copy to Clipboard"
                    >
                      <i className="icon-material-outline-file-copy"></i>
                    </button>
                  </div>

                  <div className="share-buttons margin-top-25">
                    <div className="share-buttons-trigger">
                      <i className="icon-feather-share-2"></i>
                    </div>
                    <div className="share-buttons-content">
                      <span>
                        Maraqlıdır? <strong>Paylaş!</strong>
                      </span>
                      <ul className="share-buttons-icons">
                        <li>
                          <a
                            href={`https://www.facebook.com/sharer.php?u=https://busy.az/company/${slug}/vacancies`}
                            target="_blank"
                            data-button-color="#3b5998"
                            data-tippy-placement="top"
                            data-tippy=""
                            data-original-title="Share on Facebook"
                            style={{ backgroundColor: "rgb(59, 89, 152)" }}
                          >
                            <i className="icon-brand-facebook-f"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href={`https://twitter.com/intent/tweet?url=https://busy.az/company/${slug}/vacancies`}
                            target="_blank"
                            data-button-color="#1da1f2"
                            data-tippy-placement="top"
                            data-tippy=""
                            data-original-title="Share on Twitter"
                            style={{ backgroundColor: "rgb(29, 161, 242)" }}
                          >
                            <i className="icon-brand-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=https://busy.az/company/${slug}/vacancies`}
                            target="_blank"
                            data-button-color="#0077b5"
                            data-tippy-placement="top"
                            data-tippy=""
                            data-original-title="Share on LinkedIn"
                            style={{ backgroundColor: "rgb(0, 119, 181)" }}
                          >
                            <i className="icon-brand-linkedin-in"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="margin-top-15"></div>
        <Script src="https://busy.az/js/app.js?v=1" />
      </div>
    </div>
  );
};

export default CompanyVacanciesPage;