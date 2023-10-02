import express from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import {
  createProductCtrl,
  deleteProductCtrl,
  getProductCtrl,
  getProductsCtrl,
  updateProductCtrl,
} from "../controllers/productsCtrl.js";

const productsRoutes = express.Router();

productsRoutes.post("/", isLoggedIn, createProductCtrl);
productsRoutes.get("/", getProductsCtrl);
productsRoutes.get("/:id", getProductCtrl);
productsRoutes.put("/:id", isLoggedIn, updateProductCtrl);
productsRoutes.delete("/:id", isLoggedIn, deleteProductCtrl);

export default productsRoutes;
