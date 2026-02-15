import { BadRequestError, NotFoundError, ResourceCantOverwrite } from "../errors";
import { AIclientAdapter } from "../libs/gemini.ai";
import { ActivityRepository } from "../repository/activity.repository";
import { IActivityDetails, IActivityResult, IActivitySession, ScoreResponse } from "../types/activity.type";

export class ActivityService {
    constructor(private _activityRepo: ActivityRepository, private _aiClient: AIclientAdapter) { }

    async create(activity: IActivitySession): Promise<IActivitySession> {
        const session = await this._activityRepo.start(activity);
        if (!session) throw new BadRequestError();
        return session;
    }

    async updateScore(
        email: string,
        score: IActivityResult,
    ): Promise<IActivityResult> {
        const result = await this._activityRepo.updateResult(email, score);
        if (!result) throw new BadRequestError();
        return result;
    }

    async createActivity(
        activity: IActivityDetails
    ): Promise<IActivityDetails> {
        const result = await this._activityRepo.createActivity(activity);
        if (!result) throw new BadRequestError();
        return result;
    }

    async createBulkActivity(activity: IActivityDetails[]) {
        const result = await this._activityRepo.createBulkActivity(activity);
        if (!result) throw new BadRequestError();
        return result;
    }

    async scorer(): Promise<string> {
        const result = await this._aiClient.analyseImage()
        if (!result) throw new BadRequestError();
        return result;
    }

    async scorerCloude(): Promise<ScoreResponse> {
        const intruction = "click photo of nature";
        const result = await this._aiClient.analyseImageHaiku(intruction)
        const reponse = JSON.parse(result) as ScoreResponse
        if (!result) throw new BadRequestError();
        return reponse;
    }
}


