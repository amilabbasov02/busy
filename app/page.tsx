"use client";
import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

declare global {
  interface Window {
    jQuery: any;
  }
}

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [isAdvancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const [activeJobTab, setActiveJobTab] = useState(0);
  const blankSectionRef = useRef<HTMLElement>(null);
  const [isBlankSectionActive, setBlankSectionActive] = useState(false);
  const [activeHowItTab, setActiveHowItTab] = useState(0);

  useEffect(() => {
    if (isAdvancedSearchOpen && typeof window.jQuery !== 'undefined') {
      const $ = window.jQuery;

      ($('.selectpicker') as any).selectpicker({
        noneSelectedText: "seçilməyib"
      });

      $(".search").on('click', function () {
        $(".pop-up").addClass("active_pop");
      });

      $(".region b").on('click', function (event: any) {
        $(event.currentTarget).closest(".region").toggleClass("active");
      });

      $('.region').each(function (this: HTMLElement) {
        var region = $(this);
        var selectableInputs = region.find('.selectable input[type="checkbox"]');
        var country = region.find('.country');
        var selectedCount = selectableInputs.filter(':checked').length;

        if (selectedCount === 0) {
          country.removeClass('checked');
        } else {
          country.addClass('checked');
        }

        if (region.find(".selectable").length > 0) {
          if (selectedCount === selectableInputs.length) {
            country.removeClass('checked');
            (country.find('input[type="checkbox"]') as any).prop('checked', true);
          } else {
            (country.find('input[type="checkbox"]') as any).prop('checked', false);
          }
        }
      });

      var checkboxes = document.querySelectorAll('input[type="checkbox"]');
      const selectionDisplay = document.getElementById("selectionDisplay");
      if (selectionDisplay) {
        checkboxes.forEach(function (checkbox) {
          var value = (checkbox as HTMLInputElement).value;
          var dataText = checkbox.getAttribute('data-text');
          (checkbox as HTMLElement).dataset.id = value;

          if ((checkbox as HTMLInputElement).checked) {
            var span = document.createElement("span");
            var dataId = checkbox.getAttribute("data-id");
            if (checkbox.closest(".selectable")) {
              if ($(checkbox.closest(".region") as any).find(".country input").prop("checked")) {
                span.textContent = dataText;
                span.setAttribute("class", "d-none selectedItem");
                span.setAttribute("data-value", (checkbox as HTMLInputElement).value);
                if (dataId) {
                  span.setAttribute("data-id", dataId);
                }
                if (selectionDisplay) selectionDisplay.appendChild(span);
              } else {
                span.textContent = dataText;
                span.setAttribute("class", "selectedItem");
                span.setAttribute("data-value", (checkbox as HTMLInputElement).value);
                if (dataId) {
                  span.setAttribute("data-id", dataId);
                }
                if (selectionDisplay) selectionDisplay.appendChild(span);
              }
            } else {
              span.textContent = dataText;
              span.setAttribute("class", "selectedItem");
              span.setAttribute("data-value", (checkbox as HTMLInputElement).value);
              if (dataId) {
                span.setAttribute("data-id", dataId);
              }
              if (selectionDisplay) selectionDisplay.appendChild(span);
            }
          }
        });
      }


      $(".all_slc input").on('click', function () {
        var selectedItems = document.querySelectorAll('input[type="checkbox"]:checked');
        var selectionDisplay = document.getElementById("selectionDisplay");
        if (!selectionDisplay) return;
        selectionDisplay.innerHTML = "";
        selectedItems.forEach(item => {
          var dataText = item.getAttribute('data-text');
          var span = document.createElement("span");
          var dataId = item.getAttribute("data-id");
          if (item.closest(".selectable")) {
            if ($(item.closest(".region") as any).find(".country input").prop("checked")) {
              span.textContent = dataText;
              span.setAttribute("class", "d-none selectedItem");
              span.setAttribute("data-value", (item as HTMLInputElement).value);
              if (dataId) {
                span.setAttribute("data-id", dataId);
              }
              if (selectionDisplay) selectionDisplay.appendChild(span);
            } else {
              span.textContent = dataText;
              span.setAttribute("class", "selectedItem");
              span.setAttribute("data-value", (item as HTMLInputElement).value);
              if (dataId) {
                span.setAttribute("data-id", dataId);
              }
              if (selectionDisplay) selectionDisplay.appendChild(span);
            }
          } else {
            span.textContent = dataText;
            span.setAttribute("class", "selectedItem");
            span.setAttribute("data-value", (item as HTMLInputElement).value);
            if (dataId) {
              span.setAttribute("data-id", dataId);
            }
            if (selectionDisplay) selectionDisplay.appendChild(span);
          }
        });
        $(".pop-up").removeClass("active_pop");
      });

      $(".all_unslc ").on('click', function () {
        var selectedValues = Array.from(document.querySelectorAll('.selectedItem')).map(span => span.getAttribute('data-value'));
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
          var value = (checkbox as HTMLInputElement).value;
          (checkbox as HTMLInputElement).checked = selectedValues.includes(value);
        });
        $(".pop-up").removeClass("active_pop");
      });

      $(".pop-bg").on('click', function () {
        var selectedValues = Array.from(document.querySelectorAll('.selectedItem')).map(span => span.getAttribute('data-value'));
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
          var value = (checkbox as HTMLInputElement).value;
          (checkbox as HTMLInputElement).checked = selectedValues.includes(value);
        });
        $(".pop-up").removeClass("active_pop");
      });

      $(".region .country").on('click', function (event: any) {
        const isChecked = $(event.currentTarget).find("input").is(":checked");
        ($(event.currentTarget).parent().find('.selectable .chb input') as any).prop("checked", isChecked);
        if (isChecked) {
          $(event.currentTarget).removeClass("checked");
        }
      });

      $(".region .selectable .chb").on('click', function (event: any) {
        var region = $(event.currentTarget).closest('.region');
        var selectableInputs = region.find('.selectable input[type="checkbox"]');
        var country = region.find('.country');

        if ($(event.currentTarget).find("input").is(":checked")) {
          $(event.currentTarget).parent().siblings('.country').addClass("checked");
          if (selectableInputs.length === selectableInputs.filter(":checked").length) {
            country.removeClass("checked");
            (country.find('input[type="checkbox"]') as any).prop("checked", true);
          }
        } else {
          (country.find('input[type="checkbox"]') as any).prop("checked", false);
          $(event.currentTarget).parent().siblings('.country').addClass("checked");
          if (!selectableInputs.is(":checked")) {
            country.removeClass("checked");
            (country.find('input[type="checkbox"]') as any).prop("checked", false);
          }
        }
      });

      const selectionDisplayHandler = function (event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (target.classList.contains("selectedItem")) {
          var dataId = target.dataset.id;
          var checkbox = document.querySelector('input[type="checkbox"][data-id="' + dataId + '"]') as HTMLInputElement;
          if ($(checkbox).parent().hasClass("country")) {
            ($(checkbox).parent().next(".selectable").find("input") as any).prop("checked", false);
          }
          if (checkbox) {
            checkbox.checked = false;
            target.remove();
          }

          var region = $(checkbox).closest('.region');
          var selectableInputs = region.find('.selectable input[type="checkbox"]');
          var country = region.find('.country');

          if ($(checkbox).is(":checked")) {
            $(checkbox).parent().siblings('.country').addClass("checked");
            if (selectableInputs.length === selectableInputs.filter(":checked").length) {
              country.removeClass("checked");
              (country.find('input[type="checkbox"]') as any).prop("checked", true);
            }
          } else {
            (country.find('input[type="checkbox"]') as any).prop("checked", false);
            $(checkbox).parent().siblings('.country').addClass("checked");
            if (!selectableInputs.is(":checked")) {
              country.removeClass("checked");
              (country.find('input[type="checkbox"]') as any).prop("checked", false);
            }
          }
        }
      };

      const selectionDisplayElem = document.getElementById("selectionDisplay");
      selectionDisplayElem?.addEventListener("click", selectionDisplayHandler as EventListener);

      return () => {
        // Cleanup listeners
        $(".search").off('click');
        $(".region b").off('click');
        $(".all_slc input").off('click');
        $(".all_unslc").off('click');
        $(".pop-bg").off('click');
        $(".region .country").off('click');
        $(".region .selectable .chb").off('click');
        selectionDisplayElem?.removeEventListener("click", selectionDisplayHandler as EventListener);
      };
    }
  }, [isAdvancedSearchOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (blankSectionRef.current && !isBlankSectionActive) {
        const { top } = blankSectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (top < windowHeight * 0.8) {
          setBlankSectionActive(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isBlankSectionActive]);

  useEffect(() => {
    if (typeof window.jQuery !== 'undefined') {
      const $ = window.jQuery;
      $('#more_categories').off('click').on('click', function (this: HTMLElement) {
        const action = $(this).attr('data-action');
        const categoriesView = $('#categories_view');
        const moreCategoryText = $('#more_category_text');
        const arrowCat = $('#arrow_cat');

        if (action === 'hidden') {
          moreCategoryText.text('Bağla');
          arrowCat.html('<i class="fas fa-caret-up" style="color: #777777"></i>');
          $(this).attr('data-action', 'shown');
          categoriesView.addClass('active');
        } else {
          moreCategoryText.text('Böyüt');
          arrowCat.html('<i class="fas fa-caret-down" style="color: #777777"></i>');
          $(this).attr('data-action', 'hidden');
          categoriesView.removeClass('active');
        }
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window.jQuery !== 'undefined') {
      const $ = window.jQuery;
      $('.how_it .clicked_tab_btn').on('click', function (this: HTMLElement) {
        const tabId = $(this).data('id');
        setActiveHowItTab(tabId);
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window.jQuery !== 'undefined') {
      const $ = window.jQuery;
      $('.collapse_btn').off('click').on('click', function (this: HTMLElement) {
        $(this).toggleClass('clp_clicked');
        $(this).next('.collapse_content').slideToggle();
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Ana Səhifə</title>
      </Head>

      <div className="intro-banner">
        <div className="container">
          <div className="row">
            <div className="col-md-12 headline-slogan">
              <div className="banner-headline">
                <h3>
                  <strong>Bizi işlə dost edir</strong>
                  <br />
                  <span>Azərbaycanın #1 iş axtarma saytı</span>
                </h3>
              </div>
            </div>
          </div>
          <form action="/search" method="GET">
            <div className="row">
              <div className="col-md-12">
                <div className="intro-banner-search-form" style={{ marginTop: '95px' }}>
                  <div className="intro-search-field with-label">
                    <label htmlFor="intro-keywords" className="field-title ripple-effect">istədiyin işin adını axtarışa ver</label>
                    <input id="intro-keywords" type="text" name="q" placeholder="vakansiyanın adı yaxud açar-söz" autoComplete="off" />
                  </div>
                  <div className="intro-search-button">
                    <button className="button ripple-effect" role="submit">axtar</button>
                  </div>
                </div>
                <div className="accordion">
                  <div className={`accordion-panel ${isAdvancedSearchOpen ? 'accordion-expanded' : ''}`} style={{ border: 'none' }}>
                    <h3 className="accordion-header" onClick={() => setAdvancedSearchOpen(!isAdvancedSearchOpen)} style={{ cursor: 'pointer' }}>
                      <i className="fas fa-search"></i>&nbsp;Ətraflı axtarış
                      <span id="arrow"><i className={`fas ${isAdvancedSearchOpen ? 'fa-caret-up' : 'fa-caret-down'}`} style={{ color: '#777777' }}></i></span>
                    </h3>
                    <div className="accordion-body" id="accordion-body" style={{ display: isAdvancedSearchOpen ? 'block' : 'none' }}>
                      <div className="row">
                        <div className="col-12" id="form">
                          <form method="get" action="/search/vacancy/advanced" className="adv_search_form">
                            <input type="hidden" name="search" value="yes" />
                            <div className="row">
                              <div className="sidebar-widget col-xl-4 col-md-4">
                                <div className="section-headline mt-25 mb-12">
                                  <h5>Kateqoriyalar</h5>
                                </div>
                                <div id="selectionDisplay"></div>
                                <input className="search" type="text" readOnly placeholder="Kateqoriyalar" />
                                <div className="pop-up">
                                  <div className="pop-bg"></div>
                                  <div className="pop form-group address_form_group" id="adJsslot_id">
                                    <div className="form-select" id="slot_id">
                                      <div className="region ">
                                        <label className="chb country" htmlFor="slot_id166">
                                          <input style={{ marginBottom: '0px' }} type="checkbox" data-text="Müştəri xidmətləri" name="categories[]" value="166" id="slot_id166" data-id="166" />
                                          <span>Müştəri xidmətləri</span>
                                        </label>
                                      </div>
                                      {/* Other categories */}
                                    </div>
                                    <div className="all_select_change" style={{ display: 'none' }}>
                                      <label className="all_slc_items all_unslc">
                                        <input type="radio" name="fullSelect" />
                                        <span>Bağla</span>
                                      </label>
                                      <label className="all_slc_items all_slc">
                                        <input type="radio" name="fullSelect" />
                                        <span>Seçin</span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-4 col-md-4">
                                <div className="section-headline mt-25 mb-12">
                                  <h5>İxtisaslar</h5>
                                </div>
                                <select className="selectpicker" name="professions[]" data-live-search="true" multiple>
                                  {/* Options */}
                                </select>
                              </div>
                              <div className="col-xl-4 col-md-4">
                                <div className="section-headline mt-25 mb-12">
                                  <h5>Bölgə</h5>
                                </div>
                                <select className="selectpicker" name="cities[]" data-live-search="true" multiple>
                                  {/* Options */}
                                </select>
                              </div>
                              <div className="col-xl-4 col-md-4 margin-bottom-10">
                                <div className="section-headline mt-25 mb-12">
                                  <h5>Məşğulluq növü</h5>
                                </div>
                                <select className="selectpicker" name="worktypes[]" data-live-search="true" multiple>
                                  <option value="1">Tam ştat (full time)</option>
                                  <option value="2">Yarımştat (part time)</option>
                                  <option value="3">Layihə/Müvəqqəti</option>
                                  <option value="4">Könüllü (volontyor)</option>
                                  <option value="5">Təcrübəçi (stajor, intern)</option>
                                  <option value="7">Əlillər üçün</option>
                                </select>
                              </div>
                              <div className="col-xl-4 col-md-4">
                                <div className="section-headline mt-25 mb-12">
                                  <h5>Təhsil</h5>
                                </div>
                                <select className="selectpicker" name="educations[]" data-live-search="true" multiple>
                                  <option value="2">Orta</option>
                                  <option value="7">Ali</option>
                                  <option value="3">Natamam ali</option>
                                  <option value="4">Ali (bakalavr)</option>
                                  <option value="5">Ali (Magistr)</option>
                                  <option value="6">Elmlər doktoru</option>
                                </select>
                              </div>
                              <div className="col-xl-4 col-md-4">
                                <div className="section-headline mt-25 mb-12">
                                  <h5>İş təcrübəsi (minimum il)</h5>
                                </div>
                                <select className="selectpicker" name="experiences[]" data-live-search="true">
                                  <option value="0" disabled selected>Seçilməyib</option>
                                  <option value="1">Tələb olunmur</option>
                                  <option value="3">1</option>
                                  <option value="4">2</option>
                                  <option value="5">3</option>
                                  <option value="6">4</option>
                                  <option value="7">5</option>
                                  <option value="8">6</option>
                                  <option value="9">7</option>
                                  <option value="10">10</option>
                                </select>
                              </div>
                              <div className="col-xl-3 col-md-3">
                                <div className="section-headline mt-25 margin-bottom-35">
                                  <h5>Minimum maaş</h5>
                                </div>
                                <input type="number" name="minimum_salary" placeholder="minimum" />
                              </div>
                              <div className="col-xl-3 col-md-3">
                                <div className="section-headline mt-25 margin-bottom-35">
                                  <h5>Maksimum maaş</h5>
                                </div>
                                <input type="number" name="maximum_salary" placeholder="maximum" />
                              </div>
                              <input type="hidden" name="_token" value="SyzZ16rpqATNLeFoOrCxZbWTIX7p8gcymUUMBljP" />
                              <div className="col-xl-12 col-md-12 margin-top-20" style={{ textAlign: 'center' }}>
                                <input type="submit" className="custom-submit-input" style={{ color: '#ffffff' }} value="Göndər" />
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="section gray">
        <div className="container" style={{ paddingTop: '20px' }}>
          <div className="row">
            <div className="col-xl-12">
              {/* Section Headline */}
              <div className="benefit_tabs">
                <div className="section-headline mt-0 mb-35 p-0 flex_head">
                  <div className="tab_head_items">
                    <h2 className={`latest_btn clicked_tab_btn ${activeJobTab === 0 ? 'active' : ''}`} onClick={() => setActiveJobTab(0)} data-id="0">Son vakansiyalar</h2>
                    <h2 className={`latest_btn clicked_tab_btn ${activeJobTab === 1 ? 'active' : ''}`} onClick={() => setActiveJobTab(1)} data-id="1">Premium</h2>
                    <h2 className={`latest_btn clicked_tab_btn ${activeJobTab === 2 ? 'active' : ''}`} onClick={() => setActiveJobTab(2)} data-id="2">Yüksək maaşlı</h2>
                    <h2 className={`latest_btn clicked_tab_btn ${activeJobTab === 3 ? 'active' : ''}`} onClick={() => setActiveJobTab(3)} data-id="3">Könüllü (volontyor)</h2>
                  </div>
                </div>
                <div className="bf_tb_content">
                  <div className={`bf_tb_items ${activeJobTab === 0 ? 'active' : ''}`} role="tabpanel" data-id="0">
                    <div className="listings-container compact-list-layout mt-35">
                      <div className="job-listing with-apply-button">
                        <div className="job-listing-details">
                          <div className="job-listing-description">
                            <h3 className="job-listing-title "><a className="LinkDark" href="/vacancy/169186/arqon-qaynaqcisi">Arqon qaynaqçısı</a></h3>
                            <div className="job-listing-footer">
                              <ul>
                                <li>
                                  <a className="GrayToBlue" href=" /company/gemza-group "><i className="icon-material-outline-business"></i>Gemza Group </a>
                                </li>
                                <li><i className="icon-material-outline-access-time"></i>bugün</li>
                              </ul>
                            </div>
                          </div>
                          <a className="list-apply-button ripple-effect" href="/vacancy/169186/arqon-qaynaqcisi">Ətraflı</a>
                        </div>
                      </div>
                      <div className="job-listing with-apply-button">
                        <div className="job-listing-details">
                          <div className="job-listing-description">
                            <h3 className="job-listing-title "><a className="LinkDark" href="/vacancy/169184/debitor-borclari-uzre-muhasib">Debitor borcları üzrə Mühasib</a></h3>
                            <div className="job-listing-footer">
                              <ul>
                                <li>
                                  <a className="GrayToBlue" href=" /company/geekbro "><i className="icon-material-outline-business"></i>GeekBro </a>
                                </li>
                                <li><i className="icon-material-outline-access-time"></i>bugün</li>
                              </ul>
                            </div>
                          </div>
                          <a className="list-apply-button ripple-effect" href="/vacancy/169184/debitor-borclari-uzre-muhasib">Ətraflı</a>
                        </div>
                      </div>
                      <div className="job-listing with-apply-button">
                        <div className="job-listing-details">
                          <div className="job-listing-description">
                            <h3 className="job-listing-title "><a className="LinkDark" href="/vacancy/169183/manual-qa-tester">Manual QA Tester</a></h3>
                            <div className="job-listing-footer">
                              <ul>
                                <li>
                                  <a className="GrayToBlue" href=" /company/ocaq-scoring "><i className="icon-material-outline-business"></i>Ocaq Scoring </a>
                                </li>
                                <li><i className="icon-material-outline-access-time"></i>bugün</li>
                              </ul>
                            </div>
                          </div>
                          <a className="list-apply-button ripple-effect" href="/vacancy/169183/manual-qa-tester">Ətraflı</a>
                        </div>
                      </div>
                      <div className="job-listing with-apply-button">
                        <div className="job-listing-details">
                          <div className="job-listing-description">
                            <h3 className="job-listing-title "><a className="LinkDark" href="/vacancy/169172/marketinq-departamentinin-uiux-1-funksional-sahesinin-kicik-dizayneri-muveqqeti">Marketinq departamentinin UI/UX 1 funksional sahəsinin Kiçik dizayneri (Müvəqqəti)</a></h3>
                            <div className="job-listing-footer">
                              <ul>
                                <li>
                                  <a className="GrayToBlue" href=" /company/pasha-bank "><i className="icon-material-outline-business"></i>PASHA Bank </a>
                                </li>
                                <li><i className="icon-material-outline-access-time"></i>bugün</li>
                              </ul>
                            </div>
                          </div>
                          <a className="list-apply-button ripple-effect" href="/vacancy/169172/marketinq-departamentinin-uiux-1-funksional-sahesinin-kicik-dizayneri-muveqqeti">Ətraflı</a>
                        </div>
                      </div>
                      <div className="job-listing with-apply-button">
                        <div className="job-listing-details">
                          <div className="job-listing-description">
                            <h3 className="job-listing-title "><a className="LinkDark" href="/vacancy/169125/promoutertanitim-numayendesi">Promouter/Tanıtım nümayəndəsi</a></h3>
                            <div className="job-listing-footer">
                              <ul>
                                <li>
                                  <a className="GrayToBlue" href=" /company/caspident "><i className="icon-material-outline-business"></i>Caspident </a>
                                </li>
                                <li><i className="icon-material-outline-access-time"></i>dünən</li>
                              </ul>
                            </div>
                          </div>
                          <a className="list-apply-button " style={{ background: '#aaf674', color: '#000', marginRight: '5px', textAlign: 'center', fontWeight: 700 }} href="javascript:void(0);">Premium</a>
                          <a className="list-apply-button ripple-effect" href="/vacancy/169125/promoutertanitim-numayendesi">Ətraflı</a>
                        </div>
                      </div>
                    </div>
                    <div className=" mt-5 mb-35" style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
                      <a href="/vacancies" className="button ripple-effect  button-sliding-icon margin-bottom-40" style={{ width: '260px', color: 'rgb(255, 255, 255)' }}>
                        Bütün vakansiyalar
                        <i className="icon-feather-check"></i>
                      </a>
                    </div>
                  </div>
                  <div className={`bf_tb_items ${activeJobTab === 1 ? 'active' : ''}`} role="tabpanel" data-id="1">
                    {/* Jobs Container */}
                    <div className="listings-container compact-list-layout mt-35">
                      <div className="job-listing with-apply-button">
                        <div className="job-listing-details">
                          <div className="job-listing-description">
                            <h3 className="job-listing-title "><a className="LinkDark" href="/vacancy/169125/promoutertanitim-numayendesi">Promouter/Tanıtım nümayəndəsi</a></h3>
                            <div className="job-listing-footer">
                              <ul>
                                <li>
                                  <a className="GrayToBlue" href=" /company/caspident "><i className="icon-material-outline-business"></i>Caspident </a>
                                </li>
                                <li><i className="icon-material-outline-access-time"></i>dünən</li>
                              </ul>
                            </div>
                          </div>
                          <a className="list-apply-button " style={{ background: '#aaf674', color: '#000', marginRight: '5px', textAlign: 'center', fontWeight: 700 }} href="javascript:void(0);">Premium</a>
                          <a className="list-apply-button ripple-effect" href="/vacancy/169125/promoutertanitim-numayendesi">Ətraflı</a>
                        </div>
                      </div>
                      <div className="job-listing with-apply-button">
                        <div className="job-listing-details">
                          <div className="job-listing-description">
                            <h3 className="job-listing-title "><a className="LinkDark" href="/vacancy/169109/rukovoditel-otdela-po-rabote-s-klientami">Руководитель отдела по работе с клиентами</a></h3>
                            <div className="job-listing-footer">
                              <ul>
                                <li>
                                  <a className="GrayToBlue" href=" /company/empire-by-asthetik-lab "><i className="icon-material-outline-business"></i>Empire by Asthetik Lab </a>
                                </li>
                                <li><i className="icon-material-outline-access-time"></i>dünən</li>
                              </ul>
                            </div>
                          </div>
                          <a className="list-apply-button " style={{ background: '#aaf674', color: '#000', marginRight: '5px', textAlign: 'center', fontWeight: 700 }} href="javascript:void(0);">Premium</a>
                          <a className="list-apply-button ripple-effect" href="/vacancy/169109/rukovoditel-otdela-po-rabote-s-klientami">Ətraflı</a>
                        </div>
                      </div>
                      <div className="job-listing with-apply-button">
                        <div className="job-listing-details">
                          <div className="job-listing-description">
                            <h3 className="job-listing-title "><a className="LinkDark" href="/vacancy/169107/incoming-gelme-turizm-uzre-satis-meneceri">Incoming (Gəlmə turizm) üzrə Satış Meneceri</a></h3>
                            <div className="job-listing-footer">
                              <ul>
                                <li>
                                  <a className="GrayToBlue" href=" /company/baku-life-travel "><i className="icon-material-outline-business"></i>Baku Life Travel </a>
                                </li>
                                <li><i className="icon-material-outline-access-time"></i>dünən</li>
                              </ul>
                            </div>
                          </div>
                          <a className="list-apply-button " style={{ background: '#aaf674', color: '#000', marginRight: '5px', textAlign: 'center', fontWeight: 700 }} href="javascript:void(0);">Premium</a>
                          <a className="list-apply-button ripple-effect" href="/vacancy/169107/incoming-gelme-turizm-uzre-satis-meneceri">Ətraflı</a>
                        </div>
                      </div>
                      <div className="job-listing with-apply-button">
                        <div className="job-listing-details">
                          <div className="job-listing-description">
                            <h3 className="job-listing-title "><a className="LinkDark" href="/vacancy/169075/menedzer-po-rabote-s-klientami">Менеджер по работе с клиентами</a></h3>
                            <div className="job-listing-footer">
                              <ul>
                                <li>
                                  <a className="GrayToBlue" href=" /company/empire-by-asthetik-lab "><i className="icon-material-outline-business"></i>Empire by Asthetik Lab </a>
                                </li>
                                <li><i className="icon-material-outline-access-time"></i>dünən</li>
                              </ul>
                            </div>
                          </div>
                          <a className="list-apply-button " style={{ background: '#aaf674', color: '#000', marginRight: '5px', textAlign: 'center', fontWeight: 700 }} href="javascript:void(0);">Premium</a>
                          <a className="list-apply-button ripple-effect" href="/vacancy/169075/menedzer-po-rabote-s-klientami">Ətraflı</a>
                        </div>
                      </div>
                      <div className="job-listing with-apply-button">
                        <div className="job-listing-details">
                          <div className="job-listing-description">
                            <h3 className="job-listing-title "><a className="LinkDark" href="/vacancy/169017/tender-mutexessisi">Tender mütəxəssisi</a></h3>
                            <div className="job-listing-footer">
                              <ul>
                                <li>
                                  <a className="GrayToBlue" href=" /company/texnostar-llc "><i className="icon-material-outline-business"></i>Texnostar LLC </a>
                                </li>
                                <li><i className="icon-material-outline-access-time"></i>2 gün əvvəl</li>
                              </ul>
                            </div>
                          </div>
                          <a className="list-apply-button " style={{ background: '#aaf674', color: '#000', marginRight: '5px', textAlign: 'center', fontWeight: 700 }} href="javascript:void(0);">Premium</a>
                          <a className="list-apply-button ripple-effect" href="/vacancy/169017/tender-mutexessisi">Ətraflı</a>
                        </div>
                      </div>
                    </div>
                    <div className=" mt-5 mb-35" style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
                      <a href="/vacancies" className="button ripple-effect  button-sliding-icon margin-bottom-40" style={{ width: '290px', color: 'rgb(255, 255, 255)' }}>
                        Bütün vakansiyalar
                        <i className="icon-feather-check"></i>
                      </a>
                    </div>
                  </div>
                  <div className={`bf_tb_items ${activeJobTab === 2 ? 'active' : ''}`} role="tabpanel" data-id="2">
                    {/* Jobs Container */}
                    <div className="listings-container compact-list-layout mt-35">
                      <div className="job-listing with-apply-button">
                        <div className="job-listing-details">
                          <div className="job-listing-description">
                            <h3 className="job-listing-title "><a className="LinkDark" href="/vacancy/168971/ingilis-dili-muellimi">İngilis dili müəllimi</a></h3>
                            <div className="job-listing-footer">
                              <ul>
                                <li>
                                  <a className="GrayToBlue" href=" /company/eland-education "><i className="icon-material-outline-business"></i>Eland Education </a>
                                </li>
                                <li><i className="icon-material-outline-access-time"></i>2 gün əvvəl</li>
                              </ul>
                            </div>
                          </div>
                          <a className="list-apply-button ripple-effect" href="/vacancy/168971/ingilis-dili-muellimi">Ətraflı</a>
                        </div>
                      </div>
                      <div className="job-listing with-apply-button">
                        <div className="job-listing-details">
                          <div className="job-listing-description">
                            <h3 className="job-listing-title "><a className="LinkDark" href="/vacancy/168911/korporativ-satis-meneceri">Korporativ Satış Meneceri</a></h3>
                            <div className="job-listing-footer">
                              <ul>
                                <li>
                                  <a className="GrayToBlue" href=" /company/sekerci-cafer-erol "><i className="icon-material-outline-business"></i>Şekerci Cafer Erol </a>
                                </li>
                                <li><i className="icon-material-outline-access-time"></i>3 gün əvvəl</li>
                              </ul>
                            </div>
                          </div>
                          <a className="list-apply-button ripple-effect" href="/vacancy/168911/korporativ-satis-meneceri">Ətraflı</a>
                        </div>
                      </div>
                      <div className="job-listing with-apply-button">
                        <div className="job-listing-details">
                          <div className="job-listing-description">
                            <h3 className="job-listing-title "><a className="LinkDark" href="/vacancy/168716/deputy-ceo">Deputy CEO</a></h3>
                            <div className="job-listing-footer">
                              <ul>
                                <li>
                                  <a className="GrayToBlue" href=" /company/promco-azerbaijan-llc "><i className="icon-material-outline-business"></i>Promco Azerbaijan LLC </a>
                                </li>
                                <li><i className="icon-material-outline-access-time"></i>7 gün əvvəl</li>
                              </ul>
                            </div>
                          </div>
                          <a className="list-apply-button " style={{ background: '#aaf674', color: '#000', marginRight: '5px', textAlign: 'center', fontWeight: 700 }} href="javascript:void(0);">Premium</a>
                          <a className="list-apply-button ripple-effect" href="/vacancy/168716/deputy-ceo">Ətraflı</a>
                        </div>
                      </div>
                      <div className="job-listing with-apply-button">
                        <div className="job-listing-details">
                          <div className="job-listing-description">
                            <h3 className="job-listing-title "><a className="LinkDark" href="/vacancy/168624/bas-muhasib">Baş mühasib</a></h3>
                            <div className="job-listing-footer">
                              <ul>
                                <li>
                                  <a className="GrayToBlue" href=" /company/max-print "><i className="icon-material-outline-business"></i>Max Print </a>
                                </li>
                                <li><i className="icon-material-outline-access-time"></i>8 gün əvvəl</li>
                              </ul>
                            </div>
                          </div>
                          <a className="list-apply-button ripple-effect" href="/vacancy/168624/bas-muhasib">Ətraflı</a>
                        </div>
                      </div>
                      <div className="job-listing with-apply-button">
                        <div className="job-listing-details">
                          <div className="job-listing-description">
                            <h3 className="job-listing-title "><a className="LinkDark" href="/vacancy/168108/marketinq-kommunikasiyalari-uzre-aparici-mutexessis">Marketinq kommunikasiyaları üzrə aparıcı mütəxəssis</a></h3>
                            <div className="job-listing-footer">
                              <ul>
                                <li>
                                  <a className="GrayToBlue" href=" /company/arne-group-mmc "><i className="icon-material-outline-business"></i>ARNE Group MMC </a>
                                </li>
                                <li><i className="icon-material-outline-access-time"></i>16 gün əvvəl</li>
                              </ul>
                            </div>
                          </div>
                          <a className="list-apply-button ripple-effect" href="/vacancy/168108/marketinq-kommunikasiyalari-uzre-aparici-mutexessis">Ətraflı</a>
                        </div>
                      </div>
                    </div>
                    <div className=" mt-5 mb-35" style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
                      <a href="/dp/yuksek-maasli-is-elanlari" className="button ripple-effect  button-sliding-icon margin-bottom-40" style={{ width: '260px', color: 'rgb(255, 255, 255)' }}>
                        Bütün yüksək maaşlı vakansiyalar
                        <i className="icon-feather-check"></i>
                      </a>
                    </div>
                  </div>
                  <div className={`bf_tb_items ${activeJobTab === 3 ? 'active' : ''}`} role="tabpanel" data-id="3">
                    {/* Jobs Container */}
                    <div className="listings-container compact-list-layout mt-35">
                      <div className="job-listing with-apply-button">
                        <div className="job-listing-details">
                          <div className="job-listing-description">
                            <h3 className="job-listing-title "><a className="LinkDark" href="/vacancy/168799/tecrubeci-intern">Təcrübəçi (intern)</a></h3>
                            <div className="job-listing-footer">
                              <ul>
                                <li>
                                  <a className="GrayToBlue" href=" /company/asterias "><i className="icon-material-outline-business"></i>ASTERIAS </a>
                                </li>
                                <li><i className="icon-material-outline-access-time"></i>4 gün əvvəl</li>
                              </ul>
                            </div>
                          </div>
                          <a className="list-apply-button ripple-effect" href="/vacancy/168799/tecrubeci-intern">Ətraflı</a>
                        </div>
                      </div>
                      <div className="job-listing with-apply-button">
                        <div className="job-listing-details">
                          <div className="job-listing-description">
                            <h3 className="job-listing-title "><a className="LinkDark" href="/vacancy/168763/insaat-uzre-tecrubeci">İnşaat üzrə təcrübəçi</a></h3>
                            <div className="job-listing-footer">
                              <ul>
                                <li>
                                  <a className="GrayToBlue" href=" /company/amal-group "><i className="icon-material-outline-business"></i>Amal Group </a>
                                </li>
                                <li><i className="icon-material-outline-access-time"></i>7 gün əvvəl</li>
                              </ul>
                            </div>
                          </div>
                          <a className="list-apply-button ripple-effect" href="/vacancy/168763/insaat-uzre-tecrubeci">Ətraflı</a>
                        </div>
                      </div>
                      <div className="job-listing with-apply-button">
                        <div className="job-listing-details">
                          <div className="job-listing-description">
                            <h3 className="job-listing-title "><a className="LinkDark" href="/vacancy/168700/musteri-munasibetleri-uzre-tecrube-proqrami">Müştəri Münasibətləri Üzrə Təcrübə Proqramı</a></h3>
                            <div className="job-listing-footer">
                              <ul>
                                <li>
                                  <a className="GrayToBlue" href=" /company/prospect-cloud-erp "><i className="icon-material-outline-business"></i>Prospect Cloud ERP </a>
                                </li>
                                <li><i className="icon-material-outline-access-time"></i>7 gün əvvəl</li>
                              </ul>
                            </div>
                          </div>
                          <a className="list-apply-button ripple-effect" href="/vacancy/168700/musteri-munasibetleri-uzre-tecrube-proqrami">Ətraflı</a>
                        </div>
                      </div>
                      <div className="job-listing with-apply-button">
                        <div className="job-listing-details">
                          <div className="job-listing-description">
                            <h3 className="job-listing-title "><a className="LinkDark" href="/vacancy/168627/intern-accountant-document-controller">Intern accountant - document controller</a></h3>
                            <div className="job-listing-footer">
                              <ul>
                                <li>
                                  <a className="GrayToBlue" href=" /company/azeri-m-i-drilling-fluids-llc "><i className="icon-material-outline-business"></i>Azeri M-I Drilling Fluids LLC </a>
                                </li>
                                <li><i className="icon-material-outline-access-time"></i>8 gün əvvəl</li>
                              </ul>
                            </div>
                          </div>
                          <a className="list-apply-button ripple-effect" href="/vacancy/168627/intern-accountant-document-controller">Ətraflı</a>
                        </div>
                      </div>
                      <div className="job-listing with-apply-button">
                        <div className="job-listing-details">
                          <div className="job-listing-description">
                            <h3 className="job-listing-title "><a className="LinkDark" href="/vacancy/168561/tecrube-proqrami">Təcrübə proqramı</a></h3>
                            <div className="job-listing-footer">
                              <ul>
                                <li>
                                  <a className="GrayToBlue" href=" /company/prior-leasing "><i className="icon-material-outline-business"></i>Prior Leasing </a>
                                </li>
                                <li><i className="icon-material-outline-access-time"></i>9 gün əvvəl</li>
                              </ul>
                            </div>
                          </div>

                          <a className="list-apply-button ripple-effect" href="/vacancy/168561/tecrube-proqrami">Ətraflı</a>
                        </div>
                      </div>
                    </div>
                    <div className=" mt-5 mb-35" style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
                      <a href="/dp/konullu-islemek-ucun-vakansiyalar" className="button ripple-effect  button-sliding-icon margin-bottom-40" style={{ width: '260px', color: 'rgb(255, 255, 255)' }}>
                        Bütün könüllü vakansiyalar
                        <i className="icon-feather-check"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section gray pb-75" style={{ paddingTop: '50px' }}>
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="tg_custom_wrap">
                <div className="tg_custom_title">
                  İş axtarışlarına vaxt itirmə!
                </div>
                <div className="tg_custom_hd">
                  Telegram bot-a abunə ol, həyatını asanlaşdır!
                </div>
                <div className="tg_custom_short_info">
                  Sən işi yox, iş səni səni tapsın!
                  <br />
                  Məhz özünə uyğun vakansiyaları seç!
                </div>
                <div className="tg_custom_subs_item">
                  <div className="subs_item_buttons">
                    <svg role="presentation" className="tg_arrow-icon" style={{ fill: '#1f5bff' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 180"><path d="M54.1 109c-.8 0-1.6-.4-2-1.1-.8-1.1-.5-2.7.6-3.5 1.3-.9 6.8-4 11.6-6.6-15.9-1.3-29.2-8.3-38.5-20.2C8.9 56 8.5 24.1 13.2 3.4c.3-1.3 1.7-2.2 3-1.9 1.3.3 2.2 1.7 1.9 3-4.5 19.6-4.2 49.8 11.6 70 9 11.5 21.5 17.7 37.2 18.4l-1.8-2.3c-1.4-1.7-2.7-3.4-4.1-5.1-.7-.9-1.5-1.9-2.3-2.9-.9-1.1-.7-2.6.4-3.5 1.1-.9 2.6-.7 3.5.4 0 0 0 .1.1.1l6.4 7.9c.5.5.9 1.1 1.4 1.7 1.5 1.8 3.1 3.6 4.4 5.6 0 .1.1.1.1.2.1.3.2.5.3.8v.6c0 .2-.1.4-.2.6-.1.1-.1.3-.2.4-.1.2-.3.4-.5.6-.1.1-.3.2-.5.3-.1 0-.1.1-.2.1-1.2.6-16 8.6-18.1 10-.5.5-1 .6-1.5.6z"></path></svg>
                    <a href="https://t.me/Busy_az_bot" className="tg_subs_link">Abunə ol</a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <section className={`blank ${isBlankSectionActive ? 'active' : ''}`} ref={blankSectionRef}>
        <svg viewBox="4981.03955078125 4637.0380859375 1457.7606201171875 842.4442138671875">
          <path fill="#4417e2" fillOpacity="1" stroke="#4417e2" strokeOpacity="0" strokeWidth="0.8" fillRule="evenodd" id="tSvgf259782529" d="M 5978.103373750775 4637.837743432731 C 5978.103373750775 4637.837743432731 6438 5478.682182685068 6438 5478.682182685068 C 6438 5478.682182685068 4981.839205526477 5209.682182685068 4981.839205526477 5209.682182685068 C 4981.839205526477 5209.682182685068 4981.839205526477 4637.837743432731 4981.839205526477 4637.837743432731C 4981.839205526477 4637.837743432731 5978.103373750775 4637.837743432731 5978.103373750775 4637.837743432731 Z"></path>
          <defs>
            <mask maskUnits="userSpaceOnUse" id="tSvgf259782529m" data-svg-id="tSvgHighlight">
              <rect x="0" y="0" width="12000.0009765625" height="10000" fill="#4417e2"></rect>
              <path fill="#4417e2" fillOpacity="1" stroke="#4417e2" strokeOpacity="0" strokeWidth="0.8" fillRule="evenodd" data-svg-name="path" data-svg-id="f259782529" d="M 5978.103373750775 4637.837743432731 C 5978.103373750775 4637.837743432731 6420.154439171337 5209.682182685068 6420.154439171337 5209.682182685068 C 6420.154439171337 5209.682182685068 4981.839205526477 5209.682182685068 4981.839205526477 5209.682182685068 C 4981.839205526477 5209.682182685068 4981.839205526477 4637.837743432731 4981.839205526477 4637.837743432731C 4981.839205526477 4637.837743432731 5978.103373750775 4637.837743432731 5978.103373750775 4637.837743432731 Z"></path>
            </mask>
          </defs>
        </svg>
        <div className="container">
          <h3>
            Headhunt xidmətləri
          </h3>
          <p>
            Şirkətlərə "çətin" namizədləri
            <br />
            tapmaqda kömək edirik.
          </p>
          <a href="/31-headhunting-xidmeti-azerbaycanda">
            MARAQLIDIR
          </a>
          <img src="/images/lupa.png" alt="" />
        </div>
      </section>

      <div className="section mt-65">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="section-headline centered mb-15">
                <h2>Kateqoriyalar</h2>
                <span id="more_categories" data-action="hidden">
                  <span id="more_category_text" style={{ display: 'inline' }}>Böyüt</span>
                  <span style={{ display: 'inline' }} id="arrow_cat"> <i className="fas fa-caret-down" style={{ color: '#777777' }}></i> </span>
                </span>
              </div>
              <div className="section-headline mt-0 mb-25">
                <a href="/categories" className="headline-link">Bütün kateqoriyalar</a>
              </div>
              <div className="categories-container" id="categories_view">
                <a href="/category/musteri-xidmetleri" className="category-box ">
                  <div className="category-box-content">
                    <h3>Müştəri xidmətləri</h3>
                  </div>
                </a>
                <a href="/category/muhasibat-idareetme-ucotu-maliyye" className="category-box ">
                  <div className="category-box-content">
                    <h3>Mühasibat, idarəetmə uçotu, maliyyə</h3>
                  </div>
                </a>
                <a href="/category/tikinti-dasinmaz-emlak-memarliq" className="category-box ">
                  <div className="category-box-content">
                    <h3>Tikinti, daşınmaz əmlak, memarlıq</h3>
                  </div>
                </a>
                <a href="/category/inzibati-administrativ-isler" className="category-box ">
                  <div className="category-box-content">
                    <h3>İnzibati (administrativ) işlər</h3>
                  </div>
                </a>
                <a href="/category/yaradici-isler" className="category-box  hidden-categories ">
                  <div className="category-box-content">
                    <h3>Yaradıcı işlər</h3>
                  </div>
                </a>
                <a href="/category/layihelerin-idare-olunmasi-project-management" className="category-box  hidden-categories ">
                  <div className="category-box-content">
                    <h3>Layihələrin idarə olunması,  Project Management</h3>
                  </div>
                </a>
                <a href="/category/avtomobil-biznesi" className="category-box  hidden-categories ">
                  <div className="category-box-content">
                    <h3>Avtomobil biznesi</h3>
                  </div>
                </a>
                <a href="/category/bank-investisiyalar-maliyye" className="category-box  hidden-categories ">
                  <div className="category-box-content">
                    <h3>Bank, investisiyalar, maliyyə</h3>
                  </div>
                </a>
                <a href="/category/ilkin-karyera-telebeler-ucun-isler" className="category-box  hidden-categories ">
                  <div className="category-box-content">
                    <h3>İlkin karyera, tələbələr üçün işlər</h3>
                  </div>
                </a>
                <a href="/category/ev-ucun-isciler" className="category-box  hidden-categories ">
                  <div className="category-box-content">
                    <h3>Ev üçün işçilər</h3>
                  </div>
                </a>
                <a href="/category/human-resources-training" className="category-box  hidden-categories ">
                  <div className="category-box-content">
                    <h3>Human Resources, Training</h3>
                  </div>
                </a>
                <a href="/category/it-internet-telekom" className="category-box  hidden-categories ">
                  <div className="category-box-content">
                    <h3>İT, İnternet, Telekom</h3>
                  </div>
                </a>
                <a href="/category/huquq" className="category-box  hidden-categories ">
                  <div className="category-box-content">
                    <h3>Hüquq</h3>
                  </div>
                </a>
                <a href="/category/isci-personal" className="category-box  hidden-categories ">
                  <div className="category-box-content">
                    <h3>İşçi personal</h3>
                  </div>
                </a>
                <a href="/category/senaye-ve-kend-teserrufati" className="category-box  hidden-categories ">
                  <div className="category-box-content">
                    <h3>Sənaye və kənd təsərrüfatı</h3>
                  </div>
                </a>
                <a href="/category/marketing-reklam-pr" className="category-box  hidden-categories ">
                  <div className="category-box-content">
                    <h3>Marketing, Reklam, PR</h3>
                  </div>
                </a>
                <a href="/category/sehiyye-eczaciliq" className="category-box  hidden-categories ">
                  <div className="category-box-content">
                    <h3>Səhiyyə, əczaçılıq</h3>
                  </div>
                </a>
                <a href="/category/techizat" className="category-box  hidden-categories ">
                  <div className="category-box-content">
                    <h3>Təchizat</h3>
                  </div>
                </a>
                <a href="/category/satis" className="category-box  hidden-categories ">
                  <div className="category-box-content">
                    <h3>Satış</h3>
                  </div>
                </a>
                <a href="/category/elm-tehsil" className="category-box  hidden-categories ">
                  <div className="category-box-content">
                    <h3>Elm, Təhsil</h3>
                  </div>
                </a>
                <a href="/category/tehlukesizlik" className="category-box  hidden-categories ">
                  <div className="category-box-content">
                    <h3>Təhlükəsizlik</h3>
                  </div>
                </a>
                <a href="/category/tender" className="category-box  hidden-categories ">
                  <div className="category-box-content">
                    <h3>Tender</h3>
                  </div>
                </a>
                <a href="/category/idman-fitness-gozellik-salonlari" className="category-box  hidden-categories ">
                  <div className="category-box-content">
                    <h3>İdman, fitness, gözəllik salonları</h3>
                  </div>
                </a>
                <a href="/category/turizm-otel-restoran" className="category-box  hidden-categories ">
                  <div className="category-box-content">
                    <h3>Turizm, otel, restoran</h3>
                  </div>
                </a>
                <a href="/category/neqliyyat-logistika" className="category-box  hidden-categories ">
                  <div className="category-box-content">
                    <h3>Nəqliyyat, logistika</h3>
                  </div>
                </a>
                <a href="/category/menecment" className="category-box  hidden-categories ">
                  <div className="category-box-content">
                    <h3>Menecment</h3>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section how_it">
        <div className="container">
          <div className="row align-items-center benefit_tabs">
            <div className="col-lg-6">
              <div className="section-title me-5 text-start">
                <h3 className="title">3 addımdaca həyatını asanlaşdır</h3>
                <p className="text-muted text-start">Yaxşı iş tapmaq üçün elə də çox şey lazım deyil. Pulsuz-parasız, rahat şəkildə arzuladığınız işi tapın.</p>
                <div className="process-menu nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                  <a className={`nav-link clicked_tab_btn ${activeHowItTab === 0 ? 'active' : ''}`} data-id="0" href="javascript:void(0);" role="tab">
                    <div className="d-flex">
                      <div className="number flex-shrink-0">
                        1
                      </div>
                      <div className="flex-grow-1 text-start ms-3 start_text_item">
                        <h5 className="fs-18">Qeydiyyatdan keç</h5>
                        <p className="text-muted mb-0 text-start">Sadəcə e-mailə gələn aktivləşdirmə keçidinə basmaq bəs edir.</p>
                      </div>
                    </div>
                  </a>
                  <a className={`nav-link clicked_tab_btn ${activeHowItTab === 1 ? 'active' : ''}`} data-id="1" href="javascript:void(0);" role="tab">
                    <div className="d-flex">
                      <div className="number flex-shrink-0">
                        2
                      </div>
                      <div className="flex-grow-1 text-start ms-3 start_text_item">
                        <h5 className="fs-18">İstədiyin vəzifələri təyin et</h5>
                        <p className="text-muted mb-0 text-start">Hansı ixtisaslarda iş olanda sizə bildiriş gəlsin? Bax, həmin arzuladığın peşələri seç.</p>
                      </div>
                    </div>
                  </a>
                  <a className={`nav-link clicked_tab_btn ${activeHowItTab === 2 ? 'active' : ''}`} data-id="2" href="javascript:void(0);" role="tab">
                    <div className=" d-flex">
                      <div className="number flex-shrink-0">
                        3
                      </div>
                      <div className="flex-grow-1 text-start ms-3 start_text_item">
                        <h5 className="fs-18">Müraciət et</h5>
                        <p className="text-muted mb-0 text-start">Telefonuna gələcək bildirişlərə klik et. MÜraciət etdiyin iş xeyirli olsun.</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="col-lg-6">
              <div className="tab-content bf_tb_content">
                <div className={`tab-pane bf_tb_items ${activeHowItTab === 0 ? 'active' : ''}`} role="tabpanel" data-id="0">
                  <img src="/images/block-1.jpeg" alt="" className="img-fluid" />
                </div>
                <div className={`tab-pane bf_tb_items ${activeHowItTab === 1 ? 'active' : ''}`} role="tabpanel" data-id="1">
                  <img src="/images/block-2.jpeg" alt="" className="img-fluid" />
                </div>
                <div className={`tab-pane bf_tb_items ${activeHowItTab === 2 ? 'active' : ''}`} role="tabpanel" data-id="2">
                  <img src="/images/block-3.jpeg" alt="" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
          {/*end row*/}
        </div>
        {/*end container*/}
      </section>

      <div className="section how_it">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <h2 style={{ paddingBottom: '20px' }}>Çox verilən suallar</h2>
              <div className="faq_body clearfix">
                <div className="collapse_row">
                  <div className="collapse_btn">
                    Keçmiş vakansiyanı silmək istəyirəm. Nə edim?
                    <span className="faq_icn"></span>
                  </div>
                  <div className="collapse_content">
                    <p className="text-start">Əgər siz ödənişi etmisinizsə və balansınızda 1 AZN də olsa məbləğ varsa, istənilən zaman sizin şirkətə aid keçmiş vakansiyanı silə bilərsiniz.</p>
                  </div>
                </div>
                <div className="collapse_row">
                  <div className="collapse_btn">
                    Vakansiyanı yerləşdirmək üçün bütün xanaları doldurmalıyam?
                    <span className="faq_icn"></span>
                  </div>
                  <div className="collapse_content">
                    <p className="text-start">Xeyr.<br />
                      Yalnız hansı sahələri doldurmaq üçün məlumatınız varsa, onları doldurun.<br />
                      Lakin iş elanında nə qədər çox sahəni ətraflı şəkildə doldursanız, sizin iş elanınız o qədər çox görünə bilər. Çalışın maaş, iş tipi, təhsil səviyyəsi, yaş və s. ilə bağlı bütün detalları qeyd edəsiniz ki, həm iş axtaranlara, həm də gələcəkdə sizə faydalı olsun.</p>
                  </div>
                </div>
                <div className="collapse_row">
                  <div className="collapse_btn">
                    Paketlərlə bağlı suallarım var, nə edim?
                    <span className="faq_icn"></span>
                  </div>
                  <div className="collapse_content">
                    <p className="text-start">Ən yaxşısı dərhal bizə zəng etməkdir. +994553103300 nömrəsinə zəng etməklə yaxud support@example.com ünvanına yazmaqla tez bir zamanda suallarınıza cavab tapacaqsınız.</p>
                  </div>
                </div>

                <div className="collapse_row">
                  <div className="collapse_btn">
                    Etdiyim ödənişi geri qaytarmaq istəyirəm
                    <span className="faq_icn"></span>
                  </div>
                  <div className="collapse_content">
                    <p className="text-start">Xidmət təminatçısı kimi saytımızın özünün razılığı olmadan edilmiş ödənişlər geri qaytarılmır. Vəsait ödəniləndən sonra İstifadəçinin balansına əlavə edilir. İstifadəçi edilmiş ödənişin həcminə uyğun xidməti sonradan və ya digər xidmətlər üçün istifadə edə bilər.</p>
                    <p className="text-start">Ona görə də, ödəniş etməzdən əvvəl diqqətli olmağı, yalnız xidmətdən istifadəyə əmin olandan sonra ödənişi etmək lazımdır.&nbsp; Əgər digər suallarınız varsa, bizimlə əlaqə saxlaya bilərsiniz.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section pb-75 pt-60">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              {/* Section Headline */}
              <div className="section-headline centered mt-0 mb-35">
                <h2>Qiymətlər</h2>
              </div>
            </div>
            <div className="col-xl-12">
              {/* Pricing Plans Container */}
              <div className="pricing-plans-container mt-70">
                {/* Plan */}
                <div className="pricing-plan ">
                  <h3 style={{ textAlign: 'center' }}>Busy 25</h3>
                  <div className="pricing-plan-label billed-monthly-label"><strong>25</strong> AZN
                  </div>
                  <div className="pricing-plan-features">
                    <strong>Özəlliklər</strong>
                    <ul>
                      <li><em>1 premium vakansiya (1 günlük)</em></li>
                      <li>"About company" bölməsinə düzəliş etmək</li>
                      <li>Şirkətin qalereyasına şəkil əlavə etmək</li>
                      <li>Dedlayn keçəndən sonra vakansiyanı silmək</li>
                    </ul>
                  </div>
                  <a href="/order/4" className=" ordinary-price-btn  button full-width margin-top-20">Sifariş et</a>
                </div>
                {/* Plan */}
                <div className="pricing-plan ">
                  <h3 style={{ textAlign: 'center' }}>Busy 100</h3>
                  <div className="pricing-plan-label billed-monthly-label"><strong>100</strong> AZN
                  </div>
                  <div className="pricing-plan-features">
                    <strong>Özəlliklər</strong>
                    <ul>
                      <li><em>7 vakansiya</em></li>
                      <li>Vakansiyaları 3 günlük premium etmək</li>
                      <li>"About company" bölməsinə düzəliş etmək</li>
                      <li>Şirkətin qalereyasına şəkil əlavə etmək</li>
                      <li>Video/frame əlavə etmək</li>
                      <li>Dedlayn keçəndən sonra vakansiyanı silmək</li>
                      <li>Bank köçürmə yolu ödəniş</li>
                      <li>Anonim rəyləri silmək</li>
                    </ul>
                  </div>
                  <a href="/order/5" className=" ordinary-price-btn  button full-width margin-top-20">Sifariş et</a>
                </div>
                {/* Plan */}
                <div className="pricing-plan  recommended ">
                  <div className="recommended-badge">Tövsiyə edirik</div>
                  <h3 style={{ textAlign: 'center' }}>Busy 450</h3>
                  <div className="pricing-plan-label billed-monthly-label"><strong>450</strong> AZN
                  </div>
                  <div className="pricing-plan-features">
                    <strong>Özəlliklər</strong>
                    <ul>
                      <li><em>35 vakansiya</em></li>
                      <li>Vakansiyaları 7 gün premium etmək</li>
                      <li>Video/frame qoymaq imkanı</li>
                      <li>"About company" bölməsinə düzəliş etmək</li>
                      <li>Şirkətin qalereyasına şəkil əlavə etmək</li>
                      <li>Dedlayn keçəndən sonra vakansiyanı silmək</li>
                      <li>Bank köçürmə yolu ödəniş</li>
                      <li>Anonim rəyləri silmək</li>
                      <li>Sosial mediada paylaşmaq</li>
                      <li>Xüsusi sosial media kontenti</li>
                    </ul>
                  </div>
                  <a href="/order/6" className=" recommended-price-btn  button full-width margin-top-20">Sifariş et</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
