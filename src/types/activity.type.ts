import { Document, Types } from "mongoose";

export enum ActivityStatus {
    STARTED = "STARTED",
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED"
}

export interface IActivitySession extends Document {
    id?: string
    userId?: string
    userEmail: string
    isStarted: boolean
    avatar?:string
}

export interface IActivity extends Document {
    id?: string
    sessionId: Types.ObjectId
    email: string
    totalScore: number
    activityPerformed: number
    result: IActivityResult[]
}

export interface IActivityDetails extends Document {
    id?: string
    boothNo: number
    title: string
    description: string
    taskTitle: string
    taskDescription: string
    visits: number
}

export interface IActivityResult extends Document {
    id?: string
    boothId: Types.ObjectId;
    score: number
    url: string
    status: ActivityStatus
}