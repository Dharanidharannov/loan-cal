import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function ErrorPage () {
  return (
    <Box sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h3" gutterBottom>
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body1" gutterBottom>
        We're sorry, but an unexpected error has occurred.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        component={Link} 
        to="/"
        sx={{ mt: 3 }}
      >
        Return to Home
      </Button>
    </Box>
  );
};

export default ErrorPage;