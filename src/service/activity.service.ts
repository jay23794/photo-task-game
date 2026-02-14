import { BadRequestError, NotFoundError, ResourceCantOverwrite } from "../errors";
import { ActivityRepository } from "../repository/activity.repository";
import { IActivityResult, IActivitySession } from "../types/activity.type";

export class ActivityService {
  constructor(private _activityRepo: ActivityRepository) {}

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
}
