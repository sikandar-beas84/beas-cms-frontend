import React from 'react'
import { Container, Row, Col, Dropdown } from 'react-bootstrap'
import { Phone, Smartphone, Mail, MapPin, PhoneCall, Printer } from 'react-feather'
import Nav from 'react-bootstrap/Nav';
import { useRouter } from 'next/router';
import { env } from '../constants/common';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';
// Recursive dropdown rendering
const RecursiveDropdown = ({ items, baseSlug = '/service' }) => {
  return items?.map((item, index) => {
    const hasChildren = item.children && item.children.length > 0;
    const itemSlug = `${baseSlug}/${item.slug}`;

    if (hasChildren) {
      return (
        <Dropdown drop="end" key={index} className="dropdown-submenu">
          <Dropdown.Toggle as="div" className="dropdown-item dropdown-toggle" style={{cursor:'pointer',padding:'5px'}}>
            {item.name}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <RecursiveDropdown items={item.children} baseSlug={itemSlug} />
          </Dropdown.Menu>
        </Dropdown>
      );
    }

    return (
      <Dropdown.Item as={Link} href={itemSlug} key={index} style={{padding:'5px'}}>
        {item.name}
      </Dropdown.Item>
      
    );
  });
};

const Footer = ({homeData}) => {
  const router = useRouter();
  const casestudy = Array.isArray(homeData?.projects) ? homeData.projects?.[0] : [];
  return (
    <>
      <footer>
        <Container>
          <Row className='justify-content-center'>

            <Col xs={12} lg={3} className='mb-md-2 mb-lg-0'>
              <p>Services</p>
              {/* <RecursiveDropdown items={homeData?.services?.children} /> */}
              <ul>
              { homeData?.services?.children?.map((item, index)=>(
                <li style={{listStyleType:'none'}} key={index}>
                <Nav.Link href={`/service/${item.slug}`}  style={{ color: 'white !important' }}>{item.name}</Nav.Link>
                </li>
              ))}
              </ul>
            </Col>
            <Col xs={12} lg={2}>
              <p>Explore</p>
              <ul>
              
              { homeData?.menus?.map((item, index)=>{
                if (item.slug === 'casestudy') {
                  return (
                    <li style={{listStyleType:'none'}}key={index}>
                    <Nav.Link href={`/${item.slug}/${casestudy.slug}`} style={{ color: 'white !important' }}>{item.name}</Nav.Link>
                    </li>
                     );
                }else {
                  return (
                    //item.slug !== "service" && item.slug !== "industries" && (
                      <li style={{ listStyleType: 'none' }} key={index}>
                        <Nav.Link href={`/${item.slug}`} style={{ color: 'white' }}>
                          {item.name}
                        </Nav.Link>
                      </li>
                    //)
                    );
                }
              })}
              </ul>
            </Col>
            <Col xs={12} lg={4}>
              <p>Quick Contact</p>
              <ul className='contactInfo'>

                <li><span> <MapPin /></span> <span>{homeData?.contactus?.address}</span></li>

                <li><span><PhoneCall /></span> <span>Phone: {homeData?.contactus?.phone}</span></li>

                <li><span><Smartphone /></span> <span>Mobile: {homeData?.contactus?.mobile}</span></li>

                <li><span><Printer/></span> <span>Fax: {homeData?.contactus?.contactname}</span></li>

                <li><span><Mail /></span> <span>Email: {homeData?.contactus?.email}</span></li>
              </ul>
            </Col>
            <Col xs={12} lg={2}>
              <p>Our Certificate</p>
              <div className='mt-2 CertificatePic'>
                {/* <iframe src={homeData?.contactus?.url} width="100%" height="200" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}
                
                <div className='certificate-icon'>
                  <img src="/assets/images/certificate2.png"></img>
                </div>
                <div className='certificate-icon'>
                  <img src="/assets/images/certificate3.png"></img>
                </div>
                <div className='certificate-icon'>
                  <img src="/assets/images/certificate1.png"></img>
                </div>
                
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
      <section className='footerBottom'>
        <Container>
          <Row>
            <Col>
              <p className='mb-0 text-center'>© 2024 BEAS Consultancy & Services Pvt. Ltd. All Rights Reserved</p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default React.memo(Footer);