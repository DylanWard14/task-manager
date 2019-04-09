const request = require('supertest');
const app = require("../src/app");
const User = require("../src/models/user");

const userOne = {
    name: "Mike",
    email: 'mike@example.com',
    password: "1234567"
}
beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
})

test("should signed up a new user", async () => {
    await request(app).post('/users').send({
        name: "Dylan",
        email: "dylan@example.com",
        password: "myPass777!"
    }).expect(201);
})

test("Should login existing user", async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);
})

test("Should not login no existen user", async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: "12"
    }).expect(400);
})