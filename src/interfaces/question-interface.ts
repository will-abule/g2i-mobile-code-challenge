export interface QuestionInterface {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  userAnswer: string;
  correct: boolean;
}

export interface QuestionContextInterface {
  userName?: string;
  answers?: QuestionInterface[];
  questions?: QuestionInterface[];
  question?: QuestionInterface;
  begin?: boolean;
}
