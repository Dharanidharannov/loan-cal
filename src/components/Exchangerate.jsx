
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  CircularProgress,
  Alert,
  TextField,
  MenuItem,
  Box
} from '@mui/material';
import {useExchangeRates} from '../hooks/useExchange';
import { useAppContext } from '../context/AppContext';

const ExchangeRatesTable = () => {
  const { apiKey, currency, setCurrency } = useAppContext();
  const { rates, loading, error } = useExchangeRates(apiKey, currency);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleBaseCurrencyChange = (e) => {
    setCurrency(e.target.value);
    setPage(0);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!rates) return <Typography>No exchange rates available</Typography>;

  // Filter and sort currencies
  const filteredCurrencies = Object.entries(rates)
    .filter(([curr]) => 
      curr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      curr.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a[0].localeCompare(b[0]));

  const paginatedCurrencies = filteredCurrencies.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          label="Search Currency"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 300 }}
        />
        <TextField
          select
          label="Base Currency"
          value={currency}
          onChange={handleBaseCurrencyChange}
          size="small"
          sx={{ width: 200 }}
        >
          {Object.keys(rates).sort().map((curr) => (
            <MenuItem key={curr} value={curr}>
              {curr}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Currency</TableCell>
              <TableCell align="right">Rate</TableCell>
              <TableCell align="right">Inverse Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCurrencies.map(([curr, rate]) => (
              <TableRow key={curr} hover>
                <TableCell>{curr}</TableCell>
                <TableCell align="right">{rate.toFixed(6)}</TableCell>
                <TableCell align="right">{(1 / rate).toFixed(6)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={filteredCurrencies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ExchangeRatesTable;