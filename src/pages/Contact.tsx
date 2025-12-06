import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const Contact: React.FC = () => {
  return (
    <Container className="py-5">
      <h1 className="mb-4">Contact Us</h1>
      <Row>
        <Col lg={6} className="mb-4 mb-lg-0">
          <h4>Get in Touch</h4>
          <p className="text-muted">
            Have questions or need assistance? Fill out the form and our team will get back to you as soon as possible.
          </p>
          
          <div className="mt-4">
            <h5>Contact Information</h5>
            <p>
              <i className="bi bi-geo-alt me-2"></i> 123 Car Street, Auto City, 10001<br />
              <i className="bi bi-telephone me-2"></i> +1 (555) 123-4567<br />
              <i className="bi bi-envelope me-2"></i> info@carrental.com
            </p>
          </div>
        </Col>
        
        <Col lg={6}>
          <Form>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Your name" required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Your email" required />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group controlId="formSubject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control type="text" placeholder="Subject" required />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group controlId="formMessage">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={4} placeholder="Your message" required />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Button variant="primary" type="submit">
                  Send Message
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;