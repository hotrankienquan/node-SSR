const express = require('express')
// import express from 'express';
const configViewengine = require('./src/config/viewengine')
const initWebRoute = require('./src/routes/web')
const APIRoute = require('./src/routes/api')
const connection = require('./src/config/connectDb')
require('dotenv').config();
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // tương tự dùng bodyParser
// config help send data from client to server easier

configViewengine(app);
const port = process.env.PORT || 8081;
initWebRoute(app)
APIRoute(app)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})