import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js';
import userRoutes from "./routes/userRoutes.js"


connectDB();

const  app = express();
const port = process.env.PORT||5000;

app.use(cookieParser());
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/users',userRoutes);

app.get('/',(req,res)=>{
    res.send('API is running...');
})

app.listen(port,()=>console.log(`Server started on port ${port}`));