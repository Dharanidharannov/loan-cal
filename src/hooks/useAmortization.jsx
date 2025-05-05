
import { useCallback } from 'react';

function useAmortizationtables ()  {
  const calculateEMI = useCallback((principal, annualRate, years) => {
    const monthlyRate = annualRate / 100 / 12;
    const numberOfPayments = years * 12;
    
    const emi = 
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return emi;
  }, []);

  const generateSchedule = useCallback((principal, annualRate, years, emi) => {
    const monthlyRate = annualRate / 100 / 12;
    const numberOfPayments = years * 12;
    let balance = principal;
    const schedule = [];

    for (let month = 1; month <= numberOfPayments; month++) {
      const interest = balance * monthlyRate;
      const principalPayment = emi - interest;
      balance -= principalPayment;

      if (month >= numberOfPayments - 6 || month % 12 === 0 || month <= 6) {
        schedule.push({
          month,
          principal: principalPayment.toFixed(2),
          interest: interest.toFixed(2),
          balance: Math.abs(balance).toFixed(2)
        });
      }
    }

    return schedule;
  }, []);

  return { calculateEMI, generateSchedule };
};

export default useAmortizationtables