import { Request, Response } from "express";
import { activityService } from "../infra/container";
import { IActivitySession } from "../types/activity.type";


export const create = (req:Request,res:Response)=>{
    const payload = req.body as IActivitySession
    activityService.create(payload)
    res.status(201).json({
        "success":true
    }); 
}