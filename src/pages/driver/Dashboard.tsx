// // src/pages/driver/Dashboard.tsx
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';

// export default function DriverDashboard() {
//   const { currentUser, logout } = useAuth();

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <nav className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex">
//               <div className="flex-shrink-0 flex items-center">
//                 <h1 className="text-xl font-bold text-gray-900">Driver Dashboard</h1>
//               </div>
//               <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
//                 <Link
//                   to="/driver/dashboard"
//                   className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
//                 >
//                   My Vehicles
//                 </Link>
//                 <Link
//                   to="/driver/bookings"
//                   className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
//                 >
//                   Bookings
//                 </Link>
//               </div>
//             </div>
//             <div className="hidden sm:ml-6 sm:flex sm:items-center">
//               <button
//                 onClick={logout}
//                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Sign out
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="py-10">
//         <header>
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <h1 className="text-3xl font-bold text-gray-900">Welcome back, {currentUser?.email}</h1>
//           </div>
//         </header>
//         <main>
//           <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//             <div className="px-4 py-8 sm:px-0">
//               <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
//                 <p className="text-gray-500">Your dashboard content will appear here</p>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }


// src/pages/driver/Dashboard.tsx
// import { useCallback, useEffect, useState } from 'react';
// import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
// import { useAuth } from '../../contexts/AuthContext';
// import { db } from '../../firebase/config';
// import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
// import AddCarForm from '../../components/cars/AddCarForm';
// import type { Car } from '../../types/car';


// const DriverDashboard = () => {
//   const { currentUser } = useAuth();
//   const [cars, setCars] = useState<Car[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchCars = useCallback(async () => {
//     if (!currentUser) return;

//     try {
//       setLoading(true);
//       setError('');

//       // Query cars where ownerId matches the current user
//       const q = query(
//         collection(db, 'cars'),
//         where('ownerId', '==', currentUser.uid)
//       );
      
//       const querySnapshot = await getDocs(q);
//       const carsData = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       })) as Car[];

//       setCars(carsData);
//     } catch (err) {
//       console.error('Error fetching cars:', err);
//       setError('Failed to load cars. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   }, [currentUser]);

//     fetchCars();
//   },[fetchCars]);  /* [currentUser]); */

//   const handleDeleteCar = async (carId: string) => {
//     if (!window.confirm('Are you sure you want to delete this car?')) return;

//     try {
//       await deleteDoc(doc(db, 'cars', carId));
//       setCars(cars.filter(car => car.id !== carId));
//     } catch (err) {
//       console.error('Error deleting car:', err);
//       setError('Failed to delete car. Please try again.');
//     }
//   };

//   // const handleCarAdded = (newCar: Car) => {
//   //   setCars([...cars, newCar]);
//   // };

//   const handleCarAdded = (newCar: Car) => {
//     if (newCar.id) {  // Ensure id exists before adding
//       setCars(prevCars => [...prevCars, newCar]);
//     }
//   };

//   if (!currentUser) {
//     return <div>Please log in to view the dashboard.</div>;
//   }

//   return (
//     <Container className="py-4">
//       <h2 className="mb-4">Driver Dashboard</h2>
      
//       <Row>
//         <Col md={4}>
//           <Card className="mb-4">
//             <Card.Body>
//               <Card.Title>Add New Car</Card.Title>
//               {/* <AddCarForm /> */}
//               {/* <AddCarForm onCarAdded={(newCar) => {
//                 setCars(prevCars => [...prevCars, newCar]);
//               }} /> */}
//               <AddCarForm onCarAdded={handleCarAdded} />
//             </Card.Body>
//           </Card>
//         </Col>
        
//         <Col md={8}>
//           <h3 className="mb-3">My Cars</h3>
//           {error && <Alert variant="danger">{error}</Alert>}
          
//           {loading ? (
//             <div className="text-center">
//               <Spinner animation="border" />
//             </div>
//           ) : cars.length === 0 ? (
//             <Alert variant="info">You haven't added any cars yet.</Alert>
//           ) : (
//             <Row>
//               {cars.map(car => (
//                 <Col key={car.id} md={6} className="mb-4">
//                   {/* <Card>
//                     {car.imageUrl && (
//                       <Card.Img variant="top" src={car.imageUrl} style={{ height: '180px', objectFit: 'cover' }} />
//                     )}
//                     <Card.Body>
//                       <Card.Title>{car.year} {car.make} {car.model}</Card.Title>
//                       <Card.Text>
//                         <strong>${car.pricePerDay}</strong> per day<br />
//                         {car.available ? (
//                           <span className="text-success">Available</span>
//                         ) : (
//                           <span className="text-danger">Not Available</span>
//                         )}
//                       </Card.Text>
//                       <div className="d-flex justify-content-between">
//                         <Button variant="outline-primary" size="sm">Edit</Button>
//                         <Button 
//                           variant="outline-danger" 
//                           size="sm"
//                           onClick={() => handleDeleteCar(car.id)}
//                         >
//                           Delete
//                         </Button>
//                       </div>
//                     </Card.Body>
//                   </Card> */}

//                   {/* <Card>
//                     <div style={{ height: '180px', overflow: 'hidden', backgroundColor: '#f8f9fa' }}>
//                       {car.imageUrl ? (
//                         <Card.Img 
//                           variant="top" 
//                           src={car.imageUrl} 
//                           style={{ 
//                             width: '100%', 
//                             height: '100%', 
//                             objectFit: 'cover',
//                             objectPosition: 'center'
//                           }} 
//                           onError={(e) => {
//                             // If image fails to load, show a placeholder
//                             const target = e.target as HTMLImageElement;
//                             target.onerror = null; // Prevent infinite loop
//                             target.src = 'https://via.placeholder.com/300x180?text=Car+Image';
//                           }}
//                         />
//                       ) : (
//                         <div className="d-flex align-items-center justify-content-center h-100 text-muted">
//                           No Image Available
//                         </div>
//                       )}
//                     </div>
//                   </Card> */}

//                   <Card>
//                     <div style={{ 
//                       height: '180px', 
//                       backgroundColor: '#f8f9fa',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       overflow: 'hidden'
//                     }}>
//                       {car.imageUrl ? (
//                         <img 
//                           src={car.imageUrl} 
//                           alt={`${car.make} ${car.model}`}
//                           style={{ 
//                             width: '100%',
//                             height: '100%',
//                             objectFit: 'cover'
//                           }}
//                           onError={(e) => {
//                             const target = e.target as HTMLImageElement;
//                             target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20300%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Crect%20width%3D%22300%22%20height%3D%22180%22%20fill%3D%22%23f8f9fa%22%2F%3E%3Ctext%20x%3D%22150%22%20y%3D%2290%22%20font-family%3D%22sans-serif%22%20font-size%3D%2216%22%20text-anchor%3D%22middle%22%20fill%3D%22%236c757d%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fsvg%3E';
//                             target.alt = 'Image not available';
//                           }}
//                         />
//                       ) : (
//                         <div className="text-muted">No Image</div>
//                       )}
//                     </div>
//                     <Card.Body>
//                       <Card.Title>{car.year} {car.make} {car.model}</Card.Title>
//                       <Card.Text>
//                         <strong>${car.pricePerDay}</strong> per day<br />
//                         {car.available ? (
//                           <span className="text-success">Available</span>
//                         ) : (
//                           <span className="text-danger">Not Available</span>
//                         )}
//                       </Card.Text>
//                       <div className="d-flex justify-content-between">
//                         <Button variant="outline-primary" size="sm">Edit</Button>
//                         <Button 
//                           variant="outline-danger" 
//                           size="sm"
//                           onClick={() => handleDeleteCar(car.id)}
//                         >
//                           Delete
//                         </Button>
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               ))}
//             </Row>
//           )}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default DriverDashboard;

// src/pages/driver/Dashboard.tsx
import { useCallback, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase/config';
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import AddCarForm from '../../components/cars/AddCarForm';
import type { Car } from '../../types/car';

const DriverDashboard = () => {
  const { currentUser } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCars = useCallback(async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      setError('');

      const q = query(
        collection(db, 'cars'),
        where('ownerId', '==', currentUser.uid)
      );
      
      const querySnapshot = await getDocs(q);
      const carsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Car[];

      setCars(carsData);
    } catch (err) {
      console.error('Error fetching cars:', err);
      setError('Failed to load cars. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const handleDeleteCar = async (carId: string) => {
    if (!window.confirm('Are you sure you want to delete this car?')) return;
    if (!currentUser) return;

    try {
      await deleteDoc(doc(db, 'cars', carId));
      setCars(prevCars => prevCars.filter(car => car.id !== carId));
    } catch (err) {
      console.error('Error deleting car:', err);
      setError('Failed to delete car. Please try again.');
    }
  };

  const handleCarAdded = (newCar: Car) => {
    if (newCar.id) {
      setCars(prevCars => [...prevCars, newCar]);
    }
  };

  if (!currentUser) {
    return <div>Please log in to view this page.</div>;
  }

  return (
    <Container className="py-4">
      <h2>Your Cars</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Add New Car</Card.Title>
              <AddCarForm onCarAdded={handleCarAdded} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {loading ? (
          <Spinner animation="border" />
        ) : (
          cars.map(car => (
            <Col key={car.id} md={4} className="mb-4">
              <Card>
                {car.imageUrl && (
                  <Card.Img variant="top" src={car.imageUrl} alt={`${car.make} ${car.model}`} />
                )}
                <Card.Body>
                  <Card.Title>{car.make} {car.model} ({car.year})</Card.Title>
                  <Card.Text>
                    ${car.pricePerDay} per day<br />
                    {car.seats} seats • {car.transmission} • {car.fuelType}<br />
                    {car.available ? 'Available' : 'Not Available'}
                  </Card.Text>
                  <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={() => car.id && handleDeleteCar(car.id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default DriverDashboard;