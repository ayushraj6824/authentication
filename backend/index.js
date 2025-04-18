import express from "express";
import dotenv from "dotenv";
import connectDb from "./utils/connectDb.js";
import cookieParser from "cookie-parser";
import authRouter from "./routers/auth.router.js";
import cors from "cors";

// configuration
dotenv.config();
const app = express();
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}))
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/api/auth', authRouter);


app.get('/', (req, res)=>{
    res.status(200).json({
        message: "Welcome to the backend API"
    })
})


app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
    connectDb();
})