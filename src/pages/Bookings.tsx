// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { collection, query, where, getDocs, getDoc, doc, Timestamp } from 'firebase/firestore';
// import { db } from '../firebase/config';
// import { useAuth } from '../contexts/AuthContext';
// import { Container, Card, Button, Spinner, Alert, Row, Col } from 'react-bootstrap';
// import { format } from 'date-fns';

// interface Booking {
//   id: string;
//   carId: string;
//   userId: string;
//   startDate: Timestamp;  // Changed from Date to Timestamp
//   endDate: Timestamp;    // Changed from Date to Timestamp
//   totalPrice: number;
//   status: string;
//   createdAt: Timestamp;  // Changed from Date to Timestamp
//   carDetails?: {
//     make: string;
//     model: string;
//     year: number;
//     image: string;
//     pricePerDay: number;
//   };
// }

// const Bookings: React.FC = () => {
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const { currentUser } = useAuth();

//   useEffect(() => {

//     const fetchBookings = async () => {
//     try {
//         if (!currentUser) {
//         console.log('No current user');
//         return;
//         }

//         console.log('Current user UID:', currentUser.uid);
//         console.log('Fetching bookings...');
        
//         const q = query(
//         collection(db, 'bookings'),
//         where('userId', '==', currentUser.uid)
//         );

//         const querySnapshot = await getDocs(q);
//         console.log(`Found ${querySnapshot.size} bookings`);

//         const bookingsData: Booking[] = [];

//         for (const bookingDoc of querySnapshot.docs) {
//         try {
//             console.log('Processing booking:', bookingDoc.id, bookingDoc.data());
//             const bookingData = { 
//             id: bookingDoc.id, 
//             ...bookingDoc.data() 
//             } as Booking;
            
//             if (bookingData.carId) {
//             console.log('Fetching car details for carId:', bookingData.carId);
//             const carDoc = await getDoc(doc(db, 'cars', bookingData.carId));  // Fixed this line
//             if (carDoc.exists()) {
//                 bookingData.carDetails = carDoc.data();
//                 console.log('Car details found:', bookingData.carDetails);
//             } else {
//                 console.log('No car found with ID:', bookingData.carId);
//             }
//             }
//             bookingsData.push(bookingData);
//         } catch (error) {
//             console.error('Error processing booking:', error);
//         }
//         }

//         console.log('Final bookings data:', bookingsData);
//         setBookings(bookingsData);
//     } catch (error) {
//         console.error('Error fetching bookings:', error);
//         setError('Failed to load bookings. Please try again later.');
//     } finally {
//         setLoading(false);
//     }
//     };

//     fetchBookings();
//   }, [currentUser]);

//   if (loading) {
//     return (
//       <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
//         <Spinner animation="border" />
//       </Container>
//     );
//   }

//   return (
//     <Container className="my-5">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>My Bookings</h2>
//         <Button as={Link} to="/" variant="outline-primary">
//           Back to Home
//         </Button>
//       </div>

//       {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

//       {bookings.length === 0 ? (
//         <Card>
//           <Card.Body className="text-center py-5">
//             <h4>No bookings found</h4>
//             <p className="text-muted">You haven't made any bookings yet.</p>
//             <Button as={Link} to="/cars" variant="primary" className="mt-3">
//               Browse Cars
//             </Button>
//           </Card.Body>
//         </Card>
//       ) : (
//         <Row>
//           {bookings.map((booking) => (
//             <Col key={booking.id} md={6} lg={4} className="mb-4">
//               <Card>
//                 {booking.carDetails?.image && (
//                   <Card.Img 
//                     variant="top" 
//                     src={booking.carDetails.image} 
//                     alt={`${booking.carDetails.make} ${booking.carDetails.model}`}
//                     style={{ height: '200px', objectFit: 'cover' }}
//                   />
//                 )}
//                 <Card.Body>
//                   <Card.Title>
//                     {booking.carDetails ? 
//                       `${booking.carDetails.make} ${booking.carDetails.model}` : 
//                       'Car Details Not Available'}
//                   </Card.Title>
//                   <Card.Text>
//                     <strong>Dates:</strong> {format(new Date(booking.startDate.toDate()), 'MMM d, yyyy')} - {format(new Date(booking.endDate.toDate()), 'MMM d, yyyy')}<br />
//                     <strong>Total:</strong> ${booking.totalPrice.toFixed(2)}<br />
//                     <span className={`badge bg-${booking.status === 'confirmed' ? 'success' : 
//                                    booking.status === 'cancelled' ? 'danger' : 'warning'}`}>
//                       {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
//                     </span>
//                   </Card.Text>
//                   <Button 
//                     as={Link} 
//                     to={`/booking/${booking.id}`} 
//                     variant="primary" 
//                     className="w-100"
//                   >
//                     View Details
//                   </Button>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default Bookings;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, getDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import { Container, Card, Button, Spinner, Alert, Row, Col } from 'react-bootstrap';
import { format } from 'date-fns';

interface Booking {
  id: string;
  carId: string;
  userId: string;
  startDate: Timestamp;
  endDate: Timestamp;
  totalPrice: number;
  status: string;
  createdAt: Timestamp;
  carDetails?: {
    make: string;
    model: string;
    year: number;
    image: string;
    pricePerDay: number;
  };
}

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!currentUser) {
          console.log('No current user');
          return;
        }

        console.log('Current user UID:', currentUser.uid);
        console.log('Fetching bookings...');
        
        const q = query(
          collection(db, 'bookings'),
          where('userId', '==', currentUser.uid)
        );

        const querySnapshot = await getDocs(q);
        console.log(`Found ${querySnapshot.size} bookings`);

        const bookingsData: Booking[] = [];

        for (const bookingDoc of querySnapshot.docs) {
          try {
            console.log('Processing booking:', bookingDoc.id, bookingDoc.data());
            const bookingData = { 
              id: bookingDoc.id, 
              ...bookingDoc.data() 
            } as Booking;
            
            if (bookingData.carId) {
              console.log('Fetching car details for carId:', bookingData.carId);
              try {
                const carDoc = await getDoc(doc(db, 'cars', bookingData.carId));
                if (carDoc.exists()) {
                  const carData = carDoc.data();
                  if (carData) {
                    bookingData.carDetails = {
                      make: carData.make || 'Unknown',
                      model: carData.model || 'Unknown',
                      year: carData.year || new Date().getFullYear(),
                      image: carData.image || '',
                      pricePerDay: carData.pricePerDay || 0
                    };
                    console.log('Car details found:', bookingData.carDetails);
                  }
                } else {
                  console.log('No car found with ID:', bookingData.carId);
                  bookingData.carDetails = {
                    make: 'Unknown',
                    model: 'Car not found',
                    year: new Date().getFullYear(),
                    image: '',
                    pricePerDay: 0
                  };
                }
              } catch (error) {
                console.error('Error fetching car details:', error);
                bookingData.carDetails = {
                  make: 'Error',
                  model: 'Could not load car details',
                  year: new Date().getFullYear(),
                  image: '',
                  pricePerDay: 0
                };
              }
            }
            bookingsData.push(bookingData);
          } catch (error) {
            console.error('Error processing booking:', error);
          }
        }

        console.log('Final bookings data:', bookingsData);
        setBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to load bookings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [currentUser]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Bookings</h2>
        <Button as={Link} to="/" variant="outline-primary">
          Back to Home
        </Button>
      </div>

      {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

      {bookings.length === 0 ? (
        <Card>
          <Card.Body className="text-center py-5">
            <h4>No bookings found</h4>
            <p className="text-muted">You haven't made any bookings yet.</p>
            <Button as={Link} to="/cars" variant="primary" className="mt-3">
              Browse Cars
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          {bookings.map((booking) => (
            <Col key={booking.id} md={6} lg={4} className="mb-4">
              <Card>
                {booking.carDetails?.image && (
                  <Card.Img 
                    variant="top" 
                    src={booking.carDetails.image} 
                    alt={`${booking.carDetails.make} ${booking.carDetails.model}`}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <Card.Body>
                  <Card.Title>
                    {booking.carDetails ? 
                      `${booking.carDetails.make} ${booking.carDetails.model}` : 
                      'Car Details Not Available'}
                  </Card.Title>
                  <Card.Text>
                    <strong>Dates:</strong> {format(new Date(booking.startDate.toDate()), 'MMM d, yyyy')} - {format(new Date(booking.endDate.toDate()), 'MMM d, yyyy')}<br />
                    <strong>Total:</strong> ${booking.totalPrice.toFixed(2)}<br />
                    <span className={`badge bg-${booking.status === 'confirmed' ? 'success' : 
                                   booking.status === 'cancelled' ? 'danger' : 'warning'}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </Card.Text>
                  <Button 
                    as={Link} 
                    to={`/booking/${booking.id}`} 
                    variant="primary" 
                    className="w-100"
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Bookings;