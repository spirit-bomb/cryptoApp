import express from 'express';
import "dotenv/config";
import {connectDB} from "./database.js";
import {knowPrice} from "./task/knowPrice.js";
import cron from "node-cron";
import {getStats} from "./task/stats.js";


const app=express();
app.use(express.json());

connectDB();

cron.schedule('*/2 * * * *',async()=>{
    await knowPrice();
});

//Task2 - getStats
//app.get("/stats",getStats);

const PORT=process.env.PORT||3000
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`);
})