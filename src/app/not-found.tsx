import Link from "next/link";
export default function NotFound() {
  return (
    <section className="archive-page">
      <span className="eyebrow">404 / 迷路的一页</span>
      <h1>这一页，暂时留白。</h1>
      <p className="page-intro">也许是地址写错了。回去翻翻其他的故事吧。</p>
      <Link className="text-link" href="/">
        回到此岸 →
      </Link>
    </section>
  );
}
