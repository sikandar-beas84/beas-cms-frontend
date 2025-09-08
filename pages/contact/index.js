import React, {useState } from 'react'
import { Container } from 'react-bootstrap'
import { Col, Row } from "react-bootstrap";
import { ArrowUpRight } from "react-feather";
import BreadCrumb from '../component/BreadCrumb';
import Link from 'next/link';
import HomeService from '../services/Home';
import { env } from '../constants/common';
import SEO from '../../components/SEO';
import { useRouter } from 'next/router';

const ContactUs = ({contactus}) => {

  const router = useRouter();
    if (router.isFallback) {
      return <div>Loading...</div>;
    }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    file: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    for (let [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }
    try {
      const res = await fetch(`${env.API_BASE_URL}save-customer-enquiry`, {
        method: 'POST',
        headers: {
          'X-SECURE-KEY': env.ACCESS_TOKEN
        },
        body: data
      });
      const result = await res.json();

      if (res.ok) {
        setStatus('✅ Message sent successfully!');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '', file: '' });
      } else {
        setStatus(`❌ Error: ${result.message || 'Failed to send'}`);
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Submission failed. Check console.');
    }
  };

  return (
    <>
    <SEO
        title="Contact Us"
        description="Reach out to Beas Consultancy. We’re here to help with your questions, suggestions, and business inquiries."
        keywords="Contact Beas, Contact Form, Business Inquiry, Support"
        url={`${env.BACKEND_BASE_URL}${contactus?.slug || 'skills'}`}
        image={
          contactus?.image 
            ? `${env.BACKEND_BASE_URL}${contactus.image}`
            : `${env.BACKEND_BASE_URL}/default-image.jpg`
        }
        author="Beas Consultancy & Services Pvt. Ltd."
      />
      <main>
        <BreadCrumb pagetitle="Contact Us" pageBanner={contactus?.banner} />
        <Container className='py-5'>
          <Row>
            <Col xs={12} lg={6}>
              <div className='map-wrap'>

                <iframe src={`${contactus?.url}`} width="100%" height="600" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

              </div>

            </Col>
            <Col xs={12} lg={6}>
              <form className="was-validate" onSubmit={handleSubmit}>
                <Row>
                  <Col xs={12}>
                    <div className="aboutTxt">
                      <p className="sub-title mb-0">{contactus?.slug}</p>
                      <p>{contactus?.title}</p>
                      <div className="gry-txt" dangerouslySetInnerHTML={{ __html: contactus?.short_desc }} />
                    </div>
                  </Col>
                  <Row className='row contact-form margin-top-8'>
                  <Col xs={12} lg={6}>
                    <label>Name <span className='text-danger'><b>*</b></span></label>
                    <input 
                      type='text' 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      className='form-control mb-3'
                      required 
                    />
                  </Col>
                  <Col xs={12} lg={6}>
                    <label>Email <span className='text-danger'><b>*</b></span></label>
                    <input 
                      type='text' 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      className='form-control mb-3'
                      required 
                    />
                  </Col>
                  <Col xs={12} lg={6}>
                    <label>Phone No <span className='text-danger'><b>*</b></span></label>
                    <input 
                      type='text' 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                      className='form-control mb-3'
                      required 
                    />
                  </Col>
                  <Col xs={12} lg={6}>
                    <label>Subject <span className='text-danger'><b>*</b></span></label>
                    <input 
                      type='text' 
                      name="subject" 
                      value={formData.subject}
                      onChange={handleChange}
                      className='form-control mb-3'
                      required 
                    />
                  </Col>
                  <Col xs={12} lg={6}>
                    <label>Message <span className='text-danger'><b>*</b></span></label>
                    <textarea 
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    className='form-control h-150'
                    required 
                    ></textarea>
                  </Col>
                  <Col xs={12} lg={6}>
                    <label>Choose a file: <span className='text-danger'><b>*</b></span></label>
                    <input 
                        type='file' 
                        name="file" 
                        onChange={handleChange}
                        accept=".doc,.docx,.pdf,.ppt,.pptx"
                        className='form-control mb-3' 
                      />
                      <p className='bold-title' style={{fontSize:'12px'}}>Attach files: (File size up to 3 MB. Formats: doc, docx, pdf, ppt, pptx)</p>
                    
                  </Col>
                  </Row>
                  <Col xs={12} lg={3}>
                    <button type="submit" className='red-btn w-100 mt-3'>Submit</button>
                  </Col>
                  <Col xs={12} className='mt-3'>
                  {status && <p>{status}</p>}
                  </Col>
                </Row>
              </form>

            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}

export default ContactUs

export async function getServerSideProps() {
  const res = await HomeService.contactPage();
  const contactus = res.data?.contact || {}

  return {
    props: {
      contactus
    }
  }
}