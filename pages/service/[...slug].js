
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

const page = ({service, enrichedContents}) => {
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
                <BreadCrumb pagetitle={service?.name} pageslug='Service' />
                <Container className='py-5'>
                    <Row>
                        <Col>
                            <p className='title mb-3'>{service?.name}</p>
                            <div dangerouslySetInnerHTML={{ __html: service?.description }} />
                            <div className='imageTextBlock'>
                                <Row>
                                    { enrichedContents?.map((item, index)=>(
                                        item?.casestudy?.data?.casestudy?.slug ? (

                                        <React.Fragment key={index}>
                                            <Col xs={12} lg={3} className="d-flex px-0">
                                                <div className='imageBlock d-flex'>
                                                    <Image width={550} height={50} src={`${env.BACKEND_BASE_URL}${item?.casestudy?.data?.casestudy?.image}`} alt='image' className='img-fluid' />
                                                </div>
                                            </Col>
                                            <Col xs={12} lg={3} className="d-flex pxx-0">
                                                <div className='textBlock d-flex speechBubble'>
                                                    <div>
                                                        <p>
                                                            {item?.casestudy?.data?.casestudy?.title}
                                                    </p>
                                                    {item?.casestudy?.data?.casestudy?.slug ? (
                                                        <Link
                                                            href={`/casestudy/${item?.casestudy?.data?.casestudy?.slug}`}
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
                                        ): null
                                ))} 


                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </main>
        </>
    )
}

export default page

export async function getServerSideProps({ params }) {
    const { slug } = params; // slug is now an array
    
    const response = await HomeService.menuServicePage(); // Load menu tree
    const services = response.data?.services?.children || [];
  
    let service = null;
    let currentLevel = services;
    // Traverse nested slugs
    for (const part of slug) {
      service = currentLevel.find(item => item.slug.toString() === part);
      if (!service) break;
      currentLevel = service.children || [];
    }
  
    if (!service) {
      return {
        notFound: true, // 404 if no match
      };
    }

    const contents = service?.menu_contents?.contents || [];
    const enrichedContents = await Promise.all(
        contents.map(async (item) => {
          if (!item.extra_description) return item;
    
          try {
            const data = await postService('get-casestudy-by-slug', `${env.ACCESS_TOKEN}`, item.extra_description);
            return { ...item, casestudy: data };
          } catch (err) {
            console.error(`Failed to fetch for ${item.extra_description}:`, err);
            return item; // fallback to original item
          }
        })
      );

    return {
      props: {
        service,
        enrichedContents
      },
    };
  }
  
  
  