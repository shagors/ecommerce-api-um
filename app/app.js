import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routes/usersRoute.js";
import { globalErrhandler, notFound } from "../middleware/globalErrHandler.js";
import productsRoutes from "../routes/productsRoute.js";
import categoriesRouter from "../routes/categoriesRouter.js";
import brandsRouter from "../routes/brandsRoute.js";
import colorRouter from "../routes/colorRoute.js";

dotenv.config();
// db connection
dbConnect();
const app = express();
app.use(express.json());

// routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productsRoutes);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/brands", brandsRouter);
app.use("/api/v1/colors", colorRouter);

// error middleware
app.use(notFound);
app.use(globalErrhandler);

export default app;
