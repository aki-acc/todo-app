const db = require("../db");

// TODOリストを取得する関数（データベースから取得）
function getTodos(callback) {
    db.all("SELECT * FROM todos", (err, rows) => {
        if (err) {
            console.error("データ取得エラー:", err);
            callback([]);
        } else {
            callback(rows);
        }
    });
}

// 新しいTODOを追加する関数（データベースに保存）
function addTodo(text, callback) {
    db.run("INSERT INTO todos (text, done) VALUES (?, ?)", [text, 0], (err) => {
        if (err) {
            console.error("TODO追加エラー:", err);
        }
        callback();
    });
}

// TODOを削除する関数（データベースから削除）
function deleteTodo(id, callback) {
    db.run("DELETE FROM todos WHERE id = ?", [id], (err) => {
        if (err) {
            console.error("TODO削除エラー:", err);
        }
        callback();
    });
}

// TODOを完了・未完了に切り替える関数（データベースを更新）
function toggleTodo(id, callback) {
    db.get("SELECT done FROM todos WHERE id = ?", [id], (err, row) => {
        if (err) {
            console.error("完了状態取得エラー:", err);
            callback();
            return;
        }

        const newDone = row.done ? 0 : 1; // 完了状態を反転
        db.run("UPDATE todos SET done = ? WHERE id = ?", [newDone, id], (err) => {
            if (err) {
                console.error("完了状態変更エラー:", err);
            }
            callback();
        });
    });
}

module.exports = { getTodos, addTodo, deleteTodo, toggleTodo };
