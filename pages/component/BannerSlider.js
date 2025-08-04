import React, { useState } from 'react'
import Link from 'next/link'
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import { Col, Row } from "react-bootstrap";
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'react-feather';
import { env } from '../constants/common';

const BannerSlider = ({bannerSlide}) => {
  // State to track the active slide
  const [activeIndex, setActiveIndex] = useState(0);

  // Define animation variants
  const textVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  };

  // Handler for slide change
  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex); // Update active index on slide change
  };
  return (
    <Carousel>
      { bannerSlide?.map((item,index)=>(
       <Carousel.Item key={index}>
        <img src={`${env.BACKEND_BASE_URL}${item.image}`}
          alt='banner'
          className='img-fluid' />
          <Carousel.Caption>
          <Row>
            <Col xs={12} xl={8} className="position-relative">
              <motion.div
                key={activeIndex} // Re-run animation on index change
                className="slider-text"
                initial="hidden"
                animate="visible"
                variants={textVariants}
              >
                <p>
                  {item.title}
                </p>
                <div className='fw-300' dangerouslySetInnerHTML={{ __html: item?.description }} />
                <p className="link-txt f-small">Learn More <ArrowUpRight/></p>
             </motion.div>
            </Col>
          </Row>
        </Carousel.Caption>
      </Carousel.Item>
     )) }
    </Carousel>
  )
}

export default BannerSlider