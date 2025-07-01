import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // Update with your Django server URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${localStorage.getItem('token')}` // Uncomment when auth is implemented
  }
});

// Customers API
export const getCustomers = () => api.get('/manage_customer/');
export const getCustomer = (id) => api.get(`/manage_customer/${id}/`);
export const createCustomer = (customer) => api.post('/manage_customer/', customer);
export const updateCustomer = (id, customer) => api.put(`/manage_customer/${id}/`, customer);
export const deleteCustomer = (id) => api.delete(`/manage_customer/${id}/`);

// Properties API
export const getProperties = () => api.get('/manage_property/');
export const getProperty = (id) => api.get(`/manage_property/${id}/`);
export const createProperty = (property) => api.post('/manage_property/', property);
export const updateProperty = (id, property) => api.put(`/manage_property/${id}/`, property);
export const deleteProperty = (id) => api.delete(`/manage_property/${id}/`);

// Bookings API
export const getBookings = () => api.get('/manage_booking/');
export const getBooking = (id) => api.get(`/manage_booking/${id}/`);
export const createBooking = (booking) => api.post('/manage_booking/', booking);
export const updateBooking = (id, booking) => api.put(`/manage_booking/${id}/`, booking);
export const deleteBooking = (id) => api.delete(`/manage_booking/${id}/`);

// Reviews API
export const getReviews = () => api.get('/manage_review/');
export const getReview = (id) => api.get(`/manage_review/${id}/`);
export const createReview = (review) => api.post('/manage_review/', review);
export const updateReview = (id, review) => api.put(`/manage_review/${id}/`, review);
export const deleteReview = (id) => api.delete(`/manage_review/${id}/`);

// Notifications API
export const getNotifications = () => api.get('/manage_notification/');
export const getNotification = (id) => api.get(`/manage_notification/${id}/`);
export const createNotification = (notification) => api.post('/manage_notification/', notification);
export const updateNotification = (id, notification) => api.put(`/manage_notification/${id}/`, notification);
export const deleteNotification = (id) => api.delete(`/manage_notification/${id}/`);

export default api;