import axios from 'axios'
import * as moment from "moment";

export const getOptions = async symbol => {
    try {
      const response = await axios.get(`/api/options/search/?symbol=${symbol}`);
      return response.data;
    } catch (err) {
      return "error";
    }
};

export const getOptionsList = async (symbol, date, side) => {
    try {
      const response = await axios.get(`/api/options/list/${symbol}/${date}/${side}`);
      return response.data;
    } catch (err) {
      return "error";
    }
};

export const getAll = async (symbol) => {
    try {
      const response = await axios.get(`/api/options/getall/?symbol=${symbol}`);
      return response.data;
    } catch (err) {
      return "error";
    }
};