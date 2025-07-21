import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {handleResponse} from "./utils/responseHandler"


import adminRout from "./routes/admin"
import authRout from "./routes/auth"
import kycRout from "./routes/kyc"
import userRouter from "./routes/user"

import venderRout from "./routes/vender"

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// test route
app.get('/test', (req, res) => {
  
    handleResponse.handleSuccess(res,"","server running",200)
});


// auth and common routers
app.use("/api/auth",authRout)
app.use("/api/kyc",kycRout)
app.use("/api/user",userRouter)

// admin routers
app.use("/api/admin",adminRout)


// vender routers

app.use("/api/vender",venderRout)









export default app; 