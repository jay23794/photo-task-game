
import {Router } from "express";
import { create, update } from "../controller/activity.controller";


const router = Router()

router.post("/start", create)
router.patch("/update-score", update)
export default router;