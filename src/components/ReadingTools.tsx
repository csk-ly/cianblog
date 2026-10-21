"use client";
import { useEffect, useState } from "react";
export default function ReadingTools() {
  const [progress, setProgress] = useState(0);
  const [large, setLarge] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const update = () => {
      const d = document.documentElement;
      setProgress(
        Math.max(
          0,
          Math.min(
            100,
            (d.scrollTop / (d.scrollHeight - d.clientHeight || 1)) * 100,
          ),
        ),
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("large-reading", large);
    return () => document.documentElement.classList.remove("large-reading");
  }, [large]);
  return (
    <>
      <div className="reading-progress" style={{ width: `${progress}%` }} />
      <div className="reading-tools">
        <button
          aria-label="切换正文字号"
          aria-pressed={large}
          onClick={() => setLarge(!large)}
        >
          Aa {large ? "−" : "＋"}
        </button>
        <button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(location.href);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            } catch {
              setCopied(false);
            }
          }}
        >
          {copied ? "已复制 ✓" : "复制链接 ↗"}
        </button>
      </div>
    </>
  );
}
