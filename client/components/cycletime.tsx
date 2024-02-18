"use client"

import React, { useEffect, useState } from "react";
//import { render } from "react-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getCyleTime } from "@/actions/project";

interface IProps {
  series: any;
}

function CycleTime(props: IProps) {

  const { series } = props;
  const [barData, setBarData] = useState([]);
  const [taskNames, setTaskNames] = useState([]);


  const options = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Cycle time',
        align: 'left'
    },
    xAxis: {
        categories: taskNames,
        crosshair: true,
        accessibility: {
            description: 'Countries'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Days taken to complete task'
        }
    },
    tooltip: {
        valueSuffix: ' (1000 MT)'
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [
        {
            name: 'Cycle Time',
            data: barData
        }
    ]
};

useEffect(() => {
  getCyleTime("1")
      .then((data: any) => {
          console.log({data});

          getBarGraphData(data);
          
      })
}, [])

function getBarGraphData(apiResponseData: any) {

  let cycleData:any[] = [];
  let taskNames: any[] = [];

  apiResponseData.forEach((data: any) => {

    cycleData.push(data.cycleTime);
    taskNames.push(data.taskName);

  });

  console.log({cycleData});

  console.log({taskNames});

  setBarData(cycleData);
  setTaskNames(taskNames);


  

  
}


  return (<div>
    <HighchartsReact highcharts={Highcharts} options={options} />
  </div>
  );
};

export default CycleTime;

