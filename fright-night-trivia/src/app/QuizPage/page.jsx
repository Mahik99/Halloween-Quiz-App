"use client";
import React, { useEffect, useState } from "react";
import questions from "./data.json"; // Make sure data.json is in the correct format
const QuizGame = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const currentQuestion = questions[currentQuestionIndex]; // Use imported questions
  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore(score + 1);
    }
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setIsQuizFinished(true);
    }
  };
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsQuizFinished(false);
  };
  return (
    <div className="quiz-container">
      <h1>Halloween Quiz</h1>
      {isQuizFinished ? (
        <div className="results">
          <h2>Quiz finished!</h2>
          <p>
            Your score: {score}/{questions.length}
          </p>
          <button onClick={restartQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <div className="question">
          <h2>{currentQuestion.question}</h2>
          <div className="options">
            {currentQuestion.answer_options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default QuizGame;
