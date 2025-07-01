import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container,
  TextField,
  InputAdornment,
  Chip,
  Divider,
  Paper
} from '@mui/material';
import {
  Search,
  Home,
  Apartment,
  Villa,
  MeetingRoom,
  Star,
  Bathtub,
  KingBed,
  LocationOn,
  AttachMoney
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFeaturedProperties([
        {
          id: 1,
          title: 'Seaside Villa',
          description: 'Beautiful beachfront property with panoramic ocean views',
          address: '123 Coastal Drive, Malibu',
          property_type: 'villa',
          price: 350,
          bedrooms: 3,
          bathrooms: 2,
          amenities: 'Pool, Beach Access, WiFi, Parking',
          is_available: true,
          image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        },
        {
          id: 2,
          title: 'Downtown Loft',
          description: 'Modern urban living in the heart of the city',
          address: '456 Metro Street, New York',
          property_type: 'apartment',
          price: 200,
          bedrooms: 1,
          bathrooms: 1,
          amenities: 'Gym, Concierge, WiFi',
          is_available: true,
          image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        },
        {
          id: 3,
          title: 'Mountain Cabin',
          description: 'Cozy retreat surrounded by nature',
          address: '789 Forest Road, Aspen',
          property_type: 'house',
          price: 180,
          bedrooms: 2,
          bathrooms: 1,
          amenities: 'Fireplace, Hiking Trails, Hot Tub',
          is_available: false,
          image: 'https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        }
      ]);
    }, 500);
  }, []);

  const propertyTypeIcon = (type) => {
    switch (type) {
      case 'house': return <Home fontSize="small" />;
      case 'apartment': return <Apartment fontSize="small" />;
      case 'villa': return <Villa fontSize="small" />;
      case 'room': return <MeetingRoom fontSize="small" />;
      default: return <Home fontSize="small" />;
    }
  };

  const filteredProperties = featuredProperties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <Box sx={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        py: 15,
        textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Find Your Perfect Rental Home
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
            Discover thousands of properties for rent across the country
          </Typography>
          
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by location or property name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              style: { backgroundColor: 'white', borderRadius: 4 }
            }}
            sx={{ maxWidth: 700, mx: 'auto' }}
          />
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Why Choose Our Platform
        </Typography>
        <Divider sx={{ mb: 4, mx: 'auto', width: 100, height: 4, backgroundColor: 'primary.main' }} />
        
        <Grid container spacing={4}>
          {[
            {
              icon: <Star color="primary" sx={{ fontSize: 50 }} />,
              title: 'Verified Listings',
              description: 'All properties are personally verified by our team'
            },
            {
              icon: <AttachMoney color="primary" sx={{ fontSize: 50 }} />,
              title: 'No Hidden Fees',
              description: 'Transparent pricing with no surprises'
            },
            {
              icon: <LocationOn color="primary" sx={{ fontSize: 50 }} />,
              title: 'Prime Locations',
              description: 'Properties in the most desirable neighborhoods'
            }
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper elevation={3} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                <Box sx={{ mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Properties */}
      <Box sx={{ backgroundColor: '#f5f5f5', py: 6 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Featured Properties
            </Typography>
            <Button 
              variant="outlined" 
              color="primary"
              onClick={() => navigate('/properties')}
            >
              View All
            </Button>
          </Box>
          
          <Grid container spacing={4}>
            {filteredProperties.map((property) => (
              <Grid item xs={12} sm={6} md={4} key={property.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={property.image}
                    alt={property.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="h6" component="h2">
                        {property.title}
                      </Typography>
                      <Chip
                        label={property.is_available ? 'Available' : 'Booked'}
                        color={property.is_available ? 'success' : 'error'}
                        size="small"
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {propertyTypeIcon(property.property_type)}
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        {property.property_type}
                      </Typography>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <LocationOn fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                      {property.address}
                    </Typography>
                    
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {property.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 'auto' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <KingBed fontSize="small" color="action" />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {property.bedrooms}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Bathtub fontSize="small" color="action" />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {property.bathrooms}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                        <AttachMoney fontSize="small" />
                        <Typography variant="h6">
                          {property.price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          /mo
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                  <Box sx={{ p: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => navigate(`/properties/${property.id}`)}
                      disabled={!property.is_available}
                    >
                      {property.is_available ? 'View Details' : 'Booked'}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Ready to Find Your New Home?
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
          Join thousands of happy renters who found their perfect home through our platform
        </Typography>
        <Button 
          variant="contained" 
          size="large"
          onClick={() => navigate('/properties')}
          sx={{ px: 6, py: 1.5 }}
        >
          Browse Properties
        </Button>
      </Container>
    </Box>
  );
};

export default HomePage;