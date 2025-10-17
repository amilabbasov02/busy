import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import '/public/css/pages/categories.css';

const CategoriesPage = () => {
  return (
    <>
      <Head>
        <title>Kateqoriyalar</title>
        <link rel="stylesheet" href="/css/pages/categories.css?v=1.122" />
      </Head>

      <div id="allrecords" className="t-records">
        <div className="r t-rec t-rec_pt_30 t-rec_pb_60" style={{ paddingTop: '30px', paddingBottom: '60px' }}>
          <div className="t491">
            <div className="t-section__container t-container">
              <div className="t-col t-col_12">
                <div className="t-section__topwrapper t-align_center">
                  <div className="t-section__title t-title t-title_xs">İş kateqoriyaları</div>
                  <div className="t-section__descr t-descr t-descr_xl t-margin_auto">Saytdakı vakansiyalar kateqoriyalar, onlar da öz növbəsində subkateqoriyalar üzrə qruplaşdırılıb.</div>
                </div>
              </div>
            </div>
            <div className="t-container">
              {/* Sample Category */}
              <div className="row">
                <h3 style={{ marginBottom: '20px', marginTop: '20px' }}>
                  <Link href="/category/it" style={{ color: 'black' }}>
                    IT &amp; Texnologiya
                  </Link>
                </h3>
                <div className="col-12">
                  <div className="row">
                    {/* Sample Sub-category */}
                    <div className="t491__col t-col t-col_3 t-item">
                      <Link href="/category/frontend">
                        <div className="t491__content">
                          <div className="t491t__wrapper">
                            <div className="t491__title t-name t-name_sm">Frontend (5)</div>
                          </div>
                        </div>
                      </Link>
                    </div>
                     {/* Sample Sub-category 2 */}
                     <div className="t491__col t-col t-col_3 t-item">
                      <Link href="/category/backend">
                        <div className="t491__content">
                          <div className="t491t__wrapper">
                            <div className="t491__title t-name t-name_sm">Backend (8)</div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;