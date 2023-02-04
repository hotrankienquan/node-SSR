
// import pool from "../config/connectDb";
const pool = require('../config/connectDb')
// import multer from 'multer';
// import path from 'path';
const multer = require('multer');
const path = require('path');


let getHomepage = async (req, res) => {
  // logic 
  let data = []
  // connection.query(
  //   'SELECT * FROM `users`',
  //   function (err, results, fields) {

  //     results.map(row => { 
  //       data.push({
  //         id: row.id,
  //         firstname:row.firstname
  //      })
  //     })

  //     return res.render('index.ejs',{dataUser: JSON.stringify(data)});
  //   }

  // );
  const [rows, fields] = await pool.execute('select * from users');
  return res.render('index.ejs', { dataUser: rows });
  console.log('>>> check rows', rows)
}
let getDetailUser = async (req, res) => {
  let id = req.params.idUser;
  const user = await pool.execute('SELECT * FROM `users` WHERE `id` = ?', [id]);
  console.log(">>check rows", user[0])
  return res.send(JSON.stringify(user[0]))
  // return res.render('index.ejs', { dataDetail: user[0] })
  // return res.render('index.ejs', { dataUser: rows });

}
let createNewUser = async (req, res) => {
  const { firstname, lastname, email, address } = req.body;
  console.log({
    firstname, lastname, email, address
  })
  await pool.execute('insert into users(firstname,lastname,address,email) values(?,?,?,?)', [firstname, lastname, address, email]);
  console.log(">> check req", req.body)
  return res.redirect('/')
}
let deleteUser = async (req, res) => {
  let id = req.params.id
  await pool.execute('delete from users where id = ?', [id])
  return res.redirect("/")
  console.log(">> check ", req.params.id)
}
let editUser = async (req, res) => {
  let idEdit = req.body.idEdit
  let data = await pool.execute('select * from users where id = ? limit 1', [idEdit])
  return res.render('edituser.ejs', { data: data[0] })
  console.log(">> check body", req.body)
}
let updateUser = async (req, res) => {
  let { firstname, lastname, email, address, idInput } = req.body
  await pool.execute('update users set firstname = ?,lastname=?,email=?,address=? where id = ?', [firstname, lastname, email, address, idInput])
  return res.redirect('/')
  console.log(">> check body", req.body)
}

let uploadFileFunction = (req, res) => {
  return res.render("uploadFile")
}

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },

//   // By default, multer removes file extensions so let's add them back
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });
const upload = multer().single('myFile');


let handleUploadFile = async (req, res) => {


  // console.log(">>> file in controller", req, res)
  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    }
    else if (!req.file) {
      return res.send('Please select an image to upload');
    }
    else if (err instanceof multer.MulterError) {
      return res.send(err);
    }
    else if (err) {
      return res.send(err);
    }

    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/uploads/${req.file.filename}" width="500"><hr /><a href="./">Upload another image</a>`);
  });
}

module.exports = {
  getHomepage, getDetailUser
  , createNewUser,
  deleteUser, editUser, updateUser, uploadFileFunction
  , handleUploadFile
};