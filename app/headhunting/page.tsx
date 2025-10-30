"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const HeadhuntingPage = () => {
    const [phone, setPhone] = useState('');
    return (
        <div className={styles.pageContainer}>
            {/* Block 1 */}
            <div className={styles.sectionContainer}>
                <h2 className={`${styles.sectionTitle} ${styles.t853_title}`}>Peşəkar axtarışında "sağ əliniz" olmağa hazırıq</h2>
                <p className={`${styles.sectionDescription} ${styles.t853_description}`}>
                    Şirkətlərə "çətin" namizədləri tapmaqda kömək edirik.
                </p>
            </div>

            <div className={`${styles.sectionContainer} ${styles.t853_cardContainer}`}>
                {/* Card 1 */}
                <div className={styles.t853_card}>
                    <div className={styles.t853_cardContent}>
                        <div className={styles.t853_imgWrapper}>
                            <div
                                className={styles.t853_bgImg}
                                style={{ backgroundImage: "url('https://static.tildacdn.one/tild6463-6136-4662-b032-353665643162/pexels-andrea-piacqu.png')" }}
                            ></div>
                        </div>
                        <div className={styles.t853_textWrapper}>
                            <h3 className={styles.t853_cardTitle}>
                                C-level və <br />top menecerlərin axtarışı
                            </h3>
                            <p className={styles.t853_cardDescription}>
                                Məhz sizə uyğun şirkət direktorları, CTO, CFO, CHRO, CPO, departament rəhbərləri, marketinq, maliyyə, informasiya texnologiyaları, insan resursları, satış (sales), satınalma və s. şöbələrinin müdirlərinin tapılmasını bizə həvalə edə bilərsiniz.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className={styles.t853_card}>
                    <div className={styles.t853_cardContent}>
                        <div className={styles.t853_imgWrapper}>
                            <div
                                className={styles.t853_bgImg}
                                style={{ backgroundImage: "url('https://static.tildacdn.one/tild6564-6234-4164-b632-386536336233/AdobeStock_167781326.jpeg')" }}
                            ></div>
                        </div>
                        <div className={styles.t853_textWrapper}>
                            <h3 className={styles.t853_cardTitle}>
                                Rəqib şirkətlərdən peşəkarların işə cəlbi
                            </h3>
                            <p className={styles.t853_cardDescription}>
                                Başqa şirkətdən mütəxəssisləri cəlb etmək çox vaxt daxili qaydalara görə mümkün olmur. Belə hallarda konfidensiallığın qorunmasını təmin etmək üçün bizə müraciət edə bilərsiniz.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card 3 */}
                <div className={styles.t853_card}>
                    <div className={styles.t853_cardContent}>
                        <div className={styles.t853_imgWrapper}>
                            <div
                                className={styles.t853_bgImg}
                                style={{ backgroundImage: "url('https://static.tildacdn.one/tild3236-6232-4936-a431-663165333063/pexels-cottonbro-stu.jpg')" }}
                            ></div>
                        </div>
                        <div className={styles.t853_textWrapper}>
                            <h3 className={styles.t853_cardTitle}>
                                Nadir və çətinliklə tapılan mütəxəssislərin seçimi
                            </h3>
                            <p className={styles.t853_cardDescription}>
                                Bazarda yeni yaranan pozisiyalar, çox dar sahədə işləyən mühəndislər, spesifik sahə peşəkarlarının axtarışlarında sizə yardımçı olarıq.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Block 2 */}
            <div className={styles.t858_wrapper}>
                <div className={styles.sectionContainer}>
                    <h2 className={`${styles.sectionTitle} ${styles.t858_title}`}>İşlərimizə nümunə</h2>
                    <div className={styles.t858_cardContainer}>
                        {/* Card 1 */}
                        <div className={styles.t858_card}>
                            <div className={styles.t858_innerCol}>
                                <div className={styles.t858_imgWrapper}>
                                    <Image className={styles.t858_img} src="https://static.tildacdn.one/lib/tildaicon/65393165-3166-4133-a363-646438616466/Tilda_Icons_32_profession_doc.svg" alt="" width={60} height={60} />
                                </div>
                                <h3 className={styles.t858_cardTitle}>Klinikaya direktor</h3>
                                <p className={styles.t858_cardDescription}>
                                    Yerli xəstəxanalarda "qlavvraç" işləmiş həkimlərdən fərqli olaraq, Qərb təhsili görmüş, müasir hospital management standartlarını bilən klinika menecerini tapmaq<br />
                                    <strong>Müddət: </strong>26 gün
                                </p>
                            </div>
                        </div>
                        {/* Card 2 */}
                        <div className={styles.t858_card}>
                            <div className={styles.t858_innerCol}>
                                <div className={styles.t858_imgWrapper}>
                                    <Image className={styles.t858_img} src="https://static.tildacdn.one/lib/tildaicon/63666639-6537-4635-a362-393836313731/Tilda_Icons_32_profession_itman.svg" alt="" width={60} height={60} />
                                </div>
                                <h3 className={styles.t858_cardTitle}>Zend PHP developer</h3>
                                <p className={styles.t858_cardDescription}>
                                    Rus dilini yaxşı bilən, sadə framework-lər üzərində deyil, məhz Zend üzərində təcrübəsi olan təcrübəli back-end developeri e-kommersiya startapına tapmaq<br />
                                    <strong>Müddət:</strong> 42 gün.
                                </p>
                            </div>
                        </div>
                        {/* Card 3 */}
                        <div className={styles.t858_card}>
                            <div className={styles.t858_innerCol}>
                                <div className={styles.t858_imgWrapper}>
                                    <Image className={styles.t858_img} src="https://static.tildacdn.one/lib/tildaicon/31383063-3636-4465-b765-623939643934/design.svg" alt="" width={60} height={60} />
                                </div>
                                <h3 className={styles.t858_cardTitle}>Product designer</h3>
                                <p className={styles.t858_cardDescription}>
                                    6 aylıq layihə üçün, həm Figma-da işləyən, həm də veb-analitika alətləri (Amplitude, AppsFlyer, Google Analytics və s.) ilə işləmək təcrübəsi olan product designer tapmaq<br />
                                    <strong>Müddət: </strong>22 gün
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Block 3 */}
            <div className={styles.t037_wrapper}>
                <div className={`${styles.sectionContainer} ${styles.t037_container}`}>
                    <div className={styles.t037_col_4}>
                        <div className={styles.t037_title}>
                            Diqqət edin!<br />1 səhv namizədi işə götürsəniz, <br />
                        </div>
                    </div>
                    <div className={styles.t037_col_8}>
                        <div className={styles.t037_text}>
                            <strong>azı ≈ 8000 AZN yaxud ≈ 90 gün itirirsiniz.</strong><br />
                            Götürdüyünüz işçinin məvacibi, HR şöbəsində işləyənlərin maaşı, vakansiyanın yerləşdirilməsi və müsahiblərə sərf olunan vaxt, digər şöbədə işləyənlərin (İT, təhlükəsizlik və s.) zamanı, vergilər, səhv verilmiş qərarlar....<br /><br />
                            Bu risklərdən uzaq olmaq üçün məhz bizim hedhantinq xidmətimizdən istifadə edin.
                        </div>
                    </div>
                </div>
            </div>

            {/* Block 4 */}
            <div className={styles.t492_wrapper}>
                <div className={styles.t492_textBlock}>
                    <div className={styles.t492_textWrapper}>
                        <div className={styles.t492_title}>Komandamız</div>
                        <div className={styles.t492_description}>
                            <br />Bizim <br />
                            həm insan resursları (HR transformation, HRtech, sourcing, Employer Value Proposition), <br />
                            həm də marketinq, İT, layihələrin idarə olunması sahəsində təcrübəmiz var.<br /><br />
                            Həm yerli Azərbaycan reallıqlarını başa düşür, həm də qlobal təcrübələrdən xəbərdarıq.
                        </div>
                        <div className={styles.t492_btnContainer}>
                            <a href="https://humanique.az/" target="_blank" rel="noopener noreferrer" className={styles.t492_btn}>
                                Bizi yaxından tanı
                            </a>
                        </div>
                    </div>
                </div>
                <div
                    className={styles.t492_imageBlock}
                    style={{ backgroundImage: "url('https://static.tildacdn.one/tild6264-6533-4237-b062-303262336566/New_Project_8.png')" }}
                ></div>
            </div>

            {/* Block 5 */}
            <div className={styles.t030_wrapper}>
                <div className={styles.sectionContainer}>
                    <h2 className={`${styles.sectionTitle} ${styles.t030_title}`}>Ekspertizamız</h2>
                </div>
            </div>
            <div className={styles.t822_wrapper}>
                <ul className={`${styles.sectionContainer} ${styles.t822_container}`}>
                    <li className={styles.t822_col}>
                        <div className={styles.t822_colWrapper}>
                            <div className={styles.t822_title}>Funksiyalar üzrə</div>
                            <div className={styles.t822_text}>
                                <ul>
                                    <li>Ümumi rəhbərlik</li>
                                    <li>Marketinq, satış, PR</li>
                                    <li>Maliyyə menecmenti və mühasibatlıq</li>
                                    <li>IT</li>
                                    <li>HR, biznesin idarə olunması</li>
                                    <li>Satınalma, logistika, nəqliyyat</li>
                                    <li>İstehsal və mühəndislik</li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.t_divider}></div>
                    </li>
                    <li className={styles.t822_col}>
                        <div className={styles.t822_colWrapper}>
                            <div className={styles.t822_title}>Sahə üzrə</div>
                            <div className={styles.t822_text}>
                                <ul>
                                    <li>IT və Telekom</li>
                                    <li>Sənaye və avadanlıq</li>
                                    <li>Tikinti və daşınmaz əmlak</li>
                                    <li>Neft-qaz və metallurgiya</li>
                                    <li>Bank və maliyyə xidmətləri</li>
                                    <li>Səhiyyə</li>
                                    <li>Hasilat sənayesi</li>
                                    <li>Konsaltinq</li>
                                    <li>Pərakəndə satış (retail)</li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.t_divider}></div>
                    </li>
                    <li className={styles.t822_col}>
                        <div className={styles.t822_colWrapper}>
                            <div className={styles.t822_title}>Regional</div>
                            <div className={styles.t822_text}>
                                <ul>
                                    <li>Azərbaycan</li>
                                    <li>Rusiya</li>
                                    <li>MDB ölkələri</li>
                                    <li>Türkiyə</li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            {/* Block 6: Prices */}
            <div className={styles.t1067_wrapper}>
                <div className={styles.sectionContainer}>
                    <h2 className={`${styles.sectionTitle} ${styles.t1067_title}`}>Qiymətlər</h2>
                    <p className={`${styles.sectionDescription} ${styles.t1067_description}`}>
                        Biz namizəddən heç bir ödəniş almırıq.<br />
                        Hedhantinq prosesini ölkənin qabaqcıl HR-agentliyi olan <strong><a href="https://humanique.az/" target="_blank" rel="noopener noreferrer">HUMANİQUE</a></strong> konsultasiya şirkəti aparır.
                    </p>
                </div>
                <div className={`${styles.sectionContainer} ${styles.t1067_cardContainer}`}>
                    {/* Card 1 */}
                    <div className={styles.t1067_card}>
                        <div className={styles.t1067_content}>
                            <div>
                                <div className={styles.t1067_price}>İşçinin illik maaşının 10%-i</div>
                                <p className={styles.t1067_cardDescription}>işçi rəsmiləşdiriləndən sonra 10% qonorar haqqı ödənilir.</p>
                            </div>
                            <a href="#rec621678411" className={styles.t1067_btn}>
                                <span>Sifariş et</span>
                            </a>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className={styles.t1067_card}>
                        <div className={styles.t1067_content}>
                            <div>
                                <div className={styles.t1067_price}>İşçinin illik maaşının 15%-i</div>
                                <p className={styles.t1067_cardDescription}>7.5% işə götürüləndə, qalan 7.5% isə işçi sınaq müddətini keçəndən sonra ödənilir.</p>
                            </div>
                            <a href="#rec621678411" className={styles.t1067_btn}>
                                <span>Sifariş et</span>
                            </a>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className={styles.t1067_card}>
                        <div className={styles.t1067_content}>
                            <div>
                                <div className={styles.t1067_price}>Razılaşma əsasında</div>
                                <p className={styles.t1067_cardDescription}>Vakansiya sayı, işin həcmi, mürəkkəbliyindən asılı olaraq fərqli özəl modellə də işləyirik</p>
                            </div>
                            <a href="#rec621678411" className={styles.t1067_btn}>
                                <span>Sifariş et</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Block 7: Process */}
            <div className={styles.t563_wrapper}>
                <div className={styles.sectionContainer}>
                    <h2 className={`${styles.sectionTitle} ${styles.t563_title}`}>Standart iş prosedurumuz</h2>
                </div>
                <div className={`${styles.sectionContainer} ${styles.t563_container}`}>
                    {/* Step 1 */}
                    <div className={styles.t563_col}>
                        <div className={styles.t563_numberWrapper}>
                            <div className={styles.t563_number}>
                                <div className={styles.t563_digit}>1</div>
                            </div>
                        </div>
                        <div className={styles.t563_textWrapper}>
                            <div className={styles.t563_stepTitle}>Brifinq</div>
                            <p className={styles.t563_stepDescription}>İşlə tanış oluruq, tələbləri müəyyənləşdirik, planlama edirik</p>
                        </div>
                    </div>
                    {/* Step 2 */}
                    <div className={styles.t563_col}>
                        <div className={styles.t563_numberWrapper}>
                            <div className={styles.t563_number}>
                                <div className={styles.t563_digit}>2</div>
                            </div>
                        </div>
                        <div className={styles.t563_textWrapper}>
                            <div className={styles.t563_stepTitle}>Rekrutinq</div>
                            <p className={styles.t563_stepDescription}>Müvafiq namizədlərlə intervyular edirik, ən yaxşı namizədi müştəriylə birgə tapırıq</p>
                        </div>
                    </div>
                    {/* Step 3 */}
                    <div className={styles.t563_col}>
                        <div className={styles.t563_numberWrapper}>
                            <div className={styles.t563_number}>
                                <div className={styles.t563_digit}>3</div>
                            </div>
                        </div>
                        <div className={styles.t563_textWrapper}>
                            <div className={styles.t563_stepTitle}>On-boarding</div>
                            <p className={styles.t563_stepDescription}>Sifarişçi şirkət qədər namizəd də bizim üçün önəmlidir. Onun şirkətə normal adaptasiyası üçün yaxından iştirak edirik.</p>
                        </div>
                    </div>
                    {/* Step 4 */}
                    <div className={styles.t563_col}>
                        <div className={styles.t563_numberWrapper}>
                            <div className={styles.t563_number}>
                                <div className={styles.t563_digit}>4</div>
                            </div>
                        </div>
                        <div className={styles.t563_textWrapper}>
                            <div className={styles.t563_stepTitle}>Mükafatlandırma</div>
                            <p className={styles.t563_stepDescription}>Namizəd işə götürüləndən yaxud sınaq müddətini keçəndən sonra qonorarımızı alırıq.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Block 8: Contact Form */}
            <div className={styles.t704_wrapper}>
                <div className={styles.sectionContainer}>
                    <div className={styles.t704_textWrapper}>
                        <h2 className={`${styles.sectionTitle} ${styles.t704_title}`}>Headhunt işini bizə həvalə edin</h2>
                        <p className={`${styles.sectionDescription} ${styles.t704_description}`}>
                            Hər hansı sualınız olarsa, <a href="mailto:hello@humanique.az">hello@humanique.az</a> yazın, yaxud da ki, aşağıdakı formaya e-mail və telefonunuzu qeyd edin, biz uzağı 24 saat ərzində sizə geri dönəcəyik.
                        </p>
                    </div>
                    <form className={styles.t704_form}>
                        <div className={styles.t704_inputsWrapper}>
                            <input type="email" name="Email" placeholder="Email" className={styles.t704_input} />
                            <PhoneInput
                                country={'az'}
                                value={phone}
                                onChange={setPhone}
                            />
                        </div>
                        <button type="submit" className={styles.t704_submitButton}>Göndər</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HeadhuntingPage;
