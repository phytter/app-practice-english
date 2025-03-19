export type UserProgressType = {
  level: number;
  xp_points: number;
  total_dialogues: number;
  average_pronunciation_score: number;
  total_practice_time_seconds: number;
  average_fluency_score: number;
}

export type UserAchievementType = {
  id: string;
  name: string;
  description: string;
  earned_at: string;
}

export interface UserModel {
  id: string;
  email: string;
  name: string;
  picture?: string;
  progress: UserProgressType;
  achievements: UserAchievementType[];
}