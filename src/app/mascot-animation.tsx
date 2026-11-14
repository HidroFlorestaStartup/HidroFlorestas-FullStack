"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import mascotPoster from "@/assets/lading-page/hifro-mascote-com-fundo-poster.webp";
import styles from "./landing.module.css";

type NetworkConnection = EventTarget & { saveData?: boolean };

export function MascotAnimation() {
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    const video = videoRef.current;
    if (!stage || !video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: NetworkConnection }).connection;
    let inView = false;

    const syncPlayback = () => {
      const shouldPlay = inView && !document.hidden && !reducedMotion.matches && !connection?.saveData;
      if (!shouldPlay || !video.canPlayType("video/mp4")) {
        video.pause();
        setActive(false);
        return;
      }

      if (!video.hasAttribute("src")) {
        video.src = "/media/hifro-mascote-hero-com-fundo.mp4";
        video.load();
      }
      setActive(true);
      void video.play().catch(() => setActive(false));
    };

    const observer = "IntersectionObserver" in window ? new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    }, { rootMargin: "100px" }) : null;
    if (observer) observer.observe(stage);
    else {
      inView = true;
      syncPlayback();
    }
    reducedMotion.addEventListener("change", syncPlayback);
    connection?.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      observer?.disconnect();
      reducedMotion.removeEventListener("change", syncPlayback);
      connection?.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, []);

  const showVideo = ready && active;

  return (
    <div ref={stageRef} className={styles.mascotStage}>
      <Image
        src={mascotPoster}
        alt="Hifro, mascote da HidroFlorestas"
        sizes="(max-width: 959px) min(100vw, 560px), 560px"
        className={`${styles.mascotPoster} ${showVideo ? styles.mascotPosterHidden : ""}`}
        fetchPriority="high"
      />
      <video
        ref={videoRef}
        className={`${styles.mascotVideo} ${showVideo ? styles.mascotVideoReady : ""}`}
        width={960}
        height={1152}
        loop
        muted
        playsInline
        preload="none"
        disablePictureInPicture
        disableRemotePlayback
        aria-hidden="true"
        tabIndex={-1}
        onLoadedData={() => setReady(true)}
        onError={() => setReady(false)}
      />
    </div>
  );
}
