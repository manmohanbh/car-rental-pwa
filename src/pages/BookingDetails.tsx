import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Container, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { format } from 'date-fns';

interface Booking {
  id: string;
  carId: string;
  userId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  carDetails?: {
    make: string;
    model: string;
    year: number;
    image: string;
  };
}

const BookingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        if (!id) return;
        
        const bookingDoc = await getDoc(doc(db, 'bookings', id));
        if (bookingDoc.exists()) {
          const bookingData = { id: bookingDoc.id, ...bookingDoc.data() } as Booking;
          
          // Fetch car details if not included in the booking
          if (bookingData.carId && !bookingData.carDetails) {
            const carDoc = await getDoc(doc(db, 'cars', bookingData.carId));
            if (carDoc.exists()) {
              bookingData.carDetails = carDoc.data() as any;
            }
          }
          
          setBooking(bookingData);
        } else {
          setError('Booking not found');
        }
      } catch (err) {
        console.error('Error fetching booking:', err);
        setError('Failed to load booking details');
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" onClick={() => navigate('/bookings')} className="mt-3">
          Back to My Bookings
        </Button>
      </Container>
    );
  }

  if (!booking) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">No booking details found</Alert>
        <Button variant="primary" onClick={() => navigate('/')} className="mt-3">
          Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4">Booking Details</h2>
      <Card>
        <Card.Header as="h5" className="bg-light">
          Booking #{booking.id.slice(0, 8).toUpperCase()}
        </Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col-md-6">
              <h5>Car Information</h5>
              {booking.carDetails && (
                <div className="d-flex align-items-center mb-3">
                  <img 
                    src={booking.carDetails.image || '/default-car.jpg'} 
                    alt={`${booking.carDetails.make} ${booking.carDetails.model}`} 
                    style={{ width: '200px', height: 'auto', marginRight: '20px' }}
                  />
                  <div>
                    <h4>{booking.carDetails.make} {booking.carDetails.model} ({booking.carDetails.year})</h4>
                  </div>
                </div>
              )}
              
              <h5 className="mt-4">Booking Dates</h5>
              <p>
                <strong>From:</strong> {format(new Date(booking.startDate), 'PPP')}<br />
                <strong>To:</strong> {format(new Date(booking.endDate), 'PPP')}
              </p>
              
              <h5 className="mt-4">Status</h5>
              <span className={`badge bg-${booking.status === 'confirmed' ? 'success' : 
                              booking.status === 'cancelled' ? 'danger' : 'warning'}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>
            
            <div className="col-md-6">
              <Card className="bg-light">
                <Card.Body>
                  <h5>Booking Summary</h5>
                  <hr />
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal:</span>
                    <span>${booking.totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Taxes & Fees:</span>
                    <span>${(booking.totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total:</span>
                    <span>${(booking.totalPrice * 1.1).toFixed(2)}</span>
                  </div>
                  
                  <div className="mt-4">
                    <Button 
                      variant="danger" 
                      className="me-2"
                      disabled={booking.status === 'cancelled'}
                      // Add cancel booking handler
                    >
                      Cancel Booking
                    </Button>
                    <Button 
                      variant="primary"
                      onClick={() => navigate('/')}
                    >
                      Back to Home
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BookingDetails;