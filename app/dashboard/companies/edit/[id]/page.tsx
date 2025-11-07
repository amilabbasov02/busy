"use client";
import React, { useState, useEffect } from 'react';
import BootstrapSelect from '../../../../components/BootstrapSelect';
import DropifyInput from '../../../../components/DropifyInput';
import { useParams } from 'next/navigation';
import Sidebar from '@/app/dashboard/components/Sidebar';

const EditCompanyPage = () => {
  const params = useParams();
  const companyId = params.id;

  // Mock data for demonstration
  const mockCompanyData = {
    title: 'Existing Tech Company',
    parent_id: '3',
    industry_id: '4',
    about: 'This is an existing company description.',
    phone: '123-456-7890',
    website: 'https://example.com',
    facebook: 'https://facebook.com/example',
    linkedin: 'https://linkedin.com/company/example',
    email: 'contact@example.com',
  };

  const [formData, setFormData] = useState({
    title: '',
    parent_id: '',
    industry_id: '',
    about: '',
    phone: '',
    website: '',
    facebook: '',
    linkedin: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    // Fetch and set company data
    // In a real app, you would fetch this data from an API
    setFormData(mockCompanyData);

    const initializePlugins = () => {
      const $ = (window as any).jQuery;
      if ($) {
        // Initialize selectpicker
        if ($.fn.selectpicker) {
          $('.selectpicker').selectpicker('refresh');
        }

        // Initialize dropify
        if ($.fn.dropify) {
          $('.dropify').dropify();
        }
      }
    };

    // Use a timeout to ensure all scripts are loaded and the DOM is ready
    const timer = setTimeout(initializePlugins, 100);

    return () => clearTimeout(timer); // Cleanup the timer
  }, [companyId]);

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-content-container">
        <div className="dashboard-content-inner" style={{ minHeight: '871px' }}>
          <div className="dashboard-headline">
            <h3>İdarə et Şirkətlər</h3>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="dashboard-box margin-top-0">
                <div className="headline">
                  <h3><i className="icon-material-outline-business-center"></i> Şirkəti redaktə et</h3>
                </div>
                <form action="/dashboard/companies/edit" method="post" id="company_form" encType="multipart/form-data" noValidate>
                  <div className="content with-padding padding-bottom-10">
                    <div className="row">
                      <div className="col-xl-6">
                        <div className="submit-field">
                          <h5>Şirkətin adı</h5>
                          <input type="text" name="title" className="with-border" required value={formData.title} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="submit-field">
                          <h5>Ana şirkət</h5>
                          <BootstrapSelect name="parent_id" title="Ana şirkəti seç" className="selectpicker with-ajax with-border" data-live-search="true" value={formData.parent_id} onChange={handleChange}>
                            {/* Options will be loaded via AJAX or can be predefined */}
                          </BootstrapSelect>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="submit-field">
                          <h5>Şirkətin fəaliyyət sahəsi</h5>
                           <BootstrapSelect name="industry_id" title="Fəaliyyət sahəsini seç" className="selectpicker with-ajax with-border" data-live-search="true" value={formData.industry_id} onChange={handleChange}>
                                <option value="3">Kənd təsərrüfatı</option>
                                <option value="4">Mədəniyyət, incəsənət</option>
                                <option value="5">Avtomobil biznesi</option>
                                {/* Add all other options here */}
                           </BootstrapSelect>
                        </div>
                      </div>
                       <div className="col-xl-12">
                        <div className="submit-field">
                            <h5>Şirkət haqqında</h5>
                            <textarea name="about" id="about" className="editor with-border" value={formData.about} onChange={handleChange}></textarea>
                        </div>
                      </div>
                      <div className="col-xl-12">
                          <div className="submit-field">
                              <h5>Şirkətin loqosu</h5>
                              <DropifyInput name="logo" id="company_logo" />
                          </div>
                      </div>
                      <div className="col-xl-12">
                          <div className="submit-field">
                              <h5>Qalereya</h5>
                              <DropifyInput name="gallery[]" id="company_gallery" multiple />
                          </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="submit-field">
                          <h5>Company phone number</h5>
                          <input type="text" name="phone" className="with-border" id="phone_number" value={formData.phone} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="submit-field">
                          <h5>Vebsayt</h5>
                          <input type="url" name="website" className="with-border" id="website" placeholder="https://" value={formData.website} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="submit-field">
                          <h5>Facebook</h5>
                          <input type="url" name="facebook" className="with-border" id="facebook" placeholder="https://" value={formData.facebook} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="submit-field">
                          <h5>Linkedin</h5>
                          <input type="url" name="linkedin" className="with-border" id="linkedin" placeholder="https://
" value={formData.linkedin} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="submit-field">
                          <h5>E-mail</h5>
                          <input type="email" name="email" className="with-border" id="email" placeholder="@" value={formData.email} onChange={handleChange} />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-xl-12">
              <button type="submit" form="company_form" className="button ripple-effect big margin-top-30 button-sliding-icon margin-bottom-30 " style={{ float: 'right' }}>
                Dəyişiklikləri yadda saxla
                <i className="icon-feather-check"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCompanyPage;