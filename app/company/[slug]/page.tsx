import Link from 'next/link';
import Image from 'next/image';
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug

  return {
    title: `Şirkət Səhifəsi: ${slug}`,
  }
}

const CompanyPage = async ({ params }: Props) => {
  const { slug } = params;

  return (
    <>
      <div className="single-page-header" style={{ backgroundImage: `url(/images/single-company.jpg)` }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="single-page-header-inner">
                <div className="left-side">
                  <div className="header-image"><Image src="/images/company-logo-placeholder.png" alt="" width={100} height={100} /></div>
                  <div className="header-details">
                    <h3>Sample Company ({slug}) <span>IT</span></h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-8 content-right-offset">
            <nav className="nav nav-pills nav-justified">
              <Link className="button ripple-effect" href={`/company/${slug}`}>Şirkət haqqında</Link>
              <Link className="button ripple-effect-dark gray" href={`/company/${slug}/vacancies`}>Vakansiyalar</Link>
              <Link className="button ripple-effect-dark gray" href={`/company/${slug}/gallery`}>Qalereya</Link>
              <Link className="button ripple-effect-dark gray" href={`/company/${slug}/reviews`}>Rəylər</Link>
            </nav>
            <br />
            <div className="single-page-section">
              <h3 className="margin-bottom-25">Şirkət Haqqında</h3>
              <p>Şirkət haqqında məlumat mətni burada yer alacaq.</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-xl-4 col-lg-4">
            <div className="sidebar-container">
              <div className="sidebar-widget">
                <h3>Location</h3>
                <div id="single-job-map-container">
                  {/* Map placeholder */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="margin-top-15"></div>
    </>
  );
};

export default CompanyPage;