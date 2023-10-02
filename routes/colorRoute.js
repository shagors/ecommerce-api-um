import exppress from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import {
  createColorCtrl,
  deleteColorCtrl,
  getAllColorsCtrl,
  getSingleColorCtrl,
  updateColorCtrl,
} from "../controllers/colorsCtrl.js";

const colorRouter = exppress.Router();

colorRouter.post("/", isLoggedIn, createColorCtrl);
colorRouter.get("/", getAllColorsCtrl);
colorRouter.get("/:id", getSingleColorCtrl);
colorRouter.delete("/:id", isLoggedIn, deleteColorCtrl);
colorRouter.put("/:id", isLoggedIn, updateColorCtrl);

export default colorRouter;
