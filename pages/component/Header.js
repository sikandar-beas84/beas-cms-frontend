"use client";
import React from 'react'
import Container from 'react-bootstrap/Container';
import { Col, Row, Dropdown } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';
import { Phone } from 'react-feather';
import { PhoneCall } from 'react-feather';
import { useRouter } from 'next/router';
import { env } from '../constants/common';

// Recursive dropdown rendering
const RecursiveDropdown = ({ items, baseSlug = '/service' }) => {
  return items?.map((item, index) => {
    const hasChildren = item.children && item.children.length > 0;
    const itemSlug = `${baseSlug}/${item.slug}`;

    if (hasChildren) {
      return (
        <Dropdown drop="end" key={index} className="dropdown-submenu">
          <Dropdown.Toggle as="div" className="dropdown-item dropdown-toggle" style={{cursor:'pointer'}}>
            {item.name}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <RecursiveDropdown items={item.children} baseSlug={itemSlug} />
          </Dropdown.Menu>
        </Dropdown>
      );
    }

    return (
      <Dropdown.Item as={Link} href={itemSlug} key={index}>
        {item.name}
      </Dropdown.Item>
    );
  });
};

const Header = ({homeData}) => {
  const router = useRouter();
  const casestudy = Array.isArray(homeData?.projects) ? homeData.projects?.[0] : [];
  return (
    <>
    <div className="nav-white-bg fixed-top shadow-sm">
          <Container>
            <Row>
              <Col>
                <Navbar collapseOnSelect expand="lg">

                  <Navbar.Brand href="#home"><img src={`${env.BACKEND_BASE_URL}${homeData?.logo?.image}`} alt="logo" className='img-fluid'/></Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    
                    <Nav className="mx-auto">
                      { homeData?.menus?.slice(0, 2).map((item, index)=>(
                        <Nav.Link href={`/${item.slug}`} key={index}>{item.name}</Nav.Link>
                      ))}

                      <NavDropdown title="Industries" id="collapsible-nav-dropdown">
                        { homeData?.industries?.children?.map((item, index)=>(
                        <NavDropdown.Item href={`/industries/${item.slug}`} key={index}> {item.name}</NavDropdown.Item>
                        ))}
                      </NavDropdown>

                      {/* Services dropdown with recursion */}
                    <NavDropdown title="Services" id="collapsible-nav-dropdown" className="services-dropdown">
                      <RecursiveDropdown items={homeData?.services?.children} />
                    </NavDropdown>
                    
                      {homeData?.menus?.slice(4, 9).map((item, index) => {
                        if (item.slug === 'casestudy') {
                          return (
                            <Nav.Link href={`/${item.slug}/${casestudy.slug}`} key={index}>
                            {item.name}
                            </Nav.Link>
                          );
                        } else {
                          return (
                            <Nav.Link href={`/${item.slug}`} key={index}>
                              {item.name}
                            </Nav.Link>
                          );
                        }
                      })}
                    </Nav>
                    
                    <Nav>
                    <Nav.Link href="#"><div className='d-flex top-phone-txt'><PhoneCall /><div>For any query <strong>{homeData?.contactus?.mobile}</strong></div></div></Nav.Link>
                      {/* <Nav.Link href="#" className="gradient-border">
                       Get Quote
                      </Nav.Link> */}
                      {/* <Nav.Link href="#" className="blue-btn2">
                       Get Quote
                      </Nav.Link> */}
                    </Nav>
                  </Navbar.Collapse>

                </Navbar>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="quote-bar" onClick={() => router.push('/contact')} style={{ cursor: 'pointer' }}>Get Quote</div>
        </>
  )
}

export default Header
