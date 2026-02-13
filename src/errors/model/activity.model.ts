import { model, Schema } from "mongoose";
import { ActivityStatus, IActivity, IActivityDetails, IActivityResult, IActivitySession } from "../types/activity.type";

const ActivitySessionSchema = new Schema<IActivitySession>({
    userId: { type: String },
    userEmail: { type: String, required: true, trim: true, lowercase: true },
    isStarted: { type: Boolean, default: false },
});

const ActivityResultSchema = new Schema<IActivityResult>({
    boothId: { type: Schema.Types.ObjectId, ref: "activitySession", required: true, unique: true },
    score: { type: Number, required: true, default: 0 },
    url: { type: String, required: true },
    status: { type: String, enum: Object.values(ActivityStatus), default: ActivityStatus.STARTED, },
}, { _id: true });

const ActivitySchema = new Schema<IActivity>({
    sessionId: { type: Schema.Types.ObjectId, required: true },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    totalScore: { type: Number, default: 0, },
    activityPerformed: { type: Number, default: 0 },
    result: { type: [ActivityResultSchema], default: [] },
})

const ActivityDetailsSchema = new Schema<IActivityDetails>({
    boothNo: { type: Number, required: true, unique: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, },
    taskTitle: { type: String, required: true },
    taskDescription: { type: String, required: true },
    visits: { type: Number, default: 0 },
});

export const ActivityModel = model("activity", ActivitySchema)
export const ActivityDetailsModel = model("activityDetails", ActivityDetailsSchema)
export const ActivitySessionModel = model("activitySession", ActivitySessionSchema)