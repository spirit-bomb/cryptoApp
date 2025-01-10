import express from 'express';
import "dotenv/config";
import {connectDB} from "./database.js";
import {knowPrice} from "./task/knowPrice.js";
import cron from "node-cron";
import {getStats} from "./task/stats.js";
import {getDeviations} from './task/deviation.js';


const app=express();
app.use(express.json());

//connect to database
connectDB();

//Task1 - background task
cron.schedule('0 */2 * * *',async()=>{
    await knowPrice();
});

//home route
app.get("/",(req,res)=>{
    res.send("fetching cryptocurrency data in every 2 hours");
})

//Task2 - getStats
app.get("/stats",getStats);

//Task3 - deviations
app.get("/deviations",getDeviations);

//listen to port
const PORT=process.env.PORT||3000
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`);
})