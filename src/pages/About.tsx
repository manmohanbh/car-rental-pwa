// src/pages/About.tsx
import React from 'react';
import { Container } from 'react-bootstrap';

const About: React.FC = () => {
  return (
    <Container className="py-5">
      <h1 className="mb-4">About Us</h1>
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <p className="lead">
            Welcome to CarRental, your trusted partner for car rental services. We provide high-quality vehicles at competitive prices.
          </p>
          <p>
            Our mission is to make car rental easy, convenient, and affordable for everyone. 
            Whether you need a car for business, vacation, or just a day out, we've got you covered.
          </p>
          <p>
            With a wide selection of vehicles and excellent customer service, we ensure a smooth and enjoyable rental experience.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default About;


