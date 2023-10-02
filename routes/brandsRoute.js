import exppress from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import {
  createBrandCtrl,
  deleteBrandCtrl,
  getAllBrandsCtrl,
  getSingleBrandCtrl,
  updateBrandCtrl,
} from "../controllers/brandsCtrl.js";

const brandsRouter = exppress.Router();

brandsRouter.post("/", isLoggedIn, createBrandCtrl);
brandsRouter.get("/", getAllBrandsCtrl);
brandsRouter.get("/:id", getSingleBrandCtrl);
brandsRouter.delete("/:id", isLoggedIn, deleteBrandCtrl);
brandsRouter.put("/:id", isLoggedIn, updateBrandCtrl);

export default brandsRouter;
