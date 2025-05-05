

import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [termYears, setTermYears] = useState(5);
  const [currency, setCurrency] = useState('USD');
  const [apiKey, setApiKey] = useState('d8267de03e61a27d5420bdba'); 

  return (
    <AppContext.Provider
      value={{
        loanAmount,
        setLoanAmount,
        interestRate,
        setInterestRate,
        termYears,
        setTermYears,
        currency,
        setCurrency,
        apiKey,
        setApiKey
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);