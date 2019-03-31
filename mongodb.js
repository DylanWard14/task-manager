// CRUD create read update delete

const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error)
    {
        return console.log("Unable to connect to database!");
    }
    
    const db = client.db(databaseName);

    // db.collection('users').findOne({_id: new ObjectID('5c9c56a3174d281920013571')}, (error, user) => {
    //     if (error)
    //     {
    //         return console.log('unable to fetch');
    //     }
    //     console.log(user);
    // })

    // db.collection('users').find({age: 23}).toArray((error, users) => {
    //     console.log(users);
    // })

    db.collection('tasks').findOne({_id: new ObjectID("5c9c54082a18953a44827e92")}, (error, task) => {
        if (error)
        {
            return console.log("unable to fetch");
        }
        console.log(task);
    })

    db.collection('tasks').find({completed: true}).toArray((error, tasks) => {
        console.log(tasks);
    })
})