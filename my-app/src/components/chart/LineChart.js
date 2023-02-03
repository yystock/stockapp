import React, { useState, useEffect } from 'react';
import { getChart } from '../../utils/stock';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

const LineChart = (props) => {
  const [chartData, setChartData] = useState([]);
  const [options, setOptions] = useState({
        title: {
          text: null
        },
        credits: {
          enabled: false
        },
        yAxis:{
         
          gridLineWidth: 0,
          alignTicks: false,
          extend:true,
          opposite: true,
          title:{
            text:null
          },
          labels: {style:{color: '#BEBEBE'}}
        },
        xAxis: {
          type: 'category',
          tickInterval: 100,
          labels: {style:{color: '#BEBEBE'}}
        },
        series: [{
            name:[],           
            connectNulls: true,
            data: [],
            showInLegend: false,
            color: props.color,            
        }],
        chart: {
            type: 'area',   
            backgroundColor: '#151519'     
        }
    });

  useEffect(() => {
    const getIntradayPrices = async (symbol, range) => {
        getChart(symbol, range).then(data => { 
        const newData = data.map((x) => x.close==0 ? null : [x.minute, x.close]);  
  
        setChartData(newData);
        }).catch(err => console.error(err)) 
    };
    getIntradayPrices(props.symbol, props.range);
  }, []);

  useEffect(() => {
    if(chartData.length > 1){
      setOptions((prevState) =>{return({
          ...prevState, 
          yAxis:{
            min: Math.min(...chartData.filter(point => point !== null).map(point => point[1])),
            Max: Math.max(...chartData.filter(point => point !== null).map(point => point[1])),
            plotLines: [{
              value: chartData.reduceRight((prev, current) => {
                return current === null ? prev : current[1];
              }, null),
              color: props.color,
              width: 2,
              zIndex: 5,
              label: {
                  text: chartData.reduceRight((prev, current) => {
                    return current === null ? prev : current[1];
                  }, null),
                  align: 'right',
                  style: {
                      color: props.color,
                      fontWeight: 'bold'
                  }
              }
          }]
          },
          series: [
              {
                data: chartData,
                fillOpacity: 0.6,
              },                 
          ]               
      });});
    }
}, [chartData])

  return (
    <HighchartsReact
        highcharts={Highcharts}
        options={options}
    />
  );
};

export default LineChart;