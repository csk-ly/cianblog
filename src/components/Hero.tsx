"use client";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { photos } from "@/lib/photos";
import BlurText from "./BlurText";
import { Arrow } from "./icons";
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [photoIndex, setPhotoIndex] = useState(0);
  const photo = photos[photoIndex];
  useEffect(() => {
    setPhotoIndex(Math.floor(Math.random() * photos.length));
  }, []);
  useEffect(() => {
    if (photos.length < 2) return;
    const next =
      (photoIndex + 1 + Math.floor(Math.random() * (photos.length - 1))) %
      photos.length;
    const image = new Image();
    image.src = photos[next].src;
    const ready = image.decode().then(
      () => true,
      () => false,
    );
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      if ((await ready) && !cancelled) setPhotoIndex(next);
    }, 10_000);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [photoIndex]);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 75]);
  return (
    <section className="hero" ref={ref}>
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="status-dot" /> 一份关于生活的私人记录{" "}
          <span className="eyebrow-line" />
        </div>
        <h1>
          <BlurText
            text="不渡彼岸，"
            animateBy="letters"
            delay={75}
            direction="bottom"
            className="hero-title-line"
          />
          <span className="last-line">
            <BlurText
              text="只记此岸。"
              animateBy="letters"
              delay={100}
              direction="bottom"
              className="hero-title-line"
            />
            <span className="hero-aside">
              Day by day,
              <br />
              little by little.
            </span>
          </span>
        </h1>
        <p className="hero-description">
          在南京，做技术，偶尔写字。
          <br />
          这里有旧事、家人，以及还没想明白的生活。
        </p>
        <Link className="text-link" href="#writing">
          翻开最近的几页 <Arrow />
        </Link>
        <div className="hero-bottom">
          <span>EST. 2026 — NANJING</span>
          <a href="#writing" aria-label="向下浏览文章">
            <span className="scroll-line" /> SCROLL TO EXPLORE
          </a>
        </div>
      </div>
      <div className="hero-art">
        <motion.div
          className="hero-photo"
          style={{ y: reduce ? 0 : y }}
          initial={
            reduce ? false : { opacity: 0, clipPath: "inset(0 0 100% 0)" }
          }
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence initial={false}>
            <motion.img
              key={photo.src}
              src={photo.src}
              alt={photo.title}
              fetchPriority="high"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 1.2 }}
            />
          </AnimatePresence>
          <div className="photo-shade" />
          <span className="photo-vertical">把日子，写成自己的模样。</span>
        </motion.div>
        <div className="photo-caption">
          <span>
            FIG. {String(photoIndex + 1).padStart(2, "0")} — FRAGMENTS OF LIGHT
          </span>
          <span>{photo.title}</span>
        </div>
        <span className="photo-number">SHORE / {photo.category}</span>
        <div className="hero-stamp">
          日常
          <br />
          採集
        </div>
      </div>
    </section>
  );
}
