// // src/components/cars/AddCarForm.tsx
// // import React, { useState } from 'react';
// // import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
// // import { useAuth } from '../../contexts/AuthContext';
// // import { db } from '../../firebase/config';
// // import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// import React, { useState } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import { db } from '../../firebase/config';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import type { DocumentData } from 'firebase/firestore';
// import { Button, Form, Alert, Row, Col } from 'react-bootstrap';

// // When creating a new car, make sure to include all required properties
// const newCar: Car = {
//   make: carData.make,           // required
//   model: carData.model,         // required
//   year: carData.year,           // required
//   pricePerDay: carData.pricePerDay, // required
//   seats: carData.seats,         // required
//   transmission: carData.transmission, // required
//   fuelType: carData.fuelType,   // required
//   description: carData.description, // required
//   available: carData.available, // required
//   imageUrl: carData.imageUrl,   // optional
//   ownerId: currentUser.uid,     // optional
//   // id and timestamps will be added by Firestore
// };

// const updatedCar: Car = {
//   id: existingCarId,  // required for updates
//   ...carData,         // spread the rest of the car data
//   updatedAt: serverTimestamp()
//   // Make sure not to overwrite these if they shouldn't change
//   // ownerId: existingCar.ownerId,
//   // createdAt: existingCar.createdAt
// };

// // Then use this object in your add/update operation
// await addDoc(collection(db, 'cars'), {
//   ...newCar,
//   createdAt: serverTimestamp(),
//   updatedAt: serverTimestamp()
// });

// interface Car extends DocumentData {
//   id?: string;
//   make: string;
//   model: string;
//   year: number;
//   pricePerDay: number;
//   seats: number;
//   transmission: string;
//   fuelType: string;
//   imageUrl?: string;
//   description: string;
//   available: boolean;
//   ownerId?: string;
//   createdAt?: any;
//   updatedAt?: any;
// }

// interface AddCarFormProps {
//   onCarAdded?: (car: Car) => void;
// }

// const AddCarForm: React.FC<AddCarFormProps> = ({ onCarAdded }) => {
//   const { currentUser } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const [carData, setCarData] = useState<Omit<Car, 'id' | 'ownerId' | 'createdAt' | 'updatedAt'>>({
//     make: '',
//     model: '',
//     year: new Date().getFullYear(),
//     pricePerDay: 0,
//     seats: 4,
//     transmission: 'automatic',
//     fuelType: 'petrol',
//     imageUrl: '',
//     description: '',
//     available: true
// });


// //     interface Car {
// //     id: string;
// //     make: string;
// //     model: string;
// //     year: number;
// //     pricePerDay: number;
// //     seats: number;
// //     transmission: string;
// //     fuelType: string;
// //     imageUrl?: string;
// //     description: string;
// //     available: boolean;
// //     ownerId?: string;
// //     createdAt?: any;
// //     updatedAt?: any;
// //     }

// //     interface AddCarFormProps {
// //   onCarAdded?: (car: Car) => void;

// //     const AddCarForm = () => {
// //     const { currentUser } = useAuth();
// //     const [loading, setLoading] = useState(false);
// //     const [error, setError] = useState('');
// //     const [success, setSuccess] = useState('');

// //     const [carData, setCarData] = useState({
// //         make: '',
// //         model: '',
// //         year: new Date().getFullYear(),
// //         pricePerDay: '',
// //         seats: 4,
// //         transmission: 'automatic',
// //         fuelType: 'petrol',
// //         imageUrl: '',
// //         description: '',
// //         available: true
// //     });
// //     }

// //     const AddCarForm: React.FC<AddCarFormProps> = ({ onCarAdded }) => {
// //     const { currentUser } = useAuth();
// //     const [loading, setLoading] = useState(false);
// //     const [error, setError] = useState('');
// //     const [success, setSuccess] = useState('');

// //     const [carData, setCarData] = useState({
// //         make: '',
// //         model: '',
// //         year: new Date().getFullYear(),
// //         pricePerDay: '',
// //         seats: 4,
// //         transmission: 'automatic',
// //         fuelType: 'petrol',
// //         imageUrl: '',
// //         description: '',
// //         available: true
// //     });



//     //   const handleSubmit = async (e: React.FormEvent) => {
//     //     e.preventDefault();
//     //     if (!currentUser) return;

//     //     try {
//     //       setLoading(true);
//     //       setError('');
//     //       setSuccess('');

//     //       await addDoc(collection(db, 'cars'), {
//     //         ...carData,
//     //         ownerId: currentUser.uid,
//     //         pricePerDay: Number(carData.pricePerDay),
//     //         year: Number(carData.year),
//     //         seats: Number(carData.seats),
//     //         createdAt: serverTimestamp(),
//     //         updatedAt: serverTimestamp()
//     //       });

//     //       setSuccess('Car added successfully!');
//     //       // Reset form
//     //       setCarData({
//     //         make: '',
//     //         model: '',
//     //         year: new Date().getFullYear(),
//     //         pricePerDay: '',
//     //         seats: 4,
//     //         transmission: 'automatic',
//     //         fuelType: 'petrol',
//     //         imageUrl: '',
//     //         description: '',
//     //         available: true
//     //       });
//     //     } catch (err) {
//     //       console.error('Error adding car:', err);
//     //       setError('Failed to add car. Please try again.');
//     //     } finally {
//     //       setLoading(false);
//     //     }
//     //   };

//     // const handleSubmit = async (e: React.FormEvent) => {
//     // e.preventDefault();
//     // if (!currentUser) return;

//     // try {
//     //     setLoading(true);
//     //     setError('');
//     //     setSuccess('');

//     //     // Add https:// if not present in the URL
//     //     let imageUrl = carData.imageUrl;
//     //     if (imageUrl && !imageUrl.startsWith('http')) {
//     //     imageUrl = `https://${imageUrl}`;
//     //     }

//     //     await addDoc(collection(db, 'cars'), {
//     //     ...carData,
//     //     imageUrl, // Use the processed URL
//     //     ownerId: currentUser.uid,
//     //     pricePerDay: Number(carData.pricePerDay),
//     //     year: Number(carData.year),
//     //     seats: Number(carData.seats),
//     //     createdAt: serverTimestamp(),
//     //     updatedAt: serverTimestamp()
//     //     });

//     //     // Rest of the success handling...
//     // } catch (err) {
//     //     console.error('Error adding car:', err);
//     //     setError('Failed to add car. Please try again.');
//     // } finally {
//     //     setLoading(false);
//     // }
//     // };



//     // In AddCarForm.tsx, update the handleSubmit function
    


//     const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!currentUser) return;

//     try {
//         setLoading(true);
//         setError('');
//         setSuccess('');

//         // Process image URL
//         let imageUrl = carData.imageUrl.trim();
//         if (imageUrl && !imageUrl.startsWith('http')) {
//         imageUrl = `https://${imageUrl}`;
//         }

//         // Add the car to Firestore
//         const docRef = await addDoc(collection(db, 'cars'), {
//         ...carData,
//         imageUrl,
//         ownerId: currentUser.uid,
//         pricePerDay: Number(carData.pricePerDay),
//         year: Number(carData.year),
//         seats: Number(carData.seats),
//         createdAt: serverTimestamp(),
//         updatedAt: serverTimestamp()
//         });

//         setSuccess('Car added successfully!');
        
//         // Reset form
//         setCarData({
//         make: '',
//         model: '',
//         year: new Date().getFullYear(),
//         pricePerDay: '',
//         seats: 4,
//         transmission: 'automatic',
//         fuelType: 'petrol',
//         imageUrl: '',
//         description: '',
//         available: true
//         });

//         // If there's an onCarAdded callback, call it
//         if (onCarAdded) {
//         onCarAdded({
//             id: docRef.id,
//             ...carData,
//             imageUrl,
//             ownerId: currentUser.uid,
//             pricePerDay: Number(carData.pricePerDay),
//             year: Number(carData.year),
//             seats: Number(carData.seats)
//         });
//         }

//     } catch (err) {
//         console.error('Error adding car:', err);
//         setError('Failed to add car. Please try again.');
//     } finally {
//         setLoading(false);
//     }
//     };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setCarData(prev => ({
//       ...prev,
//       [name]: name === 'available' ? (e.target as HTMLInputElement).checked : value
//     }));
//   };

//   return (
//     <Form onSubmit={handleSubmit} className="mt-4">
//       <h3>Add a New Car</h3>
//       {error && <Alert variant="danger">{error}</Alert>}
//       {success && <Alert variant="success">{success}</Alert>}

//       <Row>
//         <Col md={6}>
//           <Form.Group className="mb-3">
//             <Form.Label>Make *</Form.Label>
//             <Form.Control
//               type="text"
//               name="make"
//               value={carData.make}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//         </Col>
//         <Col md={6}>
//           <Form.Group className="mb-3">
//             <Form.Label>Model *</Form.Label>
//             <Form.Control
//               type="text"
//               name="model"
//               value={carData.model}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       <Row>
//         <Col md={4}>
//           <Form.Group className="mb-3">
//             <Form.Label>Year *</Form.Label>
//             <Form.Control
//               type="number"
//               name="year"
//               min="1900"
//               max={new Date().getFullYear() + 1}
//               value={carData.year}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//         </Col>
//         <Col md={4}>
//           <Form.Group className="mb-3">
//             <Form.Label>Price per day ($) *</Form.Label>
//             <Form.Control
//               type="number"
//               name="pricePerDay"
//               min="1"
//               value={carData.pricePerDay}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//         </Col>
//         <Col md={4}>
//           <Form.Group className="mb-3">
//             <Form.Label>Seats *</Form.Label>
//             <Form.Select
//               name="seats"
//               value={carData.seats}
//               onChange={handleChange}
//               required
//             >
//               {[2, 4, 5, 6, 7, 8].map(num => (
//                 <option key={num} value={num}>{num} {num === 1 ? 'seat' : 'seats'}</option>
//               ))}
//             </Form.Select>
//           </Form.Group>
//         </Col>
//       </Row>

//       <Row>
//         <Col md={6}>
//           <Form.Group className="mb-3">
//             <Form.Label>Transmission *</Form.Label>
//             <Form.Select
//               name="transmission"
//               value={carData.transmission}
//               onChange={handleChange}
//               required
//             >
//               <option value="automatic">Automatic</option>
//               <option value="manual">Manual</option>
//             </Form.Select>
//           </Form.Group>
//         </Col>
//         <Col md={6}>
//           <Form.Group className="mb-3">
//             <Form.Label>Fuel Type *</Form.Label>
//             <Form.Select
//               name="fuelType"
//               value={carData.fuelType}
//               onChange={handleChange}
//               required
//             >
//               <option value="petrol">Petrol</option>
//               <option value="diesel">Diesel</option>
//               <option value="electric">Electric</option>
//               <option value="hybrid">Hybrid</option>
//             </Form.Select>
//           </Form.Group>
//         </Col>
//       </Row>

//       {/* <Form.Group className="mb-3">
//         <Form.Label>Image URL</Form.Label>
//         <Form.Control
//           type="url"
//           name="imageUrl"
//           value={carData.imageUrl}
//           onChange={handleChange}
//           placeholder="https://example.com/car.jpg"
//         />
//       </Form.Group> */}

//       <Form.Group className="mb-3">
//         <Form.Label>Image URL</Form.Label>
//         <Form.Control
//             type="url"
//             name="imageUrl"
//             value={carData.imageUrl}
//             onChange={handleChange}
//             placeholder="https://example.com/car.jpg"
//         />
//         <Form.Text className="text-muted">
//             Enter a valid image URL (e.g., https://example.com/car.jpg)
//         </Form.Text>
//         </Form.Group>

//       <Form.Group className="mb-3">
//         <Form.Label>Description</Form.Label>
//         <Form.Control
//           as="textarea"
//           rows={3}
//           name="description"
//           value={carData.description}
//           onChange={handleChange}
//         />
//       </Form.Group>

//       <Form.Group className="mb-3">
//         <Form.Check
//           type="checkbox"
//           label="Available for rent"
//           name="available"
//           checked={carData.available}
//           onChange={handleChange}
//         />
//       </Form.Group>

//       <Button variant="primary" type="submit" disabled={loading}>
//         {loading ? 'Adding...' : 'Add Car'}
//       </Button>
//     </Form>
//   );
// };

// export default AddCarForm;

// import React, { useState } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import { db } from '../../firebase/config';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import type { DocumentData } from 'firebase/firestore';
// import { Button, Form, Alert, Row, Col } from 'react-bootstrap';
// import type { Car } from '../../types/car';

// // Interfaces should be at the top
// interface Car extends DocumentData {
//   id?: string;
//   make: string;
//   model: string;
//   year: number;
//   pricePerDay: number;
//   seats: number;
//   transmission: string;
//   fuelType: string;
//   imageUrl?: string;
//   description: string;
//   available: boolean;
//   ownerId?: string;
//   createdAt?: any;
//   updatedAt?: any;
// }

// interface AddCarFormProps {
//   onCarAdded?: (car: Car) => void;
// }

// const AddCarForm: React.FC<AddCarFormProps> = ({ onCarAdded }) => {
//   const { currentUser } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const [carData, setCarData] = useState<Omit<Car, 'id' | 'ownerId' | 'createdAt' | 'updatedAt'>>({
//     make: '',
//     model: '',
//     year: new Date().getFullYear(),
//     pricePerDay: 0,
//     seats: 4,
//     transmission: 'automatic',
//     fuelType: 'petrol',
//     imageUrl: '',
//     description: '',
//     available: true
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!currentUser) return;

//     try {
//       setLoading(true);
//       setError('');
//       setSuccess('');

//       // Create the car object with all required properties
//       const newCar: Omit<Car, 'id' | 'createdAt' | 'updatedAt'> = {
//         make: carData.make,
//         model: carData.model,
//         year: carData.year,
//         pricePerDay: carData.pricePerDay,
//         seats: carData.seats,
//         transmission: carData.transmission,
//         fuelType: carData.fuelType,
//         description: carData.description,
//         available: carData.available,
//         imageUrl: carData.imageUrl || '',
//         ownerId: currentUser.uid
//       };

//       // Add to Firestore
//       const docRef = await addDoc(collection(db, 'cars'), {
//         ...newCar,
//         createdAt: serverTimestamp(),
//         updatedAt: serverTimestamp()
//       });

//       setSuccess('Car added successfully!');
      
//       // Reset form
//       setCarData({
//         make: '',
//         model: '',
//         year: new Date().getFullYear(),
//         pricePerDay: 0,
//         seats: 4,
//         transmission: 'automatic',
//         fuelType: 'petrol',
//         imageUrl: '',
//         description: '',
//         available: true
//       });

//       // Notify parent component if needed
//       if (onCarAdded) {
//         onCarAdded({ ...newCar, id: docRef.id });
//       }

//     } catch (err) {
//       console.error('Error adding car:', err);
//       setError('Failed to add car. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
//     setCarData(prev => ({
//       ...prev,
//       [name]: type === 'number' ? Number(value) : value
//     }));
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       {error && <Alert variant="danger">{error}</Alert>}
//       {success && <Alert variant="success">{success}</Alert>}

//       <Row>
//         <Col md={6}>
//           <Form.Group className="mb-3" controlId="make">
//             <Form.Label>Make</Form.Label>
//             <Form.Control
//               type="text"
//               name="make"
//               value={carData.make}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//         </Col>
//         <Col md={6}>
//           <Form.Group className="mb-3" controlId="model">
//             <Form.Label>Model</Form.Label>
//             <Form.Control
//               type="text"
//               name="model"
//               value={carData.model}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       {/* Add other form fields here following the same pattern */}

//       <Button variant="primary" type="submit" disabled={loading}>
//         {loading ? 'Adding...' : 'Add Car'}
//       </Button>
//     </Form>
//   );
// };

// export default AddCarForm;


// src/components/cars/AddCarForm.tsx
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Button, Form, Alert, Row, Col } from 'react-bootstrap';
import type { Car } from '../../types/car';

interface AddCarFormProps {
  onCarAdded?: (car: Car) => void;
}

const AddCarForm = ({ onCarAdded }: AddCarFormProps) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [carData, setCarData] = useState<Omit<Car, 'id' | 'ownerId' | 'createdAt' | 'updatedAt'>>({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    pricePerDay: 0,
    seats: 4,
    transmission: 'automatic',
    fuelType: 'petrol',
    imageUrl: '',
    description: '',
    available: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Process image URL
      let imageUrl = carData.imageUrl.trim();
      if (imageUrl && !imageUrl.startsWith('http')) {
        imageUrl = `https://${imageUrl}`;
      }

      // Add the car to Firestore
      const docRef = await addDoc(collection(db, 'cars'), {
        ...carData,
        imageUrl,
        ownerId: currentUser.uid,
        pricePerDay: Number(carData.pricePerDay),
        year: Number(carData.year),
        seats: Number(carData.seats),
        available: Boolean(carData.available),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      setSuccess('Car added successfully!');
      
      // Reset form
      setCarData({
        make: '',
        model: '',
        year: new Date().getFullYear(),
        pricePerDay: 0,
        seats: 4,
        transmission: 'automatic',
        fuelType: 'petrol',
        imageUrl: '',
        description: '',
        available: true
      });

      // Notify parent component
      if (onCarAdded) {
        onCarAdded({
          ...carData,
          id: docRef.id,
          ownerId: currentUser.uid,
          imageUrl,
          available: Boolean(carData.available)
        });
      }

    } catch (err) {
      console.error('Error adding car:', err);
      setError('Failed to add car. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setCarData(prev => ({
      ...prev,
      [name]: type === 'number' 
        ? Number(value) 
        : type === 'checkbox' 
          ? (e.target as HTMLInputElement).checked 
          : value
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="make">
            <Form.Label>Make *</Form.Label>
            <Form.Control
              type="text"
              name="make"
              value={carData.make}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="model">
            <Form.Label>Model *</Form.Label>
            <Form.Control
              type="text"
              name="model"
              value={carData.model}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Form.Group className="mb-3" controlId="year">
            <Form.Label>Year *</Form.Label>
            <Form.Control
              type="number"
              name="year"
              min="1900"
              max={new Date().getFullYear() + 1}
              value={carData.year}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3" controlId="pricePerDay">
            <Form.Label>Price per day ($) *</Form.Label>
            <Form.Control
              type="number"
              name="pricePerDay"
              min="1"
              value={carData.pricePerDay}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3" controlId="seats">
            <Form.Label>Seats *</Form.Label>
            <Form.Select
              name="seats"
              value={carData.seats}
              onChange={handleChange}
              required
            >
              {[2, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'seat' : 'seats'}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="transmission">
            <Form.Label>Transmission *</Form.Label>
            <Form.Select
              name="transmission"
              value={carData.transmission}
              onChange={handleChange}
              required
            >
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="fuelType">
            <Form.Label>Fuel Type *</Form.Label>
            <Form.Select
              name="fuelType"
              value={carData.fuelType}
              onChange={handleChange}
              required
            >
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3" controlId="imageUrl">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="url"
          name="imageUrl"
          value={carData.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
        <Form.Text className="text-muted">
          Leave blank to use a default image
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description *</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={carData.description}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="available">
        <Form.Check
          type="checkbox"
          name="available"
          label="Available for rent"
          checked={carData.available}
          onChange={(e) => setCarData(prev => ({
            ...prev,
            available: (e.target as HTMLInputElement).checked
          }))}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Car'}
      </Button>
    </Form>
  );
};

export default AddCarForm;
