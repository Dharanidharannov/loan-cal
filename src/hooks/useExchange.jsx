    
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useExchangeRates = (apiKey, baseCurrency) => {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      if (!apiKey || !baseCurrency) return;
      
      setLoading(true);
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/d8267de03e61a27d5420bdba/latest/USD`
        );
        setRates(response.data.conversion_rates);
        console.log(response.data.conversion_rates);
        
        setLastUpdated(new Date(response.data.time_last_update_utc));
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setRates(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();

    const interval = setInterval(fetchRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [apiKey, baseCurrency]);

  return { rates, loading, error, lastUpdated };
};