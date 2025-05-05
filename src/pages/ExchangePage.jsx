
import React from 'react';
import { Container, Typography, Box, CircularProgress, Alert, Paper } from '@mui/material';
import ExchangeRatesTable from '../components/Exchangerate';
import { useAppContext } from '../context/AppContext';

function ExchangePage() {
  const { currency, setCurrency } = useAppContext();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Live Exchange Rates
        </Typography>
        <Typography variant="body1" paragraph>
          Current base currency: {currency}
        </Typography>
        
        <Box sx={{ mt: 3 }}>
          <ExchangeRatesTable />
        </Box>
      </Paper>
    </Container>
  );
};

export default ExchangePage;