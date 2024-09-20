const express = require("express");
// 有時候esm跟commonjs會混著寫module不能指定mjs(es6)
const { singers } = require("./singers.json");
// 把物件裡面的singers單獨的取出來現在console.log會是物件。這是commonJS好用的地方
console.log(singers);
// json被require近來會自動變成「物件」。

const app = express();
// json的話名字會是字串，要引入
// 我們等下要把我們的東西放進glitch, 可能要用比較舊的commonJS寫

app.get("/", (req, res) => {
  res.send("home網站主頁");
});
app.get("/singer/:id.html", (req, res) => {
  const { id } = req.params;
  const result = singers.find((singer) => {
    // filter, map, forEach都是帶三個參數跟call back function
    if (singer.id == id) {
      // 從網址parse進來的一定都是數字跟字串
      return true;
    }
  });
  if (!result) {
    res.send("<h1>404 -  找不到歌手</h1>");
    return;
  }
  // singers.filter();
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        img{
            width: 100%;
            
        }
    </style>
    <title>歌手：${result.singer_name}</title>
</head>
<body>
    <h1>${result.singer_name}</h1>
    <h3>${result.singer_id}</h3>
    <img src="${result.singer_img}" alt="">
</body>
</html>`);
});
app.all("*", (req, res) => {
  res.send("<h1>404 找不到</h1>");
});
// 為了方便快速所以express()有時候會有進階的設定
app.listen(3000, () => {
  console.log("running at http://localhost:3000");
});
