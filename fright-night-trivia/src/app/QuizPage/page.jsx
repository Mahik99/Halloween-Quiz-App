"use client";

import React, { useState } from "react";
import styles from "./page.module.css"; // Import styles (adjust if necessary)
import NextButton from "../components/NextButton.jsx"; // Import your NextButton component

const quizQuestions = [
  // Changed this to quizQuestions
 {
    question: "What was the original purpose of Halloween?",
    options: [
      "To scare away evil spirits",
      "To celebrate harvest",
      "To honor the dead",
      "To give thanks",
    ],
    correctAnswer: "To scare away evil spirits",
  },
  {
    question: "Which horror movie character wears a hockey mask?",
    options: [
      "Freddy Krueger",
      "Michael Myers",
      "Jason Voorhees",
      "Leatherface",
    ],
    correctAnswer: "Jason Voorhees",
  },
  // Add more questions as needed
];

// export default function quizpage() {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState("");
//   const [showScore, setShowScore] = useState(false);

//   const handleAnswerSelect = (option) => {
//     setSelectedAnswer(option);
//   };

//   const handleNextClick = () => {
//     if (selectedAnswer === quizQuestions[currentQuestionIndex].correctAnswer) {
//       setScore(score + 1);
//     }

//     if (currentQuestionIndex < quizQuestions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       setSelectedAnswer("");
//     } else {
//       setShowScore(true);
//     }
//   };

//   return (
//     <div className={styles.quizContainer}>
//       {!showScore ? (
//         <div>
//           <h2 className={styles.question}>
//             {quizQuestions[currentQuestionIndex].question}
//           </h2>
//           <ul className={styles.optionsList}>
//             {quizQuestions[currentQuestionIndex].options.map(
//               (option, index) => (
//                 <li
//                   key={index}
//                   className={`${styles.optionItem} ${
//                     selectedAnswer === option ? styles.selected : ""
//                   }`}
//                   onClick={() => handleAnswerSelect(option)}
//                 >
//                   {option}
//                 </li>
//               )
//             )}
//           </ul>
//           <NextButton onClick={handleNextClick} />
//         </div>
//       ) : (
//         <div className={styles.scoreContainer}>
//           <h2 className={styles.finalScore}>
//             You scored {score} out of {quizQuestions.length}
//           </h2>
//           <button
//             className={styles.restartButton}
//             onClick={() => window.location.reload()}
//           >
//             Restart Quiz
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default function QuizPage();

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showScore, setShowScore] = useState(false);
  const handleAnswerSelect = (option) => {
        setSelectedAnswer(option);
      };

      const handleNextClick = () => {
            if (selectedAnswer === quizQuestions[currentQuestionIndex].correctAnswer) {
              setScore(score + 1);
            }
        
            if (currentQuestionIndex < quizQuestions.length - 1) {
              setCurrentQuestionIndex(currentQuestionIndex + 1);
              setSelectedAnswer("");
            } else {
              setShowScore(true);
            }
          };
  return (
    <div>hello</div>)
  }
