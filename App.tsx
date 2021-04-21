import React from "react";
import { QuestionProvider } from "./src/hooks/context/question-context-hooks";
import { Routes } from "./src/routes/index";

export default function App() {
  return (
    <QuestionProvider>
      <Routes />
    </QuestionProvider>
  );
}
