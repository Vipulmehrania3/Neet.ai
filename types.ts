
export type SubjectId = 'physics' | 'chemistry' | 'botany' | 'zoology';
export type Language = 'en' | 'hi';

export interface Topic {
  id: string;
  name: string;
}

export interface Chapter {
  id: string;
  name: string;
  topics: Topic[];
}

export interface Subject {
  id: SubjectId;
  name: string;
  icon: string;
  color: string;
  chapters: Chapter[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizConfig {
  subjectId: SubjectId;
  selectedChapterIds: string[];
  selectedTopicIds: string[];
  questionCount: number;
  customPrompt: string;
  language: Language;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  questions: Question[];
  userAnswers: number[]; // Index of selected option per question, -1 if skipped
}

export enum AppView {
  HOME,
  CHAPTER_SELECT,
  QUIZ_SETUP,
  QUIZ_RUNNING,
  RESULTS,
  VIP_DOUBTS
}
