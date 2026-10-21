import Album from "@/components/Album";
import Reveal from "@/components/Reveal";
export const metadata = {
  title: "相册",
  description: "文字之外，把一些光影留下来。",
};
export default function AlbumPage() {
  return (
    <section className="album-page">
      <Reveal>
        <span className="eyebrow">ALBUM / 日常切片</span>
        <h1>
          把光影留下来<span className="title-dot">。</span>
        </h1>
        <p className="page-intro">有些片刻，适合看一会儿，不必急着说什么。</p>
        <Album />
      </Reveal>
    </section>
  );
}
