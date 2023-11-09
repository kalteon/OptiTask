import { Injectable } from '@nestjs/common';
import { CreateActivityRequest, UpdateActivityRequest, DeleteActivityRequest } from './activity-dto';
import { Activity } from './activity-entity';

@Injectable()
export class ActivityService {
  private activities: Activity[] = [];

  //주간 활동 조회
  findWeeklyActivity(pastWeeksAgo: number): Activity[] {
    const weeklyActivity: Activity[] = [];
    const startDate = new Date()
    const endDate = new Date()

    startDate.setDate(startDate.getDate() - startDate.getDay() + 1 - (7 * pastWeeksAgo))
    endDate.setDate(startDate.getDate() + 6)

    this.activities.forEach((activity) => {
      if (startDate <= activity.startTime
        && activity.endTime <= endDate) {
        weeklyActivity.push(activity);
      }
    });

    return weeklyActivity;
  }
  //활동 생성 (활동)
  createActivity(createActivityDto: CreateActivityRequest) {
    this.activities.push({
      id: this.activities.length + 1,
      startTime: createActivityDto.startTime,
      endTime: createActivityDto.endTime,
      content: createActivityDto.content,
      tag: createActivityDto.tag,
      sucess: createActivityDto.success,
    });
  }
  //활동 수정 (활동)
  updateActivity(updateActivityDto: UpdateActivityRequest) {
    this.activities = this.activities.map((activity) => {
      if (activity.id === updateActivityDto.id) {
        return {
          ...activity,
          content: updateActivityDto.content,
          tag: updateActivityDto.tag,
          sucess: updateActivityDto.sucess,
        };
      }
      return activity;
    });
  }
  //활동 삭제 (활동)
  deleteActivity(deleteActivityDto: DeleteActivityRequest) {
    this.activities = this.activities.filter( (activity) => {
      if (activity.id !== deleteActivityDto.id) {
        return activity;
      }
    });
  }
}