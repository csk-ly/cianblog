import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://shore-journal-caosk.lightrook8.chatgpt.site"),
  title: { default: "此岸 · 不渡彼岸，只记此岸。", template: "%s · 此岸" },
  authors: [{ name: "高温若寒" }],
  description:
    "在南京，做技术，偶尔写字。关于旧事、家人，以及还没想明白的生活。",
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body id="top">
        <a href="#main" className="skip-link">
          跳转到内容
        </a>
        <Navigation />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
