---
title: mdx-test
date: '2021-03-29'
tags: []
draft: false
summary:
images: []
---

## Mermaid

```mermaid
graph LR
C(Controller<br/>业务逻辑)
M(Model<br/>数据持久)
V(View<br/>用户界面)
U(["用户"])

U--输入-->V
V--传输指令--> C
C --"选取&处理数据"--> M
M --提供数据--> V

```

<!-- ## Image

### Relative Path

![City](City-Skyline.jpg)

### Web URL

![preview](https://image-static.segmentfault.com/325/916/3259161542-575018ce29d44)

### Absolute Path

![Server](/static/images/nas/Cyber-Server-Racks.jpeg) -->

<!-- ## Prism / Highlighting

```js
export function formatSlug(slug) {
  return slug.replace(/\.(mdx|md)/, '')
}
``` -->
