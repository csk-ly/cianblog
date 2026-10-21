"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
const photos = [
  {
    src: "/images/coffee.jpg",
    width: 1600,
    height: 1067,
    title: "窗边，一杯咖啡",
    note: "日常里的停顿",
    category: "咖啡馆",
  },
  {
    src: "/images/street-tokyo.jpg",
    width: 1200,
    height: 779,
    title: "街头的灯亮了",
    note: "城市入夜",
    category: "街巷",
  },
  {
    src: "/images/campus-building.jpg",
    width: 1200,
    height: 786,
    title: "走回校园",
    note: "旧日的路",
    category: "校园",
  },
  {
    src: "/images/shore.jpg",
    width: 900,
    height: 600,
    title: "向着不同的岸",
    note: "海与远方",
    category: "自然",
  },
  {
    src: "/images/notebook.jpg",
    width: 1200,
    height: 800,
    title: "还有一些话想写",
    note: "纸页与日常",
    category: "日常",
  },
  {
    src: "/images/coffee-table.jpg",
    width: 1200,
    height: 800,
    title: "给自己留一点时间",
    note: "杯盏之间",
    category: "咖啡馆",
  },
  {
    src: "/images/street-walk.jpg",
    width: 1200,
    height: 800,
    title: "沿街走走",
    note: "楼宇之间",
    category: "街巷",
  },
  {
    src: "/images/campus-lawn.jpg",
    width: 1200,
    height: 800,
    title: "图书馆的午后",
    note: "书架间的安静",
    category: "校园",
  },
  {
    src: "/images/mist.jpg",
    width: 900,
    height: 599,
    title: "光落在树间",
    note: "绿意与安静",
    category: "自然",
  },
  {
    src: "/images/book-pages.jpg",
    width: 1200,
    height: 704,
    title: "文字之间",
    note: "阅读的时间",
    category: "日常",
  },
  {
    src: "/images/cafe-interior.jpg",
    width: 1200,
    height: 900,
    title: "等一个闲暇的下午",
    note: "桌边的光",
    category: "咖啡馆",
  },
  {
    src: "/images/street-crossing.jpg",
    width: 1200,
    height: 1501,
    title: "人间烟火",
    note: "路过一座城",
    category: "街巷",
  },
  {
    src: "/images/campus-days.jpg",
    width: 1200,
    height: 800,
    title: "青春有回声",
    note: "又是一年",
    category: "校园",
  },
  {
    src: "/images/hills.jpg",
    width: 1200,
    height: 715,
    title: "山间有雾",
    note: "远山的呼吸",
    category: "自然",
  },
  {
    src: "/images/reading-time.jpg",
    width: 1200,
    height: 1109,
    title: "读到某一页",
    note: "书里的世界",
    category: "日常",
  },
  {
    src: "/images/cafe-counter.jpg",
    width: 1200,
    height: 800,
    title: "推门，咖啡香",
    note: "片刻停留",
    category: "咖啡馆",
  },
  {
    src: "/images/street-corner.jpg",
    width: 1200,
    height: 728,
    title: "城市另一面",
    note: "街角的片刻",
    category: "街巷",
  },
  {
    src: "/images/campus-reading.jpg",
    width: 1200,
    height: 800,
    title: "那些读书的日子",
    note: "年少时光",
    category: "校园",
  },
  {
    src: "/images/lake.jpg",
    width: 1200,
    height: 800,
    title: "在水边坐一会儿",
    note: "山色入湖",
    category: "自然",
  },
  {
    src: "/images/desk-light.jpg",
    width: 1200,
    height: 800,
    title: "光落在桌上",
    note: "平凡的一天",
    category: "日常",
  },
  {
    src: "/images/cafe-room.jpg",
    width: 1200,
    height: 823,
    title: "找一间咖啡馆",
    note: "坐下来聊聊",
    category: "咖啡馆",
  },
  {
    src: "/images/city-walk.jpg",
    width: 1200,
    height: 738,
    title: "城市的轮廓",
    note: "街头与远处",
    category: "街巷",
  },
  {
    src: "/images/sea.jpg",
    width: 1200,
    height: 800,
    title: "风从海上来",
    note: "浪与天光",
    category: "自然",
  },
  {
    src: "/images/flowers.jpg",
    width: 1200,
    height: 800,
    title: "花开的时候",
    note: "小小的欢喜",
    category: "日常",
  },
  {
    src: "/images/cafe-window.jpg",
    width: 1200,
    height: 800,
    title: "窗边的位置",
    note: "一间小店",
    category: "咖啡馆",
  },
  {
    src: "/images/rain-window.jpg",
    width: 1200,
    height: 800,
    title: "夜幕慢慢落下",
    note: "灯火与夜色",
    category: "街巷",
  },
  {
    src: "/images/mountains.jpg",
    width: 1200,
    height: 800,
    title: "抬头，看见远方",
    note: "山的轮廓",
    category: "自然",
  },
  {
    src: "/images/morning-cup.jpg",
    width: 1200,
    height: 1800,
    title: "从一杯开始",
    note: "清晨的温度",
    category: "咖啡馆",
  },
  {
    src: "/images/forest-path.jpg",
    width: 1200,
    height: 800,
    title: "往林深处走",
    note: "树影之间",
    category: "自然",
  },
  {
    src: "/images/coffee-pause.jpg",
    width: 1200,
    height: 915,
    title: "停下来闻一闻",
    note: "咖啡香气",
    category: "咖啡馆",
  },
  {
    src: "/images/sunlit-woods.jpg",
    width: 1200,
    height: 800,
    title: "光穿过枝叶",
    note: "林间一瞬",
    category: "自然",
  },
  {
    src: "/images/cafe-corner.jpg",
    width: 1200,
    height: 793,
    title: "坐在街角",
    note: "慢一点也好",
    category: "咖啡馆",
  },
  {
    src: "/images/evening-sky.jpg",
    width: 1200,
    height: 800,
    title: "等天色慢下来",
    note: "暮色渐深",
    category: "自然",
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
