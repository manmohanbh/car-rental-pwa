import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import { 
  Container, 
  Button, 
  Row, 
  Col, 
  Card, 
  Badge,
  Carousel,
  Form
} from 'react-bootstrap';
import { 
  ArrowLeft as FaArrowLeft, 
  Check as FaCheck, 
  Star as FaStar, 
  CarFront as FaCar, 
  Person as FaUser,
  Calendar as FaCalendarAlt
} from 'react-bootstrap-icons';

// Define the Car type based on your data structure
interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  pricePerDay: number;
  rating: number;
  location: string;
  transmission: string;
  seats: number;
  fuelType: string;
  mileage: string;
  description: string;
  features: string[];
  images: string[];
  owner: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    reviews: number;
  };
}

const CarDetail = () => {
  const { currentUser } = useAuth();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  // Mock data fetch - replace with actual API call
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        // This would be an actual API call in a real app
        const mockCar: Car = {
          id: id || '1',
          make: 'Toyota',
          model: 'Camry',
          year: 2022,
          pricePerDay: 89,
          rating: 4.8,
          location: 'New York, NY',
          transmission: 'Automatic',
          seats: 5,
          fuelType: 'Hybrid',
          mileage: '12,345 miles',
          description: 'This well-maintained Toyota Camry offers a smooth ride with excellent fuel efficiency. Perfect for city driving and long road trips alike.',
          features: ['Bluetooth', 'Backup Camera', 'Keyless Entry', 'Apple CarPlay', 'Heated Seats', 'Sunroof'],
          images: [
            'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1503376785-2a5b5c5160f3?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo 1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80'
          ],
          owner: {
            id: 'owner1',
            name: 'John Doe',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            rating: 4.9,
            reviews: 24
          }
        };
        
        setCar(mockCar);
      } catch (error) {
        console.error('Error fetching car details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  // Calculate total price when dates change
  // useEffect(() => {
  //   if (startDate && endDate && car) {
  //     const start = new Date(startDate);
  //     const end = new Date(endDate);
  //     const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  //     setTotalPrice(days * car.pricePerDay);
  //   } else {
  //     setTotalPrice(0);
  //   }
  // }, [startDate, endDate, car]);


  useEffect(() => {
    if (startDate && endDate && car) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      // Ensure end date is after start date
      if (end > start) {
        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        setTotalPrice(days * car.pricePerDay);
      } else {
        setTotalPrice(0);
      }
    } else {
      setTotalPrice(0);
    }
  }, [startDate, endDate, car]);

  // const handleBookNow = () => {
  //   // Handle booking logic here
  //   alert(`Booking confirmed for ${car?.make} ${car?.model} from ${startDate} to ${endDate}`);
  // };



  // const handleBookNow = async () => {
  //   if (!currentUser || !car) return;

  //   try {
  //     const bookingData = {
  //       carId: car.id,
  //       userId: currentUser.uid,
  //       startDate: new Date(startDate),
  //       endDate: new Date(endDate),
  //       totalPrice: totalPrice + 10, // Including service fee
  //       status: 'confirmed',
  //       createdAt: serverTimestamp(),
  //       carDetails: {
  //         make: car.make,
  //         model: car.model,
  //         year: car.year,
  //         image: car.images[0] || '',
  //       }
  //     };

  //     const docRef = await addDoc(collection(db, 'bookings'), bookingData);
  //     console.log('Booking created with ID: ', docRef.id);
      
  //     // Show success message and redirect
  //     alert(`Booking confirmed for ${car.make} ${car.model} from ${startDate} to ${endDate}`);
  //     navigate('/bookings'); // Redirect to bookings page
  //   } catch (error) {
  //     console.error('Error creating booking:', error);
  //     alert('Failed to create booking. Please try again.');
  //   }
  // };

  const handleBookNow = async () => {
  if (!currentUser) {
    console.error('No user logged in');
    alert('Please log in to book a car');
    return;
  }

  if (!car) {
    console.error('No car data available');
    alert('Car information is not available. Please try again.');
    return;
  }

  try {
    console.log('Creating booking with data:', {
      carId: car.id,
      userId: currentUser.uid,
      startDate,
      endDate,
      totalPrice: totalPrice + 10,
      status: 'confirmed'
    });

    const bookingData = {
      carId: car.id,
      userId: currentUser.uid,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalPrice: totalPrice + 10, // Including service fee
      status: 'confirmed',
      createdAt: serverTimestamp(),
      carDetails: {
        make: car.make,
        model: car.model,
        year: car.year,
        image: car.images[0] || '',
        pricePerDay: car.pricePerDay
      }
    };

    console.log('Sending to Firestore...');
    const docRef = await addDoc(collection(db, 'bookings'), bookingData);
    console.log('Booking created with ID: ', docRef.id);
    
    // Show success message and redirect
    alert(`Booking confirmed for ${car.make} ${car.model} from ${startDate} to ${endDate}`);
    navigate('/bookings');
  } catch (error) {
    console.error('Detailed error:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    alert(`Failed to create booking: ${error.message || 'Unknown error'}`);
  }
};

  const handleContactOwner = () => {
    // Handle contact owner logic
    alert(`Contacting ${car?.owner.name} about ${car?.make} ${car?.model}`);
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  if (!car) {
    return (
      <Container className="py-5 text-center">
        <h2>Car not found</h2>
        <Button variant="primary" onClick={() => navigate('/cars')} className="mt-3">
          Browse Available Cars
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Button 
        variant="link" 
        onClick={() => navigate(-1)} 
        className="mb-3 px-0 d-flex align-items-center text-decoration-none"
      >
        <FaArrowLeft className="me-2" /> Back to results
      </Button>

      <Row className="g-4">
        {/* Car Images */}
        <Col lg={8}>
          <Card className="mb-4">
            <Carousel 
              activeIndex={activeIndex} 
              onSelect={setActiveIndex}
              indicators={false}
              variant="dark"
            >
              {car.images.map((img, idx) => (
                <Carousel.Item key={idx}>
                  <div 
                    className="car-image" 
                    style={{ 
                      height: '500px', 
                      backgroundImage: `url(${img})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '0.25rem'
                    }} 
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            <div className="d-flex justify-content-center mt-2">
              {car.images.map((_, idx) => (
                <Button
                  key={idx}
                  variant={activeIndex === idx ? 'primary' : 'outline-secondary'}
                  className="rounded-circle mx-1 p-0"
                  style={{ width: '10px', height: '10px' }}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </Card>

          {/* Car Details */}
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h2 className="mb-1">{car.year} {car.make} {car.model}</h2>
                  <div className="d-flex align-items-center text-muted mb-2">
                    <FaCheck className="me-2" />
                    <span>{car.location}</span>
                    <span className="mx-2">•</span>
                    <FaStar className="text-warning me-1" />
                    <span>{car.rating} ({Math.floor(car.rating * 20)} reviews)</span>
                  </div>
                </div>
                <div className="text-end">
                  <h3 className="text-primary mb-0">${car.pricePerDay}</h3>
                  <small className="text-muted">per day</small>
                </div>
              </div>

              <div className="d-flex flex-wrap gap-3 mb-4">
                <div className="d-flex align-items-center">
                  <FaCar className="me-2 text-muted" />
                  <span>{car.transmission}</span>
                </div>
                <div className="d-flex align-items-center">
                  <FaUser className="me-2 text-muted" />
                  <span>{car.seats} {car.seats === 1 ? 'seat' : 'seats'}</span>
                </div>
                <div className="d-flex align-items-center">
                  <FaCar className="me-2 text-muted" />
                  <span>{car.fuelType}</span>
                </div>
                <div className="d-flex align-items-center">
                  <FaCar className="me-2 text-muted" />
                  <span>{car.mileage}</span>
                </div>
              </div>

              <div className="mb-4">
                <h5>About this car</h5>
                <p>{car.description}</p>
              </div>

              <div className="mb-4">
                <h5>Features</h5>
                <div className="d-flex flex-wrap gap-2">
                  {car.features.map((feature, idx) => (
                    <Badge key={idx} bg="light" text="dark" className="px-3 py-2 me-2 mb-2">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h5>Owner</h5>
                <div className="d-flex align-items-center">
                  <img 
                    src={car.owner.avatar} 
                    alt={car.owner.name} 
                    className="rounded-circle me-3"
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                  <div>
                    <h6 className="mb-0">{car.owner.name}</h6>
                    <div className="d-flex align-items-center text-muted small">
                      <FaStar className="text-warning me-1" />
                      <span>{car.owner.rating} ({car.owner.reviews} reviews)</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    className="ms-auto"
                    onClick={handleContactOwner}
                  >
                    Contact Owner
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Booking Form */}
        <Col lg={4}>
          <Card className="sticky-top" style={{ top: '20px' }}>
            <Card.Body>
              <h4 className="mb-4">Book this car</h4>
              
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Pickup Date</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaCalendarAlt />
                    </span>
                    <Form.Control 
                      type="date" 
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Return Date</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaCalendarAlt />
                    </span>
                    <Form.Control 
                      type="date" 
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate || new Date().toISOString().split('T')[0]}
                      disabled={!startDate}
                      required
                    />
                  </div>
                </Form.Group>

                <div className="d-flex justify-content-between mb-3">
                  <span>${car.pricePerDay} x {totalPrice ? (totalPrice / car.pricePerDay) : 0} days</span>
                  <span>${totalPrice || '0.00'}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Service fee</span>
                  <span>$10.00</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4 fw-bold">
                  <span>Total</span>
                  <span>${totalPrice ? totalPrice + 10 : '0.00'}</span>
                </div>

                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-100 mb-3"
                  onClick={handleBookNow}
                  disabled={!startDate || !endDate}
                >
                  Book Now
                </Button>

                <div className="text-center small text-muted">
                  You won't be charged yet
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CarDetail;
