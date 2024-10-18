import React, { useEffect } from "react";

export default function SoundPlayer() {
  useEffect(() => {
    const audio = new Audio("/wrong-place.mp3");
    audio.loop = true;
    audio.play().catch((error) => {
      console.log("Error playing sound:", error);
    });
  }, []); // Empty dependency array to run only on mount

  return null; // No need to render anything
}
