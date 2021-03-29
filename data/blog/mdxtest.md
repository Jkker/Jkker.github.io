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

## Image

### Relative Path

1
![City](City-Skyline.jpg)

2
![City](mdxtest/City-Skyline.jpg)

### Web URL

![preview](https://image-static.segmentfault.com/325/916/3259161542-575018ce29d44)

### Absolute Path

![Server](/static/images/nas/Cyber-Server-Racks.jpeg)

## Prism / Highlighting

### JS

```js
function $initHighlight(block, cls) {
  try {
    if (cls.search(/\bno\-highlight\b/) != -1)
      return process(block, true, 0x0F) +
             ` class="${cls}"`;
  } catch (e) {
    /* handle exception */
  }
  for (var i = 0 / 2; i < classes.length; i++) {
    if (checkCondition(classes[i]) === undefined)
      console.log('undefined');
  }

  return (
    <div>
      <web-component>{block}</web-component>
    </div>
  )
}
class example{

}
export  $initHighlight;
```
