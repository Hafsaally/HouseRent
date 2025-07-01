import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

const CustomerForm = ({ initialValues, onSubmit, isEdit }) => {
  const [formData, setFormData] = useState(initialValues || {
    full_name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
        <TextField
          name="full_name"
          label="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          name="phone"
          label="Phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="address"
          label="Address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
        />
        <Button type="submit" variant="contained" color="primary">
          {isEdit ? 'Update Customer' : 'Add Customer'}
        </Button>
      </Box>
    </form>
  );
};
function Customers() {
  const [customers, setCustomers] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  useEffect(() => {
    fetch('/api/customer/')
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleAddCustomer = async (customerData) => {
  try {
    const response = await api.post('/customer/', customerData); // Note the slash
    console.log('Customer added:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding customer:', error);
    throw error;
  }
};

  const handleUpdateCustomer = async (customerData) => {
    try {
      const response = await api.put(`/customer/${currentCustomer.id}/`, customerData);
      setCustomers(customers.map(c => c.id === currentCustomer.id ? response.data : c));
      setOpenForm(false);
      setCurrentCustomer(null);
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Customer Management</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setCurrentCustomer(null);
            setOpenForm(true);
          }}
        >
          Add Customer
        </Button>
      </Box>

      {/* Simple customer list */}
      {customers.map(customer => (
        <Box 
          key={customer.id} 
          sx={{ 
            mb: 2, 
            p: 2, 
            border: '1px solid #ddd',
            borderRadius: 1,
            '&:hover': { backgroundColor: '#f5f5f5' }
          }}
          onClick={() => {
            setCurrentCustomer(customer);
            setOpenForm(true);
          }}
        >
          <Typography variant="h6">{customer.full_name}</Typography>
          <Typography variant="body2">Email: {customer.email}</Typography>
          <Typography variant="body2">Phone: {customer.phone || '-'}</Typography>
          <Typography variant="body2">Address: {customer.address || '-'}</Typography>
        </Box>
      ))}

      {/* Customer form dialog */}
      <Dialog 
        open={openForm} 
        onClose={() => {
          setOpenForm(false);
          setCurrentCustomer(null);
        }}
        maxWidth="sm" 
        fullWidth
      >
        <DialogTitle>{currentCustomer ? 'Edit Customer' : 'Add New Customer'}</DialogTitle>
        <DialogContent>
          <CustomerForm
            initialValues={currentCustomer}
            onSubmit={currentCustomer ? handleUpdateCustomer : handleAddCustomer}
            isEdit={!!currentCustomer}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Customers;