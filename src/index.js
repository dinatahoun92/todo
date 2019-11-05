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
app.delete('/tasks/delete/:id', (req, res) => {
    const _id = req.params.id;
    Task.findByIdAndRemove(_id).then(task => {
            if (task === null) {
                return res.status(400).send("not found")
            } else {
                return Task.countDocuments({
                    completed: false
                })

            }
        }).then(count => console.log(count))
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
const updateAndCount = async (_id, completed) => {
    const updatedTask = await Task.findByIdAndUpdate(_id, {
        completed
    });
    const count = await Task.countDocuments({
        completed
    });
    return count
}
app.put('/tasks/update/:id/:completed', (req, res) => {
    const _id = req.params.id,
        _completed = req.params.completed;
    updateAndCount(_id, _completed).then(count => {
        if (count === null) {
            return res.status(400).send("not found")
        } else {
            return res.send("count" + count)
        }
    }).catch(e => console.log(e))
})
app.listen(port, () => console.log(`server is up and running on port ${port}`))