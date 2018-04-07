const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost: 27017/TodoApp');
var Todo = mongoose.model('Todos', {
    text : {
        type : String
    },
    completed : {
        type : Boolean
    },
    completedAt : {
        type : Number
    }
});
// var newTodo = new Todo({
//     text : 'cook dinner'
// });
// newTodo.save().then((docs) => {
//     console.log('Saved todos',docs);
// }, (err) => {
//     console.log('unable to save');
// });
var otherTodo = new Todo({
    text : 'cook dinner',
    completed : false,
    completedAt : 123
});
otherTodo.save().then((docs) => {
    console.log(JSON.stringify(docs,undefined,2));
}, (err) => {
    console.log('unable to save',err);
});