const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const admin = require('firebase-admin');
const serviceAccount = require('./ianpattison-react-tasks-80eef46d44e1.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

// set up test data if required
// check the size of the collection
var size;
db.collection('todos').get()
.then(snap => {
    if (snap.size == 0) {
        db.collection('todos').add({ id:1, text: "Learn React", isCompleted: false });
        db.collection('todos').add({ id:2, text: "Have lunch", isCompleted: false });
        db.collection('todos').add({ id:3, text: "Write React app", isCompleted: false });
    }
})

app.use(cors());
app.use(express.json());

// GET a todo item by its ID value
app.get('/todos/:id', (req, res) => {
    const query = db.collection('todos').where('id', '==', parseInt(req.params.id)).get()
    .then(q => {
        if (q.empty) { return res.sendStatus(404); }
        q.forEach(doc => {
            res.json(doc.data());
        })
    })
})

// GET all todo items
app.get('/todos', (req, res) => {
    const query = db.collection('todos').get()
    .then(q => {
        const todos = [];
        q.forEach(doc => {
            todos.push(doc.data())
        })
        res.json(todos);
    })
})

// POST a new item
app.post('/todos', (req, res) => {
    const { id, text, isCompleted } = req.body;

    // check for any required fields
    if (!id || !text) { return res.status(400).send('One or more required fields are missing'); }

    // add the new todo item
    const newTodo = { id, text, isCompleted };
    db.collection('todos').add(newTodo)
    .then(p => res.sendStatus(200));
})

// PUT an item - updates existing
app.put('/todos/:id', (req, res) => {
    const { id, text, isCompleted } = req.body;

    // check for any required fields
    if (!id || !text) { return res.status(400).send('One or more required fields are missing'); }

    // update the todo item
    const updatedTodo = { id, text, isCompleted };
    const query = db.collection('todos').where('id', '==', parseInt(req.params.id)).get()
    .then(q => {
        if (q.empty) { return res.sendStatus(404); }
        q.forEach(snap => {
            const doc = snap.ref;
            doc.set(updatedTodo)
            .then(p => {
                res.sendStatus(200);
            })
        })
    })

})

// DELETE an item
app.delete('/todos/:id', (req, res) => {
    const query = db.collection('todos').where('id', '==', parseInt(req.params.id)).get()
    .then(q => {
        if (q.empty) { return res.sendStatus(404); }
        q.forEach(snap => {
            const doc = snap.ref;
            doc.delete()
            .then(p => {
                res.sendStatus(200);
            })
        })
    })
})


app.listen(port, () => console.log(`App listening on port ${port}`));