import type { NextPage } from "next";
import styles from "./page.module.css";

const CompanyDetails: NextPage = () => {
  return (
    <div className={styles.companyDetails}>
      <div id="wrapper" style={{ overflowY: "hidden" }}>
        <div className="clearfix"></div>

        {/* Titlebar */}
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
                      <img src="/storage/uploads/image/AAgro.jpg" alt="" />
                    </div>
                    <div className="header-details">
                      <h1>
                        A Agro <span></span>
                      </h1>
                      <ul></ul>
                    </div>
                  </div>
                  <div className="right-side">
                    {/* Breadcrumbs */}
                    <nav id="breadcrumbs" className="white" style={{ display: "none" }}>
                      <ul>
                        <li>
                          <a href="/">Baş səhifə</a>
                        </li>
                        <li>
                          <a href="/companies">Şirkətlər</a>
                        </li>
                        <li>A Agro</li>
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

        {/* Page Content */}
        <div className="container">
          <div className="row">
            {/* Content */}
            <div className="col-xl-8 col-lg-8 content-right-offset">
              <nav className="nav nav-pills nav-justified">
                <a className="button ripple-effect" href="/company/a-agro">
                  Şirkət haqqında
                </a>
                <a
                  className="button ripple-effect-dark gray"
                  href="/company/a-agro/vacancies"
                >
                  Vakansiyalar
                </a>
              </nav>

              <br />

              <div className="single-page-section">
                <p>
                  <strong>A AGRO MMC</strong>-nin əsas səhmdarı&nbsp;Xəzər
                  Beynalxalq İnvestisiya Şirkəti&nbsp;QSC-dir.&nbsp;A
                  AGRO&nbsp;MMC&nbsp;tam həcmdə fəaliyyətinə 2010-cu ilin mart
                  ayından başlayıb.
                </p>

                <p>
                  <strong>“A AGRO” MMC</strong>&nbsp;– geniş torpaq sahələrinə
                  malik olan,kahı növlərinin və tərəvəzlərin
                  becərilməsi,istehsalı,emalı və hazır salatların satışı ilə
                  məşğul olan nəinki Azərbaycanda,həmçinin&nbsp; bütün Qafqaz
                  regionunda ən iri şirkətlərdən biridir.
                </p>

                <p>
                  İstehsal etdiyimiz bütün məhsullar&nbsp; qabaqcıl,yüksək
                  texnologiyalı innovativ avropa standartlarına uyğun avadanlıq
                  və dəzgahlar vasitəsilə emal olunur,doğranılır və
                  qablaşdırılır. Mövcud istehsal prosesləri çox pilləli
                  təhlükəsizlik tədbirlərindən ibarətdir ,hansı ki qida
                  məhsullarını risk və təhlükələrdən qoruyaraq,onların tam
                  təhlükəsizliyini təmin edir.Hər bir məhsul bütün sanitar norma
                  və qaydalara çox ciddi sürətdə riayət olunaraq ,milli və
                  beynəlxalq standartlara uyğun olaraq hazırlanır.
                </p>

                <p>
                  Şirkətimiz daima müştərilərimizin sağlamlığının qayğısına
                  qalır və onların məmnunluğuna nail olmaq məqsədilə məhsulların
                  istehsalı zamanı qida təhlükəsizliyi və yüksək keyfiyyət
                  prinsiplərinə sadiqdir.
                </p>

                <p>&nbsp;</p>

                <p>
                  <strong>Təşkilatın əsas məqsədi</strong> – insanların
                  sağlamlığının qayğısına qalmaq , təbii , ekoloji cəhətdən
                  təmiz və saf , “<strong>Rahat Salat</strong>“ brendi altında{" "}
                  <strong>Sağlam qida məhsullarının</strong> istehsalında
                  təhlükəsizliyin yüksək səviyyədə təmin olunması , yüksək
                  keyfiyyətli məhsulların istehsalı və istehlakçıya çatdırılması
                  , istehsal etdiyimiz məhsulların pərakəndə satışının təşkili
                  və satış strategiyasının müxtəlif istiqamətlərdə inkişaf
                  etdirilməsi , xalqımıza sevgi ilə hazırlanan yüksək
                  keyfiyyətli məhsulun təqdim olunması və keyfiyyətli xidmətin
                  göstərilməsi hesabına müştərilərin və istehlakçıların tam
                  məmnunluğuna nail olmaq , onların təklif , tələb və
                  şikayətlərini nəzərə alaraq təşkilatımızın təkmilləşməsini və
                  daimi yüksəlişə doğru inkişafını təmin etmək.
                </p>

                <p>
                  <strong>Missiyamız</strong> – xalqımızın və insanlarımızın
                  sağlamlığının qayğısına qalmaqla bərabər yerli bazarlara yeni
                  məhsul konsepsiyası təqdim edərək istehsal etdiyimiz “
                  <strong>Rahat Salat</strong>” brendli təbii , ekoloji cəhətdən
                  təmiz və saf , – “<strong>Sağlam qida məhsullarını</strong>” –
                  xalqımızın istifadəsinə çatdırmaq , sağlam qidalanma ilə
                  yanaşı sağlam bədəndə sağlam ruh prinsipini həyata keçirmək&nbsp;
                  . Çünki hər bir insanın&nbsp; tək ürəyinə deyil , həmçinin
                  rahatlığına və birinci növbədə&nbsp; sağlamlığına doğru
                  aparan yol mədəsindən keçir.
                </p>

                <p>
                  <strong>Əsas vəzifə</strong> – Meyvə , tərəvəz və kahı
                  növlərindən müxtəlif çeşidlərdən ibarət olan məhsullarının
                  istehsalı sahəsində yerli və beynəlxalq bazar iqtisadiyyatı
                  şəraitində lider olmaq , intensiv şəkildə daxili və xarici
                  satış bazarlarına inteqrasiyanı təmi etmək , hər bir
                  istehlakçının “<strong>Sağlam qida məhsullarına</strong>” olan
                  tələbatını və ehtiyyaclarını keyfiyyətli məhsulun təklifi yolu
                  ilə ödənilməsini təmin etmək.
                </p>

                <h3 className="text-center-h3">
                  Rəy yoxdur. Bəlkə bu şirkət haqda elə birinci rəyi sən
                  yazasan?
                </h3>
                <div className="centered-button margin-top-35">
                  <a
                    href="#small-dialog"
                    className="popup-with-zoom-anim button button-sliding-icon"
                    style={{ width: "127.656px" }}
                  >
                    Rəy yaz{" "}
                    <i className="icon-material-outline-arrow-right-alt"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-xl-4 col-lg-4">
              <div className="sidebar-container">
                {/* Sidebar Widget */}
                <div className="sidebar-widget">
                  <h3>Dostlarınla paylaş</h3>

                  {/* Bookmark Button */}
                  <button className="bookmark-button margin-bottom-25">
                    <span className="bookmark-icon"></span>
                    <span className="bookmark-text">Gözaltına sal</span>
                    <span className="bookmarked-text">company.Bookmarked</span>
                  </button>

                  {/* Copy URL */}
                  <div className="copy-url">
                    <input
                      id="copy-url"
                      type="text"
                      value=""
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

                  {/* Share Buttons */}
                  <div className="share-buttons margin-top-25">
                    <div className="share-buttons-trigger">
                      <i className="icon-feather-share-2"></i>
                    </div>
                    <div className="share-buttons-content">
                      <span>
                        company.Interesting? <strong>Paylaş!</strong>
                      </span>
                      <ul className="share-buttons-icons">
                        <li>
                          <a
                            href="https://www.facebook.com/sharer.php?u=https://busy.az/company/a-agro"
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
                            href="https://twitter.com/intent/tweet?url=https://busy.az/company/a-agro"
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
                            href="https://www.linkedin.com/sharing/share-offsite/?url=https://busy.az/company/a-agro"
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

                <div className="sidebar-widget">
                  <canvas
                    id="horizontalBarChartCanvas"
                    style={{ width: "100%", height: "300px" }}
                  ></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="margin-top-15"></div>
        {/* Spacer / End */}

        <div
          id="small-dialog"
          className="zoom-anim-dialog mfp-hide dialog-with-tabs"
        >
          {/* Tabs */}
          <div className="sign-in-form">
            <ul className="popup-tabs-nav" style={{ pointerEvents: "none" }}>
              <li className="active">
                <a href="#tab">Rəy yaz</a>
              </li>
            </ul>

            <div className="popup-tabs-container">
              {/* Tab */}
              <div className="popup-tab-content" id="tab" style={{}}>
                <form
                  method="post"
                  action="https://busy.az/review-store"
                  id="leave-company-review-form"
                >
                  <input
                    type="hidden"
                    name="_token"
                    value="3vccJHBy1WTuLzZipa6qNmTJraK3CV92kNaESoSW"
                  />
                  <input type="hidden" name="company_id" value="613" />
                  {/* Welcome Text */}
                  <div className="welcome-text">
                    <h3>Rəyini yaz - A Agro</h3>

                    {/* Form */}

                    {/* Leave Rating */}
                    <div className="clearfix"></div>
                    <div className="leave-rating-container">
                      <div className="leave-rating margin-bottom-5">
                        <input
                          type="radio"
                          name="star"
                          id="rating-5"
                          value="5"
                          required
                        />
                        <label
                          htmlFor="rating-5"
                          className="icon-material-outline-star"
                        ></label>
                        <input
                          type="radio"
                          name="star"
                          id="rating-4"
                          value="4"
                          required
                        />
                        <label
                          htmlFor="rating-4"
                          className="icon-material-outline-star"
                        ></label>
                        <input
                          type="radio"
                          name="star"
                          id="rating-3"
                          value="3"
                          required
                        />
                        <label
                          htmlFor="rating-3"
                          className="icon-material-outline-star"
                        ></label>
                        <input
                          type="radio"
                          name="star"
                          id="rating-2"
                          value="2"
                          required
                        />
                        <label
                          htmlFor="rating-2"
                          className="icon-material-outline-star"
                        ></label>
                        <input
                          type="radio"
                          name="star"
                          id="rating-1"
                          value="1"
                          required
                        />
                        <label
                          htmlFor="rating-1"
                          className="icon-material-outline-star"
                        ></label>
                      </div>
                    </div>
                    <div className="clearfix"></div>
                    {/* Leave Rating / End */}
                  </div>

                  <div className="row">
                    <div className="col-xl-12">
                      <div
                        className="input-with-icon-left"
                        data-tippy-placement="bottom"
                        data-tippy=""
                        data-original-title="Your Name. Can be blank"
                      >
                        <i className="icon-material-outline-account-circle"></i>
                        <input
                          type="text"
                          className="input-text with-border"
                          name="guest_name"
                          id="name"
                          placeholder=""
                        />
                      </div>
                    </div>

                    <div className="switch-container">
                      <label className="switch">
                        <input
                          type="checkbox"
                          name="annon"
                          className="js-switch"
                          defaultChecked
                          id="annon"
                        />
                        <span
                          className="switch-button"
                          style={{ marginLeft: "15px", marginTop: "2px" }}
                        ></span>
                        <span style={{ marginLeft: "50px" }}>Anonim rəy yaz</span>
                      </label>
                    </div>

                    <div className="col-xl-12">
                      <div className="input-with-icon-left">
                        <i className="icon-material-outline-rate-review"></i>
                        <input
                          type="text"
                          className="input-text with-border"
                          name="title"
                          id="title"
                          placeholder="Başlıq"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <input type="hidden" name="status" value="0" />

                  <textarea
                    className="with-border"
                    placeholder="Mətn"
                    name="body"
                    id="body"
                    cols={7}
                    required
                  ></textarea>
                </form>

                {/* Button */}
                <button
                  className="button margin-top-35 full-width button-sliding-icon ripple-effect"
                  type="submit"
                  form="leave-company-review-form"
                  style={{ width: "30px" }}
                >
                  Yaz getsin
                  <i className="icon-material-outline-arrow-right-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <script src="https://busy.az/js/app.js?v=1"></script>
      </div>
    </div>
  );
};

export default CompanyDetails;