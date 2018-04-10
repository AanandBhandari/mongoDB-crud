var {mongoose} = require('./../server/db/mongoose.js');
var {User} = require('./../server/models/user.js');
var {Todos} = require('./../server/models/todos.js');
var id = '5acb47aa1d504eec01e36b11';
User.findById(id).then((doc) => {
    if (!doc) {
        return  console.log('unable to find the user');
    }
    console.log(doc);
},(e) => {
    console.log(e);
});