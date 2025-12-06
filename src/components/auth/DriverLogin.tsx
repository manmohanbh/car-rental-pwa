// import { useState } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import { useNavigate, Link } from 'react-router-dom';

// export default function DriverLogin() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     try {
//       setError('');
//       setLoading(true);
//       await login(email, password, 'driver');
//       navigate('/driver/dashboard');
//     } catch (err) {
//       setError('Failed to log in: ' + (err as Error).message);
//     }
//     setLoading(false);
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Sign in to your driver account
//           </h2>
//         </div>
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//             <span className="block sm:inline">{error}</span>
//           </div>
//         )}
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="email-address" className="sr-only">
//                 Email address
//               </label>
//               <input
//                 id="email-address"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="text-sm">
//               <a href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
//                 Forgot your password?
//               </a>
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               {loading ? 'Signing in...' : 'Sign in as Driver'}
//             </button>
//           </div>
          
//           <div className="text-center">
//             <p className="text-sm text-gray-600">
//               Don't have an account?{' '}
//               <Link to="/driver-signup" className="font-medium text-indigo-600 hover:text-indigo-500">
//                 Sign up
//               </Link>
//             </p>
//             <p className="mt-2 text-sm text-gray-600">
//               <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
//                 Back to regular login
//               </Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';

export default function DriverLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email, password, 'driver');
      navigate('/driver/dashboard');
    } catch (err) {
      setError('Failed to log in: ' + (err as Error).message);
    }
    setLoading(false);
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={5}>
          <Card className="shadow-sm">
            <Card.Body className="p-4 p-md-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold">Driver Sign In</h2>
                <p className="text-muted">Access your driver dashboard</p>
              </div>

              {error && <Alert variant="danger" className="text-center">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-grid gap-2 mb-3">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={loading}
                    className="py-2"
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </div>

                <div className="text-center mt-4">
                  <p className="mb-0">
                    Don't have an account?{' '}
                    <Link to="/driver-signup" className="text-primary fw-medium">
                      Sign up as a driver
                    </Link>
                  </p>
                  <p className="mt-2">
                    <Link to="/forgot-password" className="text-muted small">
                      Forgot your password?
                    </Link>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}