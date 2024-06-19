import express from "express";
import {deleteJob, getAllJobs, getmyJobs, getSinglejob, postJob, updateJob} from '../controllers/JobController.js';
import { isAuthoried } from "../middlewares/auth.js";

const router=express.Router();
router.get("/getall",getAllJobs);
router.post("/post",isAuthoried,postJob);
router.get("/getmyjobs",isAuthoried,getmyJobs);
router.put("/update/:id",isAuthoried,updateJob);
router.delete("/delete/:id",isAuthoried,deleteJob);
router.get("/:id",isAuthoried,getSinglejob);
export default router;

