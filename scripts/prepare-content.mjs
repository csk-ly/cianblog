import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
const origin = "https://shore-journal-caosk.lightrook8.chatgpt.site";
if (fs.existsSync("public/markdown"))
  fs.rmSync("public/markdown", { recursive: true });
const posts = fs
  .readdirSync("content/posts")
  .filter((n) => n.endsWith(".md"))
  .map((name) => {
    const raw = fs.readFileSync(path.join("content/posts", name), "utf8");
    const { data, content } = matter(raw);
    return { name, raw, data, content, slug: name.slice(0, -3) };
  })
  .filter((p) => !p.data.draft);

const escape = (s) =>
  String(s).replace(
    /[<>&"']/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[c],
  );
fs.writeFileSync(
  "public/feed.xml",
  `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>此岸</title><link>${origin}</link><description>不渡彼岸，只记此岸。</description><language>zh-CN</language>${posts.map((p) => `<item><title>${escape(p.data.title)}</title><link>${origin}/posts/${p.slug}/</link><guid>${origin}/posts/${p.slug}/</guid><description>${escape(p.data.description)}</description>${p.data.date ? `<pubDate>${new Date(p.data.date).toUTCString()}</pubDate>` : ""}</item>`).join("")}</channel></rss>`,
);
fs.writeFileSync(
  "public/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${["/", "/journal/", "/notes/", "/about/", "/album/", ...posts.map((p) => `/posts/${p.slug}/`)].map((p) => `<url><loc>${origin}${p}</loc></url>`).join("")}</urlset>`,
);
fs.writeFileSync(
  "public/robots.txt",
  `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
);
console.log(
  `Prepared ${posts.length} Markdown articles (local source only), RSS and sitemap.`,
);
