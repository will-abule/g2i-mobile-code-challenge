import React, { useState, createContext, FC } from "react";
import { QuestionContextInterface } from "../../interfaces/question-interface";

let data: QuestionContextInterface = {
  userName: "",
  answers: [],
  questions: [],
  question: undefined,
  begin: false,
};

export const QuestionContext = createContext({
  questionState: data,
  changeQuestionState: (
    newState: QuestionContextInterface,
    callBack?: Function
  ) => {},
});

export const QuestionProvider: FC = ({ children }) => {
  const [state, setActualState] = useState<QuestionContextInterface>(data);

  const setState = (
    newState: QuestionContextInterface,
    callBack?: Function
  ) => {
    setActualState((currentState) => ({
      ...currentState,
      ...newState,
    }));
    if (callBack) callBack();
  };

  return (
    <QuestionContext.Provider
      value={{
        questionState: state,
        changeQuestionState: setState,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
