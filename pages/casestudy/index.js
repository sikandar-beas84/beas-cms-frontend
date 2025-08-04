
import React, { useState } from 'react'
import BreadCrumb from '../component/BreadCrumb'
import { Container, Row, Col } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion';
import { ArrowRight, ArrowUp, ArrowUpRight } from 'react-feather';


const page = () => {
  return (
    <>
      <BreadCrumb pagetitle = "Case Study" />
      <Container className='py-5'>
        <Row>
          <Col xs={12} lg={5}>
            {/* <div className='service-left-panel'>
              <p className='title'>Our Services</p>
              <ul>
                <li>Application Development <span><ArrowRight /></span></li>
                <li>Mobile Apps Development <span><ArrowRight /></span></li>
                <li>Cloud Computing <span><ArrowRight /></span></li>
                <li>Application Maintenance <span><ArrowRight /></span></li>
                <li>Offshore Development Center <span><ArrowRight /></span></li>
                <li>Professional Services <span><ArrowRight /></span></li>
              </ul>
            </div> */}
             <div className='serviceDetailsWrap'>
              <img src='/assets/images/service-details.jpg' alt='image' className='img-fluid' />
            </div>
            <div className='service-left-panel vertical-box my-3'>
              <p className='title'>Technology Platform</p>
              <ul>
                <li><img src='assets/images/software-logo-img.webp' alt='software-logo' className='casestudies-logo'/></li>
                <li><img src='assets/images/software-logo-img.webp' alt='software-logo' className='casestudies-logo'/></li>
                <li><img src='assets/images/software-logo-img.webp' alt='software-logo' className='casestudies-logo'/></li>
                <li><img src='assets/images/software-logo-img.webp' alt='software-logo' className='casestudies-logo'/></li>
                <li><img src='assets/images/software-logo-img.webp' alt='software-logo' className='casestudies-logo'/></li>
                <li><img src='assets/images/software-logo-img.webp' alt='software-logo' className='casestudies-logo'/></li>
                <li><img src='assets/images/software-logo-img.webp' alt='software-logo' className='casestudies-logo'/></li>
                <li><img src='assets/images/software-logo-img.webp' alt='software-logo' className='casestudies-logo'/></li>
              </ul>
            </div>
            <div className='service-left-panel blue-box'>
             <p> Want A <br/> Project Like this? </p>
             <a href='#' className='red-btn'>Call Now</a>
            </div>
          </Col>
          <Col xs={12} lg={7}>
           
            <p className='title mb-3'>Project Overview / Business Need</p>
            <p>Holisticly benchmark functional products before excellent methods of empowerment. Seamlessly visualize innovative web-readiness whereas extensive initiatives. Completely unleash frictionless data via end-to-end services. Continually unleash virtual e-tailers through magnetic core competencies. Interactively engage distributed alignments via focused alignments. Dynamically fabricate excellent innovation for go forward technology. Intrinsicly impact empowered scenarios after cost effective outsourcing. Synergistically productivate pandemic e-business rather than state of the art e-tailers. Continually expedite customized information with go forward potentialities.</p>
            {/* <div className='project-service'>
              <Row>
                <Col xs={12} lg={6}>
                  <div className='project-overview-list-img'>
                    <img src='/assets/images/flowchart.webp' alt='image' className='img-fluid'/>
                  </div>
                </Col>
                <Col xs={12} lg={6}>
                  <div className='project-overview-list'>
                    <p className='title'>Service Features</p>
                    <ul>
                      <li> We Provide Flexible IT Services </li>
                      <li> We Provide Flexible IT Services </li>
                      <li> We Provide Flexible IT Services </li>
                      <li> We Provide Flexible IT Services </li>
                      <li> We Provide Flexible IT Services </li>
                      <li> We Provide Flexible IT Services </li>
                    </ul>
                  </div>

                </Col>
              </Row>
            </div> */}
            <p className='title my-3'>BEAS’s Solution</p>
            <p>Holisticly benchmark functional products before excellent methods of empowerment. Seamlessly visualize innovative web-readiness whereas extensive initiatives. Completely unleash frictionless data via end-to-end services. Continually unleash virtual e-tailers through magnetic core competencies. Interactively engage distributed alignments via focused alignments. Dynamically fabricate excellent innovation for go forward technology. Intrinsicly impact empowered scenarios after cost effective outsourcing. Synergistically productivate pandemic e-business rather than state of the art e-tailers. Continually expedite customized information with go forward potentialities.</p>
           
            <p className='title my-3'>Benefits to the customer</p>
            <p>Holisticly benchmark functional products before excellent methods of empowerment. Seamlessly visualize innovative web-readiness whereas extensive initiatives. Completely unleash frictionless data via end-to-end services. Continually unleash virtual e-tailers through magnetic core competencies. Interactively engage distributed alignments via focused alignments. Dynamically fabricate excellent innovation for go forward technology. Intrinsicly impact empowered scenarios after cost effective outsourcing. Synergistically productivate pandemic e-business rather than state of the art e-tailers. Continually expedite customized information with go forward potentialities.</p>
             {/* <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header className='acc-title'>Business Need</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header className='acc-title'>BEAS's Solution</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header className='acc-title'>Benefits to the customer</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header className='acc-title'>Technology Platform</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion> */}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default page
