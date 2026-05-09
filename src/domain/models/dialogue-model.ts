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

export interface DialoguePracticeWordTiming {
  word: string;
  start_time: number;
  end_time: number;
  confidence: number;
}

export interface DialoguePracticeResultModel {
  pronunciation_score: number;
  fluency_score: number;
  word_accuracy: number;
  transcribed_text: string;
  word_timings: DialoguePracticeWordTiming[];
  suggestions?: Array<{
    type: string;
    message: string;
  }>;
  xp_earned: number;
}

export interface DialoguePracticeHistoryModel {
  _id: string;
  pronunciation_score: number;
  fluency_score: number;
  xp_earned: number;
  completed_at: string;
  practice_duration_seconds: number;
  dialogue: Partial<DialogueModel>;
  character_played?: string;
}
