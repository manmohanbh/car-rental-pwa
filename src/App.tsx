// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';  
import Cars from './pages/Cars';
import CarDetail from './pages/CarDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import BookingDetails from './pages/BookingDetails';
import Bookings from './pages/Bookings';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DriverLogin from './components/auth/DriverLogin';
import DriverSignup from './components/auth/DriverSignup';
import DriverDashboard from './pages/driver/Dashboard';
import ProfilePage from './pages/ProfilePage';


// Private route component to protect authenticated routes
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cars" element={<Cars />} />
              <Route path="/cars/:id" element={<CarDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/booking/:id" element={<BookingDetails />} />
              <Route 
                path="/profile" 
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/bookings" 
                element={
                  <PrivateRoute>
                    <Bookings />
                  </PrivateRoute>
                } 
              />

              {/* // Add this route outside of the protected routes, as it should be accessible to non-logged-in users */}
              <Route path="/driver-signup" element={<DriverSignup />} />
              {/* Also add the login route (public) */}
              <Route path="/driver-login" element={<DriverLogin />} />
              {/* Protected driver routes */}
              <Route element={<ProtectedRoute requiredRole="driver" />}>
                <Route path="/driver/dashboard" element={<DriverDashboard />} />
              </Route>

            </Routes>
          </main>
        <footer className="bg-dark text-white py-4 mt-auto">
          <Container>
            <div className="text-center">
              <p className="mb-0">&copy; {new Date().getFullYear()} CarRental. All rights reserved.</p>
            </div>
          </Container>
        </footer>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;