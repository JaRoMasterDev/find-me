"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const [isDevVisible, setIsDevVisible] = useState(false);

  useEffect(() => {
    document.addEventListener("mousemove", function (e) {
      let element = document.getElementById("follow");
      let left = e.pageX;
      let top = e.pageY;
      element!.style.left = left + "px";
      element!.style.top = top + "px";
    });

    document.addEventListener("click", () => {
      // Start the game
      if (!isStarted) {
        setIsStarted(true);
        setTimeout(() => {
          // Animation complete
          let image = document.getElementById("developer-container");
          const { clientHeight, clientWidth } = document.body;
          setIsDevVisible(true);
          image!.style.left =
            100 + Math.round(Math.random() * (clientWidth - 200)) + "px";
          image!.style.top =
            100 + Math.round(Math.random() * (clientHeight - 200)) + "px";
        }, 1000);
      }
    });
  }, []);

  return (
    <main className={styles.main}>
      <div
        id={"developer-container"}
        className={
          styles.developerContainer +
          " " +
          (!isDevVisible ? styles.invisible : "")
        }
      >
        <Image src={"/developer.png"} width={200} height={200} alt="Me" />
      </div>
      <div
        id="follow"
        className={styles.follow + " " + (isStarted ? styles.started : "")}
      ></div>
    </main>
  );
}
