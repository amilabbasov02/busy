import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import '/public/css/pages/companies.css';

const CompaniesPage = () => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
  const currentIndex = 0; // Mock index 'A'

  return (
    <>
      <Head>
        <title>A | Şirkətlər</title>
        <link rel="stylesheet" href="/css/pages/companies.css?v=1" />
      </Head>

      <div id="titlebar" className="gradient margin-bottom-45">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2>A ilə başlayan şirkətlər</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <input type="text" className="form-control" placeholder="Şirkət adını daxil edin" id="company_autocomplete" />
          </div>
          <div className="col-xl-12">
            <div className="letters-list">
              {alphabet.map((letter, index) => (
                <Link href={`/companies?index=${index}`} key={index} className={index === currentIndex ? 'current' : ''}>
                  {letter}
                </Link>
              ))}
            </div>
          </div>
          <div className="col-xl-12">
            <div className="companies-list">
              {/* Sample Company */}
              <Link href="/company/sample-company" className="company">
                <div className="company-inner-alignment">
                  <span className="company-logo">
                    <Image src="/images/company-logo-placeholder.png" alt="Sample Company" width={100} height={100} />
                  </span>
                  <h4>Sample Company</h4>
                </div>
              </Link>
               {/* Sample Company 2 */}
               <Link href="/company/sample-company-2" className="company">
                <div className="company-inner-alignment">
                  <span className="company-logo">
                    <Image src="/images/company-logo-placeholder.png" alt="Sample Company 2" width={100} height={100} />
                  </span>
                  <h4>Sample Company 2</h4>
                </div>
              </Link>
            </div>
            {/* Pagination would go here */}
          </div>
        </div>
      </div>
      <div className="margin-top-70"></div>
    </>
  );
};

export default CompaniesPage;