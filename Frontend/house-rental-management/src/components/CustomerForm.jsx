import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { 
  TextField, 
  Button, 
  Box, 
  Alert, 
  Typography, 
  CircularProgress,
  FormControl,
  FormHelperText 
} from '@mui/material';
import api from '../api/api';

const CustomerForm = ({ onSuccess, customer, isEdit }) => {
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [nonFieldErrors, setNonFieldErrors] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      full_name: '',
      email: '',
      phone: '',
      address: ''
    },
    validationSchema: Yup.object({
      full_name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      phone: Yup.string().required('Required'),
      address: Yup.string().required('Required')
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        setIsLoading(true);
        setError(null);
        setNonFieldErrors(null);
        
        // Ensure CSRF token is included
        await api.get('/csrf-token/');
        
        let response;
        if (isEdit && customer?.id) {
          response = await api.put(`/manage_customer/${customer.id}/`, values);
        } else {
          response = await api.post('/manage_customer/', values);
        }
        
        onSuccess(response.data);
      } catch (err) {
        const errorData = err.response?.data;
        
        if (errorData) {
          // Handle Django field-specific errors
          if (typeof errorData === 'object') {
            Object.keys(errorData).forEach(key => {
              if (key in formik.values) {
                setFieldError(key, errorData[key].join(' '));
              } else {
                // Handle non-field errors
                setNonFieldErrors(errorData[key].join(' '));
              }
            });
          } else {
            setError(errorData.toString());
          }
        } else {
          setError(err.message || 'Failed to save customer');
        }
      } finally {
        setSubmitting(false);
        setIsLoading(false);
      }
    }
  });

  // Load customer data when component mounts or customer prop changes
  useEffect(() => {
    if (isEdit && customer) {
      formik.setValues({
        full_name: customer.full_name || '',
        email: customer.email || '',
        phone: customer.phone || '',
        address: customer.address || ''
      });
    }
  }, [customer, isEdit]);

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        {isEdit ? 'Edit Customer' : 'Add New Customer'}
      </Typography>

      {nonFieldErrors && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {nonFieldErrors}
        </Alert>
      )}

      <FormControl fullWidth error={formik.touched.full_name && Boolean(formik.errors.full_name)}>
        <TextField
          margin="normal"
          label="Full Name"
          name="full_name"
          value={formik.values.full_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={isLoading}
        />
        {formik.touched.full_name && formik.errors.full_name && (
          <FormHelperText>{formik.errors.full_name}</FormHelperText>
        )}
      </FormControl>
      
      <FormControl fullWidth error={formik.touched.email && Boolean(formik.errors.email)}>
        <TextField
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={isLoading}
        />
        {formik.touched.email && formik.errors.email && (
          <FormHelperText>{formik.errors.email}</FormHelperText>
        )}
      </FormControl>
      
      <FormControl fullWidth error={formik.touched.phone && Boolean(formik.errors.phone)}>
        <TextField
          margin="normal"
          label="Phone"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={isLoading}
        />
        {formik.touched.phone && formik.errors.phone && (
          <FormHelperText>{formik.errors.phone}</FormHelperText>
        )}
      </FormControl>
      
      <FormControl fullWidth error={formik.touched.address && Boolean(formik.errors.address)}>
        <TextField
          margin="normal"
          label="Address"
          name="address"
          multiline
          rows={4}
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={isLoading}
        />
        {formik.touched.address && formik.errors.address && (
          <FormHelperText>{formik.errors.address}</FormHelperText>
        )}
      </FormControl>
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={formik.isSubmitting || isLoading}
        startIcon={isLoading ? <CircularProgress size={20} /> : null}
      >
        {isEdit ? 'Update Customer' : 'Add Customer'}
      </Button>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default CustomerForm;