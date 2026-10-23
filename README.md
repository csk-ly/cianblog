# 此岸

一份关于生活的私人记录。Next.js App Router、TypeScript、React、React Bits 与 Motion。

## 本地运行

需要 Node.js 20.9 或更新版本，推荐 Node.js 22。

```sh
npm ci
npm run dev
```

访问终端显示的地址，默认为 http://localhost:3000。

## 发布

```sh
npm run typecheck
npm run build
npm run preview
```

项目使用 Next.js 静态导出，生成的 `out/` 可部署到支持静态文件的网站服务。无需数据库、账号系统或服务器。

## 写文章

所有文章均为 `content/posts/*.md`，无需修改 React 组件。文件名即文章地址，例如 `shore.md` 对应 `/posts/shore/`。

```markdown
---
title: "文章标题"
category: "随笔"
subcategory: "如今"
description: "文章列表上的一小段介绍"
image: "/images/coffee.jpg"
order: 6
draft: false
---

> 题记可以写在这里。

正文使用标准 Markdown。
```

- `category` 为栏目，使用“随笔”或“技术”；首页按栏目筛选。
- `subcategory` 为栏目下的分类：随笔使用“过往”“如今”“明天”，技术使用“技术”“职场”。栏目页保留全部分类，包括暂时没有文章的分类。
- `order` 越小越靠前。原稿未提供确切发表日期，因此没有虚构日期。
- 可以设置 `date: "2026-10-21"`，RSS 会使用该日期。
- `draft: true` 的文章不进入列表、阅读路由、RSS 。
- 新增、修改、删除文章后，需要重新构建和部署。
- Markdown 仅保存在源码中；网站不提供原文下载入口，也不发布原文文件。浏览器已收到的文章内容无法从技术上完全禁止复制或保存。
- 首页文案在 `src/components/Hero.tsx`；站名、导航在 `src/components/Navigation.tsx`；配色在 `src/app/globals.css`。
- 相册在 `src/components/Album.tsx` 配置，当前使用九张有来源标识的风景与生活示例配图。支持分类、放大、上一张、下一张、Esc 关闭与方向键切换。

## 已接入的文章

《岸》《风瑟》《雾栖》《风笺》《设计院大楼》从工作区的 Word 文件提取为 Markdown，正文保留；不导入《我的生平》、对话截图、个人照片及小说底稿。此站初次部署为仅本人可访问。

## 动效与阅读

首页标题使用 React Bits 的 BlurText TypeScript 组件。Motion 用于图片视差、滚动显现、文章列表筛选过渡。系统开启“减少动态效果”时，关闭装饰动画。正文页支持字号切换、阅读进度与复制链接。无自动播放音频。

## 图片与第三方来源

配图为可替换的 Unsplash 图片，不声称由作者拍摄。来源链接见 [第三方说明](THIRD_PARTY.md)。所有个人原照片保持在原目录，未复制入项目。

## 站点身份

`.openai/hosting.json` 保存 Sites 项目 ID；更新现有站点时复用，不新建。源文件与部署产物分开管理。

## 订阅入口

头部 RSS 入口和底部订阅按钮已隐藏；`feed.xml` 仍然保留，后续需要时可以恢复入口。
