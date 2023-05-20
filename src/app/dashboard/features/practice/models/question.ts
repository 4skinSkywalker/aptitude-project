export interface QuestionOption {
    _id: string;
    prompt: string;
    value: string;
}

export interface QuestionDifficultyStats {
    difficultyValue: number;
    timeToAnswer: number;
    difficulty: string;
}

export interface Question {
    _id: string;
    difficultyStats: QuestionDifficultyStats;
    path: string;
    question: string;
    options: QuestionOption[];
    correctOption: string;
    solution: string[];
    comprehension: string;
}