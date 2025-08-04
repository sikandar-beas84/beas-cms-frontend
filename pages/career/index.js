import React from 'react'
import { Container } from 'react-bootstrap'
import { Col, Row } from "react-bootstrap";
import { ArrowUpRight } from "react-feather";
import BreadCrumb from '../component/BreadCrumb';
import Link from 'next/link'
import Image from 'next/image';
import HomeService from '../services/Home';
import { env } from '../constants/common';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';

const career = ({careers, menucareer}) => {
  const router = useRouter();
    if (router.isFallback) {
      return <div>Loading...</div>;
    }

  return (
    <>
    <SEO
        title={menucareer?.name || "Career | Beas Consultancy & Services Pvt. Ltd."}
        description={menucareer?.description || "Explore exciting career opportunities with us."}
        keywords="career, jobs, openings"
        image={
          menucareer?.image 
            ? `${env.BACKEND_BASE_URL}${menucareer.image}`
            : `${env.BACKEND_BASE_URL}/default-image.jpg`
        }
        url={`${env.BACKEND_BASE_URL}${menucareer?.slug || 'career'}`}
      />
      <main>
        <BreadCrumb pagetitle="Career" />
        <Container className='py-5'>
          <Row>
            <Col>
              <p className="sub-title">{menucareer?.menu_contents?.title}</p>
              <p className='title mb-3'>Why Join Us?</p>
              <div dangerouslySetInnerHTML={{ __html: menucareer?.menu_contents?.description }} />
            </Col>
          </Row>
          <Row>
              <Col>
                <div className="logo-block">
                  <Row>
                    <Col xs={12}>
                      <ul className="service-block">
                      { careers?.map((item,index)=>(                      
                      <li key={index}>
                          <div className="industy-block __list career-block-img">
                            <div className="industy-block __top">
                              <Image width={450} height={150} src={`${env.BACKEND_BASE_URL}${item?.image}`} alt="image" className="img-fluid" />
                              <div className='industry-block__carrer-block'>
                                <p><b>{item.title}</b></p>
                                <span>{item.experience}</span>
                              </div>
                            </div>
                            {item.id && (
                              <Link href={`/career/${item.id}`} className="btn btn-outline-primary ms-auto">
                                <ArrowUpRight />
                              </Link>
                            )}
                            {/* <div className="industy-block __bottom">
                              <ArrowUpRight />
                            </div> */}
                          </div>
                        </li>
                        )) }
                    
                      </ul>

                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
        </Container>
      </main>
    </>
  )
}

export default career

export async function getServerSideProps() {
  const res = await HomeService.menuCareerPage();
  const menucareer = res.data?.career || [];

  const res1 = await HomeService.careerPage();
  const careers = res1.data?.careers || [];

  return {
    props: {
      menucareer,
      careers
    }
  }
}