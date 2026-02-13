import { ActivityRepository } from "../repository/activity.repository";
import { ActivityService } from "../service/activity.service";

const _activityRepository = new ActivityRepository()

export  const activityService = new ActivityService(_activityRepository)