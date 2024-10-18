"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import styles from "./Homepage.module.css";
import SoundPlayer from "./sound.jsx";
import Link from "next/link";

export default function Homepage() {
  useEffect(() => {
    let text = "Fright Night Trivia ";
    let h2 = document.getElementById("ghostText");
    // Clear previous content before adding new spans
    h2.innerHTML = "";

    text.split("").forEach((char, index) => {
      let span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0\u00A0" : char;
      span.style.transitionDelay = `${(index % 10) * 0.1}s`;
      h2.appendChild(span);
    });
  }, []);

  return (
    <section className={styles.section}>
      <h2 id="ghostText" className={styles.h2}></h2>
      <Image
        className="pumpkinImage"
        src="/Images/pumpkin.png"
        alt="pumpkin"
        width={120}
        height={120}
      />
      <Link href="/QuizPage">
        <button className={styles.button}>
          <SoundPlayer />
          <strong>Ready, Set, BOO!</strong>
        </button>
      </Link>
    </section>
  );
}
