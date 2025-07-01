import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { Add } from '@mui/icons-material';
import api from '../api/api';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [properties, setProperties] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    property: '',
    user: '',
    check_in: '',
    check_out: '',
    status: 'pending'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, propertiesRes, customersRes] = await Promise.all([
          api.get('/booking/'),
          api.get('/property/'),
          api.get('/customer/')
        ]);
        setBookings(bookingsRes.data);
        setProperties(propertiesRes.data);
        setCustomers(customersRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/booking/', formData);
      setBookings([...bookings, response.data]);
      setOpenForm(false);
      setFormData({
        property: '',
        user: '',
        check_in: '',
        check_out: '',
        status: 'pending'
      });
    } catch (error) {
      console.error('Error adding booking:', error);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Booking Management</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenForm(true)}
        >
          Create Booking
        </Button>
      </Box>

      {/* Simple bookings display */}
      <Box sx={{ mt: 2 }}>
        {bookings.map(booking => (
          <Box key={booking.id} sx={{ p: 2, mb: 2, border: '1px solid #ddd', borderRadius: 1 }}>
            <Typography><strong>Property:</strong> {booking.property?.title}</Typography>
            <Typography><strong>Customer:</strong> {booking.user?.full_name}</Typography>
            <Typography><strong>Dates:</strong> {new Date(booking.check_in).toLocaleDateString()} to {new Date(booking.check_out).toLocaleDateString()}</Typography>
            <Typography><strong>Status:</strong> {booking.status}</Typography>
          </Box>
        ))}
      </Box>

      {/* Booking Form Dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>Create New Booking</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, minWidth: 400 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Property</InputLabel>
              <Select
                name="property"
                value={formData.property}
                onChange={handleInputChange}
                label="Property"
                required
              >
                {properties.map(property => (
                  <MenuItem key={property.id} value={property.id}>
                    {property.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Customer</InputLabel>
              <Select
                name="user"
                value={formData.user}
                onChange={handleInputChange}
                label="Customer"
                required
              >
                {customers.map(customer => (
                  <MenuItem key={customer.id} value={customer.id}>
                    {customer.full_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              sx={{ mb: 2 }}
              label="Check-in Date"
              type="date"
              name="check_in"
              value={formData.check_in}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              required
            />

            <TextField
              fullWidth
              sx={{ mb: 2 }}
              label="Check-out Date"
              type="date"
              name="check_out"
              value={formData.check_out}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              required
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                label="Status"
                required
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </FormControl>

            <Button type="submit" variant="contained" fullWidth>
              Create Booking
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Bookings;