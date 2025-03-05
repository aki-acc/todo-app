const db = require("../db");

function getTodos(callback) {
    try {
        const rows = db.prepare("SELECT * FROM todos").all(); // ✅ 修正
        callback(rows);
    } catch (err) {
        console.error("データ取得エラー:", err);
        callback([]);
    }
}

function addTodo(text, callback) {
    try {
        db.prepare("INSERT INTO todos (text, done) VALUES (?, ?)").run(text, 0);
        callback();
    } catch (err) {
        console.error("TODO追加エラー:", err);
        callback();
    }
}

function deleteTodo(id, callback) {
    try {
        db.prepare("DELETE FROM todos WHERE id = ?").run(id);
        callback();
    } catch (err) {
        console.error("TODO削除エラー:", err);
        callback();
    }
}

function toggleTodo(id, callback) {
    try {
        const row = db.prepare("SELECT done FROM todos WHERE id = ?").get(id);
        if (row) {
            const newDone = row.done ? 0 : 1;
            db.prepare("UPDATE todos SET done = ? WHERE id = ?").run(newDone, id);
        }
        callback();
    } catch (err) {
        console.error("完了状態変更エラー:", err);
        callback();
    }
}

module.exports = { getTodos, addTodo, deleteTodo, toggleTodo };
