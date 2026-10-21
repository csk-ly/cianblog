"use client";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Post } from "@/lib/posts";
import { Arrow } from "./icons";
export default function ArticleList({
  posts,
  filterable = true,
}: {
  posts: Omit<Post, "content">[];
  filterable?: boolean;
}) {
  const [filter, setFilter] = useState("全部");
  const reduce = useReducedMotion();
  const categories = ["全部", ...new Set(posts.map((p) => p.category))];
  const selected =
    filter === "全部" ? posts : posts.filter((p) => p.category === filter);
  return (
    <div>
      {filterable && (
        <div className="filter-bar" role="group" aria-label="按文章分类筛选">
          {categories.map((c) => (
            <button
              key={c}
              aria-pressed={c === filter}
              className={c === filter ? "selected" : ""}
              onClick={() => setFilter(c)}
            >
              {c}
              <sup>
                {c === "全部"
                  ? posts.length
                  : posts.filter((p) => p.category === c).length}
              </sup>
            </button>
          ))}
          <span>WORDS, IN NO HURRY.</span>
        </div>
      )}
      <div className="article-list">
        <AnimatePresence mode="popLayout" initial={false}>
          {selected.map((post, index) => (
            <motion.article
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              key={post.slug}
              className="article-row"
            >
              <Link href={`/posts/${post.slug}/`} className="article-row-link">
                <span className="article-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="article-row-main">
                  <div className="article-meta">
                    <span>{post.category}</span>
                    <span>·</span>
                    <span>约 {post.minutes} 分钟</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                </div>
                <div className="article-thumb">
                  <img src={post.image} alt="" loading="lazy" />
                </div>
                <span className="article-arrow">
                  <Arrow diagonal />
                </span>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
      {selected.length === 0 && <p>这里还没有文章，稍后再来看看。</p>}
    </div>
  );
}
