const Todo = require("../models/todoSchema");
const Parser = require('json2csv').Parser;
const csvtojson = require('csvtojson');
const fs = require('fs')

const listTodo = async (req, res) => {
    try {
        const todo = await Todo.find({});
        res.status(200).json(todo);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const addTodo = async (req, res) => {
    try {
        const { name, description, status } = req.body;
        const newTodo = new Todo({
            name,
            description,
            status,
        });
        await newTodo.save();
        res.status(201).json({ message: "Created" });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getTodoDetails = async (req, res) => {
    try {
        const id = req.params.id;
        const todoDetails = await Todo.findOne({ _id: id });
        res.status(200).json(todoDetails);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description, status } = req.body;
        await Todo.findOneAndUpdate({ _id: id }, { name, description, status });
        res.status(200).json({ message: "Updated" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const id = req.params.id
        await Todo.deleteOne({ _id: id });
        res.status(200).json({ message: 'Success' });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const filterTodo = async (req, res) => {
    try {
        const filter = req.query.status;
        const filterOptions = filter && filter !== 'all' ? { status: filter } : {};

        const todos = await Todo.find(filterOptions);
        res.status(200).json(todos);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const exportTodo = async (req, res) => {
    try {

        const todoData = await Todo.find({});

        const todo = todoData.map(t => {
            const { name, description, status } = t;
            return { name, description, status };
        });

        const csvFields = ['name', 'description', 'status'];
        const csvParser = new Parser({ fields: csvFields });
        const csvData = csvParser.parse(todo);

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=todo_download.csv');

        res.status(200).end(csvData);

    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const importTodo = async (req, res) => {
    try {
        const file = req.file.path
        const todos = await csvtojson().fromFile(file);

        for (let i = 0; i < todos.length; i++) {
            const { name, description, status } = todos[i];
            if (!name || !description || !status) {
                fs.unlinkSync(file); 
                return res.status(400).json({ message: `Validation error: Missing fields in row ${i + 1}` });
            }
        }

        todos.map(t => {
            const { name, description, status } = t;
            const newTodo = new Todo({
                name,
                description,
                status
            });

            return newTodo.save();
        });

        fs.unlinkSync(file);

        res.status(200).json({ message: 'Todos imported successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = {
    listTodo,
    addTodo,
    getTodoDetails,
    updateTodo,
    deleteTodo,
    filterTodo,
    exportTodo,
    importTodo,
};
