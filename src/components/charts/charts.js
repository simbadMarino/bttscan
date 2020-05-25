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
//import { rows } from "../TronLinkInfo/index.js";
//import {rows} from "../components/TronLinkInfo";

const columns = [
  { id: 'date', label: 'Date', minWidth: 50 },
  { id: 'ar', label: 'ATR', minWidth: 50 },
  {
    id: 'dailyreturn',
    label: 'Daily\u00a0Return',
    minWidth: 100,
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
    width: '70%',
  },
  container: {
    maxHeight: 640,
  },
});



const data = {
  labels: ['24/04/2020', '25/04/2020', '26/04/2020', '27/04/2020', '28/04/2020', '29/04/2020', '30/04/2020', '1/05/2020' ,'2/05/2020' ,'3/05/2020','4/05/2020', '5/05/2020', '6/05/2020', '7/05/2020', '8/05/2020', '9/05/2020', '10/05/2020', '11/05/2020', '12/05/2020', '13/05/2020', '14/05/2020', '15/05/2020', '16/05/2020', '17/05/2020', '18/05/2020', '19/05/2020', '20/05/2020', '21/05/2020', '22/05/2020', '23/05/2020', '24/05/2020'],
  datasets: [
    {
      label: 'Dlive APR ',
      fill: true,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 5,
      pointHitRadius: 10,
      data: [103.13,88.94,57.54,58.42,62.83,68.23,63.63,61.31,57.50,39.53,31.78,35.13,39.83,40.46,40.09,45.99,39.04,34.64,42.58,37.88,35.72,38.96,36.45,34.84,29.70,29.75,33.51,37.75,41.17,39.84,40.78]
    },
    {
      label: 'BTT Distribution ',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(25,172,92,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 5,
      showLine: true,
      pointHitRadius: 10,
      data: [21020000, 22490000, 16000000, 17450000,19240000, 21390000, 20510000,20150000,19280000,15930000,13190000,14430000,16420000,16780000,16630000,19870000,17050000,15560000,19150000,17330000,16430000,17990000,16860000,16170000,13868174,13980000,15750000,17830000,19520000,18540000,19070000]
    },
    {
      label: 'BTT Staking',
      fill: true,
      lineTension: 0.1,
      backgroundColor: 'rgba(15,92,50,0.4)',
      borderColor: 'rgba(15,72,32,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 5,
      showLine: true,
      pointHitRadius: 10,
      data: [7461908371, 9252139201, 10165461244, 10919966261,11196384676, 11464083829, 11785636512,12016153914,12257888695,14724885223,15162183077,15007171246,15063620602,15154446831,15157438181,15789711269,15957751844,16411056535,16434720690,16715983643,16785794033,16849663156,16876204755,16934414816,17044523984,17149091166,17180000000,17235000000,17302000000,16980000000,17110000000]
    }
  ]
};

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
    <h2>Dlive Statistics :) </h2>
    <Line data={data} />
  </div>
   </Paper>

);

};
