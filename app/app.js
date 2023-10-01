import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routes/usersRoute.js";
import { globalErrhandler, notFound } from "../middleware/globalErrHandler.js";
import productsRoutes from "../routes/productsRoute.js";

dotenv.config();
// db connection
dbConnect();
const app = express();
app.use(express.json());

// routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productsRoutes);

// error middleware
app.use(notFound);
app.use(globalErrhandler);

export default app;
