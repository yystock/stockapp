import axios from 'axios'
import * as moment from "moment";

export const getStock = async symbol => {
    try {
      const response = await axios.get(`/api/stocks/search/?symbol=${symbol}`);
      return response.data;
    } catch (err) {
      return "error";
    }
  };

export const getAdvanced = async symbol => {
  try {
    const response = await axios.get(`/api/stocks/advanced/?symbol=${symbol}`);
    return response.data;
  } catch (err) {
    return "error";
  }
};

export const getCompare = async (symbol1, symbol2, range) => {
  try {
    const response = await axios.get(`/api/stocks/compare/${symbol1}/${symbol2}/${range}`);
    return response.data;
  } catch (err) {
    return "error";
  }
};

export const getInsider= async (symbol) => {
  try {
    const response = await axios.get(`/api/stocks/insider/?symbol=${symbol}`);
    return response.data;
  } catch (err) {
    return "error";
  }
};


export const getList = async symbol => {
  try {
    const response = await axios.get(`/api/stocks/list/?symbol=${symbol}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return "error";
  }
};

export const getMost = async request => {
  try {
    const response = await axios.get(`/api/stocks/most/?request=${request}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return "error";
  }
};

  // chart Data  1. Line chart(1d)
export const getChart = async (symbol, range) => {
  try {
    const response = await axios.get(`/api/stocks/chart/${symbol}/${range}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return "error";
  }
};

export const getSectors = async () => {
  try {
    const response = await axios.get(`/api/stocks/sectors`);
    return response.data;
  } catch (err) {
    console.log(err);
    return "error";
  }
};

export const getStocksDB = async (symbol, range) => {
  try {
    const response = await axios.get(`/db/stocks/${symbol}/${range}`);
    let data = response.data.map(item => item.data.map(i => [Number(moment(i.time).format('x')),i.open, i.high, i.low, i.close])).flat();
    const volume = response.data.map(item => item.data.map(i => [Number(moment(i.time).format('x')),i.volume])).flat();
    return ({data:data, volume:volume});
    
  } catch (err) {
    console.log(err);
    return "error";
  }
  
};

export const getSectorsPerformance = async() =>{
  try{
    const response = await axios.get(`/api/stocks/sectors-performance`);
    return response.data;
  } catch(err){
    console.log(err)
    return "error";
  }
}

export const getSingleSector = async(sector) =>{
  try{
    const response = await axios.get(`/api/stocks/single-sector/${sector}`);
    return response.data;
  } catch(err){
    console.log(err)
    return "error";
  }
}
export const getSectorList = async() =>{
  try{
    const response = await axios.get(`/api/stocks/sector-list`);
    return response.data;
  } catch(err){
    console.log(err)
    return "error";
  }
}

export const getSectorsChart = async() =>{
  try{
    const response = await axios.get(`/api/stocks/chart-sector`);
    return response.data;
  } catch(err){
    console.log(err)
    return "error";
  }
}

export const getNews = async(symbol, last) =>{
  try{
    const response = await axios.get(`/api/stocks/news/${symbol}/${last}`);
    return response.data;
  } catch(err){
    console.log(err)
    return "error";
  }
}
export const getNewsFromAV = async(symbol, limit) =>{
  try{
    const response = await axios.get(`/av-api/stocks/news/${symbol}/${limit}`);
    return response.data;
  } catch(err){
    console.log(err)
    return "error";
  }
}

export const getIntraday = async(symbol) =>{
  try{
    const response = await axios.get(`/av-api/stocks/${symbol}`);
    return response.data;
  } catch(err){
    console.log(err)
    return "error";
  }
}