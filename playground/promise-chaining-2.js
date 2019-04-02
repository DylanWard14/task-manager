require('../src/db/mongoose');
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5c9dbdd6393fe527989fc2a9').then((task) => {
//     console.log(task);
//     return Task.countDocuments({completed: true})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    var task = await Task.findByIdAndDelete(id);
    var count = await Task.countDocuments({completed: false})
    return count;
}

deleteTaskAndCount("5ca0a9839fc3c3297051fa90").then((task) => {
    console.log(task);
}).catch((e) => {
    console.log(e);
})