const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const stocks = data.stocks;
const { GridFSBucket } = require('mongodb');


const combined_data = require('./combined_data.json');


async function main() {
    const db = await dbConnection();
   
    await db.dropDatabase();

    
    console.log('Start seeding database');
    console.log(combined_data.length)
    // const newData = combined_data.map(groupmonth)
   
    // console.log(newData.length)
    let i =0;
  
    let month = new Date(combined_data[0]['time']).getMonth();
    let newData = [];
    let num = 0;
    for(i; i< combined_data.length;i++) {
        var date = new Date(combined_data[i]['time']);
        // combined_data[i]['time'] = new Date(combined_data[i]['time'] * 1000).toISOString();
        if(month !== date.getMonth()){
            console.log(newData.length)
            num += newData.length;
            
            await stocks.storeStock("SPY", date.getFullYear(), month+1, newData);
            
            
            newData = [];
            newData.push(combined_data[i]);
            month = date.getMonth();
        }
        else{
            newData.push(combined_data[i]);
        }
    }
    if(newData.length !== 0){
        num += newData.length;
        await stocks.storeStock("SPY", date.getFullYear(), month+1, newData);
    }
    
    console.log('Done seeding database');
    console.log("num", num)
    process.exit(1);
    
    return 0; 

}
main();