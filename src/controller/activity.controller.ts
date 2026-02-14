import { Request, Response } from "express";
import { activityService } from "../infra/container";
import { IActivityDetails, IActivityResult, IActivitySession } from "../types/activity.type";
import { successResponse } from "../utils/apiResponse";


export const create = async (req: Request, res: Response) => {
    const payload = req.body as IActivitySession
    const result = await activityService.create(payload)
    res.status(201).json(successResponse(result));
}

export const update = async (req: Request, res: Response) => {
    const { email, boothId, score, url, status } = req.body
    const payload: IActivityResult = {
        boothId, url, status, score
    } as IActivityResult
    const result = await activityService.updateScore(email, payload)
    res.status(200).json(successResponse(result));
}


export const createActivity = async (req: Request, res: Response) => {
    const payload = req.body as IActivityDetails
    const result = await activityService.createActivity(payload)
     res.status(201).json(successResponse(result));
}

export const scorer = async (req: Request, res: Response) => {
    const result = await activityService.scorer()
     res.status(201).json(successResponse(result));
}
