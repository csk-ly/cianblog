"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
const photos = [
  {
    src: "/images/coffee.jpg",
    title: "窗边，一杯咖啡",
    note: "日常里的停顿",
    source: "https://unsplash.com/photos/1442512595331-e89e73853f31",
    shape: "tall",
  },
  {
    src: "/images/shore.jpg",
    title: "向着不同的岸",
    note: "海与远方",
    source: "https://unsplash.com",
    shape: "wide",
  },
  {
    src: "/images/mist.jpg",
    title: "光落在树间",
    note: "绿意与安静",
    source: "https://unsplash.com",
    shape: "tall",
  },
];
export default function Album() {
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState("全部");
  const shown =
    filter === "全部"
      ? photos
      : photos.filter((p) =>
          filter === "日常"
            ? p.src.includes("coffee")
            : !p.src.includes("coffee"),
        );
  useEffect(() => {
    if (active !== null) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
      closeButton.current?.focus();
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
      trigger.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);
  const close = () => setActive(null);
  return (
    <>
      <div
        className="filter-bar album-filter"
        role="group"
        aria-label="相片分类"
      >
        {["全部", "日常", "自然"].map((c) => (
          <button
            key={c}
            className={filter === c ? "selected" : ""}
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
          >
            {c}
            <sup>{c === "全部" ? 3 : c === "日常" ? 1 : 2}</sup>
          </button>
        ))}
        <span>FRAGMENTS OF LIGHT</span>
      </div>
      <div className="album-grid">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => (
            <motion.button
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              key={p.src}
              className={"album-photo " + p.shape}
              onClick={(e) => {
                trigger.current = e.currentTarget;
                setActive(photos.indexOf(p));
              }}
              aria-label={`放大查看：${p.title}`}
            >
              <div className="album-image">
                <img
                  src={p.src}
                  alt={p.title}
                  loading="lazy"
                  draggable={false}
                />
                <span className="album-expand">放大 ↗</span>
              </div>
              <div className="album-caption">
                <span>
                  <strong>{p.title}</strong>
                  <small>{p.note}</small>
                </span>
                <span className="album-index">0{photos.indexOf(p) + 1}</span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
      <p className="photo-credit">
        影像选集 · 图片来源{" "}
        <a href="https://unsplash.com" target="_blank" rel="noreferrer">
          Unsplash ↗
        </a>
      </p>
      <dialog
        ref={dialog}
        className="lightbox"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            setActive((n) => (n === null ? null : (n + 1) % photos.length));
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            setActive((n) =>
              n === null ? null : (n - 1 + photos.length) % photos.length,
            );
          }
        }}
        aria-label={active !== null ? photos[active].title : "相片浏览"}
      >
        <button
          ref={closeButton}
          className="lightbox-close"
          onClick={close}
          aria-label="关闭大图"
        >
          关闭 ×
        </button>
        {active !== null && (
          <>
            <button
              className="lightbox-prev"
              onClick={() =>
                setActive((active - 1 + photos.length) % photos.length)
              }
              aria-label="上一张"
            >
              ←
            </button>
            <figure>
              <img
                src={photos[active].src}
                alt={photos[active].title}
                draggable={false}
              />
              <figcaption>
                <span>
                  {photos[active].title}
                  <small>{photos[active].note}</small>
                </span>
                <span>
                  {active + 1} / {photos.length}
                </span>
              </figcaption>
            </figure>
            <button
              className="lightbox-next"
              onClick={() => setActive((active + 1) % photos.length)}
              aria-label="下一张"
            >
              →
            </button>
          </>
        )}
      </dialog>
    </>
  );
}
