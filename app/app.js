import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routes/usersRoute.js";
import { globalErrhandler } from "../middleware/globalErrHandler.js";

dotenv.config();
// db connection
dbConnect();
const app = express();
app.use(express.json());

// routes
app.use("/", userRoutes);

// error middleware
app.use(globalErrhandler);

export default app;
