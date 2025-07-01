import React from 'react';
import {
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const propertyTypes = [
  { value: 'house', label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'villa', label: 'Villa' },
  { value: 'room', label: 'Single Room' },
];

const PropertyForm = ({ initialValues, onSubmit, isEdit, customers }) => {
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    address: Yup.string().required('Address is required'),
    property_type: Yup.string().required('Property type is required'),
    price: Yup.number().required('Price is required').positive('Must be positive'),
    bedrooms: Yup.number().required('Required').positive('Must be positive').integer(),
    bathrooms: Yup.number().required('Required').positive('Must be positive').integer(),
    owner: Yup.string().required('Owner is required'),
  });

  const formik = useFormik({
    initialValues: initialValues || {
      title: '',
      description: '',
      address: '',
      property_type: 'house',
      price: '',
      bedrooms: 1,
      bathrooms: 1,
      amenities: '',
      is_available: true,
      owner: '',
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {isEdit ? 'Edit Property' : 'Add New Property'}
        </Typography>
        
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Property Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                multiline
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="address"
                name="address"
                label="Address"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="property-type-label">Property Type</InputLabel>
                <Select
                  labelId="property-type-label"
                  id="property_type"
                  name="property_type"
                  value={formik.values.property_type}
                  onChange={formik.handleChange}
                  error={formik.touched.property_type && Boolean(formik.errors.property_type)}
                >
                  {propertyTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="price"
                name="price"
                label="Monthly Price ($)"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="bedrooms"
                name="bedrooms"
                label="Bedrooms"
                type="number"
                value={formik.values.bedrooms}
                onChange={formik.handleChange}
                error={formik.touched.bedrooms && Boolean(formik.errors.bedrooms)}
                helperText={formik.touched.bedrooms && formik.errors.bedrooms}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="bathrooms"
                name="bathrooms"
                label="Bathrooms"
                type="number"
                value={formik.values.bathrooms}
                onChange={formik.handleChange}
                error={formik.touched.bathrooms && Boolean(formik.errors.bathrooms)}
                helperText={formik.touched.bathrooms && formik.errors.bathrooms}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="amenities"
                name="amenities"
                label="Amenities (comma separated)"
                value={formik.values.amenities}
                onChange={formik.handleChange}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="owner-label">Owner</InputLabel>
                <Select
                  id="owner"
                  name="owner"
                  value={formik.values.owner}
                  onChange={formik.handleChange}
                  error={formik.touched.owner && Boolean(formik.errors.owner)}
                >
                  {customers.map((customer) => (
                    <MenuItem key={customer.id} value={customer.id}>
                      {customer.full_name}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.owner && formik.errors.owner && (
                  <Typography color="error" variant="caption">
                    {formik.errors.owner}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.is_available}
                    onChange={formik.handleChange}
                    name="is_available"
                  />
                }
                label="Available for Rent"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                {isEdit ? 'Update Property' : 'Add Property'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default PropertyForm;
