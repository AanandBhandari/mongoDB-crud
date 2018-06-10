const mongoose = require('mongoose');
const validator = require('validator');
var User = mongoose.model('User',{
    email : {
        type : String,
        required : true,
        minlength : 1,
        trim : true,
        unique : true,
        validate : {
            validator : validator.isEmail,
            // validator : (value) => validator.isEmail(value),
            message : '{VALUE} is not valid email'
            
        }
    },
    password : {
        type : String,
        require : true,
        minlength : 6
    },
    tokens :[{
        access : {
            type : String,
            require : true
        },
        token : {
            type : String,
            require : true
        }
    }]
});
// var newUser = new User({
//     email : 'aanand@gmail.com '
// });
module.exports = {User};