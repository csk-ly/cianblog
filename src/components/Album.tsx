"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
const photos = [
  {
    src: "/images/coffee.jpg",
    title: "窗边，一杯咖啡",
    note: "日常里的停顿",
    category: "日常",
    shape: "tall",
  },
  {
    src: "/images/shore.jpg",
    title: "向着不同的岸",
    note: "海与远方",
    category: "自然",
    shape: "wide",
  },
  {
    src: "/images/mist.jpg",
    title: "光落在树间",
    note: "绿意与安静",
    category: "自然",
    shape: "tall",
  },
  {
    src: "/images/coffee-table.jpg",
    title: "给自己留一点时间",
    note: "杯盏之间",
    category: "日常",
    shape: "wide",
  },
  {
    src: "/images/hills.jpg",
    title: "山间有雾",
    note: "远山的呼吸",
    category: "自然",
    shape: "wide",
  },
  {
    src: "/images/notebook.jpg",
    title: "还有一些话想写",
    note: "纸页与日常",
    category: "日常",
    shape: "tall",
  },
  {
    src: "/images/lake.jpg",
    title: "在水边坐一会儿",
    note: "山色入湖",
    category: "自然",
    shape: "tall",
  },
  {
    src: "/images/sea.jpg",
    title: "风从海上来",
    note: "浪与天光",
    category: "自然",
    shape: "wide",
  },
  {
    src: "/images/mountains.jpg",
    title: "抬头，看见远方",
    note: "山的轮廓",
    category: "自然",
    shape: "tall",
  },
  {
    src: "/images/forest-path.jpg",
    title: "往林深处走",
    note: "树影之间",
    category: "自然",
    shape: "wide",
  },
  {
    src: "/images/green-valley.jpg",
    title: "山野的来信",
    note: "绿意漫生",
    category: "自然",
    shape: "tall",
  },
  {
    src: "/images/sunlit-woods.jpg",
    title: "光穿过枝叶",
    note: "林间一瞬",
    category: "自然",
    shape: "tall",
  },
  {
    src: "/images/quiet-water.jpg",
    title: "湖面没有答案",
    note: "水色与山影",
    category: "自然",
    shape: "wide",
  },
  {
    src: "/images/open-land.jpg",
    title: "走到开阔处",
    note: "天地之间",
    category: "自然",
    shape: "tall",
  },
  {
    src: "/images/distant-peaks.jpg",
    title: "远方还很远",
    note: "山川无言",
    category: "自然",
    shape: "tall",
  },
  {
    src: "/images/mountain-road.jpg",
    title: "沿途慢慢看",
    note: "行走的风景",
    category: "自然",
    shape: "wide",
  },
  {
    src: "/images/evening-sky.jpg",
    title: "等天色慢下来",
    note: "暮色渐深",
    category: "自然",
    shape: "tall",
  },
  {
    src: "/images/wild-green.jpg",
    title: "风吹过原野",
    note: "草木有声",
    category: "自然",
    shape: "tall",
  },
  {
    src: "/images/blue-horizon.jpg",
    title: "把目光交给海",
    note: "一线天涯",
    category: "自然",
    shape: "wide",
  },
  {
    src: "/images/ocean-edge.jpg",
    title: "岸边的片刻",
    note: "潮汐往复",
    category: "自然",
    shape: "tall",
  },
  {
    src: "/images/waterfall.jpg",
    title: "水流向远处",
    note: "山间回响",
    category: "自然",
    shape: "tall",
  },
  {
    src: "/images/night-sky.jpg",
    title: "夜色之外",
    note: "仰望星光",
    category: "自然",
    shape: "wide",
  },
  {
    src: "/images/autumn.jpg",
    title: "季节轻轻经过",
    note: "草木与时光",
    category: "自然",
    shape: "tall",
  },
  {
    src: "/images/snow-peaks.jpg",
    title: "山顶的白",
    note: "高处有风",
    category: "自然",
    shape: "tall",
  },
  {
    src: "/images/morning-cup.jpg",
    title: "从一杯开始",
    note: "清晨的温度",
    category: "日常",
    shape: "wide",
  },
  {
    src: "/images/coffee-pause.jpg",
    title: "停下来闻一闻",
    note: "咖啡香气",
    category: "日常",
    shape: "tall",
  },
  {
    src: "/images/cafe-corner.jpg",
    title: "坐在街角",
    note: "慢一点也好",
    category: "日常",
    shape: "tall",
  },
  {
    src: "/images/book-pages.jpg",
    title: "文字之间",
    note: "阅读的时间",
    category: "日常",
    shape: "wide",
  },
  {
    src: "/images/reading-time.jpg",
    title: "读到某一页",
    note: "书里的世界",
    category: "日常",
    shape: "tall",
  },
  {
    src: "/images/desk-light.jpg",
    title: "光落在桌上",
    note: "平凡的一天",
    category: "日常",
    shape: "tall",
  },
  {
    src: "/images/flowers.jpg",
    title: "花开的时候",
    note: "小小的欢喜",
    category: "日常",
    shape: "wide",
  },
  {
    src: "/images/city-walk.jpg",
    title: "城市的轮廓",
    note: "街头与远处",
    category: "日常",
    shape: "tall",
  },
  {
    src: "/images/rain-window.jpg",
    title: "夜幕慢慢落下",
    note: "灯火与夜色",
    category: "日常",
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
        {["全部", "日常", "自然"].map((c) => (
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
                <span className="album-index">
                  {String(photos.indexOf(p) + 1).padStart(2, "0")}
                </span>
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
