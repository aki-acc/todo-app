const sqlite3 = require("sqlite3").verbose();

// データベースファイルを作成または開く
const db = new sqlite3.Database("./todo.db", (err) => {
    if (err) {
        console.error("データベース接続エラー:", err);
    } else {
        console.log("✅ SQLite データベースに接続しました！");
    }
});

// `todos` テーブルを作成（存在しない場合）
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT NOT NULL,
            done BOOLEAN NOT NULL DEFAULT 0
        )
    `);
});

module.exports = db;
