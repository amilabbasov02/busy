"use client";
import { useEffect, useState, Suspense } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const alphabet = "A,B,C,Ç,D,E,Ə,F,G,H,X,İ,J,K,Q,L,M,N,O,Ö,P,R,S,Ş,T,U,Ü,V,Y,Z,1,2,3,4,5,6,7,8,9".split(',');

async function getProfessions(index: number, page: number = 1, perPage: number = 10, search: string = '') {
    const res = await fetch(`/api/bff/api/professions?index=${index}&page=${page}&perPage=${perPage}&search=${search}`);
    if (!res.ok) {
        throw new Error('Failed to fetch professions');
    }
    return res.json();
}

async function searchProfessions(query: string) {
    const res = await fetch(`/api/bff/api/professions/search?q=${query}`);
    if (!res.ok) {
        throw new Error('Failed to search professions');
    }
    return res.json();
}

function ProfessionsContent() {
    const searchParams = useSearchParams();
    const indexParam = searchParams.get('index') || '0';
    const currentIndex = parseInt(indexParam, 10);
    const pageParam = searchParams.get('page') || '1';
    const currentPage = parseInt(pageParam, 10);

    const [professions, setProfessions] = useState<any[]>([]);
    const [count, setCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [notification, setNotification] = useState('');

    useEffect(() => {
        const fetchAndSetProfessions = async () => {
            if (searchTerm.length > 0 && searchTerm.length < 3) {
                setNotification('minimal 3 herf yazmalisiz');
                return;
            }

            setNotification('');
            setLoading(true);
            setError(null);
            try {
                let data;
                if (searchTerm.length >= 3) {
                    data = await searchProfessions(searchTerm);
                    const searchData = Array.isArray(data) ? data : data.data;
                    setProfessions(Array.isArray(searchData) ? searchData : []);
                    setCount(Array.isArray(searchData) ? searchData.length : 0);
                } else {
                    data = await getProfessions(currentIndex, currentPage, 36, '');
                    setProfessions(data.data || []);
                    setCount(data.count || 0);
                }
            } catch (err) {
                setError('Failed to fetch professions');
                setProfessions([]);
            } finally {
                setLoading(false);
            }
        };
        fetchAndSetProfessions();
    }, [currentIndex, currentPage, searchTerm]);

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
            {notification && <div className="notification error margin-top-10">{notification}</div>}
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
                    {loading && <div>Yüklənir...</div>}
                    {error && <div>Xəta baş verdi: {error}</div>}
                    {!loading && !error && professions.length === 0 && !notification && <div>Netice yoxdur</div>}
                    {!loading && !error && professions.map((profession: any, index: number) => (
                        <Link href={`/professions/${profession.slug}`} className="category-box" key={index}>
                            <div className="category-box-content">
                                <h3>{profession.title}</h3>
                            </div>
                        </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination */}
            {searchTerm.length < 3 && (
              <>
                <div className="clearfix"></div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="pagination-container margin-top-60 margin-bottom-60">
                      <nav className="pagination">
                        <ul>
                            {currentPage > 1 && (
                                <li className="pagination-arrow">
                                    <Link href={`/professions?index=${currentIndex}&page=${currentPage - 1}`}>
                                        <i className="icon-material-outline-keyboard-arrow-left"></i>
                                    </Link>
                                </li>
                            )}
                            {Array.from({ length: Math.ceil(count / 36) }, (_, i) => i + 1).map(p => (
                                <li key={p}>
                                    <Link href={`/professions?index=${currentIndex}&page=${p}`} className={currentPage === p ? 'current-page' : ''}>
                                        {p}
                                    </Link>
                                </li>
                            ))}
                            {currentPage < Math.ceil(count / 36) && (
                                <li className="pagination-arrow">
                                    <Link href={`/professions?index=${currentIndex}&page=${currentPage + 1}`}>
                                        <i className="icon-material-outline-keyboard-arrow-right"></i>
                                    </Link>
                                </li>
                            )}
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="margin-top-70"></div>
    </>
  );
}

const ProfessionsPage = () => {
    return (
        <Suspense fallback={<div>Yüklənir...</div>}>
            <ProfessionsContent />
        </Suspense>
    );
};

export default ProfessionsPage;
