const request = require('supertest');
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const app = require("../src/app");
const User = require("../src/models/user");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: "Mike",
    email: 'mike@example.com',
    password: "1234567",
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
})

test("should signed up a new user", async () => {
   const response = await request(app).post('/users').send({
        name: "Dylan",
        email: "dylan@example.com",
        password: "myPass777!"
    }).expect(201);

    //assert that the database was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull()

    // assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Dylan',
            email: 'dylan@example.com'
        },
        token: user.tokens[0].token
    });

    expect(user.password).not.toBe('myPass777!')
})

test("Should login existing user", async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);

    const user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token);
})

test("Should not login no existen user", async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: "12"
    }).expect(400);
})

test("Should get profile for user", async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
})

test("should no get profile for unauthenicated user", async() => {
    await request(app)
    .get('/users/me')
    .send()
    .expect(401);
})

test("should delete account for user", async() => {
    await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

    const user = await User.findById(userOneId);
    expect(user).toBeNull;
})

test("should not delete account for unathenticated user", async() => {
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401);
})