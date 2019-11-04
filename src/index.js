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
    extended: true
}));

app.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save().then(() => {
        res.send(user);

    }).catch((err) => {
        res.status(400).send(err)
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