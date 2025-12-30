import Head from 'next/head';
import '/public/css/pages/contact.css';

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Əlaqə</title>
        <link rel="stylesheet" href="/css/pages/contact.css" />
      </Head>

      <div id="titlebar" className="gradient">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2>Əlaqə</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="contact-location-info margin-bottom-50">
              <div className="contact-address">
                <ul>
                  <li className="contact-address-headline">Ofisimiz</li>
                  <li>Ünvan burada olacaq</li>
                  <li>Telefon: (123) 456-7890</li>
                  <li><a href="mailto:info@example.com">info@example.com</a></li>
                </ul>
              </div>
              <div id="single-job-map-container">
                {/* Map embed would go here */}
              </div>
            </div>
          </div>

          <div className="col-xl-8 col-lg-8 offset-xl-2 offset-lg-2">
            <section id="contact" className="contact-form-from-image">
              <h3>Bizə hər hansı əməkdaşlıq təklifiniz varsa, çəkinməyin</h3>
              <p className="contact-form-subtitle">Aşağıdakı formanı doldurun, sizə 24 saat ərzində geri zəng edəcəyik.</p>
              <form>
                  <div className="input-container">
                      <input type="text" placeholder="Ad Soyad" />
                  </div>
                  <div className="input-container">
                      <input type="email" placeholder="Email" />
                  </div>
                  <div className="input-container">
                      <input type="tel" placeholder="50 555 55 55" />
                  </div>
                  <button type="submit" className="button">Göndər</button>
              </form>
              <p className="contact-form-footer-text">Peşəkarlar ilə işləməyə <a href="#">HƏ</a> de</p>
            </section>
          </div>
        </div>
        <div className="margin-top-70"></div>
      </div>
    </>
  );
};

export default ContactPage;