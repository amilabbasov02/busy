"use client";
import Link from 'next/link';
import Head from 'next/head';

const CVDetailPage = () => {
    return (
        <>
            <Head>
                <title>Murad Baytev - CV</title>
            </Head>
            <div id="wrapper" style={{ overflowY: 'hidden', paddingTop: '0' }}>
                <div className="clearfix"></div>
                <div className="single-page-header freelancer-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="single-page-header-inner mobile">
                                    <div className="left-side">
                                        <div className="header-image freelancer-avatar">
                                            <img src="/site/images/user-avatar-placeholder.png" style={{ width: '100%', height: '100%' }} alt="" />
                                        </div>
                                        <div className="header-details">
                                            <h3>Murad Baytev</h3>
                                            <p className="header-under-name">HR specialist</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container margin-top-50">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 content-right-offset">
                            <div className="single-page-section">
                                <h3 className="margin-bottom-25">Haqqında</h3>
                                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '30px' }}>
                                    <div className="sidebar-widget" style={{ display: 'flex', justifyContent: 'center', width: '50%', padding: '0 10px' }}>
                                    </div>
                                </div>
                                <p>Ruh yüksəkliyinə sahib, diqqətcil və özünə inamlı biri olaraq, işləyəcəyim vəzifədə bütün qazandığım təcrübələrdən səmərəli şəkildə istifadə edəcəyimə və işləyəcəyimə inanıram.</p>
                            </div>
                            <div className="boxed-list">
                                <div className="boxed-list-headline">
                                    <img src="https://static.tildacdn.com/lib/tildaicon/32666662-3732-4337-a232-376639363532/photostudio_processing.svg" style={{ width: '25px' }} />
                                    <h3 style={{ display: 'inline', marginLeft: '5px' }}>
                                        İş tarixçəsi
                                    </h3>
                                </div>
                                <ul className="boxed-list-ul">
                                    <li>
                                        <div className="boxed-list-item">
                                            <div className="item-content d-flex g-20">
                                                <div className="left-panel  flex-column w-30 margin-top-20">
                                                    <h4 className="text-capitalize ">
                                                        personal assistant
                                                    </h4>
                                                    <div className="item-details flex-column margin-top-10">
                                                        <div className="detail-item">
                                                            <Link href="/company/buta-agro">
                                                                Buta Agro
                                                            </Link>
                                                        </div>
                                                        <div className="detail-item">
                                                            <i className="icon-material-outline-date-range"></i> 09/2023 -  04/2025
                                                        </div>
                                                        <div className="detail-item" style={{ fontSize: '13px' }}>
                                                            Azərbaycan, Sumqayıt
                                                        </div>
                                                    </div>
                                                    <div className="item-details margin-top-10">
                                                        <div className="detail-item"></div>
                                                    </div>
                                                </div>
                                                <div className="item-description  w-68 ">
                                                    <p>Elektron informasiya sistemləri ilə işləmək. (ƏMAS,İSB) İşçilərin məlumatlar bazasının doldurulması; İşçilərin şəxsi işlərinin hazırlanması; İşçilərin davamiyyəti cədvəllərinə nəzarət edilməsi; İşçi bazasının yaradılması və CV-in arxivləşdirilməsi; Əmək kitabçalarının əmrlər əsasında doldurulması və qeydiyyatı; Məzuniyyət qrafiklərinin tərtib edilməsi, işçilərə məzuniyyətlərin verilməsinin uçotunun aparılması, verilən məzuniyyətlərin cədvəl üzrə istifadə edilməsinə nəzarət edilməsi; Əmrlərin yazılması (məzuniyyət, ezamiyyət, əvəzçilik, işə qəbul, işdən çıxma, haqqında və s.) İş vaxtının uçotu cədvəllərini tərtib etmək (növbəli, cəmlənmiş uçot və s.) İşçilərin aylıq tabelinin hazırlanmasına nəzarət edir, ödəniş olunması üçün maliyyə şöbəsinə göndərilməsi. Bütün tutulmalı məbləğləri, avansları (nağd/kart) və əlavə saatları izləmək Əməkhaqqı ilə əlaqədar problemləri və ya sualları araşdırmaq, təhlil etmək və həll etmək</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="boxed-list-item">
                                            <div className="item-content d-flex g-20">
                                                <div className="left-panel  flex-column w-30 margin-top-20">
                                                    <h4 className="text-capitalize ">
                                                        işə qəbul üzrə mütəxəssis
                                                    </h4>
                                                    <div className="item-details flex-column margin-top-10">
                                                        <div className="detail-item">
                                                            <Link href="/company/samuray-firmasi">
                                                                Samuray firması
                                                            </Link>
                                                        </div>
                                                        <div className="detail-item">
                                                            <i className="icon-material-outline-date-range"></i> 04/2025 -  indiyə qədər
                                                        </div>
                                                        <div className="detail-item" style={{ fontSize: '13px' }}>
                                                            Azərbaycan, Sumqayıt
                                                        </div>
                                                    </div>
                                                    <div className="item-details margin-top-10">
                                                        <div className="detail-item"></div>
                                                    </div>
                                                </div>
                                                <div className="item-description  w-68 ">
                                                    <p>Mövcud vakansiyaları təhlil etmək, uyğun elan mətnlərini hazırlamaq və müxtəlif platformalarda yerləşdirmək; Uyğun namizədlərin seçilməsi və ilkin müsahibələri təşkil etmək; Karyera sərgilərində iştirak edərək şirkətin işəgötürən brendini təmsil etmək; Müsahibə nəticələrinə əsasən namizədləri məlumatlandırmaq; İşə qəbul olunan əməkdaşların sənədlərinin düzgünlüyünü yoxlayaraq aidiyyəti struktur bölməsinə təqdim etmək; Yeni işçilərin sınaq müddətini izləmək və hesabatlılığı təmin etmək. Aylıq iş vaxtının uçotu cədvəllərini hazırlamaq; Çoxnövbəli iş qrafiklərinin tərtibi və idarə olunması </p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="boxed-list margin-bottom-60">
                                <div className="boxed-list-headline">
                                    <img src="https://static.tildacdn.com/lib/tildaicon/61336534-3130-4063-a532-373039303038/1ed_teacher.svg" style={{ width: '25px', marginBottom: '2px' }} />
                                    <h3 style={{ display: 'inline', marginLeft: '5px' }}>
                                        Təhsil
                                    </h3>
                                </div>
                                <ul className="boxed-list-ul">
                                    <li>
                                        <div className="boxed-list-item">
                                            <div className="item-content">
                                                <h4></h4>
                                                <div className="item-details margin-top-7">
                                                    <div className="detail-item"><a><i className="icon-material-outline-business"></i> Bakı Biznes Universiteti </a></div>
                                                    <div className="detail-item"><i className="icon-material-outline-date-range"></i> 09/2018 -  07/2022  </div>
                                                </div>
                                                <div className="item-details margin-top-7">
                                                    <div className="detail-item" style={{ fontSize: '13px' }}>
                                                        Azərbaycan, Bakı
                                                    </div>
                                                </div>
                                                <div className="item-description">
                                                    <p></p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="boxed-list margin-bottom-60">
                                <div className="boxed-list-headline">
                                    <h3 style={{ display: 'inline', marginLeft: '5px' }}>
                                        <i className="icon-material-outline-language" style={{ color: '#666' }}></i>
                                        Dil biliyi
                                    </h3>
                                </div>
                                <ul className="boxed-list-ul">
                                    <li style={{ padding: '10px 35px 10px 35px' }}>
                                        <div className="boxed-list-item">
                                            <div className="item-content">
                                                <p>
                                                    İngilis - A2 – Zəif (Elementary)
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 web">
                            <div className="left-side">
                                <div className="header-image freelancer-avatar">
                                    <img src="/site/images/user-avatar-placeholder.png" style={{ width: '100%', height: '100%' }} alt="" />
                                </div>
                            </div>
                            <div className="sidebar-container">
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '30px' }}>
                                        <div className="sidebar-widget" style={{ display: 'flex', justifyContent: 'center', width: '50%', padding: '0 10px' }}>
                                        </div>
                                    </div>
                                </div>
                                <div className="sidebar-widget">
                                    <h3>Şəxsi məlumatları</h3>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>Cins:</th>
                                                <td style={{ paddingLeft: '10px' }}> Kişi </td>
                                            </tr>
                                            <tr>
                                                <th>Evlilik vəziyyəti:</th>
                                                <td style={{ paddingLeft: '10px' }}> Evli deyil </td>
                                            </tr>
                                            <tr>
                                                <th>Uşaqlar:</th>
                                                <td style={{ paddingLeft: '10px' }}> Yoxdur </td>
                                            </tr>
                                            <tr>
                                                <th>Ev telefonu:</th>
                                                <td style={{ paddingLeft: '10px' }}>
                                                    <a href="tel:+994513539851"> +994513539851 </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Mobil telefon:</th>
                                                <td style={{ paddingLeft: '10px' }}>
                                                    <a href="tel:+994513539851" target="_blank"> +994513539851 </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>E-mail:</th>
                                                <td style={{ paddingLeft: '10px' }}>
                                                    <a href="mailto:Baytev.murad@gmail.com" target="_blank"> Baytev.murad@gmail.com </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Maaş gözləntisi:</th>
                                                <td style={{ paddingLeft: '10px' }}> 800.00-  AZN </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="sidebar-widget">
                                    <h3>İşləmək istədiyi ixtisaslar</h3>
                                    <div className="task-tags">
                                        <Link href="/professions/hr-specialist">
                                            <span className="text-capitalize">HR specialist</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="margin-top-70" style={{ marginTop: '70px' }}></div>
            </div>
        </>
    );
};

export default CVDetailPage;