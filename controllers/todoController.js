const todoModel = require("../models/todoModel");

function getTodoList(req, res) {
    todoModel.getTodos((todos) => {
        res.render("index", { todos });
    });
}

function addTodo(req, res) {
    const { text } = req.body;
    if (text) {
        todoModel.addTodo(text, () => {
            res.redirect("/");
        });
    }
}

function deleteTodo(req, res) {
    const { id } = req.body;
    todoModel.deleteTodo(Number(id), () => {
        res.redirect("/");
    });
}

function toggleTodo(req, res) {
    const { id } = req.body;
    todoModel.toggleTodo(Number(id), () => {
        res.redirect("/");
    });
}

module.exports = { getTodoList, addTodo, deleteTodo, toggleTodo };
