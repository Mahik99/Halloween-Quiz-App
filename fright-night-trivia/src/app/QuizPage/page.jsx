"use client";
import React, { useState } from "react";

// Sample Quiz Data
const quizData = [
  {
    question:
      "What date is Halloween traditionally celebrated around the world?",
    answer_options: [
      "October 31st",
      "October 30th",
      "October 29th",
      "November 1st",
    ],
    correct_answer: "October 31st",
    level: "easy",
  },
  {
    question: "What vegetable do people often carve into a Jack-o'-Lantern?",
    answer_options: ["Watermelon", "Pumpkin", "Butternut Squash", "Turnip"],
    correct_answer: "Pumpkin",
    level: "easy",
  },
  {
    question:
      "What is the popular Halloween phrase that children say before receiving candy?",
    answer_options: [
      "Halloween Spooks",
      "Boo!",
      "Trick or Treat",
      "Candy Please!",
    ],
    correct_answer: "Trick or Treat",
    level: "easy",
  },
  {
    question: "Who wrote the famous novel 'Frankenstein'?",
    answer_options: [
      "Edgar Allan Poe",
      "Bram Stoker",
      "H.P. Lovecraft",
      "Mary Shelley",
    ],
    correct_answer: "Mary Shelley",
    level: "easy",
  },
];

const QuizGame = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const currentQuestion = quizData[currentQuestionIndex];

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < quizData.length) {
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
            Your score: {score}/{quizData.length}
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
