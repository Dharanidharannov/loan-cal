import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AmortizationTable = ({ schedule, currency }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Month</TableCell>
            <TableCell align="right">Principal ({currency})</TableCell>
            <TableCell align="right">Interest ({currency})</TableCell>
            <TableCell align="right">Remaining Balance ({currency})</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schedule.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.month}</TableCell>
              <TableCell align="right">{row.principal}</TableCell>
              <TableCell align="right">{row.interest}</TableCell>
              <TableCell align="right">{row.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AmortizationTable;