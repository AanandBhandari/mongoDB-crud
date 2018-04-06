const {MongoClient,ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to mongoDB server');
    }
    console.log('connected to mongoDB server');
    // db.collection('Todos').insertOne({
    //     test : 'Something to do',
    //     completed : false
    // },(err, result) => {
    //     if (err) {
    //         return console.log('Unable to connect todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });
    // db.collection('User').insertOne({
    //     name : 'Aanand',
    //     age : 22,
    //     location : 'Dhangadhi'
    // },(err, result) => {
    //     if (err) {
    //         return console.log('Unable to connect todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });
    // db.collection('Todos').find({completed : true}).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err) => {
    //     console.log('unable to fetch the data', err);
    // });
    db.collection('Todos').find().count().then((count) => {
        console.log('Todos count',count);
    },(err) => {
        console.log('unable to fetch the data', err);
    });
    // db.close();
});