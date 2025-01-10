import axios from 'axios';

//This function is used to get the stats of a particular coin
export const getStats=async(req,res)=>{
    const {coin}=req.body;
    if(!coin){
        return res.status(400).json({msg:"coin name is required"});
    }
    //coinMap is used to map the coin name to the coin id
    const coinMap={
        bitcoin:"bitcoin",
        matic:"matic-network",
        ethereum:"ethereum",
    }
    const coinId=coinMap[coin.toLowerCase()];
    if(!coinId){
        return res.status(400).json({msg:"coin not found"});
    }
    try{
        //fetch the stats of the coin
        const stat=await axios.get(`https://api.coingecko.com/api/v3/simple/price?x_cg_demo_api_key=${process.env.API_KEY}`,{
            params:{
                ids:coinId,
                vs_currencies:"usd",
                include_market_cap:true,
                include_24_hr_change:true,
            },
        })
        //extract the data from the response
        const data=stat.data[coinId];
        const result={
            price:data.usd,
            market_cap:data.usd_market_cap,
            change_24h:data.usd_24h_change,
        }
        //return the result
        return res.status(200).json(result);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({msg:"server error"});
    }
};