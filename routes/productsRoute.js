import express from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import {
  createProductCtrl,
  getProductsCtrl,
} from "../controllers/productsCtrl.js";

const productsRoutes = express.Router();

productsRoutes.post("/", isLoggedIn, createProductCtrl);
productsRoutes.get("/", getProductsCtrl);

export default productsRoutes;
