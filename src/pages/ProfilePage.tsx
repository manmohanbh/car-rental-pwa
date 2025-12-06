// src/pages/ProfilePage.tsx
import React from 'react';
import { Container, Card, Row, Col, Badge, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">My Profile</h4>
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-4">
                <div 
                  className="rounded-circle bg-secondary d-inline-flex align-items-center justify-content-center" 
                  style={{ width: '100px', height: '100px' }}
                >
                  <span className="text-white" style={{ fontSize: '3rem' }}>
                    {currentUser.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                {currentUser.role && (
                  <Badge 
                    bg={currentUser.role === 'driver' ? 'primary' : 'success'} 
                    className="mt-2 d-block mx-auto"
                    style={{ width: 'fit-content' }}
                  >
                    {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                  </Badge>
                )}
              </div>

              <div className="mb-4">
                <h5>Account Information</h5>
                <hr className="my-2" />
                <div className="mb-2">
                  <strong>Email:</strong> {currentUser.email}
                </div>
                <div className="mb-2">
                  <strong>Account Type:</strong> {currentUser.role || 'User'}
                </div>
                <div>
                  <strong>Member Since:</strong> {new Date(currentUser.metadata?.creationTime || '').toLocaleDateString()}
                </div>
              </div>

              {currentUser.role === 'driver' && (
                <div className="mb-4">
                  <h5>Driver Information</h5>
                  <hr className="my-2" />
                  <p>This section is for driver-specific information.</p>
                  {/* Add driver-specific fields here */}
                </div>
              )}

              <div className="d-grid gap-2 mt-4">
                <Button variant="primary" href="/profile/edit">
                  Edit Profile
                </Button>
                <Button variant="outline-secondary" href="/change-password">
                  Change Password
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;