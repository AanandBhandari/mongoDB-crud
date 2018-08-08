const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
var userSchema = new mongoose.Schema({
    
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

userSchema.methods.generateAuthTokens = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
    user.tokens.unshift({access,token});
    return user.save().then(()=>{
        return token;
    });
};
var User = mongoose.model('User',userSchema);
// var newUser = new User({
//     email : 'aanand@gmail.com '
// });
module.exports = {User};