"use client";
import React, { useEffect, useState } from "react";
import questions from "./data.json"; // Make sure data.json is in the correct format
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import styles from "./page.module.css";

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [rank, setRank] = useState("");

  const supabase = createClient(
    "https://drtiadnwtwtpurixjyss.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRydGlhZG53dHd0cHVyaXhqeXNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkyNDYzNzgsImV4cCI6MjA0NDgyMjM3OH0.IEoeD0HvsLVc4scOqkX6n6wGeY27HNeAwaftXPbZYi4"
  );

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
    if (score === 0) {
      setRank("Muggle");
    } else if (score <= 4) {
      setRank("Goblin");
    } else if (score <= 8) {
      setRank("Mage");
    } else {
      setRank("Wizard");
    }

    try {
      const { data, error } = await supabase
        .from("HalloweenLeaderBoard")
        .insert([{ Name: name, Score: score, Creature_Name: rank }])
        .select();

      if (error) throw error;

      setSubmitted(true);
      console.log("Inserted data:", data);
    } catch (error) {
      console.error("Error inserting data:", error);
      alert("There was an error submitting your score. Please try again.");
    }
  };

  return (
    <div className={styles.quizContainer}>
      {isQuizFinished ? (
        <div className={styles.quizFinished}>
          <h2>The Haunted Quiz Has Come to an End!</h2>
          <p>
            Your score: {score}/{questions.length}
          </p>
          <button className={styles.restartBtn} onClick={restartQuiz}>
            Restart Quiz
          </button>
        </div>
      ) : (
        <div className={styles.results}>
          <h3 className={styles.question}>{currentQuestion.question}</h3>
          <div className={styles.options}>
            {currentQuestion.answer_options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
      {currentQuestionIndex === questions.length - 1 && (
        <div className={styles.form}>
          <form onSubmit={handleClick}>
            <label className={styles.inputLabel}>
              Name:
              <input
                className={styles.inputField}
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className={styles.submitButton}
                type="submit"
                value="Submit"
              />
            </label>
          </form>
        </div>
      )}
      {submitted ? (
        <Link href="/leaderboard">
          <button className={styles.leaderboardBtn}>View Leaderboard</button>
        </Link>
      ) : null}
    </div>
  );
}
