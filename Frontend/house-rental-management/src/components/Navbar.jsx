import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button,} from '@mui/material';
import { House, People, CalendarToday,} from '@mui/icons-material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          House Rental System
        </Typography>
        <Button color="inherit" component={Link} to="/" startIcon={<House />}>
          Home
        </Button>
        <Button color="inherit" component={Link} to="/customers" startIcon={<People />}>
          Customers
        </Button>
        <Button color="inherit" component={Link} to="/properties" startIcon={<House />}>
          Properties
        </Button>
        <Button color="inherit" component={Link} to="/bookings" startIcon={<CalendarToday />}>
          Bookings
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;