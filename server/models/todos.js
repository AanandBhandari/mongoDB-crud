var mongoose = require('mongoose');
var Todo = mongoose.model('Todo', {
    text : {
        type : String,
        required : true,
        minlength : 1,
        trim : true
    },
    completed : {
        type : Boolean,
        default : false
    },
    completedAt : {
        type : Number,
        default : null
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
module.exports = {Todo};