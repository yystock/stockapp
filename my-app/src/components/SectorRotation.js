import React from "react";
import { useEffect, useState } from "react";
import { getSectorsChart } from "../utils/stock";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
function SectorRotation(){
    const rotations = ['XLB', 'XLV', 'XLU', 'XLP', 'XLE', 'XLRE', 'XLI', 'XLF','XLK','XLY','XLC'];
    
    const [sectorsChartData, setChartData] = useState(null);
    const [range,setRange] = useState(null);
    const [options, setOptions] = useState({
        chart: {
            type: 'line',
            backgroundColor: '#151519'     
        },
        title: {
            text: 'Sector Rotations',
            style: {
                color: 'white',
            }
        },
        subtitle: {
            text: 'How different sector ETFs have moved historically.',
            style: {
                color: 'white',           
            }
        },
        credits: {
            enabled: false
          },
        xAxis: {
            categories: [],
            labels: {style:{color: '#BEBEBE'}}
        },
        yAxis: {
            labels: {style:{color: '#BEBEBE'}},
            title: {
                text: 'Values'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            itemStyle: {
                color: '#BEBEBE'
            }
         
        },
        series: [],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });
     
    useEffect(() => {
        async function getSectorsChartData(){
            getSectorsChart().then(data => {
                const transformedData = Object.entries(data).map(([name, {chart}]) => {
                    const data = chart.map(({changeOverTime}) => changeOverTime);
                    return {name, data};
                });
                const range = data.XLC.chart.map((x) => x.date);  
                setRange(range);
                setChartData(transformedData);
            }).catch(err => console.error(err));
        }
        getSectorsChartData();
    }, []) 

    useEffect(() =>{
        setOptions((prevState) =>{return({
            ...prevState,
            xAxis: {
                categories: range
            },
            series: sectorsChartData          
        });});
    }, [sectorsChartData, range])
    
    return (
        <div className="sector-rotation">
        <HighchartsReact
            highcharts={Highcharts}
            
            options={options}
        />
        </div>
        )

}
export default SectorRotation;