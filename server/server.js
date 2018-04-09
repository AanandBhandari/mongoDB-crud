var {mongoose} = require('./db/mongoose.js');
var {User} = require('./models/user.js');
var {Todo} = require('./models/todos.js');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.post('/todo', (req,res) => {
    var newTodo = new Todo(
        {
            text : req.body.text
        }
    );
    newTodo.save().then((doc) => {
        console.log(JSON.stringify(doc,undefined,2));
        res.send(doc);
    }, (e) => {
        console.log('unable to save',e);
        res.status(400).send(e);
    });
});
app.listen(3000, () => {
    console.log('connected to the server');
});