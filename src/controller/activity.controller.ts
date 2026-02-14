import { Request, Response } from "express";
import { activityService } from "../infra/container";
import { IActivityResult, IActivitySession } from "../types/activity.type";


export const create = async (req: Request, res: Response) => {
    const payload = req.body as IActivitySession
    const result = await activityService.create(payload)
    res.status(201).json({
        "success": true,
        data: result
    });
}

export const update = async (req: Request, res: Response) => {
    const { email, boothId, score, url, status } = req.body
    const payload: IActivityResult = {
        boothId, url, status, score
    } as IActivityResult
    const result = await activityService.updateScore(email, payload)
    res.status(201).json({
        "success": true,
        data: result
    });
}