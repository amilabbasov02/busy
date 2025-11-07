"use client";
import React from 'react';
import Sidebar from '../../components/Sidebar';

const ProfileSettingsPage = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-content-container">
        <div className="dashboard-content-inner">
            <div className="dashboard-headline">
                <h3>Profil</h3>
            </div>

            <div className="row">
                <form method="post" action="https://busy.az/dashboard/profile/settings" encType="multipart/form-data">
                    <div className="col-xl-12">
                        <div className="dashboard-box margin-top-0">
                            <div className="headline">
                                <h3><i className="icon-material-outline-account-circle"></i> Mənim hesabım</h3>
                            </div>
                            <div className="content with-padding padding-bottom-0">
                                <div className="row">
                                    <div className="col-auto">
                                        <div className="avatar-wrapper" data-tippy-placement="bottom" style={{ marginBottom: '15px' }}>
                                            <img className="profile-pic" src="/storage/users/1597391927.png" alt="" />
                                            <input type="hidden" name="old_img" value="/storage/users/1597391927_300x300.png" />
                                            <div className="upload-button"></div>
                                            <input className="file-upload" name="file" type="file" id="new_profile" accept="image/*" />
                                        </div>
                                        <a href="#" className="avatar-wrapper remove-button button red ripple-effect" style={{ height: 'auto', textAlign: 'center' }}><i className="icon-feather-trash-2"></i> Sil</a>
                                    </div>
                                    <div className="col">
                                        <div className="row">
                                            <div className="col-xl-6">
                                                <div className="submit-field">
                                                    <h5>Ad-soyad</h5>
                                                    <input type="text" name="name" className="with-border" defaultValue="Busy Admin" required id="name" />
                                                </div>
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="submit-field">
                                                    <h5>Mobil telefon</h5>
                                                    <input type="text" name="mobile" className="with-border" defaultValue="994508664443" id="phone" />
                                                </div>
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="submit-field">
                                                    <h5>hesabın növü</h5>
                                                    <div className="account-type">
                                                        <div>
                                                            <input type="radio" name="account-type-radio" id="freelancer-radio" className="account-type-radio" defaultChecked />
                                                            <label htmlFor="freelancer-radio" className="ripple-effect-dark green-button">
                                                                <i className="icon-material-outline-fingerprint"></i> işəgötürən (employer)
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="submit-field">
                                                    <h5>E-poçt ünvanı</h5>
                                                    <input type="email" name="email" className="with-border" defaultValue="admin@busy.az" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-12">
                        <div id="test1" className="dashboard-box">
                            <div className="headline">
                                <h3><i className="icon-material-outline-lock"></i> Təhlükəsizlik</h3>
                            </div>
                            <div className="content with-padding">
                                <div className="row">
                                    <div className="col-xl-4">
                                        <div className="submit-field">
                                            <h5>indiki parol</h5>
                                            <input type="password" name="current_password" className="with-border" />
                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <div className="submit-field">
                                            <h5>yeni parol</h5>
                                            <input type="password" name="password" className="with-border" />
                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <div className="submit-field">
                                            <h5>yeni parolu təkrarla</h5>
                                            <input type="password" name="password_confirmation" className="with-border" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-12">
                        <button type="submit" role="submit" className="button ripple-effect big margin-top-30 button-sliding-icon margin-bottom-30 " style={{ float: 'right' }} name="send">
                            Yadda saxla
                            <i className="icon-feather-check"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;