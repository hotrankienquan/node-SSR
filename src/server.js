// const express = require('express')
import express from 'express';
import configViewengine from './config/viewengine';
import initWebRoute from './routes/web'
import APIRoute from './routes/api'
import connection from './config/connectDb'
require('dotenv').config();
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // tương tự dùng bodyParser
// config help send data from client to server easier

configViewengine(app);
const port = process.env.PORT || 8081;
initWebRoute(app)
APIRoute(app)
// app.get('/', (req, res) => {
//   // res.send('Hello World! ')
//   res.render('index.ejs')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})