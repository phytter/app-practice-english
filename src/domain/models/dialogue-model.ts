import { MovieModel } from "./movie-model";

export type DialogueLineType = {
  character: string;
  text: string;
  startTime: number;
  endTime: number;
}

export interface DialogueModel {
  _id: string;
  movie: MovieModel;
  difficulty_level: number;
  duration_seconds: number;
  lines: DialogueLineType[];
}

export interface DialoguePracticeResultModel {
  score: number;
  pronunciation_score: number;
  fluency_score: number;
  transcribed_text: string;
  suggestions: Array<{
    type: string;
    message: string;
  }>;
  xp_earned: number;
}
