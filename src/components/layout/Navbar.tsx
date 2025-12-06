import React from 'react';
import { Navbar as BSNavbar, Container, Nav, Button, NavDropdown } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import type { LinkProps } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  PersonCircle, 
  Speedometer2, 
  BoxArrowRight
} from 'react-bootstrap-icons';

// Custom CSS to hide dropdown arrow
const dropdownStyle = `
  .dropdown-toggle-no-arrow::after {
    display: none !important;
  }
`;
import Badge from 'react-bootstrap/Badge';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  }

  return (
    <>
      <style>{dropdownStyle}</style>
      <BSNavbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <BSNavbar.Brand as={Link} to="/" className="fw-bold text-primary">
          CarRental
        </BSNavbar.Brand>
        
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        {/* <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" active={location.pathname === '/'}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/cars" active={location.pathname === '/cars'}>
              Cars
            </Nav.Link>
            <Nav.Link as={Link} to="/about" active={location.pathname === '/about'}>
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" active={location.pathname === '/contact'}>
              Contact
            </Nav.Link>
            <Nav.Link as={Link} to="/bookings" className={location.pathname === '/bookings' ? 'active' : ''}>
              My Bookings
            </Nav.Link>
          </Nav>
          <Link
            to="/driver-login"
            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Driver Login
          </Link>
          <Link
            to="/driver-signup"
            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Become a Driver
          </Link>
          
          <div className="d-flex gap-2">
            {currentUser ? (
              <NavDropdown title={currentUser.email} id="user-dropdown" align="end">
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Button as={Link} to="/login" variant="outline-primary">
                  Login
                </Button>
                <Button as={Link} to="/signup" variant="primary">
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </BSNavbar.Collapse> */}

        {/* <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" active={location.pathname === '/'}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/cars" active={location.pathname === '/cars'}>
              Cars
            </Nav.Link>
            <Nav.Link as={Link} to="/about" active={location.pathname === '/about'}>
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" active={location.pathname === '/contact'}>
              Contact
            </Nav.Link>
            {currentUser && (
              <Nav.Link as={Link} to="/bookings" active={location.pathname === '/bookings'}>
                My Bookings
              </Nav.Link>
            )}
          </Nav>
          
          <Nav className="align-items-center">
            <Nav.Link 
              as={Link} 
              to="/driver-login" 
              className={`me-2 ${location.pathname === '/driver-login' ? 'active' : ''}`}
            >
              Driver Login
            </Nav.Link>
            <Button 
              as={Link} 
              to="/driver-signup" 
              variant="outline-primary" 
              className="me-2"
            >
              Become a Driver
            </Button>
            
            {currentUser ? (
              <NavDropdown 
                title={
                  <span>
                    <i className="bi bi-person-circle me-1"></i>
                    {currentUser.email}
                  </span>
                } 
                id="user-dropdown" 
                align="end"
              >
                <NavDropdown.Item as={Link} to="/profile">
                  <i className="bi bi-person me-2"></i>Profile
                </NavDropdown.Item>
                {currentUser.role === 'driver' && (
                  <NavDropdown.Item as={Link} to="/driver/dashboard">
                    <i className="bi bi-speedometer2 me-2"></i>Driver Dashboard
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i>Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Button as={Link} to="/login" variant="outline-primary" className="me-2">
                  Login
                </Button>
                <Button as={Link} to="/signup" variant="primary">
                  Sign Up
                </Button>
              </>
            )}
          </Nav>
        </BSNavbar.Collapse> */}

        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" active={location.pathname === '/'}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/cars" active={location.pathname === '/cars'}>
              Cars
            </Nav.Link>
            <Nav.Link as={Link} to="/about" active={location.pathname === '/about'}>
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" active={location.pathname === '/contact'}>
              Contact
            </Nav.Link>
            {currentUser && (
              <Nav.Link as={Link} to="/bookings" active={location.pathname === '/bookings'}>
                My Bookings
              </Nav.Link>
            )}
          </Nav>
          
          <Nav className="align-items-center">
            {currentUser?.role === 'driver' ? (
              <NavDropdown
                title={
                  <span>
                    <Speedometer2 className="me-1" />
                    Driver Dashboard
                  </span>
                }
                id="driver-dropdown"
                className="me-2"
              >
                <NavDropdown.Item as={Link} to="/driver/dashboard">
                  <Speedometer2 className="me-2" /> Dashboard
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/driver/bookings">
                  <i className="bi bi-journal-text me-2"></i>My Bookings
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown
                title="Become a Driver"
                id="driver-actions-dropdown"
                className="me-2"
                menuVariant="light"
              >
                <NavDropdown.Item as={Link} to="/driver-login">
                  <i className="bi bi-box-arrow-in-right me-2"></i>Driver Login
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/driver-signup" className="text-primary fw-medium">
                  <i className="bi bi-person-plus me-2"></i>Register as Driver
                </NavDropdown.Item>
              </NavDropdown>
            )}
            
            {currentUser ? (
              <NavDropdown
                title={
                  <div className="d-flex align-items-center" style={{ paddingRight: '1.5rem' }}>
                    <PersonCircle className="me-2" />
                    <span>Account</span>
                  </div>
                }
                id="user-dropdown"
                align="end"
                className="dropdown-toggle-no-arrow"
              >
                <div className="px-3 py-2">
                  <div className="d-flex flex-column">
                    <span className="fw-bold">{currentUser.email}</span>
                    {currentUser.role && (
                      <Badge 
                        bg={currentUser.role === 'driver' ? 'primary' : 'success'} 
                        className="mt-1 align-self-start"
                      >
                        {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                      </Badge>
                    )}
                  </div>
                </div>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/profile" className="d-flex align-items-center">
                  <i className="bi bi-person me-2"></i>Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="d-flex align-items-center">
                  <BoxArrowRight className="me-2" /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Button as={Link} to="/login" variant="outline-primary" className="me-2">
                  Login
                </Button>
                <Button as={Link} to="/signup" variant="primary">
                  Sign Up
                </Button>
              </>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
    </>
  );
};

export default Navbar;
