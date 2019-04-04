const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task')

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//     if (req.method === "GET")
//     {
//         res.send("GET requests are disbaled")
//     }
//     else
//     {
//         next();
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send("This site is under maintenance");
// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('server is up on port: ' + port);
})