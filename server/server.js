var {mongoose} = require('./db/mongoose.js');
var {User} = require('./models/user.js');
var {Todo} = require('./models/todos.js');
var {objectID} = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
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
app.get('/todo', (req,res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send({e});
    });

});
app.get('/todos/:id',(req,res) => {
    var id = req.params.id;
    
    // if (!objectID.isValid(id)) {
    //     return res.status(404).send();
       
    // }
    Todo.findById(id).then((doc) => {
        if (!doc) {
            res.status(400).send();
        }
        res.send({doc});
    }).catch((e) => {
        res.status(400).send();
    });
});
app.delete('/todos/:id',(req,res) => {
    let id = req.params.id;
    
    // if (!objectID.isValid(id)) {
    //     return res.status(404).send();
       
    // }
    Todo.findByIdAndRemove(id).then((doc) => {
        if (!doc) {
            res.status(400).send();
        }
        res.send({doc});
    }).catch((e) => {
        res.status(400).send();
    });
});
// app.patch('/todos/:id', (req,res) => {
//     let id = req.params.id;
//    // if (!objectID.isValid(id)) {
//     //    return res.status(404).send();
       
//     // }
//     let body = _.pick(req.body,['text','completed']);
//     if (_.isBoolean(body.completed) && body.completed) {
//         body.completedAt = new Date().getTime();
//     } else {
//         body.completed = false;
//         body.completedAt = null;
//     }
//     Todo.findByIdAndUpdate(id,{$set: body},{new : true}).then((doc) => {
//         if (!doc) {
//             return res.status(404).send(); 
//         }
//         res.send({doc});
//     }).catch((e) => {
//         res.status(400).send();
//     });
// });
app.listen(3000, () => {
    console.log('connected to the server');
});


