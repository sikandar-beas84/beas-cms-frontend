import React from 'react'
import BreadCrumb from '../component/BreadCrumb'
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'next/image';
import HomeService from '../services/Home';
import { env } from '../constants/common';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';

const page = ({skills}) => {
  const router = useRouter();
    if (router.isFallback) {
      return <div>Loading...</div>;
    }

  return (
    <>
      <SEO
        title={skills?.name || "Skills | Beas Consultancy & Services Pvt. Ltd."}
        description={skills?.menu_contents?.description?.slice(0, 50) || 'Explore the skills and capabilities of Beas Consultancy.'}
        keywords="Skills, Expertise, Technologies, Services"
        image={
          skills?.image
            ? `${env.BACKEND_BASE_URL}${skills.image}`
            : `${env.BACKEND_BASE_URL}/default-image.jpg`
        }
        url={`${env.BACKEND_BASE_URL}${skills?.slug || 'skills'}`}
        author="Beas Consultancy & Services Pvt. Ltd."
      />
      <main>
        <BreadCrumb pagetitle="Skills" pageBanner={`assets/img/menu-content/${skills?.menu_contents?.banner}`}/>
        <Container className='py-5'>
            <Row>
                <Col>
                    <div className="aboutusTxt">

                        {/* <Image width={450} height={150} src={`${env.BACKEND_BASE_URL}assets/img/menu-content/${skills?.menu_contents?.image}`} className="img-fluid" alt="image" />
                         */}
                        <div className="aboutTxt">
                            <p className="sub-title">Specality Of Our Company</p>
                            <p>{skills?.menu_contents?.title}</p>
                            <div dangerouslySetInnerHTML={{ __html: skills?.description }} />
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
                    {<div dangerouslySetInnerHTML={{ __html: skills?.menu_contents?.description }} />}
                    </Col>
                </Row>
            </Container>
        </section>
      </main>
    </>
  )
}

export default page

export async function getServerSideProps() {
  const res = await HomeService.menuSkillPage();
  const skills = res.data?.skills || [];


  return {
    props: {
      skills
    }
  }
}