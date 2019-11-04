const express = require('express')
const app = express()
var bodyParser = require('body-parser')
require("../db/mongooes.js")
const User = require("../models/user")
const Task = require("../models/task")

app.get('/', function (req, res) {
    res.send('Hello World')
})
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({
    extended: false
}));

app.post('/user', (req, res) => {
    const user = new User(req.body)
    user.save().then(() => {
        res.send(user);

    }).catch((err) => {
        res.status(400).send(err)
    })
})
app.get('/users', (req, res) => {
    User.find({}).then(users => {
            res.send(users);
        })
        .catch((err) => {
            res.status(500).send(err)
        })
})
app.get('/tasks', (req, res) => {
    Task.find({}).then(tasks => {
            res.send(tasks);
        })
        .catch((err) => {
            res.status(500).send(err)
        })
})
app.get('/users/:id', (req, res) => {
    const _id = req.params.id;

    User.findById(_id).then(user => {
            if (user === null) {
                res.status(400).send("not found")
            } else {
                res.send(user);

            }
        })
        .catch((err) => {
            res.status(500).send(err)
        })
})
app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;
    Task.findById(_id).then(task => {
            if (task === null) {
                return res.status(400).send("not found")
            } else {
                res.send(task);

            }
        })
        .catch((err) => {
            res.status(500).send(err)
        })
})
app.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save().then(() => {
        res.send(task);

    }).catch((err) => {
        res.status(400).send(err)
    })
})
app.listen(port, () => console.log(`server is up and running on port ${port}`))