import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {Line} from 'react-chartjs-2';
import {Radar} from 'react-chartjs-2';
import lineTronStats from "../charts/lineTronStats.json";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


var perBR = "29.01%";
var perVR = "63.38%";
var perFB = "7.61%";
const useStyles = makeStyles({
  root: {
    width: '90%',
  },
  container: {
    maxHeight: 640,
  },
});

const legendOpts = {
  display: true,
  position: 'right',
  fullWidth: true,
  reverse: false,
  /*labels: {
    fontColor: 'rgb(255, 99, 132)'
  }*/
};

const data = {

  labels: [
    'Block Rewards: '+ perBR,
    'Voting Rewards: '+ perVR,
    'Fee Burned: '+ perFB
  ],
  datasets: [{
    data: [555346416, 1227937840,145543510.991],
    backgroundColor: [
    '#FA5858',
    '#FFCE56',
    '#9FF781'
    ],
    hoverBackgroundColor: [
    '#FF0000',
    '#FACC2E',
    '#40FF00'
    ]
  }]
};
const data2 = lineTronStats;

export default function TronsStats(){

  const classes = useStyles();



    return (
      <Paper className={classes.root}>
        <div>
          <h2>TRX Minting Status</h2>
          <Doughnut data={data} legend={legendOpts}/>
          <h2>TRX Supply Stats (&Delta; changes)</h2>
          <Line data={data2} />
        </div>
        </Paper>
    );

};
