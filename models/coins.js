import mongoose from "mongoose";

const coinSchema=new mongoose.Schema({
    coin:{
        type:String,
        required:true,
    },
    currentPrice:{
        type:Number,
        required:true,
    },
    marketCap:{
        type:Number,
        required:true,
    },
    change24hr:{
        type:Number,
    },
    timeStamp:{
        type:Date,
        default:Date.now,
    },
})

const coinModel=mongoose.models.coin||mongoose.model("coin",coinSchema);

export default coinModel;



//coin,current_price,market_cap,24h_change,lastUpdated