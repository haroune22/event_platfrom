import "dotenv/config"; 

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoute from './routes/user.js'
import communityRoute from './routes/community.js'
import postsRoute from './routes/posts.js'
import eventsRouter from './routes/events.js'
import db from "./config/db.js";



const PORT = process.env.PORT
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

//routes

app.use('/api/auth', userRoute)
app.use('/api/community', communityRoute)
app.use('/api/posts', postsRoute)
app.use('/api/events', eventsRouter)

app.listen(PORT, ()=> {
    console.log(`app is listening on port ${PORT}`)
})