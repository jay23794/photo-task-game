import { handleMongooseError } from "../config/mongo.error";
import { ActivityModel, ActivitySessionModel } from "../model/activity.model";
import { IActivityResult, IActivitySession } from "../types/activity.type";

export class ActivityRepository {
    async start(activity: IActivitySession): Promise<IActivitySession> {
        try {
            const session = await ActivitySessionModel.create(activity);
            await ActivityModel.create({
                email: activity.userEmail,
                sessionId: session._id,
            });
            return session
        } catch (error) {
            throw handleMongooseError(error);
        }
    }

    async updateResult(email: string, result: IActivityResult): Promise<IActivityResult | null> {
        try {

            const score: IActivityResult | null = await ActivityModel.findOneAndUpdate(
                {
                    email: email,
                    result: {
                        $not: {
                            $elemMatch: { boothId: result.boothId }
                        }
                    }
                },
                {
                    $push: { result },
                    $inc: {
                        totalScore: result.score,
                        activityPerformed: 1
                    }
                }, {
                new: true
            });
            if (!score) {
                return null;
            }

            return score
        } catch (error) {
            throw handleMongooseError(error);
        }
    }
}
