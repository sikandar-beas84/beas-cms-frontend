
import React from 'react'
import BreadCrumb from '../component/BreadCrumb';
import Container from 'react-bootstrap/Container';
import { Col, Row } from "react-bootstrap";
import { ArrowUpRight } from 'react-feather';
import Link from 'next/link'
import Image from 'next/image';
import HomeService from '../services/Home';
import { env } from '../constants/common';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';
import { postService } from "../configs/FetchRequest";

const page = ({service, enrichedChildren }) => {

    

    const router = useRouter();
    if (router.isFallback) {
      return <div>Loading...</div>;
    }
    
    const metaTitle = `Service | ${service?.name}`;
    const metaDesc = service?.menu_contents?.description
        ? service.menu_contents.description.replace(/(<([^>]+)>)/gi, "").slice(0, 50)
        : "Explore our wide range of services to empower your business through innovative solutions.";
    const metaImage = service?.image
        ? `${env.BACKEND_BASE_URL}${service.image}`
        : `${env.BACKEND_BASE_URL}assets/img/default-image.jpg`;
    const metaUrl = `${env.FRONTEND_BASE_URL}/service/${service?.slug || ""}`;

    return (
        <>
            <SEO
                title={metaTitle}
                description={metaDesc}
                keywords="services, beas consultancy, business solutions, software development"
                image={metaImage}
                url={metaUrl}
            />
            <main>
                <BreadCrumb pagetitle={service?.name} pageslug='Service' pageBanner={`assets/img/menu-content/${service?.menu_contents?.banner}`} />
                <Container className='py-5'>
                {enrichedChildren?.map((item1, index1) => (
                <Row key={index1}>
                    <Col>
                        {/* <p className='title mb-3'>{service?.name}</p> */}
                        <div dangerouslySetInnerHTML={{ __html: item1?.description }} />
                        <div className='imageTextBlock'>
                            <Row>
                                {item1?.menu_contents?.contents?.map((content, index) =>
                                content?.extra_description ? (
                                    <React.Fragment key={index}>
                                        <Col xs={12} lg={2} className="d-flex px-0" style={{height:'225px'}}>
                                            <div className='imageBlock d-flex'>
                                                <Image width={550} height={50} src={`${env.BACKEND_BASE_URL}${content.casestudy?.data?.casestudy?.image}`} alt='image' className='img-fluid' />
                                            </div>
                                        </Col>
                                        <Col xs={12} lg={2} className="d-flex pxx-0" style={{height:'225px'}}>
                                            <div className='textBlock d-flex speechBubble' style={{borderRadius:'10px'}}>
                                            <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                                                    <p style={{color:'cadetblue'}}>
                                                        {content.casestudy?.data?.casestudy?.title}
                                                  </p>
                                                  {content.casestudy?.data?.casestudy?.slug ? (
                                                    
                                                    <Link
                                                        href={{
                                                            pathname: "/casestudy",
                                                            query: { id: content.casestudy?.data?.casestudy?.id },
                                                        }}
                                                        className="btn btn-outline-primary ms-auto"
                                                        >
                                                        <ArrowUpRight />
                                                    </Link>
                                                    ) : (
                                                    <button type="button" className="btn btn-outline-primary ms-auto" disabled>
                                                        <ArrowUpRight />
                                                    </button>
                                                    )}
                                            </div>

                                        </div>
                                        </Col>
                                    </React.Fragment>
                                    ) : null
                                )} 

                            </Row>
                        </div>
                    </Col>
                </Row>
                ))} 
                </Container>
            </main>
        </>
    )
}

export default page

export async function getServerSideProps({ params }) {
    const { slug } = params;
  
    // 1. Load menu tree
    const response = await HomeService.menuServicePage();
    const services = response?.data?.services?.children || [];
  
    // 2. Find service by slug
    const service = services.find((item) => item.slug.toString() === slug);
  
    if (!service) {
      return { notFound: true };
    }
  
    // 3. Enrich children with case studies
    const enrichedChildren = await Promise.all(
      (service?.children || []).map(async (child) => {
        const contents = child?.menu_contents?.contents || [];
  
        const enrichedContents = await Promise.all(
          contents.map(async (c) => {
            if (!c?.extra_description) return c;
            try {
              const data = await postService(
                "get-casestudy-by-slug",
                env.ACCESS_TOKEN,
                c.extra_description
              );
              return { ...c, casestudy: data };
            } catch (err) {
              console.error("❌ Error fetching casestudy:", err);
              return c;
            }
          })
        );
  
        return {
          ...child,
          menu_contents: { ...child.menu_contents, contents: enrichedContents },
        };
      })
    );
  
    return {
      props: {
        service,
        enrichedChildren,
      },
    };
  }