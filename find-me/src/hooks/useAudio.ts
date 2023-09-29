"use client";

import { useEffect, useState } from "react";

export const useAudio = (url: string) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    setPlaying(!playing);
  };

  useEffect(() => {
    playing ? audio?.play() : audio?.pause();
  }, [playing]);

  useEffect(() => {
    audio?.addEventListener("ended", () => audio?.play());
  }, [audio]);

  useEffect(() => {
    setAudio(new Audio(url));
    return () => {
      audio?.removeEventListener("ended", () => audio.play());
    };
  }, []);

  return [playing, toggle];
};
