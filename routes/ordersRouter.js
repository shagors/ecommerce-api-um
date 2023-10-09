import exppress from "express";
import {
  createOrderCtrl,
  getAllordersCtrl,
  getSingleOrderCtrl,
  updateOrderCtrl,
} from "../controllers/orderCtrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const orderRouter = exppress.Router();

orderRouter.post("/", isLoggedIn, createOrderCtrl);
orderRouter.get("/", isLoggedIn, getAllordersCtrl);
orderRouter.get("/:id", isLoggedIn, getSingleOrderCtrl);
orderRouter.get("/:id", isLoggedIn, updateOrderCtrl);

export default orderRouter;
