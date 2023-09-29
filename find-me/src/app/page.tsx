"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import { useAudio } from "@/hooks/useAudio";

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const [isFound, setIsFound] = useState(false);
  const [isDevVisible, setIsDevVisible] = useState(false);
  const devPosition = useRef({ x: 0, y: 0 });
  const [isPlaying, toggle] = useAudio("/typing.mp3");

  useEffect(() => {
    document.addEventListener("mousemove", function (e) {
      let element = document.getElementById("follow");
      let left = e.pageX;
      let top = e.pageY;
      element!.style.left = left + "px";
      element!.style.top = top + "px";

      const distance = Math.sqrt(
        Math.pow(left - devPosition.current.x, 2) +
          Math.pow(top - devPosition.current.y, 2)
      );

      console.log(isPlaying);
    });
  }, []);

  const startGame = () => {
    // Start the game
    typeof toggle !== "boolean" && toggle();
    if (!isStarted) {
      setIsStarted(true);
      setIsDevVisible(false);
      setTimeout(() => {
        setIsFound(false);
        setIsDevVisible(true);
      }, 1000);
      setTimeout(() => {
        // Animation complete
        let image = document.getElementById("developer-container");
        const { clientHeight, clientWidth } = document.body;
        setIsDevVisible(true);
        const pos = {
          x: 50 + Math.round(Math.random() * (clientWidth - 100)),
          y: 50 + Math.round(Math.random() * (clientHeight - 100)),
        };
        image!.style.left = pos.x + "px";
        image!.style.top = pos.y + "px";
        devPosition.current = pos;
      }, 1000);
    }
  };

  const findDeveloper = () => {
    setIsStarted(false);
    setIsFound(true);
  };

  return (
    <main
      className={styles.main + " " + (isStarted ? styles.started : "")}
      onClick={startGame}
    >
      <div
        id={"developer-container"}
        className={
          styles.developerContainer +
          " " +
          (!isDevVisible ? styles.invisible : "")
        }
        onClick={findDeveloper}
      >
        <Image src={"/developer.png"} width={100} height={100} alt="Me" />
      </div>
      <div
        id="follow"
        className={styles.follow + " " + (isStarted ? styles.started : "")}
        onClick={() => console.log("Click follow")}
      />
      <div
        className={styles.container}
        onClick={() => console.log("Click container")}
      >
        <h1>{isFound ? "Congrats, you found me!" : "Find Me!"}</h1>
        <p style={{ opacity: isStarted ? 0 : 1 }}>Click anywhere to start</p>
      </div>
    </main>
  );
}
