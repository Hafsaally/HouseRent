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
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const BookingForm = ({ initialValues, onSubmit, isEdit, properties, customers }) => {
  const validationSchema = Yup.object({
    property: Yup.string().required('Property is required'),
    user: Yup.string().required('Customer is required'),
    check_in: Yup.date().required('Check-in date is required'),
    check_out: Yup.date()
      .required('Check-out date is required')
      .min(Yup.ref('check_in'), 'Check-out must be after check-in'),
    status: Yup.string().required('Status is required'),
  });

  const formik = useFormik({
    initialValues: initialValues || {
      property: '',
      user: '',
      check_in: null,
      check_out: null,
      status: 'pending',
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
          {isEdit ? 'Edit Booking' : 'Create New Booking'}
        </Typography>
        
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="property-label">Property</InputLabel>
                <Select
                  labelId="property-label"
                  id="property"
                  name="property"
                  value={formik.values.property}
                  onChange={formik.handleChange}
                  label="Property"
                  error={formik.touched.property && Boolean(formik.errors.property)}
                >
                  {properties.map((property) => (
                    <MenuItem key={property.id} value={property.id}>
                      {property.title} ({property.property_type})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="user-label">Customer</InputLabel>
                <Select
                  labelId="user-label"
                  id="user"
                  name="user"
                  value={formik.values.user}
                  onChange={formik.handleChange}
                  label="Customer"
                  error={formik.touched.user && Boolean(formik.errors.user)}
                >
                  {customers.map((customer) => (
                    <MenuItem key={customer.id} value={customer.id}>
                      {customer.full_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Check-in Date"
                  value={formik.values.check_in}
                  onChange={(value) => formik.setFieldValue('check_in', value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={formik.touched.check_in && Boolean(formik.errors.check_in)}
                      helperText={formik.touched.check_in && formik.errors.check_in}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Check-out Date"
                  value={formik.values.check_out}
                  onChange={(value) => formik.setFieldValue('check_out', value)}
                  minDate={formik.values.check_in}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={formik.touched.check_out && Boolean(formik.errors.check_out)}
                      helperText={formik.touched.check_out && formik.errors.check_out}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  label="Status"
                  error={formik.touched.status && Boolean(formik.errors.status)}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                {isEdit ? 'Update Booking' : 'Create Booking'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;