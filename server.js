const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// EJS の設定
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 静的ファイルの設定
app.use(express.static(path.join(__dirname, "public")));

// フォームのデータを取得できるようにする
app.use(express.urlencoded({ extended: true }));

// ルーティングを適用（この行を必ず書く）
const todoRoutes = require("./routes/todoRoutes");
app.use("/", todoRoutes);

// サーバーを起動
app.listen(PORT, () => {
    console.log(`🚀 サーバーが http://localhost:${PORT} で起動しました！`);
});
