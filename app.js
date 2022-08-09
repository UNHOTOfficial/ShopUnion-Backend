const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser")
const app = express();

const routes = require('./routes/routes');

app.use('/api', routes)

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.json());

mongoose.connect("mongodb+srv://ShopUnionAdmin:ErM3BEIdyaz71PuT@cluster0.9yswveu.mongodb.net/test")

const dataBase = mongoose.connection;

dataBase.on('error', (error) => {
    console.log(error)
})

dataBase.once('connected', () => {
    console.log('Database Connected');
})

app.listen(3001, () => {
    console.log(`Server Started at ${3001}`)
})