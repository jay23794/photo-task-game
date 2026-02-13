import { ActivityRepository } from "../repository/activity.repository";
import { IActivitySession } from "../types/activity.type";

export class ActivityService {
    constructor(private _activityRepo:ActivityRepository) {}

    async create(activity: IActivitySession){
       return await this._activityRepo.start(activity)
    }
}