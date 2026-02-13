import { handleMongooseError } from "../config/mongo.error";
import { ActivityModel, ActivitySessionModel } from "../model/activity.model";
import { IActivityResult, IActivitySession } from "../types/activity.type";

export class ActivityRepository {
    async start(activity: IActivitySession) {
        try {
            await ActivitySessionModel.create(activity);
            await ActivityModel.create({
                email: activity.userEmail,
                sessionId: activity.id,
            });
        } catch (error) {
            throw handleMongooseError(error);
        }
    }

    async updateResult(id: string, result: IActivityResult) {
        try {
            await ActivitySessionModel.updateOne(
                { _id: id, "result.boothId": { $ne: result.boothId } },
                {
                    $push: { result },
                    $inc: {
                        totalScore: result.score,
                        activityPerformed: 1
                    }
                },


            );
        } catch (error) {
            throw handleMongooseError(error);
        }
    }
}
