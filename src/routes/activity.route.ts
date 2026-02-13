
import {Router } from "express";
import { create } from "../controller/activity.controller";


const router = Router()

router.post("/start", create)

export default router;