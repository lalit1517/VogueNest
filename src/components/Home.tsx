

const Home = () => {

  return (
    <div>

        <div className={`animate`}>
          <div className="body">
            <div role="main" className="main">
              <section>
                <div className="overflow-hidden bg-cover bg-[url('/home-main.png')]">
                  <div className="container z-index-1 ">
                    <div className="row justify-content-center justify-content-lg-start pt-5 mt-5">
                      <div className="col-md-10 col-lg-12 text-center text-lg-end pe-lg-4 pt-12 mt-10">
                        <h1 className="section1-part1 text-white font-semibold line-height-4 text-10 mb-2 appear-animation">
                          Transforming Spaces into Timeless Elegance
                          <span className="font-weight-extra-bold custom-highlight-1 ws-nowrap p-1"></span>
                        </h1>
                        <div className="appear-animation">
                          <p className="section1-part2 custom-font-secondary font-weight-light  custom-font-size-1 text-white opacity-[0.8] my-4">
                            Craft Lasting Impressions with Our Unique Spaces
                          </p>
                        </div>
                        <a
                          href="/contact"
                          data-hash
                          data-hash-offset="150"
                          className="btn btn-secondary btn-modern section1-part3 font-weight-bold text-3 px-5 py-3 appear-animation"
                        >
                          Contact us
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="relative w-[110%] right-[6%]">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 1920 576"
                      preserveAspectRatio="xMinYMin"
                    >
                      <path
                        className="w-[200%]"
                        d="M-12,66c13.35,40.03,28.35,72.62,41,97c12.78,24.63,30.56,58.44,62,97c19.57,24,36.66,40.31,49,52
                                c41.02,38.87,77.1,62.82,85,68c53.78,35.23,100.92,51.3,148,67c87.6,29.21,158.49,37.98,201,43c63.9,7.55,112.08,7.78,160,8
                                c16.52,0.08,84.41,0.17,181-8c98.88-8.36,172.43-20.7,233-31c42.88-7.29,141.31-24.85,267-56c127.06-31.5,220.66-61.69,296-86
                                c89.27-28.8,159.58-54.68,174-60c16.6-6.13,30.39-11.34,40-15c0,113.33,0,226.67,0,340c-644.33,0-1288.67,0-1933,0
                                C-9.33,410-10.67,238-12,66z"
                      />
                      <path
                        fill="#FFF"
                        d="M-5,3c1.21,5.32,2.98,13.29,5,23c4.38,21.08,6.71,34.95,8,42c7.08,38.6,19.7,71.54,26,88
                                c8.52,22.26,16.34,38.54,19,44c5.4,11.07,16.38,32.61,33,58c28.88,44.11,57.48,73.41,64,80c6.89,6.97,38.98,38.97,91,72
                                c57.09,36.25,106.11,53.37,143,66c66.98,22.93,119.93,31.44,162,38c81,12.63,143.81,13.53,189,14c62.45,0.65,109.33-2.68,156-6
                                c35.74-2.54,89.63-7.16,155-16c68.17-9.22,117.88-18.83,170-29c110.32-21.52,194.58-42.54,224-50c131.43-33.34,227.73-64.9,286-84
                                c93.88-30.77,155.18-54.57,184-66c6.29-2.49,11.48-4.58,15-6c0,102.67,0,205.33,0,308c-643.33,0-1286.67,0-1930,0C-5,387-5,195-5,3z
                                "
                      />
                    </svg>
                  </div>
                </div>
              </section>

              <div className="container flex md:hidden flex-col gap-16 mt-20">
                <div className="flex scroll-trigger1 items-center justify-between">
                  <div className="flex mobilesection2-part1 flex-col items-center justify-between gap-3 w-1/2">
                    <div>
                      <svg
                        fill="none"
                        height="25"
                        stroke="#212121"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        width="25"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M22 11.07V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="23 3 12 14 9 11" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-transform-none text-center text-gray-700 font-bold mb-0 text-lg ms-xl-2 mt-xl-0">
                        15+ Years of <br /> Experience
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="h-20 w-[2px] bg-gray-400 opacity-75"></div>
                  </div>

                  <div className="mobilesection2-part2 flex flex-col items-center justify-between gap-3 w-1/2">
                    <div>
                      <svg
                        fill="none"
                        height="25"
                        stroke="#212121"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        width="25"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M22 11.07V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="23 3 12 14 9 11" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-transform-none text-center text-gray-700 font-bold mb-0 text-lg ms-xl-2 mt-xl-0">
                        100+ Happy <br /> Customers
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="scroll-trigger11 flex items-center justify-between ">
                  <div className="mobilesection2-part3 flex flex-col items-center justify-between gap-3 w-1/2">
                    <div>
                      <svg
                        fill="none"
                        height="25"
                        stroke="#212121"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        width="25"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M22 11.07V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="23 3 12 14 9 11" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-transform-none text-center text-gray-700 font-bold mb-0 text-lg ms-xl-2 mt-xl-0">
                        50+ Projects <br /> Completed
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="h-20 w-[2px] bg-gray-400 opacity-75"></div>
                  </div>

                  <div className="mobilesection2-part4 flex flex-col items-center justify-between gap-3 w-1/2">
                    <div>
                      <svg
                        fill="none"
                        height="25"
                        stroke="#212121"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        width="25"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M22 11.07V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="23 3 12 14 9 11" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-transform-none text-center text-gray-700 font-bold mb-0 text-lg ms-xl-2 mt-xl-0">
                        10+ Team <br /> Members
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container my-10 pt-6 hidden md:block">
                <div className="scroll-trigger flex items-center justify-between gap-2">
                  <div className="section2-part1 flex items-center justify-center gap-1">
                    <div>
                      <svg
                        fill="none"
                        height="25"
                        stroke="#212121"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        width="25"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M22 11.07V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="23 3 12 14 9 11" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-transform-none text-gray-700 font-bold mb-0 text-xl ms-xl-2 mt-xl-0">
                        15+ Years of Experience
                      </h3>
                    </div>
                  </div>
                  <div className="flex section2-part1 items-center justify-center gap-1">
                    <div>
                      <svg
                        fill="none"
                        height="25"
                        stroke="#212121"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        width="25"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M22 11.07V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="23 3 12 14 9 11" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-transform-none text-gray-700 font-bold mb-0 text-xl ms-xl-2 mt-xl-0">
                        100+ Happy Customers
                      </h3>
                    </div>
                  </div>
                  <div className="flex section2-part2 items-center justify-center gap-1">
                    <div>
                      <svg
                        fill="none"
                        height="25"
                        stroke="#212121"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        width="25"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M22 11.07V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="23 3 12 14 9 11" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-transform-none text-gray-700 font-bold mb-0 text-xl ms-xl-2 mt-xl-0">
                        50+ Projects Completed
                      </h3>
                    </div>
                  </div>
                  <div className="flex section2-part2 items-center justify-center gap-1">
                    <div>
                      <svg
                        fill="none"
                        height="25"
                        stroke="#212121"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        width="25"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M22 11.07V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="23 3 12 14 9 11" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-transform-none text-gray-700 font-bold mb-0 text-xl ms-xl-2 mt-xl-0">
                        10+ Team Members
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              <section
                id="whoweare"
                className="section section-with-shape-divider bg-transparent border-0 m-0"
              >
                <div className="container pvt-container py-16 my-16">
                  <div className="row scroll-trigger4 align-items-center mb-4">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                      <div className="d-flex align-items-center mb-1">
                        <div className="overflow-hidden flex items-center gap-3">
                          <div className="w-12 h-[3px] bg-[#0d6efd] section5-part1 git"></div>
                          <h2 className="text-[#0d6efd] section5-part2 font-semibold text-[1.2rem] mb-0 git2">
                            Welcome to OM Interiors
                          </h2>
                        </div>
                      </div>
                      <h2 className="text-[#text-gray-900] section5-part3 font-semibold text-transform-none line-height-2 text-3xl my-4 appear-animation">
                        Our commitment to detail allows us to deliver beyond
                        your expectations
                      </h2>
                      <p className="custom-font-secondary text-lg section5-part4 font-normal mb-4 appear-animation text-gray-400">
                        OM Interiors is more than a contractor – we are your
                        partners in excellence, dedicated to creating
                        outstanding spaces with meticulous attention to detail.
                        Our commitment ensures that we consistently exceed
                        expectations, delivering the highest standard in turnkey
                        solutions.
                      </p>
                      <div className="section5-part6 scroll-trigger5">
                        <a
                          href="/about"
                          className="btn btn-primary btn-modern font-weight-bold text-3 px-5 py-3 appear-animation"
                        >
                          READ MORE
                        </a>
                      </div>
                    </div>
                    <div className="col-sm-10 col-lg-5 offset-sm-1 ps-sm-5 ps-lg-0">
                      <div className="position-relative">
                        <div>
                          <img
                            src="https://glimageurl.golocall.com/gl-features/737892_keystoneinteriordesign_1676335655.jpeg"
                            className="img-fluid section5-part5 custom-box-shadow-1 appear-animation"
                            alt="Om-Interior/Home Page"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="section section-with-shape-divider border-0 bg-transparent m-0">
                <div className="container pvt-container-2 pb-5">
                  <div className="row justify-content-center scroll-trigger2 pb-2 mt-2 mb-10">
                    <div className="col-lg-9 text-center">
                      <h2 className="text-color-secondary section3-part1 font-bold text-3xl md:text-4xl mb-3 appear-animation text-gray-900">
                        What We Offer
                      </h2>
                      <p className="custom-font-secondary section3-part2 text-xl mb-4 appear-animation text-gray-400">
                        Services we Offer{" "}
                      </p>
                      <p className="mb-0 section3-part3 appear-animation text-gray-400">
                        We believe everyone deserves to be inspired by the
                        spaces they inhabit. OM Interior has been transforming
                        clients’ living and work environments. Based in
                        Gurugram, we are a full-service interior design firm
                        offering a wide range of services to all our clients.
                      </p>
                    </div>
                  </div>
                  <div className="scroll-trigger3 featured-boxes featured-boxes-style-4 custom-featured-boxes-style-1">
                    <div className="row justify-content-center section3-part4">
                      <div className="col-md-4 col-sm-6">
                        <div className="service_box">
                          <div className="service_img">
                            <img src="interior-serve.png" alt="service 1" />
                          </div>
                          <div className="service_details">
                            <a href="/interior-design" className="no-underline">
                              <h2>Interior Design</h2>
                            </a>
                            <p className="h-[120px] sm:h-[280px] md:h-[250px] lg:h-[180px] xl:h-[120px]">
                              Experience bespoke design that blends aesthetics
                              with practicality, expertly crafted by our team to
                              reflect your unique vision
                            </p>
                            <a
                              href="/interior-design"
                              className="btn-yellow no-underline"
                            >
                              LEARN MORE
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-6">
                        <div className="service_box">
                          <div className="service_img">
                            <img src="trunkey.png" alt="service 2" />
                          </div>
                          <div className="service_details">
                            <a
                              href="/turnkey-solutions"
                              className="no-underline"
                            >
                              <h2>Turnkey Solutions </h2>
                            </a>
                            <p className="h-[120px] sm:h-[280px] md:h-[250px] lg:h-[180px] xl:h-[120px]">
                              Entrust us with the full scope of your project,
                              from inception to completion, allowing you to
                              concentrate on your core business activities with
                              peace of mind.
                            </p>
                            <a
                              href="/turnkey-solutions"
                              className="btn-yellow no-underline"
                            >
                              LEARN MORE
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-6">
                        <div className="service_box">
                          <div className="service_img">
                            <img src="construction.png" alt="service 3" />
                          </div>
                          <div className="service_details">
                            <a
                              href="/construction-management"
                              className="no-underline"
                            >
                              <h2>Construction Management</h2>
                            </a>
                            <p className="h-[120px] sm:h-[250px] md:h-[220px] lg:h-[150px] xl:h-[120px]">
                              We offer thorough construction oversight,
                              encompassing initial planning, timeline
                              coordination, risk mitigation, subcontractor
                              oversight, and resource management.
                            </p>
                            <a
                              href="/construction-management"
                              className="btn-yellow no-underline"
                            >
                              LEARN MORE
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="shape-divider shape-divider-bottom">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 1920 102"
                  preserveAspectRatio="xMinYMin"
                >
                  <path
                    fill="#F7F7F7"
                    d="M1895,78c-56.71-6.03-113.75-12.1-167-17c-75.42-6.94-133.81-10.66-171-13c-62.1-3.91-108.85-5.97-155-8
								c-35.96-1.58-78.06-3.42-133-5c-59.81-1.72-103.18-2.23-172-3c-92.17-1.03-154.41-1.01-169-1c-69.05,0.05-115.16,0.67-137,1
								c-43.08,0.65-76.21,1.48-97,2c-28.02,0.7-71.13,1.8-128,4c-16.64,0.64-57.72,2.28-111,5c-26.12,1.33-67.11,3.45-121,7
								c-21.14,1.39-54.21,3.59-96,7c-19.93,1.63-39.22,3.32-47,4c-16.12,1.41-33.55,2.94-55,5c-26.48,2.54-19.07,2.04-77,8
								c-19.39,1.99-36.94,3.77-60.59,7.46V103H1923V81C1916.55,80.3,1906.82,79.26,1895,78z"
                  />
                </svg>
              </div>

              <section className="section border-0 m-0 bg-[#f7f7f7]">
                <div className="container pvt-container2 py-16">
                  <div className="row">
                    <div className="col-lg-8 scroll-trigger6">
                      <div className="d-flex align-items-center mb-1">
                        <div className="overflow-hidden flex items-center gap-3">
                          <div className="w-12 h-[3px] bg-[#0d6efd] section6-part1 git"></div>
                          <h2 className="text-[#0d6efd] font-semibold section6-part2 text-[1.2rem] mb-0 git2">
                            Our Process
                          </h2>
                        </div>
                      </div>
                      <h3 className="text-color-secondary font-bold section6-part3 text-transform-none text-gray-900 text-6 my-4 appear-animation">
                        We have elevated the art of interior design throughout
                        the NCR region.
                      </h3>
                      <p className="mb-4 appear-animation section6-part4 text-gray-400">
                        OM Interior is the premier luxury interior platform in
                        the NCR region. We revolutionize interior design by
                        setting new trends and redefining spaces. With a track
                        record of excellence and innovation, our team delivers
                        cutting-edge technology and customized solutions that
                        cater to every client's needs. Our commitment to
                        exceptional customer service ensures an unparalleled
                        experience, making us a leader in the industry.
                      </p>
                    </div>
                  </div>
                  <div className="feature_service_area text-center scroll-trigger7 section6-part5">
                    <div className="feature_service_box_width">
                      <img src="plan.png" alt="process 1" />
                      <p className="pt-3">Pre-planning Feasibility </p>
                    </div>
                    <div className="feature_service_box_width">
                      <img src="planning.png" alt="process 2" />
                      <p className="pt-3">Planning Submission </p>
                    </div>
                    <div className="feature_service_box_width">
                      <img src="concept.png" alt="process 3" />
                      <p className="pt-3">Concept Design</p>
                    </div>
                    <div className="feature_service_box_width">
                      <img src="site.png" alt="process 4" />
                      <p className="pt-3">Site Management</p>
                    </div>
                    <div className="feature_service_box_width">
                      <img src="construction-2.png" alt="process 5" />
                      <p className="pt-3">Construction &amp; Installation</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      <div className="w-full h-4 bg-[#0d6efd]" />
    </div>
  );
};

export default Home;