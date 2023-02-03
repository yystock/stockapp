import axios from 'axios'

export const getUsers = async id => {
    try {
      const response = await axios.get(`/users/${id}`);
      return response;
    } catch (err) {
        return err;
    }
};

export const addUsers = async user => {
    try {
      const response = await axios.post(`/users`, user);
      return response;
    } catch (err) {
      return "error";
    }
};


export const resetUsers = async id => {
  try {
    const response = await axios.delete(`/users/delete/${id}`);
    return response;
  } catch (err) {
    return "error";
  }
};


export const getHoldings = async (id) => {
    try {
      const response = await axios.get(`/holdings/${id}`);
      return response;
    } catch (err) {
      return "error";
    }
};

export const getTrades = async (id) => {
    try {
      const response = await axios.get(`/trades/${id}`);
      return response;
    } catch (err) {
      return "error";
    }
};

export const addTrade = async (trade)=>{
    try {
        const response = await axios.post(`/trades/`, trade);
        return response;
      } catch (err) {
        return "error";
      }
};

export const getWatchlist = async (id) => {
    try {
      const response = await axios.get(`/watchlist/${id}`);
      return response;
    } catch (err) {
      return "error";
    }
};

export const addWatchlist = async (userId, symbol) => {
    try {
      const response = await axios.post(`/watchlist/${userId}/${symbol}`);
      return response;
    } catch (err) {
      return "error";
    }
};





