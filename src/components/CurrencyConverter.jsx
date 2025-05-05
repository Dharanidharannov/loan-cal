import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Box, Typography } from '@mui/material';
import { useExchangeRates } from '../hooks/useExchange';
import { useAppContext } from '../context/AppContext';

const CurrencyConverter = ({ amount, fromCurrency }) => {
  const { apiKey } = useAppContext();
  const { rates } = useExchangeRates(apiKey, fromCurrency);
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    if (rates && rates[toCurrency]) {
      setConvertedAmount((amount * rates[toCurrency]).toFixed(2));
    }
  }, [amount, rates, toCurrency]);

  if (!rates) return null;

  const currencyOptions = Object.keys(rates).sort();

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1">Currency Conversion</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
        <Typography>{amount} {fromCurrency} =</Typography>
        <Typography variant="h6">{convertedAmount}</Typography>
        <TextField
          select
          size="small"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          sx={{ minWidth: 100 }}
        >
          {currencyOptions.map((currency) => (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Box>
  );
};

export default CurrencyConverter;