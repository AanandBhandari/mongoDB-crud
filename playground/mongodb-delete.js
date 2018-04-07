const {MongoClient,ObjectId} = require ('mongodb')
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db)=> {
    if (err) {
        return console.log('unable to connect mongodb server',err);
    }
    console.log('succesfully connect to mongodb server');
    // deleteMany
    db.collection('Todos').deleteMany({completed : false}).then((results) => {
        console.log(results);
    });
    // // deleteOne
    // db.collection('Todos').deleteOne({text : Something to do}).then((results) => {
    //     console.log(results);
    // });
    // findOneDeleteOne
    // db.collection('Todos').findOneAndDelete({completed: false}).then((results) => {
    //     console.log(results);
    // });
    // db.close();
});