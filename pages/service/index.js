import React from 'react'
import { Container } from 'react-bootstrap'
import { Col, Row } from "react-bootstrap";
import { ArrowUpRight } from "react-feather";
import BreadCrumb from '../component/BreadCrumb';
import Nav from 'react-bootstrap/Nav';
import Image from 'next/image';
import HomeService from '../services/Home';
import { env } from '../constants/common';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';

const page = ({services, service}) => {
  const router = useRouter();
    if (router.isFallback) {
      return <div>Loading...</div>;
    }

  const metaTitle = "Services | Beas Consultancy & Services Pvt. Ltd.";
  const metaDesc = service?.description
    ? service.description.replace(/<[^>]+>/g, '').slice(0, 150)
    : "Explore our wide range of services tailored to your business needs.";
  const metaImage = service?.image
    ? `${env.BACKEND_BASE_URL}${service?.image}`
    : `${env.BACKEND_BASE_URL}assets/img/default-image.jpg`;
  const metaUrl = `${env.FRONTEND_BASE_URL}${service?.slug}`;

  return (
    <>
    <SEO
        title={metaTitle}
        description={metaDesc}
        keywords="services, software solutions, IT consultancy, Beas services"
        image={metaImage}
        url={metaUrl}
      />
      <main>
        <BreadCrumb pagetitle="Service Page" />
        <Container className='py-5'>
          {/* <Row>
            <Col>
              <p className='title mb-3'>Service Page</p>
              <p>Holisticly benchmark functional products before excellent methods of empowerment. Seamlessly visualize innovative web-readiness whereas extensive initiatives. Completely unleash frictionless data via end-to-end services. Continually unleash virtual e-tailers through magnetic core competencies. Interactively engage distributed alignments via focused alignments. Dynamically fabricate excellent innovation for go forward technology. Intrinsicly impact empowered scenarios after cost effective outsourcing. Synergistically productivate pandemic e-business rather than state of the art e-tailers. Continually expedite customized information with go forward potentialities.</p>
            </Col>
          </Row> */}


          <Row className='mt-4'>
            <Col>
            { services?.map((item, index)=>(

              <div className='serviceListBlock' key={index}>
                <div className='serviceListBlockFirst'>
                  <div className='mediaimg'>
                    <Image width={600} height={150} src={`${env.BACKEND_BASE_URL}assets/img/menu-content/${item?.menu_contents?.image}`} alt="image" className="img-fluid mb-5" />
                  </div>
                </div>
                <div className='serviceListBlockSecond'>
                  <div className='serviceListBlockWrap'><div className='industry-icons-pg'><Image width={450} height={150} src={`${env.BACKEND_BASE_URL}assets/img/menu-content/${item?.menu_contents?.icon}`} alt="image" /></div> <span className='title ml-10 mtt-15'>{item?.menu_contents?.title}</span></div>
                    <div className='industries-body-text mt-3' dangerouslySetInnerHTML={{ __html: item?.menu_contents?.description?.split(' ').slice(0, 50).join(' ')+'...' }} />
                  <Nav.Link href={`/service/${item?.menu_contents?.slug}`} key={index} className='link-txt-new'>Read more <ArrowUpRight /></Nav.Link>

                </div>
              </div>
            ))}
                
            </Col>
          </Row>


        </Container>
      </main>
    </>
  )
}

export default page

export async function getServerSideProps() {
    const res = await HomeService.homePage()
    const services = res.data?.services?.children || []
    const service = res.data?.services || []
  
    return {
      props: {
        services,
        service
      }
    }
  }