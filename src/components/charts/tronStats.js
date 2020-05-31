import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import lineTronStats from "../charts/lineTronStats.json";


const data = {
  labels: [
    'Block Rewards',
    'Voting Rewards',
    'Fee Burned'
  ],
  datasets: [{
    data: [551350256, 1187979440,144773973.291],
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

export default function TronsStats(){



    return (
      <div>
        <h2>TRON Blockchain health</h2>
        <Doughnut data={data} height = {"auto"} width = {"auto"}/>
        </div>
    );

};
