
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

const page = ({industry, enrichedContents}) => {

    console.log("industry=",industry);

    const router = useRouter();
    if (router.isFallback) {
      return <div>Loading...</div>;
    }
    
    const metaTitle = `Industry | ${industry?.name}`;
    const metaDesc = industry?.menu_contents?.description
        ? industry.menu_contents.description.replace(/(<([^>]+)>)/gi, "").slice(0, 50)
        : "Explore our wide range of services to empower your business through innovative solutions.";
    const metaImage = industry?.image
        ? `${env.BACKEND_BASE_URL}${industry.image}`
        : `${env.BACKEND_BASE_URL}assets/img/default-image.jpg`;
    const metaUrl = `${env.FRONTEND_BASE_URL}/industry/${industry?.slug || ""}`;

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
                <BreadCrumb pagetitle={industry?.name} pageslug='Industry' pageBanner={`assets/img/menu-content/${industry?.menu_contents?.banner}`} />
                <Container className='py-5'>
                    <Row>
                        <Col>
                            {/* <p className='title mb-3'>{industry?.name}</p> */}
                            <div dangerouslySetInnerHTML={{ __html: industry?.description }} />
                            <div className='imageTextBlock'>
                                <Row>
                                    { enrichedContents?.map((item, index)=>(
                                        item?.casestudy?.data?.casestudy?.slug ? (

                                        <React.Fragment key={index}>
                                            <Col xs={12} lg={2} className="d-flex px-0" style={{height:'225px'}}>
                                                <div className='imageBlock d-flex'>
                                                    <Image width={550} height={50} src={`${env.BACKEND_BASE_URL}${item?.casestudy?.data?.casestudy?.image}`} alt='image' className='img-fluid' />
                                                </div>
                                            </Col>
                                            <Col xs={12} lg={2} className="d-flex pxx-0" style={{height:'225px'}}>
                                                <div className='textBlock d-flex speechBubble' style={{borderRadius:'10px'}}>
                                                    <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                                                        <p style={{color:'cadetblue'}}>
                                                            {item?.casestudy?.data?.casestudy?.title}
                                                        </p>
                                                        {item?.casestudy?.data?.casestudy?.slug ? (
                                                        // <Link
                                                        //     href={`/casestudy/${item?.casestudy?.data?.casestudy?.slug}`}
                                                        //     className="btn btn-outline-primary ms-auto"
                                                        // >
                                                        <Link
                                                            href={{
                                                                pathname: "/casestudy",
                                                                query: { id: item?.casestudy?.data?.casestudy?.id },
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
    
    const response = await HomeService.menuIndustryPage(); // Load menu tree
    const industries = response.data?.industries?.children || [];
  
    let industry = null;
    let currentLevel = industries;
    // Traverse nested slugs
    for (const part of slug) {
        industry = currentLevel.find(item => item.slug.toString() === part);
      if (!industry) break;
      currentLevel = industry.children || [];
    }
  
    if (!industry) {
      return {
        notFound: true, // 404 if no match
      };
    }

    const contents = industry?.menu_contents?.contents || [];
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
        industry,
        enrichedContents
      },
    };
  }
  
  
  