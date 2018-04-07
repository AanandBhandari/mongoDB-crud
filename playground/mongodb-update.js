const {MongoClient,ObjectID} = require ('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
    if (err) {
        return console.log('unable to connect mongodb server',err);
    }
    console.log('sucessfully connected to mongodb server');
    // findOneAndUpdate
    // db.collection('Todos').findOneAndUpdate({
    //     _id : new ObjectID('5ac63f51a4dd80860942d013')
    // },{
    //     $set : {
    //         completed : false
    //     }
    // },{
    //     returnOriginal : false
    // }).then((results) => {
    //     console.log(results);
    // });
    db.collection('User').findOneAndUpdate({
        _id : new ObjectID('5ac4b1ffcbd6000cd8355db2')
    },{
        $set : {
            name : 'bunu'
        }, $inc : {
            age : 1
        }
    },{
        returnOriginal : false
    }).then((results) => {
        console.log(results);
    });

    // db.close();
});