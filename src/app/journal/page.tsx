import Archive from "@/components/Archive";
import { getPosts } from "@/lib/posts";
export const metadata = { title: "随笔" };
export default function Journal() {
  return (
    <Archive
      title="沿途的几页"
      eyebrow="THE JOURNAL / 随笔"
      description="有些事过去了，仍然值得好好写下来。"
      posts={getPosts().filter((p) => p.category !== "技术手记")}
    />
  );
}
