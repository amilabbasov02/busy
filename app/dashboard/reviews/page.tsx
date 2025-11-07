"use client";
import React from 'react';
import Sidebar from '@/app/dashboard/components/Sidebar';

const ReviewsPage = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-content-container">
        <div className="dashboard-content-inner">
            <div className="dashboard-headline">
                <h3>Reviews</h3>
                <nav id="breadcrumbs" className="dark d-none">
                    <ul>
                        <li><a href="#">Baş səhifə</a></li>
                        <li><a href="#">Dashboard</a></li>
                        <li>Reviews</li>
                    </ul>
                </nav>
            </div>

            <div className="row">
                <div className="col-xl-12">
                    <div className="dashboard-box margin-top-0">
                        <div className="headline">
                            <h3><i className="icon-material-outline-business"></i> Rate Employers</h3>
                        </div>
                        <div className="content">
                            <ul className="dashboard-box-list">
                                <div className="row" style={{ padding: '10px', marginBottom: '10px' }}>
                                    <div className="col-12">
                                        <p>Siz indiyə qədər işlədiyiniz yaxud tanıdığınız işəgötürənlər haqda rəyinizi yaza bilərsiniz. Yeni işaxtaranların, o şitkətdə işə düzəlmək istəyənlərin sizin rəyinizə ehtiyacı var.</p>
                                        <p>Rəy yazarkən obyektiv, düzgün və ədalətli olun. Şirkətlərin siyahısı ilə <a href="https://busy.az/companies" target="_blank">burada</a> tanış ola bilərsiniz.</p>
                                        <p>Siz rəyinizi həm anonim formada, həm də görünən formada qeyd edə bilərsiniz.</p>
                                    </div>
                                </div>
                                <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                                    <div className="item-content">
                                        <div className="headline" style={{ padding: 0, marginBottom: '10px', borderBottom: 'none' }}>
                                            <h3><i className="icon-material-outline-business"></i> Awesome Company</h3>
                                        </div>
                                        <div className="item-details">
                                            <div className="star-rating" data-rating="5.0"></div>
                                            <div className="detail-item"><i className="icon-material-outline-date-range"></i> August 2023</div>
                                        </div>
                                        <div className="item-description" style={{ marginTop: '10px' }}>
                                            <p>This is a sample review. The company has a great work environment and supportive management.</p>
                                        </div>
                                    </div>
                                    <div className="buttons-to-right">
                                        <a href="#" className="button gray ripple-effect ico" title="Remove" data-tippy-placement="left"><i className="icon-feather-trash-2"></i></a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;