require('dotenv').config({ path: "../config.env" });
const mongoose = require('mongoose');
const express = require('express');
const User = mongoose.model('User');
const Fine = mongoose.model('Fine');
const jwt = require('jsonwebtoken');

const route = express.Router();
const secret = process.env.SECRET;

route.post('/signup', async (req, res) => {
    const { name, signupEmail, signupPassword, role } = req.body;
    //const Email = signupEmail.toLowerCase();

    if (!signupEmail || !signupPassword || !name)
        return res.status(400).send("Invalid Email or password ")

    try {
        const user = new User({ name, email:signupEmail, password: signupPassword, role });
        await user.save();

        const fine = new Fine({ userId: user._id, fine: 0 });
        await fine.save();

        const token = jwt.sign({ userId: user._id }, secret);
        res.send({ token });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("something went wrong !");
    }
})

route.post('/login', async (req, res) => {
    const { loginEmail, loginPassword } = req.body;
    const Email = loginEmail.toLowerCase();

    if (!loginEmail || !loginPassword)
        return res.status(400).send("invalid email or password");
    const user = await User.findOne({ email: Email });
   
    if (!user)
        return res.status(422).send("invalid email or password");

    try {
        await user.comparePasswords(loginPassword);
        const token = jwt.sign({ userId: user._id }, secret);
        console.log(`token = ${token}`);
        return res.send({ user, token });
    }
    catch (err) {
        console.log(err);
        res.send("invalid email or password");
    }


})

module.exports = route;