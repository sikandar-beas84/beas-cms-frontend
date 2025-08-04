import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
const BreadCrumb = ({pagetitle, pageslug}) => {
  return (
    <section>
      <Container fluid  className="breadcrumbBg">
        <Row>
          <Col>
           <div className='breadcrumbWrap'>
             <div className='pageTitle'>{pagetitle}</div>
             <div className='pgNameListing'>
              <ul>
                <li>Home</li>
                {pageslug && <li>{pageslug}</li>}
                <li>{pagetitle}</li>
              </ul>
             </div>
           </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default BreadCrumb