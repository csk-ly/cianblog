import ArticleList from "./ArticleList";
import Reveal from "./Reveal";
import type { Post } from "@/lib/posts";
export default function Archive({
  title,
  eyebrow,
  description,
  posts,
  categories,
}: {
  title: string;
  eyebrow: string;
  description: string;
  posts: Post[];
  categories: string[];
}) {
  return (
    <section className="archive-page">
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
        <h1>
          {title}
          <span className="title-dot">。</span>
        </h1>
        <p className="page-intro">{description}</p>
      </Reveal>
      <ArticleList
        posts={posts.map(({ content, ...p }) => p)}
        categories={categories}
        filterBy="subcategory"
      />
    </section>
  );
}
