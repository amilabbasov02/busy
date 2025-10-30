"use client";
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Typed from 'typed.js';
import CountUp from 'react-countup';
import dynamic from 'next/dynamic';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
    ssr: false,
});
import './about.css';
import '../globals.css';

const AboutPage = () => {
  const el = useRef(null);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['#1 yerli karyera platforması', 'ən böyük məlumat bazası', 'sənin HR dostun'],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: { slidesToShow: 4 }
        },
        {
            breakpoint: 600,
            settings: { slidesToShow: 2 }
        }
    ]
  };

  return (
    <>
      <Head>
        <title>Haqqımızda</title>
      </Head>
      <div id="wrapper" style={{ overflowY: 'hidden' }}>
        <div className="clearfix"></div>

        <section id="home">
          <div className="container flex-wrap">
            <div className="left-panel col-lg-6 col-sm-12">
              <h3 className="head">Biz <span ref={el} className="auto-type"></span></h3>
            </div>
            <div className="right-panel col-lg-6 col-sm-12" style={{ backgroundImage: 'url("https://thumb.tildacdn.com/tild3266-3534-4066-a464-663461396365/-/cover/560x560/center/center/-/format/webp/Untitled_design_7_2.png")', height: '560px' }}></div>
          </div>
        </section>

        <section id="members">
            <div className="container">
                <div className="row">
                    <div data-aos="fade-right" data-aos-duration="20000" className="col-lg-4 col-sm-6 aos-init aos-animate">
                        <div className="img">
                            <img src="https://thumb.tildacdn.com/tild3864-3239-4164-b361-306333636132/-/format/webp/removalai_tmp-64997e.png" alt=""/>
                            <div className="members-bg first"></div>
                        </div>
                        <h3 className="members-name">
                            Aydan
                        </h3>
                    </div>
                    <div data-aos="fade-right" data-aos-duration="500" className="col-lg-4 col-sm-6 aos-init aos-animate">
                        <div className="img">
                            <img src="https://thumb.tildacdn.com/tild3265-3362-4236-b930-623939326564/-/format/webp/removalai_tmp-64997b.png" alt=""/>
                            <div className="members-bg second"></div>
                        </div>
                        <h3 className="members-name">
                            Tural
                        </h3>
                    </div>
                    <div data-aos="fade-right" data-aos-duration="500" className="col-lg-4 col-sm-6 aos-init aos-animate">
                        <div className="img">
                            <img src="https://static.tildacdn.com/tild6234-3338-4634-a434-353730333635/photo_54364059611841.png" alt=""/>
                            <div className="members-bg"></div>
                        </div>
                        <h3 className="members-name">
                            Günel
                        </h3>
                    </div>
                    <div data-aos="fade-left" data-aos-duration="500" className="col-lg-4 col-sm-6 aos-init">
                        <div className="img">
                            <img src="https://thumb.tildacdn.com/tild3763-6162-4834-b435-383665353235/-/resize/451x/-/format/webp/removalai_e2c817d0-3.png" alt=""/>
                            <div className="members-bg"></div>
                        </div>
                        <h3 className="members-name">
                            Emil
                        </h3>
                    </div>
                    <div data-aos="fade-left" data-aos-duration="500" className="col-lg-4 col-sm-6 aos-init">
                        <div className="img">
                            <img src="https://thumb.tildacdn.com/tild6666-3832-4364-a462-383430613061/-/format/webp/removalai_tmp-64997c.png" alt=""/>
                            <div className="members-bg first"></div>
                        </div>
                        <h3 className="members-name">
                            Yusif
                        </h3>
                    </div>
                    <div data-aos="fade-left" data-aos-duration="500" className="col-lg-4 col-sm-6 aos-init">
                        <div className="img">
                            <img src="https://thumb.tildacdn.com/tild3430-3035-4032-b138-636337326164/-/resize/326x/-/format/webp/removalai_89f4cfa8-1.png" alt=""/>
                            <div className="members-bg second"></div>
                        </div>
                        <h3 className="members-name">
                            Aynur
                        </h3>
                    </div>
                </div>
            </div>
        </section>

        <section id="counter">
          <div className="container">
            <h3 className="count-head">Qoy ədədlər danışsın</h3>
            <p className="count-body">Biz digital dünyanın adamlarıyıq, ona görə də statistikanı sevirik.</p>
            <ul id="counter" className="flex-wrap">
              <li className="col-sm-6 col-lg-3 col-xs-12">
                <span className="count percent"><CountUp end={261000} duration={2.5} /></span>
                <p>aylıq ziyarət sayı</p>
              </li>
              <li className="col-sm-6 col-lg-3">
                <span className="count percent"><CountUp end={6759} duration={2.5} /></span>
                <p>işəgötürən</p>
              </li>
              <li className="col-sm-6 col-lg-3">
                <span className="count percent"><CountUp end={119000} duration={2.5} /></span>
                <p>yerləşdirilmiş vakansiya</p>
              </li>
              <li className="col-sm-6 col-lg-3">
                <span className="count percent"><CountUp end={205000} duration={2.5} /></span>
                <p>Google-dan bizi axtaran ziyarətçi</p>
              </li>
            </ul>
          </div>
        </section>

        <section id="reasons">
            <div className="container">
                <h3 className="count-head">
                    Bizi seçmək üçün 6 səbəb
                </h3>
                <div className="row">
                    <div data-aos="fade-right" data-aos-duration="500" className="reason col-lg-4 col-sm-6 aos-init aos-animate">
                        <h4 className="res-head">
                            Məlumat bazası böyükdür
                        </h4>
                        <p className="res-body">
                            On minlərlə iş elanları, şirkətlər haqda məlumatlar, icmallar, ixtisaslar, bölgələr və s.
                        </p>
                        <div className="res-bg">1</div>
                    </div>
                    <div data-aos="fade-right" data-aos-duration="500" className="reason col-lg-4 col-sm-6 aos-init aos-animate">
                        <h4 className="res-head">
                        Saytın istifadəsi rahatdır
                        </h4>
                        <p className="res-body">
                        Mobil cihazlardan rahat girmək, funksiyalardan asanlıqla istifadə etmək olur
                     </p>
                        <div className="res-bg">2</div>
                    </div>
                    <div data-aos="fade-right" data-aos-duration="500" className="reason col-lg-4 col-sm-6 aos-init aos-animate">
                        <h4 className="res-head">
                        Unikal Teleqram bot
                        </h4>
                        <p className="res-body">
                        Arzuladığınız iş telegramınıza gələn bildirişlə sizi tapır. İş özü telefonunuza gəlir:-)
                        </p>
                        <div className="res-bg">3</div>
                    </div>
                    <div data-aos="fade-left" data-aos-duration="500" className="reason col-lg-4 col-sm-6 aos-init">
                        <h4 className="res-head">
                        Real effekt var
                        </h4>
                        <p className="res-body">
                        İş tapmaq yaxud peşəkarı işə götürmək daha asandır.
                        </p>
                        <div className="res-bg">4</div>
                    </div>
                    <div data-aos="fade-left" data-aos-duration="500" className="reason col-lg-4 col-sm-6 aos-init">
                        <h4 className="res-head">
                        Dijital transformasiya
                        </h4>
                        <p className="res-body">
                        Biz sadə prosesləri rəqəmsallaşdırırıq, elə ona görə də sürətliyik. <br/>
                        Bu səbəbdən Azərbaycanda digər iş saytlarını tez bir zamanda ötüb keçmişik:-)
                        </p>
                        <div className="res-bg">5</div>
                    </div>
                    <div data-aos="fade-left" data-aos-duration="500" className="reason col-lg-4 col-sm-6 aos-init">
                        <h4 className="res-head">
                        Biz həm də məqalələr yazırıq
                        </h4>
                        <p className="res-body">
                        Busy.az-da yalnız iş elanları deyil, həm də karyera üçün biri-birindən maraqlı məqalələr, tövsiyələr, bloq yazıları qoyulur.
                        </p>
                        <div className="res-bg">6</div>
                    </div>
                </div>
            </div>
        </section>

        <section id="slider">
            <div data-aos="fade-up" data-aos-duration="500" className="slider aos-init aos-animate">
                <div className="slider-main item flex-wrap">
                    <div className="col-sm-5">
                        <img src="https://thumb.tildacdn.com/tild6139-3263-4638-b532-633165643238/-/cover/600x720/center/center/-/format/webp/photo_54296290697266.jpg" alt=""/>
                    </div>
                    <div className="col-sm-6 slider-body">
                        <p className="slider-text">
                            Missiyamız — şirkətlərin öz imici, HR brendinqi üzərində işləməsi, mütəxəssislərin isə uğurlu karyera qurması, işaxtarma və işəgötürmə proseslərinin effektivliyini artırmaqdır.
                        </p>
                        <h4 className="slider-head">
                            Tural Kərimov
                        </h4>
                        <p className="work-type">
                            Saytın yaradıcısı
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section id="partners">
            <div data-aos="fade-down" data-aos-duration="500" className="container aos-init aos-animate">
                <h3 className="count-head">
                    <span>Busy</span> ilə vaxtlarına qənaət edirlər
                </h3>
                <OwlCarousel className="owl-theme partners-slider" loop margin={10} nav autoplay={true} autoplayTimeout={3000} autoplayHoverPause={true} items={6}>
                    <div className="item"><img src="https://thumb.tildacdn.com/tild3163-6637-4262-b638-336239353234/-/resize/320x/-/format/webp/pashapay_logo_origin.png" alt=""/></div>
                    <div className="item"><img src="https://thumb.tildacdn.com/tild6363-3933-4539-b262-303734353763/-/resize/320x/-/format/webp/kontakt-homelogo.PNG" alt=""/></div>
                    <div className="item"><img src="https://thumb.tildacdn.com/tild6333-6164-4261-a133-316139623639/-/resize/320x/-/format/webp/smartbee_logo.PNG" alt=""/></div>
                    <div className="item"><img src="https://thumb.tildacdn.com/tild3235-3766-4066-a332-613665656139/-/resize/320x/-/format/webp/vadiaz-logo.png" alt=""/></div>
                    <div className="item"><img src="https://thumb.tildacdn.com/tild6531-3762-4032-b764-313964373738/-/resize/320x/-/format/webp/Bank_Respublikasvg.png" alt=""/></div>
                    <div className="item"><img src="https://thumb.tildacdn.com/tild3338-6136-4365-a464-376131616263/-/resize/320x/-/format/webp/mediaforce-logo.png" alt=""/></div>
                    <div className="item"><img src="https://thumb.tildacdn.com/tild6165-3065-4635-b338-616463653537/-/resize/320x/-/format/webp/20170824134052EMBAWO.png" alt=""/></div>
                    <div className="item"><img src="https://static.tildacdn.com/tild3630-3935-4730-b936-303762663932/defacto-logo.svg" alt=""/></div>
                    <div className="item"><img src="https://thumb.tildacdn.com/tild3466-3439-4764-a530-326634386632/-/resize/320x/-/format/webp/estetik-lab-logo.PNG" alt=""/></div>
                    <div className="item"><img src="https://thumb.tildacdn.com/tild6639-6532-4139-b466-353333353732/-/resize/320x/-/format/webp/noroot.png" alt=""/></div>
                    <div className="item"><img src="https://thumb.tildacdn.com/tild3636-3933-4238-a434-616134336436/-/resize/320x/-/format/webp/gulfstream-distribut.PNG" alt=""/></div>
                    <div className="item"><img src="https://thumb.tildacdn.com/tild6433-6230-4237-a264-396239643037/-/format/webp/carat-logo-large.png" alt=""/></div>
                    <div className="item"><img src="https://thumb.tildacdn.com/tild3636-3665-4161-a439-303433366533/-/resize/320x/-/format/webp/noroot.jpg" alt=""/></div>
                </OwlCarousel>
            </div>
        </section>

        <section id="form">
            <div className="container">
                <div className="row">

                    <div className="col-lg-6">
                        <h3 className="form-head">
                            Partnyorluğa həmişə açığıq
                        </h3>
                        <p className="form-body">
                            Gəlin əməkdaşlıq edək
                        </p>
                    </div>
                    <div className="col-lg-6 d-flex justify-content-end">
                        <form action="" method="post">
                            <h4 className="head-text">
                                Bizə hər hansı əməkdaşlıq təklifiniz varsa, çəkinməyin
                            </h4>
                            <p className="body-text">
                                Aşağıdakı formanı doldurun, sizə 24 saat ərzində geri zəng edəcəyik.
                            </p>
                            <input type="text" className="name-input" placeholder="Ad Soyad" />
                            <input type="email" className="email-input" placeholder="Email" />
                            <PhoneInput
                              country={'az'}
                              value={phone}
                              onChange={setPhone}
                            />
                            <button type="submit">
                                Göndər
                            </button>
                            <p>
                                Peşəkarlar ilə işləməyə <strong><span data-redactor-tag="span" style={{color: "rgb(247, 207, 40)"}}>HƏ</span></strong> de
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;