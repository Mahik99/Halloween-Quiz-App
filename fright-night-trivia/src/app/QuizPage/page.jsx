"use client";
import React, { useEffect, useState } from "react";
import questions from "./data.json"; // Make sure data.json is in the correct format
import { createClient } from '@supabase/supabase-js';
import Link from "next/link";

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const supabase = createClient('https://drtiadnwtwtpurixjyss.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRydGlhZG53dHd0cHVyaXhqeXNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkyNDYzNzgsImV4cCI6MjA0NDgyMjM3OH0.IEoeD0HvsLVc4scOqkX6n6wGeY27HNeAwaftXPbZYi4');

  const currentQuestion = questions[currentQuestionIndex];
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

  const handleClick = async (e) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase
        .from('HalloweenLeaderBoard')
        .insert([{ Name: name, Score: score }])
        .select();
        setSubmitted(true);
      if (error) throw error;
      console.log('Inserted data:', data);
    } catch (error) {
      console.error('Error inserting data:', error);
    } 
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
            <div className="form">
        <form onSubmit={handleClick}>
          <label>
            Name:
            <input 
              type="text" 
              name="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
      {submitted ? (
  <Link href="/leaderboard">
    <button>View Leaderboard</button>
  </Link>
    ) : null}
    </div>

    );
}
