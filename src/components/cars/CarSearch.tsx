// src/components/cars/CarSearch.tsx
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Form,
  Button, 
  Spinner,
  Badge
} from 'react-bootstrap';
import { 
  Search as SearchIcon, 
  Funnel as FilterIcon, 
  Star as StarIcon, 
  GeoAlt as MapMarkerIcon,
  CarFront as CarIcon,
  X as XIcon
} from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  pricePerDay: number;
  location: string;
  transmission: string;
  seats: number;
  fuelType: string;
  rating: number;
  image: string;
  features: string[];
}

interface Filters {
  sortBy: string;
  minPrice: string;
  maxPrice: string;
  transmission: string;
  make: string;
  model: string;
  location: string;
}

const CarSearch: React.FC = () => {
  // Sample car data - replace with your actual data source
  const sampleCars: Car[] = [
    {
      id: 1,
      make: 'Toyota',
      model: 'Camry',
      year: 2022,
      pricePerDay: 50,
      location: 'New York',
      transmission: 'Automatic',
      seats: 5,
      fuelType: 'Hybrid',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
      features: ['Bluetooth', 'Backup Camera', 'Keyless Entry']
    },
    {
      id: 2,
      make: 'Honda',
      model: 'CR-V',
      year: 2021,
      pricePerDay: 65,
      location: 'Los Angeles',
      transmission: 'Automatic',
      seats: 5,
      fuelType: 'Gasoline',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1503376785-2a5b5c5160f3?auto=format&fit=crop&w=800&q=80',
      features: ['Apple CarPlay', 'Lane Keeping Assist', 'Sunroof']
    },
    {
      id: 3,
      make: 'BMW',
      model: '3 Series',
      year: 2023,
      pricePerDay: 90,
      location: 'Miami',
      transmission: 'Automatic',
      seats: 5,
      fuelType: 'Premium Gasoline',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
      features: ['Leather Seats', 'Navigation', 'Premium Sound']
    },
    // Add more sample cars as needed
  ];

  const [cars] = useState<Car[]>(sampleCars);
  const [filteredCars, setFilteredCars] = useState<Car[]>(sampleCars);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const [filters, setFilters] = useState<Filters>({
    sortBy: 'featured',
    minPrice: '',
    maxPrice: '',
    transmission: '',
    make: '',
    model: '',
    location: ''
  });

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Apply all filters
  const applyFilters = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let result = [...cars];
      
      // Apply search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        result = result.filter(car => 
          car.make.toLowerCase().includes(term) ||
          car.model.toLowerCase().includes(term) ||
          car.location.toLowerCase().includes(term)
        );
      }

      // Apply price filter
      if (filters.minPrice) {
        result = result.filter(car => car.pricePerDay >= Number(filters.minPrice));
      }
      if (filters.maxPrice) {
        result = result.filter(car => car.pricePerDay <= Number(filters.maxPrice));
      }

      // Apply transmission filter
      if (filters.transmission) {
        result = result.filter(car => 
          car.transmission.toLowerCase() === filters.transmission.toLowerCase()
        );
      }

      // Apply sorting
      result = sortCars(result, filters.sortBy);

      setFilteredCars(result);
      setLoading(false);
    }, 500);
  };

  // Sort cars based on selected option
  const sortCars = (carsToSort: Car[], sortBy: string) => {
    return [...carsToSort].sort((a, b) => {
      switch (sortBy) {
        case 'priceLowToHigh':
          return a.pricePerDay - b.pricePerDay;
        case 'priceHighToLow':
          return b.pricePerDay - a.pricePerDay;
        case 'newest':
          return b.year - a.year;
        case 'topRated':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      sortBy: 'featured',
      minPrice: '',
      maxPrice: '',
      transmission: '',
      make: '',
      model: '',
      location: ''
    });
    setActiveFilters([]);
    setFilteredCars(cars);
  };

  // Update active filters display
  useEffect(() => {
    const active: string[] = [];
    if (filters.minPrice) active.push(`Min: $${filters.minPrice}`);
    if (filters.maxPrice) active.push(`Max: $${filters.maxPrice}`);
    if (filters.transmission) active.push(filters.transmission);
    setActiveFilters(active);
  }, [filters]);

  // Apply filters when they change
  useEffect(() => {
    applyFilters();
  }, [filters.sortBy]);

  return (
    <Container className="py-4">
      <h1 className="mb-4">Find Your Perfect Car</h1>
      
      {/* Search and Filter Section */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSearch}>
            <Row className="g-3">
              <Col md={6}>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <SearchIcon  />
                  </span>
                  <Form.Control
                    type="text"
                    placeholder="Search by make, model, or location"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </Col>
              <Col md={3}>
                <Form.Select 
                  name="sortBy" 
                  value={filters.sortBy}
                  onChange={handleFilterChange}
                >
                  <option value="featured">Featured</option>
                  <option value="priceLowToHigh">Price: Low to High</option>
                  <option value="priceHighToLow">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="topRated">Top Rated</option>
                </Form.Select>
              </Col>
              <Col md={3}>
                <Button type="submit" variant="primary" className="w-100">
                  <SearchIcon  className="me-2" /> Search
                </Button>
              </Col>
            </Row>

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="mt-3 d-flex flex-wrap gap-2">
                {activeFilters.map((filter, index) => (
                  <Badge key={index} bg="light" text="dark" className="d-flex align-items-center">
                    {filter}
                    <Button 
                      variant="link" 
                      className="p-0 ms-1 text-dark" 
                      onClick={() => {
                        // Remove this filter
                        const filterName = filter.split(':')[0].toLowerCase().trim();
                        if (filterName === 'min') {
                          setFilters(prev => ({ ...prev, minPrice: '' }));
                        } else if (filterName === 'max') {
                          setFilters(prev => ({ ...prev, maxPrice: '' }));
                        } else {
                          setFilters(prev => ({ ...prev, transmission: '' }));
                        }
                      }}
                    >
                      <XIcon size={12} />
                    </Button>
                  </Badge>
                ))}
                <Button 
                  variant="link" 
                  size="sm" 
                  className="text-decoration-none"
                  onClick={clearFilters}
                >
                  Clear all
                </Button>
              </div>
            )}

            {/* Advanced Filters */}
            <div className="mt-3">
              <Button
                variant="link"
                className="text-decoration-none p-0"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              >
                <FilterIcon className="me-1" /> {showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters
              </Button>
              
              {showAdvancedFilters && (
                <Row className="mt-3 g-2">
                  <Col md={3}>
                    <Form.Control
                      type="number"
                      name="minPrice"
                      placeholder="Min price"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      min="0"
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Control
                      type="number"
                      name="maxPrice"
                      placeholder="Max price"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      min="0"
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Select 
                      name="transmission" 
                      value={filters.transmission}
                      onChange={handleFilterChange}
                    >
                      <option value="">Any transmission</option>
                      <option value="automatic">Automatic</option>
                      <option value="manual">Manual</option>
                    </Form.Select>
                  </Col>
                  <Col md={3}>
                    <div className="d-flex gap-2">
                      <Button 
                        variant="outline-secondary" 
                        onClick={clearFilters}
                        className="flex-grow-1"
                      >
                        Clear
                      </Button>
                      <Button 
                        variant="primary" 
                        onClick={applyFilters}
                        className="flex-grow-1"
                      >
                        Apply
                      </Button>
                    </div>
                  </Col>
                </Row>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {/* Cars Grid */}
      {!loading && (
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {filteredCars.map((car) => (
            <Col key={car.id}>
              <Card className="h-100 shadow-sm">
                <div 
                  className="car-image" 
                  style={{ 
                    height: '180px', 
                    backgroundImage: `url(${car.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                  }}
                >
                  <div className="position-absolute top-0 end-0 m-2">
                    <Button variant="light" size="sm" className="rounded-circle p-1">
                      <StarIcon className="text-warning" />
                    </Button>
                  </div>
                </div>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h5 className="mb-0">{car.year} {car.make} {car.model}</h5>
                      <div className="text-muted small">
                        <MapMarkerIcon className="me-1" /> {car.location}
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="h5 text-primary mb-0">${car.pricePerDay}</div>
                      <div className="text-muted small">per day</div>
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="small">
                      <div><CarIcon className="me-1" /> {car.transmission}</div>
                      <div>{car.seats} seats • {car.fuelType}</div>
                    </div>
                    <div className="d-flex align-items-center">
                      <StarIcon className="text-warning me-1" />
                      <span>{car.rating}</span>
                    </div>
                  </div>
                </Card.Body>
                <Card.Footer className="bg-transparent border-top-0 pt-0">
                  <Button 
                    as={Link as any}
                    to={`/cars/${car.id}`}
                    variant="primary"
                    className="w-100"
                  >
                    View Details
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* No Results */}
      {!loading && filteredCars.length === 0 && (
        <div className="text-center py-5">
          <CarIcon size={48} className="text-muted mb-3" />
          <h4>No cars found</h4>
          <p className="text-muted">Try adjusting your search or filter to find what you're looking for.</p>
          <Button variant="outline-primary" onClick={clearFilters}>
            Clear all filters
          </Button>
        </div>
      )}
    </Container>
  );
};

export default CarSearch;