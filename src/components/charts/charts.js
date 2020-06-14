import React from 'react';
import {Line} from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import dliveStats from "../charts/dliveStats.json";
import lineStats from "../charts/lineChart.json";

const columns = [
  { id: 'date', label: 'Date', minWidth: 50 },
  { id: 'ar', label: 'ATR', minWidth: 50, maxWidth: 65 },
  {
    id: 'dailyreturn',
    label: 'Daily\u00a0Return (%)',
    minWidth: 100,
    maxWidth: 120,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'totaldist',
    label: 'Total\u00a0Dist',
    minWidth: 60,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'totalstaked',
    label: 'Total\u00a0Staked',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString(2),
  },
];

const rows = dliveStats;

const useStyles = makeStyles({
  root: {
    width: '95%',
  },
  container: {
    maxHeight: 640,
  },
});



const data = lineStats;

export default function DLiveStaking() {

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

    return (

      <Paper className={classes.root}>
     <TableContainer className={classes.container}>
       <Table stickyHeader aria-label="sticky table">
         <TableHead>
           <TableRow>
             {columns.map((column) => (
               <TableCell
                 key={column.id}
                 align={column.align}
                 style={{ minWidth: column.minWidth }}
               >
                 {column.label}
               </TableCell>
             ))}
           </TableRow>
         </TableHead>
         <TableBody>
           {rows.dliveStats.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
             return (
               <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                 {columns.map((column) => {
                   const value = row[column.id];
                   return (
                     <TableCell key={column.id} align={column.align}>
                       {column.format && typeof value === 'number' ? column.format(value) : value}
                     </TableCell>
                   );
                 })}
               </TableRow>
             );
           })}
         </TableBody>
       </Table>
     </TableContainer>
     <TablePagination
       rowsPerPageOptions={[10, 25, 100]}
       component="div"
       count={rows.dliveStats.length}
       rowsPerPage={rowsPerPage}
       page={page}
       onChangePage={handleChangePage}
       onChangeRowsPerPage={handleChangeRowsPerPage}
     />
     <div>
    <h2>Dlive Statistics </h2>
    <Line data={data} />
  </div>
   </Paper>
);
};
