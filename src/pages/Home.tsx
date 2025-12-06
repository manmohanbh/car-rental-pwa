import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4">Find Your Perfect Ride</h1>
              <p className="lead mb-4">
                Discover the perfect car for your next adventure. Choose from a wide range of vehicles at competitive prices.
              </p>
              <div className="d-flex gap-3">
                <Button as={Link} to="/cars" variant="primary" size="lg">
                  Browse Cars
                </Button>
                <Button as={Link} to="/bookings" variant="outline-primary" size="lg">
                  My Bookings
                </Button>
              </div>
            </Col>
            {/* <Col lg={6}>
              <img 
                src="/images/hero-car.jpg" 
                alt="Luxury Car" 
                className="img-fluid rounded-3 shadow"
                style={{ maxHeight: '400px' }}
              />
            </Col> */}
            <Col lg={6}>
              <img 
                src="/images/hero-car1.jpg"
                alt="Luxury Car Rental" 
                className="img-fluid rounded-3 shadow"
                style={{ 
                  maxHeight: '400px',
                  width: '100%',
                  objectFit: 'cover',
                  borderRadius: '0.5rem'
                }}
              />
            </Col>
            {/* <Col lg={6}>
              <img 
                src="https://images.unsplash.com/photo-1503376785-2a5b5c5160f3?auto=format&fit=crop&w=1200&q=80" 
                alt="Luxury Car Rental" 
                className="img-fluid rounded-3 shadow"
                style={{ 
                  maxHeight: '400px',
                  width: '100%',
                  objectFit: 'cover',
                  borderRadius: '0.5rem'
                }}
              />
            </Col> */}
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <Container>
          <h2 className="text-center mb-5">Why Choose Us</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <div className="d-flex justify-content-center mt-3">
                  <div 
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '3px solid #f8f9fa'
                    }}
                  >
                    <img 
                      src="https://picsum.photos/200/200?grayscale&blur=1" 
                      alt="Luxury Car"
                      onError={(e) => {
                        // Fallback to a local image if the external one fails
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/images/placeholder-car.jpg';
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                </div>
                <Card.Body className="text-center p-4">
                  <h4>Wide Selection</h4>
                  <p className="text-muted">Choose from a variety of vehicles to suit your needs.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-1 shadow-sm">
                <div className="d-flex justify-content-center mt-3">
                  <div 
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '3px solid #f8f9fa'
                    }}
                  >
                    <img 
                      src="https://picsum.photos/200/200?grayscale&blur=1" 
                      alt="Luxury Car"
                      onError={(e) => {
                        // Fallback to a local image if the external one fails
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/images/placeholder-car.jpg';
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                </div>
                <Card.Body className="text-center p-4">
                  <h4>Best Prices</h4>
                  <p className="text-muted">Competitive rates with no hidden fees.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <div className="d-flex justify-content-center mt-3">
                  <div 
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '3px solid #f8f9fa'
                    }}
                  >
                    <img 
                      src="https://picsum.photos/200/200?grayscale&blur=1" 
                      alt="Luxury Car"
                      onError={(e) => {
                        // Fallback to a local image if the external one fails
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/images/placeholder-car.jpg';
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                </div>
                <Card.Body className="text-center p-4">
                  <h4>24/7 Support</h4>
                  <p className="text-muted">We're here to help you anytime, anywhere.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

        </Container>
      </section>

      {/* Call to Action */}
      <section className="cta-section py-5 bg-primary text-white">
        <Container className="text-center">
          <h2 className="mb-4">Ready to hit the road?</h2>
          <p className="lead mb-4">Book your perfect car now and enjoy your journey!</p>
          <Button as={Link} to="/cars" variant="light" size="lg" className="px-4">
            Book Now
          </Button>
        </Container>
      </section>
    </div>
  );
};

export default Home;
