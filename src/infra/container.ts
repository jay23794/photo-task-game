import { GeminiAIFlashClient } from "../libs/gemini.ai";
import { ActivityRepository } from "../repository/activity.repository";
import { ActivityService } from "../service/activity.service";

const _activityRepository = new ActivityRepository()
const _geminiFlashClient = new GeminiAIFlashClient()

export  const activityService = new ActivityService(_activityRepository,_geminiFlashClient)
