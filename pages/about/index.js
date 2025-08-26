import React from 'react'
import BreadCrumb from '../component/BreadCrumb'
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'next/image';
import HomeService from '../services/Home';
import { env } from '../constants/common';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';

const page = ({aboutus, experts}) => {
    const router = useRouter();
    if (router.isFallback) {
      return <div>Loading...</div>;
    }

    return (
        <>
        <SEO
            title={aboutus?.name || 'About Us | Beas Consultancy & Services Pvt. Ltd.'}
            description={aboutus?.menu_contents?.description || 'Learn more about Beas and our specialties.'}
            keywords={
                [
                aboutus?.menu_contents?.title,
                aboutus?.menu_contents?.description,
                'About Beas',
                'Meet our team',
                'Software Company',
                'Technology',
                'Experts at Beas',
                'Corporate Profile'
                ]
                .filter(Boolean)
                .join(', ')
            }
            image={
                aboutus?.image 
                  ? `${env.BACKEND_BASE_URL}${aboutus.image}`
                  : `${env.BACKEND_BASE_URL}/default-image.jpg`
              }
            url={`${env.BACKEND_BASE_URL}${aboutus?.slug || 'about-us'}`}
            publishedDate={aboutus?.created_at || new Date().toISOString()}
            author="Beas Consultancy & Services Pvt. Ltd."
            />

            <main>
                <BreadCrumb pagetitle="About Us" pageBanner={`assets/img/menu-content/${aboutus?.menu_contents?.banner}`} />
                <Container className='py-5'>
                    <Row>
                        <Col>
                            <div className="aboutusTxt">

                                <Image width={450} height={150} src={`${env.BACKEND_BASE_URL}${aboutus?.image}`} className="img-fluid" alt="image" />
                                <div className="aboutTxt">
                                    <p className="sub-title">About Our Company</p>
                                    <p>{aboutus?.menu_contents?.title}</p>
                                    <div dangerouslySetInnerHTML={{ __html: aboutus?.description }} />
                                </div>
                                <div className='clear'></div>
                            </div>
                        </Col>

                    </Row>
                </Container>
                <section className='service-left-panel-curve pad-150'>
                    <Container>
                        <Row>
                            <Col xs={12} className='text-center mb-5'>
                                <p className="sub-title">Specality Of Our Company</p>
                                <div className='title' dangerouslySetInnerHTML={{ __html: aboutus?.menu_contents?.description }} />
                            </Col>
                            <Col xs={12}>
                                <div className='white-card-container'>
                                    { aboutus?.menu_contents?.contents.map((item,index)=>(
                                    <div className='white-card' key={index}>
                                        <div className='white-card__title-bar'>
                                            <div className='white-card__title-bar__icon-box'>
                                                <Image width={450} height={150} src={`${env.BACKEND_BASE_URL}assets/img/menu-content/${item?.extra_icon}`} className="img-fluid" alt="image" />
                                            </div>
                                            <p className='title ml-10 mtt-25 f-16'>{item?.extra_title}</p>
                                        </div>
                                        <div className='mt-3' dangerouslySetInnerHTML={{ __html: item?.extra_description }} />

                                    </div>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                {/* <Container className='py-5'>
                    <Row>
                        <Col xs={12} className='mb-3'>
                            <div className="aboutTxt">
                                <p className="sub-title mb-0">Meet Our Team</p>
                                <p className='mb-3'>{experts?.title}</p>
                                <div className="gry-txt" dangerouslySetInnerHTML={{ __html: experts?.description }} />
                            </div>
                        </Col>
                        { experts?.contents?.map((item,index)=>(
                        <Col xs={12} lg={3} key={index}>
                            <div className='team-item'>
                                <div className='team-member-image'>
                                    <Image width={450} height={150} src={`${env.BACKEND_BASE_URL}${item?.extra_image}`}
                                        alt='image' className='img-fluid' />
                                </div>
                                <div className='team-member-name'>
                                    {item?.extra_title}
                                    <span>{item?.extra_role}</span>
                                </div>
                            </div>

                        </Col>
                        )) }

                    </Row>
                </Container> */}
            </main>
        </>
    )
}

export default page

export async function getServerSideProps() {
    const res = await HomeService.menuAboutusPage();
    const aboutus = res.data?.aboutus || [];

    const res1 = await HomeService.expertPage();
    const experts = res1.data?.careers || [];
  
    return {
      props: {
        aboutus,
        experts
      }
    }
  }