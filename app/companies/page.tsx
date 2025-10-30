"use client";
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

const CompaniesPage = () => {
  const alphabet = "A,B,C,Ç,D,E,Ə,F,G,H,X,İ,J,K,Q,L,M,N,O,Ö,P,R,S,Ş,T,U,Ü,V,Y,Z,1,2,3,4,5,6,7,8,9".split(',');
  const searchParams = useSearchParams();
  const indexParam = searchParams.get('index') || '0';
  const currentIndex = parseInt(indexParam, 10);

  const [companies, setCompanies] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Mock data
  const allCompanies = [
    { name: 'A - Group Insurance Company / A-Qroup Sığorta Şirkəti', logo: '/images/company-logo-05.png', link: '/company/a-group-insurance-company-a-qroup-sigorta-sirketi/' },
    { name: 'A Agro', logo: '/storage/uploads/image/AAgro.jpg', link: '/company/a-agro/' },
    { name: 'A and S Union Afezko', logo: '/images/company-logo-05.png', link: '/company/a-and-s-union-afezko/' },
    { name: 'Bravo Supermarket', logo: '/images/company-logo-05.png', link: '#' },
    { name: 'Bank of Baku', logo: '/images/company-logo-05.png', link: '#' },
    { name: 'Caspian Development Group', logo: '/images/company-logo-05.png', link: '#' },
    { name: 'Çudo Peçka', logo: '/images/company-logo-05.png', link: '#' },
    { name: 'Delta Group', logo: '/images/company-logo-05.png', link: '#' },
    { name: 'Express Bank', logo: '/images/company-logo-05.png', link: '#' },
  ];

  useEffect(() => {
    // Filter companies based on search term and alphabet index
    const filtered = allCompanies.filter(company => 
      company.name.toLowerCase().startsWith(alphabet[currentIndex].toLowerCase()) &&
      company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setTotalPages(Math.ceil(filtered.length / 10)); // 10 items per page
    setCompanies(filtered.slice((currentPage - 1) * 10, currentPage * 10));
  }, [currentIndex, searchTerm, currentPage]);

  return (
    <>
      <Head>
        <title>{alphabet[currentIndex]} hərfi ilə başlayan şirkətlər</title>
      </Head>

      <div id="titlebar" className="gradient margin-bottom-45">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2>{alphabet[currentIndex]} hərfi ilə başlayan şirkətlər</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Şirkətin adını yazmağa başla" 
              id="company_autocomplete" 
              autoComplete="off"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
              {companies.map((company, index) => (
                <Link href={company.link} className="company" key={index}>
                  <div className="company-inner-alignment">
                    <span className="company-logo">
                      <img className="lozad" data-src={company.logo} alt={company.name} src={company.logo} data-loaded="true" />
                    </span>
                    <h4>{company.name}</h4>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="clearfix"></div>
            <div className="row">
              <div className="col-md-12">
                <div className="pagination-container margin-top-60 margin-bottom-60">
                  <nav className="pagination">
                    <ul>
                      {currentPage > 1 && (
                        <li className="pagination-arrow">
                          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(currentPage - 1); }} className="ripple-effect">
                            <i className="icon-material-outline-keyboard-arrow-left"></i>
                          </a>
                        </li>
                      )}
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                        <li key={p}>
                          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p); }} className={currentPage === p ? 'current-page ripple-effect' : 'ripple-effect'}>
                            {p}
                          </a>
                        </li>
                      ))}
                      {currentPage < totalPages && (
                        <li className="pagination-arrow">
                          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(currentPage + 1); }} className="ripple-effect">
                            <i className="icon-material-outline-keyboard-arrow-right"></i>
                          </a>
                        </li>
                      )}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="margin-top-70"></div>
    </>
  );
};

export default CompaniesPage;