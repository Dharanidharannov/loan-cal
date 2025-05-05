import React, { useState } from 'react';
import useAmortizationtables, { useAmortization } from '../hooks/useAmortization';
import { useAppContext } from '../context/AppContext';
import { Box, TextField, Button, Typography, Paper, Grid } from '@mui/material';
import AmortizationTable from './AmortizationTable.';
import CurrencyConverter from './CurrencyConverter';


function LoanCalculator () {
  const { loanAmount, setLoanAmount, interestRate, setInterestRate, termYears, setTermYears, currency } = useAppContext();
  const { calculateEMI, generateSchedule } = useAmortizationtables();
  const [emi, setEmi] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [showSchedule, setShowSchedule] = useState(false);

  const handleCalculate = () => {
    const calculatedEmi = calculateEMI(loanAmount, interestRate, termYears);
    setEmi(calculatedEmi.toFixed(2));
    
    const generatedSchedule = generateSchedule(loanAmount, interestRate, termYears, calculatedEmi);
    setSchedule(generatedSchedule);
    setShowSchedule(true);
  };

  const handleReset = () => {
    setEmi(null);
    setSchedule([]);
    setShowSchedule(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Loan Calculator
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Loan Amount"
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
            margin="normal"
          />
          
          <TextField
            fullWidth
            label="Interest Rate (%)"
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(parseFloat(e.target.value))}
            margin="normal"
            inputProps={{ step: "0.1" }}
          />
          
          <TextField
            fullWidth
            label="Term (Years)"
            type="number"
            value={termYears}
            onChange={(e) => setTermYears(parseInt(e.target.value))}
            margin="normal"
          />
          
          <Box sx={{ mt: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleCalculate}
              fullWidth
            >
              CALCULATE
            </Button>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          {emi && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Monthly EMI: {currency} {emi}
              </Typography>
              
              <CurrencyConverter amount={emi} fromCurrency={currency} />
              
              {showSchedule && (
                <Box sx={{ mt: 3 }}>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={handleReset}
                    sx={{ mb: 2 }}
                  >
                    RESET TABLE
                  </Button>
                  
                  <AmortizationTable schedule={schedule} currency={currency} />
                </Box>
              )}
            </Box>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LoanCalculator;