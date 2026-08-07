export type PhaseId = 'phase1' | 'phase2' | 'phase3' | 'phase4';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface TestCase {
  input: string;
  expected: string;
  explanation?: string;
}

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  description: string;
  constraints: string[];
  examples: Example[];
  starterCode: string;
  testCases: TestCase[];
  pythonTips: string[];
  solutionCode: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export interface DailyLesson {
  dayNumber: number;
  title: string;
  phaseId: PhaseId;
  phaseName: string;
  topic: string;
  conceptSummary: string;
  bigOExplanation: string;
  pythonTricks: string[];
  problem: Problem;
}

export interface PythonTrick {
  id: string;
  title: string;
  category: 'Standard Library' | 'Data Structures' | 'Algorithms' | 'Bitwise' | 'Speed & Memory' | 'Syntax Magic';
  code: string;
  explanation: string;
  whenToUse: string;
  timeSavingNote: string;
}

export interface SpacedRepetitionItem {
  problemId: string;
  problemTitle: string;
  dayNumber: number;
  lastCompletedDate: string;
  nextReviewDate: string;
  reviewCount: number; // 1 = 3 days, 2 = 1 week, 3 = 1 month
}

export interface UserProgress {
  streak: number;
  lastActiveDate: string;
  completedDays: number[];
  completedProblemIds: string[];
  spacedRepetitionQueue: SpacedRepetitionItem[];
  userNotes: Record<string, string>; // problemId -> user markdown notes
  targetTimeline: '3_months' | '6_months' | '1_year';
  notificationTime: string;
  notificationsEnabled: boolean;
  codeSnippets: Record<string, string>; // problemId -> last code
}
