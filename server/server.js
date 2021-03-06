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
app.post('/todos',authenticate, (req,res) => {
    var newTodo = new Todo(
        {
            text : req.body.text,
            completed : req.body.completed,
            _creator : req.user._id
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
app.post('/user/login',(req,res) => {
    let body = _.pick(req.body,['email','password']);
    User.findByCredentials(body.email,body.password).then((user)=> {
        // res.send(user);
         user.generateAuthTokens().then((token)=> {
            res.header('x-auth',token).send(user);
        });
    }).catch((e) => {
        res.status(400).send(e);
    });
});
app.delete('/user/me/token',authenticate,(req,res) => {
    req.user.removeToken(req.token).then(()=> {
        res.status(200).send();
    },()=> {
        res.status(400).send();
    });
})
app.get('/todo',authenticate, (req,res) => {
    Todo.find({_creator : req.user._id}).then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send({e});
    });

});
app.get('/todos/:id',authenticate,(req,res) => {
    var id = req.params.id;
    
    // if (!objectID.isValid(id)) {
    //     return res.status(404).send();
       
    // }
    Todo.findOne({
        _id : id,
        _creator:req.user._id
    }).then((doc) => {
        if (!doc) {
            res.status(404).send();
        }
        res.send({doc});
    }).catch((e) => {
        res.status(400).send();
    });
});
app.delete('/todos/:id',authenticate,(req,res) => {
    let id = req.params.id;
    
    // if (!objectID.isValid(id)) {
    //     return res.status(404).send();
       
    // }
    Todo.findOneAndRemove({
        _id : id,
        _creator : req.user._id
    }).then((doc) => {
        if (!doc) {
            res.status(404).send();
        }
        res.send({doc});
    }).catch((e) => {
        res.status(400).send();
    });
});
app.patch('/todos/:id', authenticate,(req,res) => {
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
    Todo.findOneAndUpdate({
        _id : id,
        _creator : req.user._id
    },{$set: body},{new : true}).then((doc) => {
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


