import Archive from "@/components/Archive";
import { getPosts } from "@/lib/posts";
export const metadata = { title: "技术" };
export default function Notes() {
  return (
    <Archive
      title="保持好奇"
      eyebrow="NOTES / 技术与思考"
      description="记录技术，也记录一个身处其中的人。"
      posts={getPosts().filter((p) => p.category === "技术")}
    />
  );
}
