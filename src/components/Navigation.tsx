"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ShoreMark } from "./icons";
export default function Navigation() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <Link
        className="brand"
        href="/"
        aria-label="此岸首页"
        onClick={() => setOpen(false)}
      >
        <ShoreMark />
        <span>
          此岸<span className="brand-en">SHORE JOURNAL</span>
        </span>
      </Link>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="main-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? "收起 −" : "目录 ＋"}
      </button>
      <nav
        id="main-nav"
        className={open ? "nav open" : "nav"}
        aria-label="主导航"
      >
        {[
          ["/", "首页"],
          ["/journal/", "随笔"],
          ["/notes/", "技术手记"],
          ["/album/", "相册"],
          ["/about/", "关于"],
        ].map(([href, label]) => (
          <Link
            key={href}
            href={href}
            className={
              (href === "/" ? path === "/" : path.startsWith(href))
                ? "active"
                : ""
            }
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
