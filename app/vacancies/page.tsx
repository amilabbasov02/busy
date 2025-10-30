"use client";
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    jQuery: any;
  }
}

interface Vacancy {
    id: number;
    title: string;
    company: string;
    location: string;
    time: string;
    logo: string;
    isPremium: boolean;
    href: string;
}

const allVacancies: Vacancy[] = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: `Vakansiya Başlığı ${i + 1} (Səhifə ${Math.floor(i / 10) + 1})`,
    company: `Şirkət ${i + 1}`,
    location: 'Bakı',
    time: `${(i % 5) + 1} gün əvvəl`,
    logo: '/site/images/company-logo-05.png',
    isPremium: i % 4 === 0,
    href: '#',
}));

const fetchVacancies = (page: number, itemsPerPage: number = 10): Promise<Vacancy[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            resolve(allVacancies.slice(start, end));
        }, 300); // Simulate network delay
    });
};


export default function Vacancies() {
  useEffect(() => {
    const $ = window.jQuery;
    if (!$) {
      return;
    }

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

    const initPlugins = () => {
      $('.selectpicker').selectpicker({
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
        var selectedValues = Array.from(document.querySelectorAll('.selectedItem')).map(span => (span as HTMLElement).getAttribute('data-value'));
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
          var value = (checkbox as HTMLInputElement).value;
          (checkbox as HTMLInputElement).checked = selectedValues.includes(value);
        });
        $(".pop-up").removeClass("active_pop");
      });

      $(".pop-bg").on('click', function () {
        var selectedValues = Array.from(document.querySelectorAll('.selectedItem')).map(span => (span as HTMLElement).getAttribute('data-value'));
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

      const selectionDisplayElem = document.getElementById("selectionDisplay");
      selectionDisplayElem?.addEventListener("click", selectionDisplayHandler as EventListener);

      $('#read_more').on('click', function(this: HTMLElement) {
        $('#content_first').hide();
        $('#content_all').show();
        $(this).parent().hide();
      });
    };

    const interval = setInterval(() => {
      if ($.fn.selectpicker && $.fn.select2) {
        clearInterval(interval);
        initPlugins();
        ($('#professions') as any).select2({
            placeholder: "Vəzifələr"
        });
      }
    }, 100);

    return () => {
      clearInterval(interval);
      $(".search").off('click');
      $(".region b").off('click');
      $(".all_slc input").off('click');
      $(".all_unslc").off('click');
      $(".pop-bg").off('click');
      $(".region .country").off('click');
      $(".region .selectable .chb").off('click');
      const selectionDisplayElem = document.getElementById("selectionDisplay");
      selectionDisplayElem?.removeEventListener("click", selectionDisplayHandler as EventListener);
      $('#read_more').off('click');
    };
  }, []);

  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';
  const currentPage = parseInt(page, 10);
  const totalPages = Math.ceil(allVacancies.length / 10);

  useEffect(() => {
      setLoading(true);
      fetchVacancies(currentPage).then(data => {
          setVacancies(data);
          setLoading(false);
      });
  }, [currentPage]);

  return (
    <>
      <Head>
        <title>Vakansiyalar | İş elanları</title>
      </Head>
      <div className="clearfix"></div>
      <div id="titlebar" className="gradient">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>Vakansiyalar | İş elanları</h1>
              <nav id="breadcrumbs" className="dark d-none">
                <ul>
                  <li><a href="">Baş səhifə</a></li>
                  <li><a href="/vacancies">Vakansiyalar | İş elanları</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '30px' }}>
                <div className="sidebar-widget" style={{ display: 'flex', justifyContent: 'center', width: '50%', padding: '0 10px' }}>
                </div>
              </div>
            </div>
            <div className="listings-container compact-list-layout margin-top-35 margin-bottom-35">
                {loading ? (
                    <p>Yüklənir...</p>
                ) : (
                    vacancies.map(vacancy => (
                        <Link key={vacancy.id} href={`/vacancies/${vacancy.id}`} className="job-listing with-apply-button">
                            <div className="job-listing-details">
                                <div className="job-listing-company-logo">
                                    <img className="lozad" data-src={vacancy.logo} alt={`${vacancy.company} logo`} src={vacancy.logo} data-loaded="true" />
                                </div>
                                <div className="job-listing-description">
                                    <h3 className="job-listing-title">{vacancy.title}</h3>
                                    <div className="job-listing-footer">
                                    <ul>
                                        <li>
                                            <i className="icon-material-outline-business"></i>{vacancy.company}
                                        </li>
                                        <li>
                                            <i className="icon-material-outline-location-on"></i>{vacancy.location}
                                        </li>
                                        <li><i className="icon-material-outline-access-time"></i>{vacancy.time}</li>
                                    </ul>
                                    </div>
                                </div>
                                <div>
                                    {vacancy.isPremium && <div className="list-apply-button ripple-effect" style={{ background: '#aaf674', color: '#000', marginRight: '5px', textAlign: 'center', fontWeight: 700 }}>Premium</div>}
                                    <span className="list-apply-button ripple-effect">Ətraflı</span>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
            <div className="clearfix"></div>
            <div className="row">
              <div className="col-md-12">
                <div className="pagination-container margin-top-60 margin-bottom-60">
                  <nav className="pagination">
                    <ul>
                        {currentPage > 1 && (
                            <li className="pagination-arrow">
                                <Link href={`/vacancies?page=${currentPage - 1}`} className="ripple-effect">
                                    <i className="icon-material-outline-keyboard-arrow-left"></i>
                                </Link>
                            </li>
                        )}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                            <li key={p}>
                                <Link href={`/vacancies?page=${p}`} className={currentPage === p ? 'current-page ripple-effect' : 'ripple-effect'}>
                                    {p}
                                </Link>
                            </li>
                        ))}
                        {currentPage < totalPages && (
                            <li className="pagination-arrow">
                                <Link href={`/vacancies?page=${currentPage + 1}`} className="ripple-effect">
                                    <i className="icon-material-outline-keyboard-arrow-right"></i>
                                </Link>
                            </li>
                        )}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <form action="/search" method="GET">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="intro-banner-search-form">
                        <div className="intro-search-field with-label">
                          <label htmlFor="intro-keywords" className="field-title ripple-effect">istədiyin işin adını axtarışa ver</label>
                          <input id="intro-keywords" type="text" name="q" placeholder="vakansiyanın adı yaxud açar-söz" autoComplete="off" />
                        </div>
                        <div className="intro-search-button">
                          <button className="button ripple-effect" role="submit">axtar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="row" style={{ marginTop: '10px' }}>
              <div className="col-md-12 " style={{ marginBottom: '50px' }}>
                <div id="content_first" className="content_first"> Saytımızda müxtəlif sahələrə aid vakansiyalar mövcuddur. Hər bir insanın bacarıq və təcrübəsindən asılı olaraq işləyə biləcəyi sahələr fərqlidir. Bu zaman namizədlər özlərinə uyğun iş elanlarına müraciət etməlidirlər. Təhsil, iş təcrübəsi və bacarıqlar namizədlərin iş tapması üçün ən vacib məqamlar sırasındadır. Namizəd yaşadığı yerdən asılı olaraq saytımızda Bakı, Gəncə kimi iş elanlarını axtarıb ona uyğun olan iş vakansiyalarını sıralaya bilərlər. Bundan əlavə olaraq saytımızda işəgötürənlər iş elanları paylaşmaqla özlərinə uyğun işçiləri asanlıqla tapa bilərlər.&nbsp;
                  Vakansiyalara müraciət etmək üçün hansı təhsil və sənədlər tələb olunur?
                  Vakansiyalarda göstərilən təhsil və sənəd tələbləri peşədən asılı olaraq dəyişir. Bəzi peşələr bakalavr və ya magistr dərəcəsi tələb edildiyi halda, bəzi peşələr üçün heç bir təhsil tələb olunmur.&nbsp;
                  Vakansiyalara müraciət edərkən tələb olunan təhsil və sənədlər vakansiyanın özünə, şirkətin xüsusiyyətlərinə və sektorun tələblərinə asılı olaraq dəyişə bilər. Ümumiyyətlə, aşağıdakı sənədlər tələb oluna bilər:&nbsp;
                  Diplom və sertifikatlar: Təhsil dərəcənizi və ixtisaslaşdığınız sahəni sübut edən sənədlər.&nbsp;
                  Referansla bağlı sənədlər: Əvvəlki iş yerlərindən aldığınız referans və təcrübənizi sübut edən digər sənədlər.&nbsp;
                  CV: Təhsil, uğurlarınız və iş təcrübənizi özündə əks etdirən sənəd.&nbsp;
                  Sahəyə uyğun sertifikatlar: Məsələn, 1C operator vakansiyasına müraciət etmisinizsə bu sahəyə aid sertifikat tələb oluna bilər.</div>
                <div className="read_full"><span id="read_more">Ətraflı</span></div>
                <div id="content_all" className="content_all" style={{ display: 'none' }}>
                  <p>Saytımızda müxtəlif sahələrə aid vakansiyalar mövcuddur. Hər bir insanın bacarıq və təcrübəsindən asılı olaraq işləyə biləcəyi sahələr fərqlidir. Bu zaman namizədlər özlərinə uyğun iş elanlarına müraciət etməlidirlər. Təhsil, iş təcrübəsi və bacarıqlar namizədlərin iş tapması üçün ən vacib məqamlar sırasındadır. Namizəd yaşadığı yerdən asılı olaraq saytımızda Bakı, Gəncə kimi iş elanlarını axtarıb ona uyğun olan iş vakansiyalarını sıralaya bilərlər. Bundan əlavə olaraq saytımızda işəgötürənlər iş elanları paylaşmaqla özlərinə uyğun işçiləri asanlıqla tapa bilərlər.&nbsp;</p>
                  <h3>Vakansiyalara müraciət etmək üçün hansı təhsil və sənədlər tələb olunur?</h3>
                  <p>Vakansiyalarda göstərilən təhsil və sənəd tələbləri peşədən asılı olaraq dəyişir. Bəzi peşələr bakalavr və ya magistr dərəcəsi tələb edildiyi halda, bəzi peşələr üçün heç bir təhsil tələb olunmur.&nbsp;</p>
                  <p>Vakansiyalara müraciət edərkən tələb olunan təhsil və sənədlər vakansiyanın özünə, şirkətin xüsusiyyətlərinə və sektorun tələblərinə asılı olaraq dəyişə bilər. Ümumiyyətlə, aşağıdakı sənədlər tələb oluna bilər:&nbsp;</p>
                  <ol>
                    <li><em>Diplom və sertifikatlar:</em> Təhsil dərəcənizi və ixtisaslaşdığınız sahəni sübut edən sənədlər.&nbsp;</li>
                    <li><em>Referansla bağlı sənədlər:</em> Əvvəlki iş yerlərindən aldığınız referans və təcrübənizi sübut edən digər sənədlər.&nbsp;</li>
                    <li><em>CV:</em> Təhsil, uğurlarınız və iş təcrübənizi özündə əks etdirən sənəd.&nbsp;</li>
                    <li><em>Sahəyə uyğun sertifikatlar:</em> Məsələn, 1C operator vakansiyasına müraciət etmisinizsə bu sahəyə aid sertifikat tələb oluna bilər.</li>
                  </ol>
                  <p>Hər vakansiya üçün müraciət edərkən tələb olunan sənədlərin siyahısını mütləq yoxlamaq lazımdır.</p>
                  <h3>İş elanlarına necə müraciət edə bilərsiniz?</h3>
                  <p>Busy.az-da iş elanlarına daxil olub müraciət edə bilərsiniz. Busy.az-ın filtrl’ri sayəsində namizədlər şəhər, rayon, iş tərzi, vəzifə kimi meyarları müəyyən edərək özünə uyğun elanları sıralaya bilər. Daha sonra özünüzə uyğun gördüyünüz elana tıkladıqdan sonra “müraciət et” düyməsini klikləyin, vakansiyadan asılı olaraq mail yaxud telefonla müraciətinizi göndərə bilərsiniz.</p>
                  <p>İş elanlarını oxumaqda və müraciət etməkdə uğurlu olmaq üçün nəzərə almanızı tövsiyə etdiyim bəzi məqamlar:</p>
                  <ul>
                    <li><strong>İşəgötürən şirkət:</strong> Şirkətin adını, reytinqini və oradakı vəziyyəti araşdırmaq mühüm bir addımdır.</li>
                    <li><strong>Vəzifə təsviri:</strong> İşin tamamilə nə tələb etdiyinə diqqətli şəkildə baxın. Bu sizin işə uyğun olub-olmadığınızı aydınlaşdırmağa kömək edər.</li>
                    <li><strong>Tələb olunan bacarıqlar və təcrübə:</strong> Tələb olunan bacarıqlar və iş təcrübəsi sizin bu vəzifə üçün uyğun olub-olmadığınıza qərar verməniz üçün əsas faktorlardan biridir.</li>
                    <li><strong>Maaş və digər faydalar:</strong> İş elanında maaş və digər faydaların təsviri mövcuddursa, buna diqqət edin. Əgər maaş göstərilmirsə, müsahibə zamanı bu məsələni öyrənin.</li>
                    <li><strong>İşin yeri:</strong> İşin yerləşdiyi lokasiyanı nəzərə alın. Siz üçün nə qədər asan çatıla bilər olduğunu yoxlayın.</li>
                    <li><strong>İş qrafiki:</strong> Full-time və ya part-time iş günü, evdən iş, frilans, remote iş, səyahət və ezamiyyət tələb olunması və s. kimi detallara diqqət edin.</li>
                    <li><strong>Müraciət tarixi:</strong> İş elanında son müraciət tarixi göstərilibsə, məhz bu tarixdən əvvəl müraciət edin.</li>
                    <li><strong>Əlaqə məlumatları:</strong> İş elanında göstərilən əlaqə məlumatlarına diqqət edin və müraciət zamanı məhz bu məlumatları istifadə edin.</li>
                  </ul>
                  <h3>İş elanları daha çox hansı bölgələrdə mövcuddur?</h3>
                  <p>İş elanları daha çox inkişaf etmiş və şəhər tipli ərazilərdə vardır. Bakı şəhəri iş elanlarının ən çox paylaşıldığı bölgədir. Sumqayıt və Gəncə kimi inkişaf etmiş şəhərlərdə bir çox sektordan şirkətlər müxtəlif vəzifələr üçün iş elanları dərc edirlər. Kənd təsərrüfatı və ya turizmin inkişaf etdiyi bölgələrdə mövsümi işçilərə ehtiyac vardır.</p>
                  <p><br />
                    &nbsp;</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3" id="filterable">
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '30px' }}>
                <div className="sidebar-widget" style={{ display: 'flex', justifyContent: 'center', width: '50%', padding: '0 10px' }}>
                </div>
              </div>
            </div>
            <form method="GET">
              <div className="sidebar-widget">
                <div className="section-headline margin-top-25 margin-bottom-12">
                  <h5>Kateqoriyalar</h5>
                </div>
                <div id="selectionDisplay"></div>
                <input className="search" type="text" readOnly placeholder="Kateqoriyalar" />
                <div className="pop-up">
                  <div className="pop-bg"></div>
                  <div className="pop form-group address_form_group" id="adJsslot_id">
                    <div className="form-select" id="slot_id">
                      <div className="region ">
                        <label className="chb country">
                          <input type="checkbox" data-text="Müştəri xidmətləri" name="categories[]" value="166" id="slot_id166" data-id="166" />
                          <span>Müştəri xidmətləri</span>
                        </label>
                      </div>
                      <div className="region  sub_items ">
                        <b>
                          <img src="/site/images/arrow.svg" alt="" />
                        </b>
                        <label className="chb country">
                          <input type="checkbox" data-text="Mühasibat, idarəetmə uçotu, maliyyə" name="categories[]" value="3" id="slot_id3" data-id="3" />
                          <span>Mühasibat, idarəetmə uçotu, maliyyə</span>
                        </label>
                        <div className="selectable">
                          <label className="chb">
                            <input type="checkbox" data-text="Mühasib" name="categories[]" value="26" id="slot_id26" data-id="26" />
                            <span>&nbsp;Mühasib</span>
                          </label>
                          <label className="chb">
                            <input type="checkbox" data-text="Audit" name="categories[]" value="27" id="slot_id27" data-id="27" />
                            <span>&nbsp;Audit</span>
                          </label>
                          <label className="chb">
                            <input type="checkbox" data-text="Vergi" name="categories[]" value="28" id="slot_id28" data-id="28" />
                            <span>&nbsp;Vergi</span>
                          </label>
                          <label className="chb">
                            <input type="checkbox" data-text="Xəzinədarlıq" name="categories[]" value="29" id="slot_id29" data-id="29" />
                            <span>&nbsp;Xəzinədarlıq</span>
                          </label>
                          <label className="chb">
                            <input type="checkbox" data-text="Əmək haqqı uçotu" name="categories[]" value="30" id="slot_id30" data-id="30" />
                            <span>&nbsp;Əmək haqqı uçotu</span>
                          </label>
                          <label className="chb">
                            <input type="checkbox" data-text="Maliyyə nəzarəti" name="categories[]" value="31" id="slot_id31" data-id="31" />
                            <span>&nbsp;Maliyyə nəzarəti</span>
                          </label>
                          <label className="chb">
                            <input type="checkbox" data-text="Economist" name="categories[]" value="32" id="slot_id32" data-id="32" />
                            <span>&nbsp;Economist</span>
                          </label>
                          <label className="chb">
                            <input type="checkbox" data-text="Credit Control" name="categories[]" value="33" id="slot_id33" data-id="33" />
                            <span>&nbsp;Credit Control</span>
                          </label>
                          <label className="chb">
                            <input type="checkbox" data-text="Cost Accountant" name="categories[]" value="34" id="slot_id34" data-id="34" />
                            <span>&nbsp;Cost Accountant</span>
                          </label>
                          <label className="chb">
                            <input type="checkbox" data-text="Accounting Management" name="categories[]" value="35" id="slot_id35" data-id="35" />
                            <span>&nbsp;Accounting Management</span>
                          </label>
                          <label className="chb">
                            <input type="checkbox" data-text="Kassir, inkassator" name="categories[]" value="36" id="slot_id36" data-id="36" />
                            <span>&nbsp;Kassir, inkassator</span>
                          </label>
                          <label className="chb">
                            <input type="checkbox" data-text="Katib" name="categories[]" value="44" id="slot_id44" data-id="44" />
                            <span>&nbsp;Katib</span>
                          </label>
                          <label className="chb">
                            <input type="checkbox" data-text="İpoteka" name="categories[]" value="68" id="slot_id68" data-id="68" />
                            <span>&nbsp;İpoteka</span>
                          </label>
                          <label className="chb">
                            <input type="checkbox" data-text="Risklər" name="categories[]" value="70" id="slot_id70" data-id="70" />
                            <span>&nbsp;Risklər</span>
                          </label>
                        </div>
                      </div>
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
              <div className="sidebar-widget custom_select">
                <div className="section-headline margin-top-25 margin-bottom-12">
                  <h5>İxtisaslar</h5>
                </div>
                <select className="select2 select2-hidden-accessible" id="professions" multiple name="professions[]" data-select2-id="professions" tabIndex={-1} aria-hidden="true">
                </select>
              </div>
              <div className="sidebar-widget" id="employment_type_div">
                <div className="section-headline margin-top-25 margin-bottom-12">
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
              <div className="sidebar-widget">
                <div className="section-headline margin-top-25 margin-bottom-12">
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
              <div className="sidebar-widget">
                <div className="section-headline margin-top-25 margin-bottom-12">
                  <h5>İş təcrübəsi (minimum il)</h5>
                </div>
                <select className="selectpicker" name="experiences[]" data-live-search="true" multiple>
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
              <div className="sidebar-widget" id="minimum_salary_div">
                <div className="section-headline margin-top-25 margin-bottom-35">
                  <h5>Minimum maaş</h5>
                </div>
                <input type="number" name="minimum_salary" id="minimum" placeholder="minimum" />
              </div>
              <div className="sidebar-widget" id="maximum_salary_div">
                <div className="section-headline margin-top-25 margin-bottom-35">
                  <h5>Maksimum maaş</h5>
                </div>
                <input type="number" name="maximum_salary" id="maximum" placeholder="maximum" />
              </div>
              <div className="sidebar-widget">
                <input type="submit" value="Göndər" style={{ color: '#ffffff !important' }} />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="margin-top-70"></div>
    </>
  )
}