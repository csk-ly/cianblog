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
      </div>
      <div className="footer-bottom">
        <div className="footer-legal">
          <span>© {new Date().getFullYear()} 此岸 · 文字与生活的栖息地</span>
          <a
            className="footer-icp"
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            苏ICP备2025165759号-2
          </a>
        </div>
        <span>
          南京，中国 <i className="status-dot" /> 仍在记录
        </span>
        <a href="#top">回到页首 ↑</a>
      </div>
    </footer>
  );
}
