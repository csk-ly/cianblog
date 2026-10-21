import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import ArticleList from "@/components/ArticleList";
import { Arrow } from "@/components/icons";
import { getPosts } from "@/lib/posts";
export default function Home() {
  const posts = getPosts();
  return (
    <>
      <Hero />
      <section className="writing-section" id="writing">
        <Reveal>
          <div className="section-heading">
            <div>
              <span className="eyebrow">01 / THE JOURNAL</span>
              <h2>
                最近写下<span>Written, along the way.</span>
              </h2>
            </div>
            <Link href="/journal/" className="small-link">
              所有随笔 <Arrow diagonal />
            </Link>
          </div>
          <ArticleList posts={posts.map(({ content, ...p }) => p)} />
        </Reveal>
      </section>
      <Reveal className="interlude">
        <span className="interlude-mark">“</span>
        <p>
          我们游向不同的岸，
          <br />
          身后是同一片海。
        </p>
        <Link href="/posts/shore/">
          摘自《岸》 <Arrow />
        </Link>
        <span className="interlude-water">～</span>
      </Reveal>
      <section className="now-section">
        <Reveal>
          <div className="section-heading">
            <div>
              <span className="eyebrow">02 / IN BETWEEN</span>
              <h2>
                字里行间<span>More than a single story.</span>
              </h2>
            </div>
            <span className="small-label">不急，慢慢来。</span>
          </div>
          <div className="now-grid">
            <Link href="/journal/" className="now-item">
              <span className="now-no">01</span>
              <span className="now-en">LIFE & MEMORY</span>
              <h3>把旧事写下来</h3>
              <p>
                一杯拿铁，一段往事。
                <br />
                写给走过的日子，也写给现在。
              </p>
              <Arrow diagonal />
            </Link>
            <Link href="/notes/" className="now-item">
              <span className="now-no">02</span>
              <span className="now-en">CODE & CURIOSITY</span>
              <h3>给好奇心留个位置</h3>
              <p>
                从管理到代码，从问题到答案。
                <br />
                关于技术，也关于身处其中的人。
              </p>
              <Arrow diagonal />
            </Link>
            <Link href="/album/" className="now-item">
              <span className="now-no">03</span>
              <span className="now-en">MOMENTS & LIGHT</span>
              <h3>把光影留下来</h3>
              <p>
                文字之外，还有一些片刻。
                <br />
                在这里，慢慢看。
              </p>
              <Arrow diagonal />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
