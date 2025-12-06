// // src/pages/Cars.tsx
// import React from 'react';
// import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

// const Cars: React.FC = () => {
//   // Mock data for cars
//   const cars = [
//     {
//       id: 1,
//       name: 'Toyota Camry',
//       type: 'Sedan',
//       price: 50,
//       image: '/images/camry.jpg',
//       features: ['Automatic', '5 Seats', 'Air Conditioning']
//     },
//     {
//       id: 2,
//       name: 'Honda CR-V',
//       type: 'SUV',
//       price: 70,
//       image: '/images/crv.jpg',
//       features: ['Automatic', '5 Seats', '4WD', 'Spacious']
//     },
//     {
//       id: 3,
//       name: 'BMW 3 Series',
//       type: 'Luxury',
//       price: 120,
//       image: '/images/bmw.jpg',
//       features: ['Automatic', '5 Seats', 'Premium Sound', 'Leather Seats']
//     }
//   ];

//   return (
//     <Container className="py-5">
//       <h1 className="mb-5 text-center">Our Fleet</h1>
      
//       {/* Search and Filter Section */}
//       <div className="mb-5 p-4 bg-light rounded-3 shadow-sm">
//         <Row className="g-3">
//           <Col md={4}>
//             <Form.Group>
//               <Form.Label>Pick-up Location</Form.Label>
//               <Form.Select>
//                 <option>Select location</option>
//                 <option>New York</option>
//                 <option>Los Angeles</option>
//                 <option>Chicago</option>
//               </Form.Select>
//             </Form.Group>
//           </Col>
//           <Col md={3}>
//             <Form.Group>
//               <Form.Label>Pick-up Date</Form.Label>
//               <Form.Control type="date" />
//             </Form.Group>
//           </Col>
//           <Col md={3}>
//             <Form.Group>
//               <Form.Label>Return Date</Form.Label>
//               <Form.Control type="date" />
//             </Form.Group>
//           </Col>
//           <Col md={2} className="d-flex align-items-end">
//             <Button variant="primary" className="w-100">
//               Search
//             </Button>
//           </Col>
//         </Row>
//       </div>

//       {/* Cars Grid */}
//       <Row xs={1} md={2} lg={3} className="g-4">
//         {cars.map((car) => (
//           <Col key={car.id}>
//             <Card className="h-100 shadow-sm">
//               <div 
//                 className="bg-light" 
//                 style={{ 
//                   height: '200px', 
//                   backgroundImage: `url(${car.image})`, 
//                   backgroundSize: 'cover',
//                   backgroundPosition: 'center'
//                 }} 
//               />
//               <Card.Body>
//                 <Card.Title>{car.name}</Card.Title>
//                 <Card.Subtitle className="mb-2 text-muted">{car.type}</Card.Subtitle>
//                 <div className="d-flex justify-content-between align-items-center mb-3">
//                   <span className="h4 mb-0">${car.price}<small className="text-muted">/day</small></span>
//                   <Button variant="primary">Book Now</Button>
//                 </div>
//                 <div className="d-flex flex-wrap gap-2">
//                   {car.features.map((feature, index) => (
//                     <span key={index} className="badge bg-light text-dark border">
//                       {feature}
//                     </span>
//                   ))}
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default Cars;



// src/pages/Cars.tsx
import React from 'react';
import CarSearch from '../components/cars/CarSearch';

const Cars: React.FC = () => {
  return <CarSearch />;
};

export default Cars;