var {mongoose} = require('./db/mongoose.js');
var {User} = require('./models/user.js');
var {Todo} = require('./models/todos.js');
var {authenticate} = require('./middleware/authenticate.js')
var {objectID} = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var app = express();
app.use(bodyParser.json());
app.post('/todos', (req,res) => {
    var newTodo = new Todo(
        {
            text : req.body.text,
            completed : req.body.completed
        }
    );
    newTodo.save().then((doc) => {
        // console.log(doc)
        console.log(JSON.stringify(doc,undefined,2));
        res.send(doc);
    }, (e) => {
        console.log('unable to save',e);
        res.status(400).send(e);
    });  
});
app.post('/user',(req,res)=> {
    let body = _.pick(req.body,['email','password']);
    console.log(body)
    // let newUser = new User({
    //     email : body.email,
    //     password : body.password
    // });
        let user = new User(body);
        user.save().then(() => {
        // console.log(JSON.stringify(doc,undefined,2));
        // res.send(doc);
        return user.generateAuthTokens();

    }).then((token)=> {
        res.header('x-auth',token).send(user);
    }).catch((e) => {
        console.log('unable to save',e);
        res.status(400).send(e);
    });
});

app.get('/user/me',authenticate,(req,res)=> {
    res.send(req.user);
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
            res.status(404).send();
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
            res.status(404).send();
        }
        res.send({doc});
    }).catch((e) => {
        res.status(400).send();
    });
});
app.patch('/todos/:id', (req,res) => {
    let id = req.params.id;
   // if (!objectID.isValid(id)) {
    //    return res.status(404).send();
       
    // }
    let body = _.pick(req.body,['text','completed']);
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id,{$set: body},{new : true}).then((doc) => {
        if (!doc) {
            return res.status(404).send(); 
        }
        res.send({doc});
    }).catch((e) => {
        res.status(400).send();
    });
});
app.listen(3000, () => {
    console.log('connected to the server');
});


