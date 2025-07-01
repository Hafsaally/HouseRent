import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Add } from '@mui/icons-material';
import PropertyForm from '../components/PropertyForm';
import api from '../api/api';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propertiesRes, customersRes] = await Promise.all([
          api.get('/property/'),
          api.get('/customer/')
        ]);
        setProperties(propertiesRes.data);
        setCustomers(customersRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddProperty = async (propertyData) => {
    try {
      const response = await api.post('/property/', propertyData);
      setProperties([...properties, response.data]);
      setOpenForm(false);
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  const handleUpdateProperty = async (propertyData) => {
    try {
      const response = await api.put(`/property/${currentProperty.id}/`, propertyData);
      setProperties(properties.map(p => p.id === currentProperty.id ? response.data : p));
      setOpenForm(false);
      setCurrentProperty(null);
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Property Management</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setCurrentProperty(null);
            setOpenForm(true);
          }}
        >
          Add Property
        </Button>
      </Box>


      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>{currentProperty ? 'Edit Property' : 'Add New Property'}</DialogTitle>
        <DialogContent>
          <PropertyForm
            initialValues={currentProperty}
            onSubmit={currentProperty ? handleUpdateProperty : handleAddProperty}
            isEdit={!!currentProperty}
            customers={customers}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Properties;