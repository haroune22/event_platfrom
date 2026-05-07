import "dotenv/config"; 

import express from "express";
import cookieParser from "cookie-parser";

import userRoute from './routes/user.js'
import communityRoute from './routes/community.js'
import db from "./config/db.js";



const PORT = process.env.PORT
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//routes

app.use('/api/auth', userRoute)
app.use('/api/community', communityRoute)

app.listen(PORT, ()=> {
    console.log(`app is listening on port ${PORT}`)
})