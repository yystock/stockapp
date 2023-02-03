import Highcharts from 'highcharts';
import treemap from 'highcharts/modules/treemap';
import HighchartsReact from 'highcharts-react-official';
import React, {useEffect, useState} from 'react';
import { getSectorList } from '../../utils/stock';
treemap(Highcharts);
 function SectorHeatmap(){  

     const [sectorData, setSectorData] = useState(null);
     const [options, setOptions] = useState({
        chart: {
            type: 'treemap',
            height: '40%',
            color:"#151519",
            // width: "200"
        },
        title: {
            text: null
        },
        series: [{
            type:"treemap",
            layoutAlgorithm: "sliceAndDice",
       
            data: [],

        }],
        colorAxis: {
            minColor: '#FFFFFF',
            maxColor: '#000000'
        },
        tooltip: {
            pointFormatter: function() {
                return '<b>' + this.name + '</b>: ' + this.change*100 + '%';
            }
        }
    });
     
     useEffect(()=>{
        async function getSectorListData(sector){
            const data = await getSectorList();
            setSectorData(data);
        }
        getSectorListData();

     },[])
     useEffect(()=>{
        if(sectorData){
            setOptions({
                series:[{
                    data: sectorData,

                    levels: [{
                        level: 1,
                        layoutAlgorithm: 'squarified',
                        dataLabels: {
                            enabled: true,
                            align: 'left',
                            verticalAlign: 'top',
                            style: {
                                fontSize: '15px',
                                fontWeight: 'bold'
                            },
                        },
                        borderWidth: 3,
                        borderColor: '#000000',
                    },{
                        level: 2,
                        layoutAlgorithm: 'squarified',
                        dataLabels: {
                            enabled: true,
                            style: {
                                fontSize: '15px',
                                fontWeight: 'bold'
                            },
                        },
                        borderWidth: 3,
                        borderColor: '#000000',
                    }
                    ],            
                }]
            })
        }
        
     },[sectorData])


    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    );
    


} 
export default SectorHeatmap;