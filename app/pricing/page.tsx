"use client";
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const pricingData = [
    {
        name: 'Busy 25',
        price: '25₼',
        features: [
            '<strong>1 vakansiya</strong>',
            'Vakansiyaya baxış statistikasını görmək',
            '"About company" bölməsinə düzəliş etmək',
            'Şirkətin qalereyasına şəkil əlavə etmək',
            'Dedlayn keçəndən sonra vakansiyanı silmək',
            '<strong>1</strong> günlük "premium" funksiyası'
        ],
        link: '/order/4'
    },
    {
        name: 'Busy 100',
        price: '100 ₼',
        features: [
            '<strong>5 vakansiya</strong>',
            'Vakansiyaya baxış statistikasını görmək',
            '"About company" bölməsinə düzəliş etmək',
            'Şirkətin qalereyasına şəkil əlavə etmək',
            'Dedlayn keçəndən sonra vakansiyanı silmək',
            'Bank köçürmə yolu ödəniş',
            'Video/frame əlavə etmək',
            'Anonim rəyləri silmək',
            '<strong>3</strong> günlük "premium" funksiyası'
        ],
        link: '/order/5'
    },
    {
        name: 'Busy 450',
        price: '450 ₼',
        features: [
            '<strong>30 vakansiya</strong>',
            'Vakansiyaya baxış statistikasını görmək',
            '"About company" bölməsinə düzəliş etmək',
            'Şirkətin qalereyasına şəkil əlavə etmək',
            'Dedlayn keçəndən sonra vakansiyanı silmək',
            'Bank köçürmə yolu ödəniş',
            'Video/frame əlavə etmək',
            'Anonim rəyləri silmək',
            'Sosial mediada paylaşmaq',
            'Xüsusi sosial media kontenti',
            '<strong>7</strong> günlük "premium" funksiyası'
        ],
        link: '/order/6'
    },
    {
        name: 'Enterprise',
        price: 'razılaşma',
        features: [
            '<strong>Limitsiz</strong>',
            'Vakansiyaya baxış statistikasını görmək',
            '"About company" bölməsinə düzəliş etmək',
            'Şirkətin qalereyasına şəkil əlavə etmək',
            'Dedlayn keçəndən sonra vakansiyanı silmək',
            'Bank köçürmə yolu ödəniş',
            'Video/frame əlavə etmək',
            'Anonim rəyləri silmək',
            'Sosial mediada paylaşmaq',
            'Xüsusi sosial media kontenti',
            '<strong>14-30</strong> günlük "premium" funksiyası',
            'Çox şirkəti bir hesabdan idarə etmək',
            'HR-branding üçün məqalələr'
        ],
        link: 'mailto:support@example.com'
    }
];

const PricingPage = () => {
    return (
        <>
            <Head>
                <title>Qiymətlər</title>
            </Head>
            <div id="wrapper" style={{ overflowY: 'hidden' }}>
                <div className="clearfix"></div>
                <div className="margin-top-70"></div>

                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="section-headline centered margin-bottom-15">
                                <h3>Vakansiya yerləşdirmək və tanıtmaq üçün qiymətlər</h3>
                            </div>
                            <p style={{ textAlign: 'center' }}>Şirkətlər, sahibkarlar, rekruterlər üçün Azərbaycanın #1 karyera saytında iş elanlarını irəli çəkmək üçün qiymətlər</p>
                        </div>
                    </div>

                    <div className="row">
                        {pricingData.map((plan, index) => (
                            <div className="col-xl-3 col-md-6" key={index}>
                                <div className="pricing-plan">
                                    <h3>{plan.name}</h3>
                                    <div className="pricing-plan-label"><strong>{plan.price}</strong></div>
                                    <div className="pricing-plan-features">
                                        <ul>
                                            {plan.features.map((feature, i) => (
                                                <li key={i} dangerouslySetInnerHTML={{ __html: feature }}></li>
                                            ))}
                                        </ul>
                                    </div>
                                    <Link href={plan.link} className="button full-width margin-top-20">Sifariş et</Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="row">
                        <div className="col-xl-8 offset-xl-2">
                            <div className="section-headline centered margin-top-60 margin-bottom-35">
                                <h3>— Hansı paketi sifariş edim?</h3>
                            </div>
                            <p>— Firmanızı gələcəkdə böyütmək, brend etmək istəmirsinizsə, sadəcə 1 vakansiya üzrə işçi axtarırsınızsa, gələcəkdə başqa işçilər götürməyəcəksinizsə, o zaman <em>BUSY 25</em> sizə uyğundur.</p>
                            <p>— Kiçik şirkətlər, təhsil kursları, apteklər, mağazalar əsasən <em>Busy 100</em> paketini seçir.</p>
                            <p>— Şirkətiniz orta yaxud böyükdürsə, brend imici sizin üçün çox vacib və axtardığınız işçilərə olan tələbləriniz yüksəkdirsə, o zaman <em>Busy 450</em> paketi sizə əlverişlidir.</p>
                            <p>— İl ərzində 60-dan çox iş vakansiyası qoyan böyük şirkətlər, HR agentliklər, iri dövlət müəssisələri üçün xüsusi razılaşma əsasında <em>Busy Enterprise</em> paketi təklif edirik.</p>
                        </div>
                    </div>
                </div>
                <div className="margin-top-70"></div>
            </div>
        </>
    );
};

export default PricingPage;