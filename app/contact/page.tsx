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
                  <li><a href="mailto:info@busy.az">info@busy.az</a></li>
                </ul>
              </div>
              <div id="single-job-map-container">
                {/* Map embed would go here */}
              </div>
            </div>
          </div>

          <div className="col-xl-8 col-lg-8 offset-xl-2 offset-lg-2">
            <section id="contact" className="margin-bottom-60">
              <h3 className="headline margin-top-15 margin-bottom-35">Suallarınız varsa bizimlə əlaqə saxlayın</h3>
              <form method="post" name="contactform" id="contactform" autoComplete="on">
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-with-icon-left">
                      <input className="with-border" name="full_name" type="text" id="name" placeholder="Adınız" required />
                      <i className="icon-material-outline-account-circle"></i>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-with-icon-left">
                      <input className="with-border" name="email" type="email" id="email" placeholder="Email ünvanınız" required />
                      <i className="icon-material-outline-email"></i>
                    </div>
                  </div>
                </div>
                <div className="input-with-icon-left">
                  <input className="with-border" name="subject" type="text" id="subject" placeholder="Mövzu" required />
                  <i className="icon-material-outline-assignment"></i>
                </div>
                <div>
                  <textarea className="with-border" name="message" cols={40} rows={5} id="comments" placeholder="Mesajınız" required></textarea>
                </div>
                <button type="submit" className="button ripple-effect button-sliding-icon margin-bottom-40" style={{ float: 'right' }}>
                  Göndər
                  <i className="icon-feather-check"></i>
                </button>
              </form>
            </section>
          </div>
        </div>
        <div className="margin-top-70"></div>
      </div>
    </>
  );
};

export default ContactPage;