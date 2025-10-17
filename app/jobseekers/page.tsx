import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import '/public/css/pages/jobseekers.css';

const JobseekersPage = () => {
  return (
    <>
      <Head>
        <title>İş axtaranlar</title>
        <link rel="stylesheet" href="/css/pages/jobseekers.css" />
      </Head>

      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h1 className="jobseeker_head" style={{ marginTop: '35px', paddingBottom: '10px', textAlign: 'center' }}>İş axtaranlar</h1>
            {/* Search form can be a separate component later */}
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="freelancers-container freelancers-grid-layout margin-top-35">
              {/* Sample Job Seeker */}
              <div className="freelancer">
                <div className="freelancer-overview">
                  <div className="freelancer-overview-inner">
                    <span className="bookmark-icon"></span>
                    <div className="freelancer-avatar">
                      <Link href="/jobseeker/1"><Image src="/images/user-avatar-placeholder.png" alt="" width={100} height={100} /></Link>
                    </div>
                    <div className="freelancer-name">
                      <h4><Link href="/jobseeker/1">John Doe</Link></h4>
                      <span>Software Engineer</span>
                    </div>
                  </div>
                </div>
                <div className="freelancer-details">
                  <Link href="/jobseeker/1" className="button button-sliding-icon ripple-effect">Profilə bax <i className="icon-material-outline-arrow-right-alt"></i></Link>
                </div>
              </div>
               {/* Sample Job Seeker 2 */}
               <div className="freelancer">
                <div className="freelancer-overview">
                  <div className="freelancer-overview-inner">
                    <span className="bookmark-icon"></span>
                    <div className="freelancer-avatar">
                      <Link href="/jobseeker/2"><Image src="/images/user-avatar-placeholder.png" alt="" width={100} height={100} /></Link>
                    </div>
                    <div className="freelancer-name">
                      <h4><Link href="/jobseeker/2">Jane Smith</Link></h4>
                      <span>UX/UI Designer</span>
                    </div>
                  </div>
                </div>
                <div className="freelancer-details">
                  <Link href="/jobseeker/2" className="button button-sliding-icon ripple-effect">Profilə bax <i className="icon-material-outline-arrow-right-alt"></i></Link>
                </div>
              </div>
            </div>
            {/* Pagination */}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobseekersPage;