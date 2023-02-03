import React from "react";
import { useEffect, useState } from "react";
import {  getAll } from '../../utils/options';
import * as moment from "moment";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

function OptionFlowBar(props){
    const date=['20230217','20230317','20230421','20230519','20230616','20230721','20230818','20230915']
    const [data, setData] =useState(null);
    const [options, setOptions] = useState({
        chart: {
            type: 'bar',
            backgroundColor: '#151519'     
        },
        title: {
            text: null
        },
        credits: {
            enabled: false
          },
    
        xAxis: [{
            categories: date,
            reversed: false,
            labels: {
                step: 1
            },
            labels: {style:{color: '#BEBEBE'}}
    
        }, 
        ],
        yAxis: {
            title: {
                text: null
            },
            labels: {style:{color: '#BEBEBE'}}
        },
        colors: ['#21CC6D', '#E24648'],
        plotOptions: {
            series: {
                
                stacking: 'normal'
            }
        },
        series: []

    });
    useEffect(() => {
    
        async function getAllData(symbol){
            const data = await getAll(symbol);
            setData(data);
        }
        getAllData(props.symbol);
    
        
    }, [props.symbol]);
    useEffect(() => {
        if(data){
            setOptions((prevState) =>{return({
                ...prevState,

                series: data   
            });});
        }
    
        
    }, [data]);
    
    return(<div className="option-flowbar">
        <h4>Daily Flow Chart</h4>
        <p>Today's total calls & puts premiums per every expiration. Current data is inaccurate</p>
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />

    </div>);
}
export default OptionFlowBar;