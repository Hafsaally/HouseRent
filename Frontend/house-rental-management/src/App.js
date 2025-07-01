import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Customers from './pages/Customers';  // Fixed import path
import Properties from './pages/Properties';
import Bookings from './pages/Bookings';
import { CssBaseline, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
// import api from './api/api';  // Assuming your API file is in src/api/api.js

function App() {
  const [customers, setCustomers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customers, properties, bookings] = await Promise.all([
        fetch('/api/customer/').then(res => res.json()),
        fetch('/api/property/').then(res => res.json()),
        fetch('/api/booking/').then(res => res.json())
      ]);

      setCustomers(customers);
      setProperties(properties);
      setBookings(bookings);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  fetchData();
}, []);

  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<Home customers={customers} properties={properties} bookings={bookings} />} />
          <Route path="/customers" element={<Customers customers={customers} />} />
          <Route path="/properties" element={<Properties properties={properties} />} />
          <Route path="/bookings" element={<Bookings bookings={bookings} />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;