const Database = require("better-sqlite3");

// データベースファイルを作成または開く
const db = new Database("./todo.db");

// `todos` テーブルを作成（存在しない場合）
db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        done BOOLEAN NOT NULL DEFAULT 0
    )
`);

console.log("✅ SQLite データベースに接続しました！");

module.exports = db;
