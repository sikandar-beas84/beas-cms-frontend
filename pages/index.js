import React from 'react'
import Link from 'next/link'
import Container from 'react-bootstrap/Container';
import { Col, Row } from "react-bootstrap";
import BannerSlider from "./component/BannerSlider";
import BannerCarousal from "./component/BannerCarousal";
import ScrollText from "./component/ScrollText";
import VerticalTabs from "./component/VerticalTab";
import { ArrowUpRight } from "react-feather";
import Globe from "./component/Globe";
import { motion, useScroll, useTransform } from 'framer-motion';
import LogoZoom from "./component/LogoZoom";
import { HealthIcon } from "./SVGIcons";
import Nav from 'react-bootstrap/Nav';
import HomeService from "./services/Home";
import { env } from './constants/common';

import SEO from '../components/SEO';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Home({homeData}) {
  const router = useRouter();
    if (router.isFallback) {
      return <div>Loading...</div>;
    }

  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 500], [1, 1.5]);

  const aboutustext = homeData?.aboutus?.description;
  const aboutussentences = aboutustext?.match(/[^.!?]+[.!?]+/g) || [];
  const aboutuspreviewText = aboutussentences.slice(0, 3).join(' ').trim();
  const home_image = homeData?.menus?.[0]?.image;
  return (
    <>
      <SEO
        title={homeData?.menus?.[0]?.name || 'Home | Beas Consultancy & Services Pvt. Ltd.'}
        description={aboutuspreviewText || "Learn about our 25+ years of IT consulting expertise, client stories, and services."}
        keywords="IT Consulting, Software Development, Digital Transformation, Business Solutions, Technology Partners, Beas Consultancy"
        image={
          home_image 
            ? `${env.BACKEND_BASE_URL}${home_image}`
            : `${env.BACKEND_BASE_URL}/default-image.jpg`
        }
        url={`${env.BACKEND_BASE_URL}${homeData?.menus?.[0]?.slug || 'home'}`}
        author="Beas Consultancy & Services Pvt. Ltd."
      />
      <main>
        <section>

          <Container fluid className="mtt-100">
            <Row>
              <Col className="px-0">
                <BannerSlider bannerSlide={homeData?.banners} />
              </Col>
            </Row>
          </Container>
          <Container fluid>
            <Row>
              <Col className="px-0">
                <div className="working-area">
                  <div className="scroll-animation ">
                    <div className="scroll-slide-track">
                      <ul>
                        { homeData?.services?.children?.map((item, index)=>(
                        <li key={index}>
                          <span>{item.name}<span className="star">* </span></span>
                        </li>
                        )) }
                      </ul>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="pad-top-50 section-bg">
          <Container>
            <Row>
              <Col xs={12} lg={6}>
                <div className="aboutImg">
                  <Image width={450} height={380} src={`${env.BACKEND_BASE_URL}assets/img/menu-content/${homeData?.aboutus?.menu_contents.image}`} alt="image" />
                  <Image width={250} height={180} src={`${env.BACKEND_BASE_URL}assets/img/menu-content/${homeData?.aboutus?.menu_contents.icon}`} alt="image" />
                  <div className="experience-year">
                    <div className="experience-year__icon">
                      <Image width={600} height={100} src="/assets/images/trophy.png" alt="image" />
                    </div>
                    <div className="experience-year__content">
                      <h6 className="circle rotateText">
                        <span style={{ transform: 'rotate(0deg)' }}>Y</span>
                        <span style={{ transform: 'rotate(17deg)' }}>e</span>
                        <span style={{ transform: 'rotate(34deg)' }}>a</span>
                        <span style={{ transform: 'rotate(51deg)' }}>r</span>
                        <span style={{ transform: 'rotate(68deg)' }}>s</span>
                        <span style={{ transform: 'rotate(85deg)' }}>O</span>
                        <span style={{ transform: 'rotate(102deg)' }}>f</span>
                        <span style={{ transform: 'rotate(119deg)' }}>-</span>
                        <span style={{ transform: 'rotate(136deg)' }}>E</span>
                        <span style={{ transform: 'rotate(153deg)' }}>x</span>
                        <span style={{ transform: 'rotate(170deg)' }}>p</span>
                        <span style={{ transform: 'rotate(187deg)' }}>e</span>
                        <span style={{ transform: 'rotate(204deg)' }}>r</span>
                        <span style={{ transform: 'rotate(221deg)' }}>i</span>
                        <span style={{ transform: 'rotate(238deg)' }}>e</span>
                        <span style={{ transform: 'rotate(255deg)' }}>n</span>
                        <span style={{ transform: 'rotate(272deg)' }}>c</span>
                        <span style={{ transform: 'rotate(289deg)' }}>e</span>
                        <span style={{ transform: 'rotate(306deg)' }}>2</span>
                        <span style={{ transform: 'rotate(323deg)' }}>5</span>
                        <span style={{ transform: 'rotate(340deg)' }}>-</span>
                      </h6>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={12} lg={6}>
                <div className="aboutTxt">
                
                  <p className="sub-title">{homeData?.aboutus?.name}</p>
                  <p>{homeData?.aboutus?.menu_contents.title}</p>
                  <p className="gry-txt">
                  {aboutuspreviewText}
                  </p>
                  <Link href="/about">
                    <p style={{ cursor: "pointer" }}>
                      Learn More <ArrowUpRight />
                    </p>
                  </Link>
                  <ul>
                    <li><span>{homeData?.totalclients}+</span><span className="ttxt"> Clients</span></li>
                    <li><span>{homeData?.totalprojects}+</span><span className="ttxt"> Projects</span></li>
                    <li><span>{homeData?.totalexperts}+</span> <span className="ttxt">Experts</span></li>
                  </ul>

                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="service-bg blue-bg-curve mt-5">
          <Container>
            <Row className="justify-content-start">
              <Col xs={12} lg={7}>
              <div style={{color:'white'}} dangerouslySetInnerHTML={{ __html: homeData?.services?.description }} />
              </Col>
            </Row>

            <Row className="mt-5 service-box">
            { homeData?.services?.children?.map((item, index)=>{
              const descriptionText = item?.description
              ? item.description.split(" ").slice(0, 15).join(" ") + "..."
              : "";
              return (
                <Col lg={4} key={index}>
                  <Nav.Link href={`/service/${item.slug}`}  style={{ cursor: "pointer", color: 'white !important' }}>
                    <div className="service-wrap d-flex flex-column" >
                      <div className="service-wrap__header">
                        <Image 
                        width={600} 
                        height={100} 
                        src={`${env.BACKEND_BASE_URL}assets/img/menu-content/${item?.menu_contents?.icon}`} 
                        className="img-fluid" 
                        alt="image" 
                        style={{
                          filter: 'opacity(0.5) drop-shadow(0 0 0 white) brightness(7.5)',
                        }}
                        />
                        <p>{item.name}</p>
                      </div>
                      <div><ArrowUpRight /></div>
                      
                    </div>
                  </Nav.Link>
                </Col>
              );
            })}
            </Row>        
          </Container>
        </section>
        <section className="pad-top-50">
          <Container className="position-relative">
            
            <Row>
              <Col>
                <div className="logo-block">
                  <p className="title mb-md-2 mb-lg-5">Industries we Serve</p>
                  {/* <BannerCarousal page="industry" /> */}
                  <Row>
                    <Col xs={12}>
                      <ul className="service-block">
                      { homeData?.industries?.children?.map((item, index)=>(
                        <li key={index}>
                          <Link href={`/industries/${item.slug}`} style={{ cursor: "pointer", textDecoration:'none', color:'cadetblue', fontWeight:'800' }}>
                          <div className="industy-block __list">
                            <div className="industy-block __top">
                              <Image width={600} height={100} src={`${env.BACKEND_BASE_URL}assets/img/menu-content/${item?.menu_contents?.icon}`} alt="image" className="img-fluid" />
                              <p>{item.name}</p>
                            </div>
                            <div className="industy-block __bottom">
                              <ArrowUpRight />       
                            </div>
                          </div>
                          </Link>
                        </li>
                      ))}                
                      </ul>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
            <Row className="my-3">
              <Col xs={12} lg={2}>
                <p className="title-sm mt-2">Technologies</p>
              </Col>
              <Col xs={12} lg={10}>

                <div className="industy-block">
                  <Container>
                    <Row>
                      <Col>
                        <BannerCarousal page="tools" technologiya={homeData?.technologies}/>
                      </Col>

                    </Row>
                  </Container>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="tool-bg mt-5">
          <Container>
            <Row className="justify-content-end">

              <Col xs={12} lg={5}>
                <div className="logo-block2">
                {homeData?.whychooseus?.map((item, index) =>
                  item.slug === "why-choose-us-content" && (
                    <React.Fragment key={index}>
                      <p className="title">{item?.title}</p>
                      <div className="grey-txt" dangerouslySetInnerHTML={{ __html: item?.description }} />
                    </React.Fragment>
                  )
                )}
                <ul className="logo-block2-list">
                  {homeData?.whychooseus?.map((item, index) => {
                    if (item.slug === "why-choose-us-sub-content") {
                      return (
                          <li key={index}>
                            <div dangerouslySetInnerHTML={{ __html: item?.description }} />
                            </li>
                      );
                    }
                    return null;
                  })}
                  </ul>
                  <div className="partner-block">
                    <p className="partner-block__txt">Our Partners</p>
                    <div className="partner-block__imgBlock">
                      <ul>
                      { homeData?.partners?.map((item, index)=>(
                        <li key={index}><Image width={600} height={100} src={`${env.BACKEND_BASE_URL}${item.logo}`} className="img-fluid" alt="partner-logo" /></li>
                      ))}
                        </ul>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="pad-top-50 section-bg">
          <div className="service-bg-shape">
            <Image width={600} height={100} src="/assets/images/logo-shape.png" alt="image" className="img-fluid" />
            <Image width={600} height={100} src="/assets/images/logo-shape.png" alt="image" className="img-fluid" />
          </div>
          <Container>
            <Row className="project-wrap mb-4">
              <Col xs={12} lg={9}>
                <div className="title">
                  Project Experience
                </div>
              </Col>

              {/* <Col xs={12} lg={3}><p className="link-txt tt-right">View All <ArrowUpRight /></p></Col> */}
            </Row>
            <Row>
              <BannerCarousal page="projects" projects={homeData?.projects} />
            </Row>
          </Container>

        </section>
        <section className="pad-top-50">
          <Container>
            <Row>
              <Col xs={12} xl={6}>            
                <div className="globe-wrap">
                  <Globe width={600} height={600} />
                </div>
              </Col>
              <Col xs={12} xl={6}>
                <div className="aboutTxt blue-bg">
                  <p className="sub-title mb-1">Client Feedback</p>
                  <p className="mb-2">What Our Clients Say</p>
                  <BannerCarousal page="testimonial" testimonials={homeData?.testimonials} />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="mt-5">
          <Container>
            <Row>
              <Col xs={12} lg={2}>
                <p className="title-sm">Core Clients</p>
              </Col>
              <Col xs={12} lg={10}>

                <div className="industy-block">
                  <Container>
                    <Row>
                      <Col>
                        <BannerCarousal page="clients" clients={homeData?.clients} /></Col>
                    </Row>
                  </Container>


                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
}


export async function getServerSideProps() {

  const homesection = await HomeService.homePage();
  const homeResult = homesection.data;
  return {
    props: {
      homeData: homeResult ? homeResult : [],
    },
  };
}