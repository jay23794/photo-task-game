
import {Router } from "express";
import { create, createActivity, scorer, update } from "../controller/activity.controller";


const router = Router()

router.post("/start", create)
router.patch("/update-score", update)
router.get("/scorer", scorer)

// Create activity [Add Booth Details]
router.post("/create", createActivity)
export default router;