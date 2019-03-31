const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manger-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value))
            {
                throw new Error("Email is invalid");
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0)
            {
                throw new Error("Age must be positive");
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password'))
            {
                throw new Error("Password must not contain 'password'");
            }
        }
    }
});

// const me = new User({
//     name: "Dylan",
//     email: "Dylan@iinet.net.au",
//     password: 'sword'
// });

// me.save().then(() => {
//     console.log(me);
// }). catch((error) => {
//     console.log("ERROR! " + error);
// });

const Task = mongoose.model('Task', {
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const toDo = new Task({
    description: "       test2"
})

toDo.save().then(() => {
    console.log(toDo);
}).catch((error) => {
    console.log("ERROR " + error);
})