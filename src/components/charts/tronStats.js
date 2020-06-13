import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {Line} from 'react-chartjs-2';
import {Radar} from 'react-chartjs-2';
import lineTronStats from "../charts/lineTronStats.json";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';



var perFB = "7.48%";
var perVR = "63.93%";
var perBR = "28.58%";

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
    'Fee Burned: '+ perFB,
    'Voting Rewards: '+ perVR,
    'Block Rewards: '+ perBR

  ],
  datasets: [{
    data: [122137, 4529920, 452992],
    backgroundColor: [
    '#9FF781',
    '#FFCE56',
    '#FA5858'

    ],
    hoverBackgroundColor: [
    '#40FF00',
    '#FACC2E',
    '#FF0000'
    ]
  }]
};
const data2 = lineTronStats;

export default function TronsStats(){

  const classes = useStyles();



    return (
      <Paper className={classes.root}>
        <div>
          <h2>TRX Current Minting Status</h2>
          <Doughnut data={data} legend={legendOpts}/>
          <h2>TRX Minting History</h2>
          <Line data={data2} />
        </div>
        </Paper>
    );

};
