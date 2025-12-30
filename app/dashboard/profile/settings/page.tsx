"use client";
import React from 'react';
import { useAuth } from '@/app/contexts/AuthContext';

const ProfileSettingsPage = () => {
  const { user, refreshMe } = useAuth();
  const me = user.me;

  const safeText = (v: any) => (v === null || v === undefined || v === 0 ? '' : String(v));
  const fullName = [safeText(me?.name), safeText(me?.last_name)].filter(Boolean).join(' ');
  const accountRole = me?.role === 'company' ? 'işəgötürən (employer)' : 'işaxtaran (jobseeker)';

  return (
    <>
        <div className="dashboard-headline">
            <h3>Profil</h3>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="dashboard-box margin-top-0">
              <div className="headline">
                <h3><i className="icon-material-outline-info"></i> Haqqında</h3>
              </div>
              <div className="content with-padding">
                {user?.token ? (
                  <>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                      <div>
                        <strong>Ad:</strong> {user.me?.name || '-'}
                      </div>
                      <div>
                        <strong>Email:</strong> {user.me?.email || '-'}
                      </div>
                      <div>
                        <strong>ID:</strong> {user.me?.id ? String(user.me.id) : '-'}
                      </div>
                      <div>
                        <strong>Rol:</strong> {user.me?.role || '-'}
                      </div>
                      <div>
                        <strong>Son giriş:</strong> {user.me?.last_login || '-'}
                      </div>
                      <button
                        type="button"
                        className="button ripple-effect"
                        style={{ padding: '8px 14px' }}
                        onClick={() => refreshMe()}
                      >
                        Yenilə (/me)
                      </button>
                    </div>
                    {!user.me && (
                      <p style={{ marginTop: 10 }}>
                        /me məlumatı hələ yüklənməyib. “Yenilə (/me)” düyməsi ilə yenidən sorğu ata bilərsiniz.
                      </p>
                    )}
                  </>
                ) : (
                  <p>
                    Bu hissəni görmək üçün daxil olun (token tapılmadı).
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
            <form method="post" action="/dashboard/profile/settings" encType="multipart/form-data">
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
                                                <input
                                                  type="text"
                                                  name="name"
                                                  className="with-border"
                                                  defaultValue={fullName}
                                                  required
                                                  id="name"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="submit-field">
                                                <h5>Mobil telefon</h5>
                                                <input
                                                  type="text"
                                                  name="mobile"
                                                  className="with-border"
                                                  defaultValue={safeText(me?.phone || me?.mobile)}
                                                  id="phone"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="submit-field">
                                                <h5>hesabın növü</h5>
                                                <div className="account-type">
                                                    <div>
                                                        <input
                                                          type="radio"
                                                          name="account-type-radio"
                                                          id="freelancer-radio"
                                                          className="account-type-radio"
                                                          defaultChecked
                                                        />
                                                        <label htmlFor="freelancer-radio" className="ripple-effect-dark green-button">
                                                            <i className="icon-material-outline-fingerprint"></i> {accountRole}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="submit-field">
                                                <h5>E-poçt ünvanı</h5>
                                                <input type="email" name="email" className="with-border" defaultValue={safeText(me?.email)} />
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
    </>
  );
};

export default ProfileSettingsPage;
