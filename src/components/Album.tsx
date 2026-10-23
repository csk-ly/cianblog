"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { photos } from "@/lib/photos";

export default function Album() {
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState("全部");
  const shown =
    filter === "全部" ? photos : photos.filter((p) => p.category === filter);
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
        {["全部", "咖啡馆", "街巷", "校园", "自然", "日常"].map((c) => (
          <button
            key={c}
            className={filter === c ? "selected" : ""}
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
          >
            {c}
            <sup>
              {c === "全部"
                ? photos.length
                : photos.filter((p) => p.category === c).length}
            </sup>
          </button>
        ))}
        <span>FRAGMENTS OF LIGHT</span>
      </div>
      <div className="album-grid">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <motion.button
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              key={p.src}
              className="album-photo"
              onPointerMove={(e) => {
                if (reduce || e.pointerType !== "mouse") return;
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                e.currentTarget.style.setProperty(
                  "--tilt-x",
                  `${(0.5 - y) * 5}deg`,
                );
                e.currentTarget.style.setProperty(
                  "--tilt-y",
                  `${(x - 0.5) * 5}deg`,
                );
                e.currentTarget.style.setProperty("--glow-x", `${x * 100}%`);
                e.currentTarget.style.setProperty("--glow-y", `${y * 100}%`);
              }}
              onPointerLeave={(e) => {
                e.currentTarget.style.setProperty("--tilt-x", "0deg");
                e.currentTarget.style.setProperty("--tilt-y", "0deg");
              }}
              onClick={(e) => {
                trigger.current = e.currentTarget;
                setActive(photos.indexOf(p));
              }}
              aria-label={`放大查看：${p.title}`}
            >
              <div className="album-print">
                <div className="album-image">
                  <img
                    src={p.src}
                    alt={p.title}
                    width={p.width}
                    height={p.height}
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
                  <span className="album-index">
                    {String(photos.indexOf(p) + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
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
