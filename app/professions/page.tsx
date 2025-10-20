"use client";
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const ProfessionsPage = () => {
  const alphabet = "A,B,C,Ç,D,E,Ə,F,G,H,X,İ,J,K,Q,L,M,N,O,Ö,P,R,S,Ş,T,U,Ü,V,Y,Z,1,2,3,4,5,6,7,8,9".split(',');
  const searchParams = useSearchParams();
  const indexParam = searchParams.get('index') || '0';
  const currentIndex = parseInt(indexParam, 10);

  const [professions, setProfessions] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Mock data
  const allProfessions = [
    { name: 'ACCA instructor', slug: 'acca-instructor' },
    { name: 'ACCA müəllimi', slug: 'acca-muellimi' },
    { name: 'Barista', slug: 'barista' },
    { name: 'Backend Developer', slug: 'backend-developer' },
    { name: 'C# Developer', slug: 'c-sharp-developer' },
  ];

  useEffect(() => {
    // Filter professions based on search term and alphabet index
    const filtered = allProfessions.filter(profession => 
      profession.name.toLowerCase().startsWith(alphabet[currentIndex].toLowerCase()) &&
      profession.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setTotalPages(Math.ceil(filtered.length / 10)); // 10 items per page
    setProfessions(filtered.slice((currentPage - 1) * 10, currentPage * 10));
  }, [currentIndex, searchTerm, currentPage]);

  return (
    <>
      <Head>
        <title>{alphabet[currentIndex]} hərfi ilə başlayan ixtisaslar</title>
      </Head>

      <div id="titlebar" className="gradient margin-bottom-45">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center-important">{alphabet[currentIndex]} hərfi ilə başlayan ixtisaslar</h1>
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
              placeholder="peşənin/ixtisasın adını yazmağa başla" 
              id="company_autocomplete" 
              autoComplete="off"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-xl-12">
            <div className="letters-list">
              {alphabet.map((letter, index) => (
                <Link href={`/professions?index=${index}`} key={index} className={index === currentIndex ? 'current' : ''}>
                  {letter}
                </Link>
              ))}
            </div>
          </div>

          <div className="section mt-65 w-100">
            <div className="container" style={{ marginBottom: '30px' }}>
              <div className="row">
                <div className="col-xl-12">
                  <div className="categories-container" id="categories_view">
                    {professions.map((profession, index) => (
                      <Link href={`/professions/${profession.slug}`} className="category-box" key={index}>
                        <div className="category-box-content">
                          <h3>{profession.name}</h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
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

export default ProfessionsPage;