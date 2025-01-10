import axios from 'axios';
import coinModel from '../models/coins.js';

export const knowPrice=async()=>{
    try{
        const res=await axios.get(`https://api.coingecko.com/api/v3/simple/price?x_cg_demo_api_key=${process.env.API_KEY}`,{
            params:{
                ids:"bitcoin,matic-network,ethereum",
                vs_currencies:"usd",
                include_market_cap:true,
                include_24_hr_change:true,
            },
        })

        const data=res.data;
        const coins=[
            {
                coin:"Bitcoin",
                currentPrice:data.bitcoin.usd,
                marketCap:data.bitcoin.usd_market_cap,
                change24hr:data.bitcoin.usd_24h_change,
                timeStamp:new Date(),
            },
            {
                coin:"Matic Network",
                currentPrice:data["matic-network"].usd,
                marketCap:data["matic-network"].usd_market_cap,
                change24hr:data["matic-network"].usd_24h_change,
                timeStamp:new Date(),
            },
            {
                coin:"Ethereum",
                currentPrice:data.ethereum.usd,
                marketCap:data.ethereum.usd_market_cap,
                change24hr:data.ethereum.usd_24h_change,
                timeStamp:new Date(),
            },
        ]
        await coinModel.insertMany(coins);
    }
    catch(err){
        console.log(err);
    }
}
