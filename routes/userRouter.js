import express from "express";
import { getUser, login, logout, register } from '../controllers/userController.js';
import { isAuthoried } from "../middlewares/auth.js";



const router=express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/logout",isAuthoried,logout);
router.get("/getuser",isAuthoried,getUser);
export default router;








