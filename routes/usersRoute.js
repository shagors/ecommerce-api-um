import express from "express";
import {
  getUserProfileCtrl,
  loginUserCtrl,
  registerUserCtrl,
} from "../controllers/usersCtrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const userRoutes = express.Router();

userRoutes.post("/register", registerUserCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.get("/profile", isLoggedIn, getUserProfileCtrl);

export default userRoutes;
