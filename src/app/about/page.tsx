import Link from "next/link";
import Reveal from "@/components/Reveal";
import { Arrow } from "@/components/icons";
export const metadata = { title: "关于" };
export default function About() {
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
          <div>
            <p className="lead">
              做技术，偶尔写字。
              <br />
              在南京，记录一些寻常。
            </p>
            <p>
              本科就读于南京农业大学，研究生就读于南京邮电大学。系统架构师。
            </p>
            <p>
              从管理类专业走向计算机，日常与代码、系统和项目相处。也喜欢文字，喜欢把走过的事情重新想一想，写一写。
            </p>
            <p>
              这里放着年少的往事、家人的日常，以及工作中的思考。没有标准答案，也不急着把每段经历都写成一个圆满的结论。
            </p>
            <p>
              “此岸”是给这些文字留的一处位置。欢迎来坐一会儿，读一篇文章，再继续自己的生活。
            </p>
            <Link className="text-link" href="/journal/">
              从一篇随笔开始 <Arrow />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
