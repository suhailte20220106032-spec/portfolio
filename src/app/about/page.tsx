// src/app/about/page.tsx
"use client";
import React from 'react';
import Script from 'next/script';

import { useTyped } from '../hooks/useTyped';
import BackToTop from '../components/BackToTop';

const About: React.FC = () => {
  // Add the Typed.js hook
  const typedRef = useTyped([
    "Technology Enthusiast",
    "Learner", 
    "Competitive Programmer"
  ], 90, 50, true);

  return (
    <div>
      <div id="home" className="hero-area position-relative bg-half-120 water" style={{ background: 'url(/img/bg-hero.jpg) center center' }}>
        <div className="bg-overlay bg-overlay-white"></div>
        <div id="counter" className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 text-center">
              <div className="page-next-level">
                <h4 className="title text-black"> Fuad </h4>
                <div className="page-next">
                  <nav aria-label="breadcrumb" className="d-inline-block">
                    <ul className="breadcrumb rounded mb-0 mt-3">
                      <li aria-current="page" className="breadcrumb-item active">
                        <a href="/" className="nuxt-link-active">Home</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <section id="services" className="section pb-0 mb-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="card public-profile border-0 rounded shadow no-margin" style={{ zIndex: 1 }}>
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-lg-3 col-md-4 text-md-start">
                      <div className="about-details key-feature bg-light">
                        <div className="media-body content">
                          <h6 className="title mb-2">Personal Details</h6>
                          <div className="bor-bottom mt-2 mb-3"></div>
                          <p className="text-muted mb-2 font-14">
                            <span className="text-black">Languages:</span> Bangla, English
                          </p>
                          <p className="text-muted mb-2 font-14">
                            <span className="text-black">Nationality:</span> Bangladeshi
                          </p>
                          <p className="text-muted mb-2 font-14">
                            <span className="text-black">University:</span> Ahsanullah University of Science and Technology
                          </p>
                          <p className="text-muted mb-2 font-14">
                            <span className="text-black">Studying:</span> Textile Engineering
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-9 col-md-8">
                      <div className="row align-items-end">
                        <div className="col-md-12 text-md-start mt-4 mt-sm-0">
                          {/* UPDATED: Typed.js section */}
                          <h4 className="heading me-2">
                            I am a <span ref={typedRef} className="text-primary"></span>
                          </h4>
                          <p className="text-light-muted mt-2">World of software has always been a curiosity. But I didn&apos;t sarted learning before my 17s. </p>
                          <p className="text-light-muted mt-2">Am I late??</p>
                          <p className="text-light-muted mt-2">Currently, I&apos;m looking forward to become a PenTester.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <div className="container-title text-center mb-4 pb-2">
                <div className="titles">
                  <h2 className="title text-capitalize mb-4">More about me</h2>
                  <div itemScope itemType='http://schema.org/Person' className='fiverr-seller-widget' style={{ display: 'inline-block' }}>
                    <a itemProp='url' href='https://www.fiverr.com/suhail_mujtabir' rel="nofollow" target="_blank" style={{ display: 'inline-block' }}>
                      <div className='fiverr-seller-content' id='fiverr-seller-widget-content-ebd16f7c-ca41-4a14-a70c-883f950f9cd1' itemProp='contentURL' style={{ display: 'none' }}></div>
                      <div id='fiverr-widget-seller-data' style={{ display: 'none' }}>
                        <div itemProp='name'>suhail_mujtabir</div>
                        <div itemScope itemType='http://schema.org/Organization'><span itemProp='name'>Fiverr</span></div>
                        <div itemProp='jobtitle'>Seller</div>
                        <div itemProp='description'></div>
                      </div>
                    </a>
                  </div>
                  <Script id='fiverr-seller-widget-script-ebd16f7c-ca41-4a14-a70c-883f950f9cd1' src='https://widgets.fiverr.com/api/v1/seller/suhail_mujtabir?widget_id=ebd16f7c-ca41-4a14-a70c-883f950f9cd1' strategy='afterInteractive' />
                  <span></span>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="undefinedmt-4 pt-2">
              <div className="feature-widget text-left rounded">
                <div className="services-texts">
                  <h3 className="title mb-3">Skills</h3>
                  <p className="text-light-muted mb-4">My Skills</p>
                  <a href="/about-me/skills" className="text-primary">Read more</a>
                </div>
              </div>
            </div>
            <div className="undefinedmt-4 pt-2">
              <div className="feature-widget text-left rounded">
                <div className="services-texts">
                  <h3 className="title mb-3">Certifications</h3>
                  <p className="text-light-muted mb-4">My Certifications</p>
                  <a href="/about-me/certifications" className="text-primary">Read more</a>
                </div>
              </div>
            </div>
            <div className="undefinedmt-4 pt-2">
              <div className="feature-widget text-left rounded">
                <div className="services-texts">
                  <h3 className="title mb-3">Timeline</h3>
                  <p className="text-light-muted mb-4">My Lifetime events</p>
                  <a href="/about-me/timeline" className="text-primary">Read more</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Replace old back-to-top with React component */}
      <BackToTop />
    </div>
  );
};

export default About;