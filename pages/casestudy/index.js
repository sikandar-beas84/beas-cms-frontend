
import React from 'react'
import BreadCrumb from '../component/BreadCrumb'
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'next/image';
import HomeService from '../services/Home';
import { env } from '../constants/common';
import Link from 'next/link';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';

const page = ({casestudy}) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <>
    <SEO
      title={`Case Study | ${casestudy?.title}`}
      description={
        casestudy?.title ||
        `${casestudy?.title} - Learn how Beas Consultancy delivered a tailored solution and business impact.`
      }
      keywords={
        casestudy?.title || 
        "case study, business solution, project success, Beas consultancy"
      }
      image={
        casestudy?.image 
          ? `${env.BACKEND_BASE_URL}${casestudy.image}`
          : `${env.BACKEND_BASE_URL}/default-image.jpg`
      }
      url={`${env.FRONTEND_BASE_URL}/casestudy/${casestudy?.slug}`}
      author="Beas Consultancy & Services Pvt. Ltd."
    />
    <main>
      <BreadCrumb pagetitle = {casestudy.title} pageslug='Casestudy' />
      
      <Container className="py-5">
        <Row>  
          <Col xs={12} lg={5}>
            
             <div className='serviceDetailsWrap'>
              <Image width={600} height={150} src={`${env.BACKEND_BASE_URL}${casestudy?.image}`} alt='image' className='img-fluid' />
            </div>
            <div className='service-left-panel vertical-box my-3'>
              <p className='title'>Technology Platform</p>
              <ul>
                { casestudy?.technology_platform?.map((item, index)=>(
                <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className='service-left-panel blue-box'>
             <p> Want A <br/> Project Like this? </p>
             <a href='#' className='red-btn'>Call Now</a>
            </div>
          </Col>
          <Col xs={12} lg={7}>
           
            <p className='title mb-3'>Project Overview / Business Need</p>
            {<div dangerouslySetInnerHTML={{ __html: casestudy?.business_need }} />}
            <p className='title my-3'>BEAS’s Solution</p>
            {<div dangerouslySetInnerHTML={{ __html: casestudy?.beas_solution }} />}
            <p className='title my-3'>Benefits to the customer</p>
            {<div dangerouslySetInnerHTML={{ __html: casestudy?.benefits_to_the_customer }} />}
          </Col>
          
        </Row>
      </Container>
    </main>
    </>
  )
}

export default page

export async function getServerSideProps({ query  }) {
  const { id } = query ;

  const response = await HomeService.individualProjectPage(id);
  const casestudy = response.data?.casestudy || [];

  return {
    props: {
      casestudy,
      id
    },
  };
}
