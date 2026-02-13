
import { Router } from "express";
import activityRoute from "./routes/activity.route";


const router = Router();

router.use("/activity", activityRoute);

export default router;