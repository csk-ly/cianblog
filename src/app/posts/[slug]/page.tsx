import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPosts, getPost } from "@/lib/posts";
import ReadingTools from "@/components/ReadingTools";
import { Arrow } from "@/components/icons";
export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  return { title: post?.title || "未找到文章", description: post?.description };
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const posts = getPosts();
  const next =
    posts[(posts.findIndex((p) => p.slug === slug) + 1) % posts.length];
  return (
    <>
      <ReadingTools />
      <article className="reading-page">
        <header className="post-header">
          <Link
            className="back-link"
            href={post.category === "技术" ? "/notes/" : "/journal/"}
          >
            ← 返回{post.category === "技术" ? "技术" : "随笔"}
          </Link>
          <div className="eyebrow">
            {post.category} <span>／</span> 约 {post.minutes} 分钟阅读
          </div>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <div className="post-byline">
            <span>此岸 · 个人手记</span>
            <span>慢慢读，不着急。</span>
          </div>
        </header>
        <div className="prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
        <div className="post-end">
          <span>— 写于生活之中 —</span>
          <Link href="/journal/">回到文章目录 ↗</Link>
        </div>
        <Link className="next-post" href={`/posts/${next.slug}/`}>
          <div>
            <span className="eyebrow">NEXT / 继续读一页</span>
            <h2>{next.title}</h2>
          </div>
          <Arrow diagonal />
        </Link>
      </article>
    </>
  );
}
