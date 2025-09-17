import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { handleResponse } from "./utils/responseHandler"
import path from 'path';


import adminRout from "./routers/admin"
import authRout from "./routers/auth"
import kycRout from "./routers/kyc"
import userRouter from "./routers/user"
import vendorRout from "./routers/vender"
import retailerRoute from "./routers/retailer"
import salesAgent from "./routers/salesAgent"
import fileUploadRouter from "./routers/fileUploading"
import commonRouetr from "./routers/common"


// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// test route
app.get('/test', (req, res) => {
  console.log("hii")
  handleResponse.handleSuccess(res, "", "server running", 200)
});


// media route

app.use(
  "/media",
  express.static(path.join(__dirname, "../media"), {
    maxAge: "1d",
    etag: true,
    lastModified: true,
  })
);





// auth and common routers
app.use("/api/auth", authRout)
app.use("/api/kyc", kycRout)
app.use("/api/user", userRouter)
app.use("/api/upload", fileUploadRouter)
app.use("/api/common", commonRouetr)


// admin routers
app.use("/api/admin", adminRout)

// vender routers
app.use("/api/vendor", vendorRout)

// sales agent routers
app.use("/api/salesAgent", salesAgent)

// retailer routers
app.use("/api/retailer", retailerRoute)







export default app; 