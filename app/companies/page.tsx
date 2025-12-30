"use client";
import { useEffect, useState, Suspense } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchCompanies, searchCompanies } from '../redux/slices/companySlice';

const alphabet = "A,B,C,Ç,D,E,Ə,F,G,H,X,İ,J,K,Q,L,M,N,O,Ö,P,R,S,Ş,T,U,Ü,V,Y,Z,1,2,3,4,5,6,7,8,9".split(',');

function CompaniesContent() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { companies, count, loading, error } = useSelector((state: RootState) => state.companies);

  const indexParam = searchParams.get('index') || '0';
  const currentIndex = parseInt(indexParam, 10);
  const pageParam = searchParams.get('page') || '1';
  const currentPage = parseInt(pageParam, 10);

  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState('');
  
  const totalPages = Math.ceil(count / 24);

  useEffect(() => {
    if (searchTerm.length > 3) {
      dispatch(searchCompanies(searchTerm));
    } else if (searchTerm.length === 0) {
      dispatch(fetchCompanies({ index: currentIndex, page: currentPage }));
    }
  }, [dispatch, currentIndex, currentPage, searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0 && value.length <= 3) {
      setNotification('Axtarış üçün 3-dən çox simvol daxil edin.');
    } else {
      setNotification('');
    }
  };

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
              onChange={handleSearchChange}
            />
            {notification && <div className="notification error margin-top-10">{notification}</div>}
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
              {loading === 'pending' && <div>Yüklənir...</div>}
              {error && <div>Xəta baş verdi: {error}</div>}
              {loading === 'succeeded' && companies.map((company: any, index: number) => {
                let logoSrc = '/images/company-logo-placeholder.png';
                if (company.logo) {
                  if (company.logo.startsWith('http')) {
                    logoSrc = company.logo;
                  } else if (company.logo.startsWith('/storage/')) {
                    logoSrc = `https://busy.az${company.logo}`;
                  } else {
                    logoSrc = `https://busy.az/storage/${company.logo}`;
                  }
                }
                return (
                  <Link href={`/company/${company.slug}`} className="company" key={index}>
                    <div className="company-inner-alignment">
                      <span className="company-logo">
                        <img className="lozad" data-src={logoSrc} alt={company.title} src={logoSrc} data-loaded="true" />
                      </span>
                      <h4>{company.title}</h4>
                    </div>
                  </Link>
                );
              })}
            </div>
            
            {/* Pagination */}
            {/* Pagination */}
            {!searchTerm && totalPages > 1 && (
              <div className="clearfix"></div>
            )}
            {!searchTerm && totalPages > 1 && (
              <div className="row">
                <div className="col-md-12">
                  <div className="pagination-container margin-top-60 margin-bottom-60">
                    <nav className="pagination">
                      <ul>
                        {currentPage > 1 && (
                          <li className="pagination-arrow">
                            <Link href={`/companies?index=${currentIndex}&page=${currentPage - 1}`} className="ripple-effect">
                              <i className="icon-material-outline-keyboard-arrow-left"></i>
                            </Link>
                          </li>
                        )}
                        {(() => {
                          const pages = [];
                          const pageLimit = 5;
                          let startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
                          let endPage = Math.min(totalPages, startPage + pageLimit - 1);

                          if (totalPages > pageLimit) {
                            if (endPage === totalPages) {
                              startPage = Math.max(1, totalPages - pageLimit + 1);
                            } else if (startPage === 1) {
                              endPage = pageLimit;
                            }
                          }
                          
                          if (startPage > 1) {
                            pages.push(<li key={1}><Link href={`/companies?index=${currentIndex}&page=1`}>1</Link></li>);
                            if (startPage > 2) {
                              pages.push(<li key="start-ellipsis"><span className="ellipsis">...</span></li>);
                            }
                          }

                          for (let i = startPage; i <= endPage; i++) {
                            pages.push(
                              <li key={i}>
                                <Link href={`/companies?index=${currentIndex}&page=${i}`} className={currentPage === i ? 'current-page' : ''}>
                                  {i}
                                </Link>
                              </li>
                            );
                          }

                          if (endPage < totalPages) {
                            if (endPage < totalPages - 1) {
                              pages.push(<li key="end-ellipsis"><span className="ellipsis">...</span></li>);
                            }
                            pages.push(<li key={totalPages}><Link href={`/companies?index=${currentIndex}&page=${totalPages}`}>{totalPages}</Link></li>);
                          }

                          return pages;
                        })()}
                        {currentPage < totalPages && (
                          <li className="pagination-arrow">
                            <Link href={`/companies?index=${currentIndex}&page=${currentPage + 1}`} className="ripple-effect">
                              <i className="icon-material-outline-keyboard-arrow-right"></i>
                            </Link>
                          </li>
                        )}
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="margin-top-70"></div>
    </>
  );
}

const CompaniesPage = () => {
    return (
        <Suspense fallback={<div>Yüklənir...</div>}>
            <CompaniesContent />
        </Suspense>
    );
};

export default CompaniesPage;