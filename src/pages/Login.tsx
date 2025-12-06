import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // try {
    //   setError('');
    //   setLoading(true);
    //   await login(email, password);
    //   navigate('/');
    // } catch (error) {
    //   setError('Failed to log in. Please check your credentials.');
    //   console.error(error);
    // }
    try {
      await login(email, password, 'user'); // or 'driver' for driver login
      // Redirect to dashboard or home page
      navigate('/bookings');
    } catch (error) {
      // Show error message to user
      setError(error.message || 'Failed to log in');
    }
    setLoading(false);
  }

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
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
              <Button disabled={loading} className="w-100" type="submit">
                Log In
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Button variant="link" onClick={() => navigate('/signup')}>
                Need an account? Sign Up
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
