const express = require('express');
const router = express.Router();
const axios = require('axios');
const { IEX_Sandbox } = process.env;
const data = require('../data');
const optionsData = data.options;
const {IEX_key} = process.env;

router.get('/search', (req, res) => {
    const symbol = req.query.symbol;  
    axios
      .get(
        `https://sandbox.iexapis.com/stable/stock/${symbol}/options?&token=${IEX_Sandbox}`
      )
      .then(response => {
        res.json(response.data);
      })
      .catch(err => {
        res.status(404).json({ error: "No data" });

      });
  });

router.get("/list/:symbol/:date/:side", async (req, res) => {
    if (!req.params.symbol) {
        res.status(400).json({ error: "Must include an symbol" });
    }
    if (!req.params.date) {
        res.status(400).json({ error: "Must include an date" });
    }
    if (!req.params.side) {
        res.status(400).json({ error: "Must include an side" });
    }

    try {
        const response = await axios.get(`https://sandbox.iexapis.com/stable/stock/${req.params.symbol}/options?expiration=${req.params.date}&optionSide=${req.params.side}&token=${IEX_Sandbox}`)
        res.json(response.data);
    } catch (e) {
        res.status(404).json({ error: "No data" });
    }
});

router.get("/list/:symbol/:date/:side", async (req, res) => {
    if (!req.params.symbol) {
        res.status(400).json({ error: "Must include an symbol" });
    }
    if (!req.params.date) {
        res.status(400).json({ error: "Must include an date" });
    }
    if (!req.params.side) {
        res.status(400).json({ error: "Must include an side" });
    }

    try {
        const response = await axios.get(`https://sandbox.iexapis.com/stable/stock/${req.params.symbol}/options?expiration=${req.params.date}&optionSide=${req.params.side}&token=${IEX_Sandbox}`)
        res.json(response.data);
    } catch (e) {
        console.log(e)
        res.status(404).json({ error: "No data" });
    }
});

router.get('/getall', async(req,res)=>{
    const date=['20230217','20230317','20230421']
    const symbol = req.query.symbol; 
    
    let data = [{name:"call", data:[]}, {name:"put", data:[]}];
    
    const promises = date.map(async (x) => {          
        let call = 0;
        let put = 0;
  
        try{
            const response = await axios.get(`https://sandbox.iexapis.com/stable/stock/${symbol}/options?expiration=${x}&optionSide=call&token=${IEX_Sandbox}`)
            response.data.map((y) => {
                call +=y.openInterest;
            })
        }catch(e){
            console.log("error", e)
        }
        try{
            const response1 = await axios.get(`https://sandbox.iexapis.com/stable/stock/${symbol}/options?expiration=${x}&optionSide=put&token=${IEX_Sandbox}`)
            response1.data.map((y) => {
                put +=y.openInterest;
            })   
        }catch(e){
            console.log("error", e)
        }
            
        data[0].data.push(call);
        data[1].data.push(put);

        
    });
    await Promise.all(promises).then(a =>{
         res.json(data);
    }).catch(err => {
        console.error('error get Options', err)
    });
    
     
  })

router.post('/save', async(req,res)=>{
    const symbol = req.query.symbol;  
    try{
      await optionsData.storeOption(data)
      const optionsInfo = await optionsData.getOptionBySymbol(symbol, date)
      res.json(optionsInfo)
    }catch(e){
      res.status(500)
    }
  })
module.exports = router;