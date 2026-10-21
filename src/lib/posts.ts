import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
export type Post = {
  slug: string;
  title: string;
  category: string;
  description: string;
  date: string | null;
  image: string;
  content: string;
  minutes: number;
  order: number;
};
const directory = path.join(process.cwd(), "content/posts");
export function getPosts(): Post[] {
  return fs
    .readdirSync(directory)
    .filter((name) => name.endsWith(".md"))
    .flatMap((name) => {
      const { data, content } = matter(
        fs.readFileSync(path.join(directory, name), "utf8"),
      );
      if (data.draft) return [];
      if (!data.title || !data.category || !data.description)
        throw new Error(`Missing frontmatter: ${name}`);
      return [
        {
          slug: name.replace(/\.md$/, ""),
          title: String(data.title),
          category: String(data.category),
          description: String(data.description),
          date: data.date ? String(data.date) : null,
          image: data.image || "/images/coffee.jpg",
          content,
          minutes: Math.max(
            1,
            Math.ceil(content.replace(/\s/g, "").length / 400),
          ),
          order: Number(data.order || 99),
        },
      ];
    })
    .sort((a, b) => a.order - b.order);
}
export function getPost(slug: string) {
  return getPosts().find((p) => p.slug === slug);
}
