const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// set up test data
const todos = [
    { id:1, text: "Learn React", isCompleted: false },
    { id:2, text: "Have lunch", isCompleted: false },
    { id:3, text: "Write React app", isCompleted: false }
];

app.use(cors());
app.use(express.json());

// GET a todo item by its ID value
app.get('/todos/:id', (req, res) => {
    const todo = todos.find(x => x.id == parseInt(req.params.id));
    if (!todo) { return res.sendStatus(404); }
    res.json(todo);
})

// GET all todo items
app.get('/todos', (req, res) => {
    res.json(todos);
})

// POST a new item
app.post('/todos', (req, res) => {
    const { id, text, isCompleted } = req.body;

    // check for any required fields
    if (!id || !text) { return res.status(400).send('One or more required fields are missing'); }

    // check for duplicate ID
    const todo = todos.find(x => x.id == id);
    if (todo) { return res.sendStatus(404); }

    // add the new todo item
    const newTodo = { id, text, isCompleted };
    todos.push(newTodo);
    res.sendStatus(200);
})

// PUT an item - updates existing
app.put('/todos/:id', (req, res) => {
    const { id, text, isCompleted } = req.body;

    // check for any required fields
    if (!id || !text) { return res.status(400).send('One or more required fields are missing'); }

    // check that the item to be updated actually exists
    const index = todos.findIndex(x => x.id == parseInt(req.params.id));
    if (index == -1) { return res.sendStatus(404); }

    // update the todo item
    const updatedTodo = { id, text, isCompleted };
    todos[index] = updatedTodo;
    res.sendStatus(200);
})

// DELETE an item
app.delete('/todos/:id', (req, res) => {
    const index = todos.findIndex(x => x.id == parseInt(req.params.id));
    if (index == -1) { return res.sendStatus(404); }
    todos.splice(index, 1);
    res.sendStatus(200); 
})


app.listen(port, () => console.log(`App listening on port ${port}`));