const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

// TODOリストを取得して表示
router.get("/", todoController.getTodoList);

// 新しいTODOを追加
router.post("/add", express.urlencoded({ extended: true }), todoController.addTodo);

// TODOを削除
router.post("/delete", express.urlencoded({ extended: true }), todoController.deleteTodo);

module.exports = router;

// TODOを完了・未完了にするルート
router.post("/toggle", express.urlencoded({ extended: true }), todoController.toggleTodo);
