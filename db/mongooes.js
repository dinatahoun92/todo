// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tasks', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});