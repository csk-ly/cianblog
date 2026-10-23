import fs from "node:fs";
import path from "node:path";
import ReactMarkdown from "react-markdown";
import Reveal from "@/components/Reveal";
export const metadata = { title: "关于" };
export default function About() {
  const content = fs.readFileSync(
    path.join(process.cwd(), "content/about.md"),
    "utf8",
  );
  return (
    <section className="about-page">
      <Reveal>
        <span className="eyebrow">ABOUT / 关于这里</span>
        <h1>
          在此岸，
          <br />
          慢慢生活<span className="title-dot">。</span>
        </h1>
        <div className="about-body">
          <span className="vertical-note">代码有逻辑，生活有余白。</span>
          <div className="about-copy">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
