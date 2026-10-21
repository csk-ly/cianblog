import Link from "next/link";
import { ShoreMark } from "./icons";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Link href="/" className="footer-brand">
          <ShoreMark />
          此岸
        </Link>
        <p>
          生活没有标准答案，
          <br />
          好在还可以慢慢写。
        </p>
        <a href="/feed.xml">订阅这些寻常 ↗</a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} 此岸 · 文字与生活的栖息地</span>
        <span>
          南京，中国 <i className="status-dot" /> 仍在记录
        </span>
        <a href="#top">回到页首 ↑</a>
      </div>
    </footer>
  );
}
