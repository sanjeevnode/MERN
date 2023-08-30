import express from "express";
import dotenv from 'dotenv'
import userRoutes from "./routes/userRoutes.js"
dotenv.config();
import { notFound ,errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import path from 'path';

connectDB();

const port = process.env.PORT||5000;

const app = express()

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.use(cors());

app.use('/api/users',userRoutes);

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>console.log(`server started onn port ${port}` )) 