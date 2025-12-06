import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  // async function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault();

  //   if (password !== passwordConfirm) {
  //     return setError("Passwords don't match");
  //   }

  //   try {
  //     setError('');
  //     setLoading(true);
  //     await signup(email, password);
  //     navigate('/');
  //   } catch (error) {
  //     setError('Failed to create an account. Please try again.');
  //     console.error(error);
  //   }
  //   setLoading(false);
  // }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError("Passwords don't match");
    }

    try {
      setError('');
      setLoading(true);
      console.log('Attempting to sign up with:', { email, password }); // Add this line
      await signup(email, password);
      console.log('Signup successful, navigating to home'); // Add this line
      navigate('/');
    } catch (error: any) {
      console.error('Full error object:', error); // Log full error object
      console.error('Error code:', error.code); // Log error code
      console.error('Error message:', error.message); // Log error message
      
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already in use. Please use a different email or log in.');
      } else if (error.code === 'auth/weak-password') {
        setError('Please choose a stronger password (at least 6 characters).');
      } else if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (error.code === 'auth/operation-not-allowed') {
        setError('Email/password authentication is not enabled in Firebase Console.');
      } else {
        setError(`Failed to create an account: ${error.message || 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </Form.Group>
              <Form.Group id="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </Form.Group>
              <Form.Group id="password-confirm" className="mb-3">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control 
                  type="password" 
                  value={passwordConfirm} 
                  onChange={(e) => setPasswordConfirm(e.target.value)} 
                  required 
                />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Sign Up
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Button variant="link" onClick={() => navigate('/login')}>
                Already have an account? Log In
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}