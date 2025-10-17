"use client";
import { useEffect } from 'react';
import Head from 'next/head';
import '/public/css/pages/faq.css';

const FaqPage = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).jQuery) {
      const $ = (window as any).jQuery;
      ($('.js-accordion-item') as any).on('click', function(this: any) {
        const parent = $(this);
        const body = parent.find('.js-accordion-body');

        if (parent.hasClass('active')) {
          parent.removeClass('active');
          body.slideUp();
        } else {
          ($('.js-accordion-item.active') as any).find('.js-accordion-body').slideUp();
          ($('.js-accordion-item.active') as any).removeClass('active');
          parent.addClass('active');
          body.slideDown();
        }
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>FAQ</title>
        <link rel="stylesheet" href="/css/pages/faq.css" />
      </Head>

      <div className="single-page-header" style={{ backgroundImage: `url(/images/single-job.jpg)` }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="single-page-header-inner">
                <div className="left-side">
                  <div className="header-details">
                    <h3>FAQ</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container margin-bottom-40">
        <div className="row">
          <div className="col-12">
            <div className="accordion js-accordion">
              {/* Sample FAQ Item */}
              <div className="accordion__item js-accordion-item active">
                <div className="accordion-header js-accordion-header">Sample Question 1?</div>
                <div className="accordion-body js-accordion-body" style={{ display: 'block' }}>
                  <div className="accordion-body__contents">
                    Sample answer text goes here.
                  </div>
                </div>
              </div>
              {/* Sample FAQ Item 2 */}
              <div className="accordion__item js-accordion-item">
                <div className="accordion-header js-accordion-header">Sample Question 2?</div>
                <div className="accordion-body js-accordion-body">
                  <div className="accordion-body__contents">
                    Sample answer text goes here for the second question.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FaqPage;