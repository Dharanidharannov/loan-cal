import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { AppProvider } from './context/AppContext';
import { ThemeProvider as CustomThemeProvider, useThemeContext } from './context/ThemeContext';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ExchangePage from './pages/ExchangePage';
import ErrorPage from './components/Error';


function App() {
  return (
    <Router>
      <CustomThemeProvider>
        <AppProvider>
          <ThemeWrapper />
        </AppProvider>
      </CustomThemeProvider>
    </Router>
  );
}

const ThemeWrapper = () => {
  const { theme } = useThemeContext();
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path='/exchange-rate' element={<ExchangePage/>} />
        <Route path='/error' element={<ErrorPage/>} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;