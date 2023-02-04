// import express from 'express'
const express = require('express')
// import {
//   getHomepage, getDetailUser, createNewUser
//   , deleteUser, editUser, updateUser, uploadFileFunction
// } from '../controllers/homeController'
const { getHomepage, getDetailUser, createNewUser
  , deleteUser, editUser, updateUser, uploadFileFunction, handleUploadFile } = require('../controllers/homeController')
const multer = require('multer');
var appRoot = require('app-root-path');
const path = require('path')
const router = express.Router()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(">>> check approot", appRoot);
    // console.log(">>destination file", file, req)
    cb(null, appRoot + '/src/public/uploads/');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    console.log(">>>check file", file)
    cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter });

const initWebRoute = (app) => {

  // middleware that is specific to this router
  router.use((req, res, next) => {
    // console.log('Time: ', Date.now())
    next()
  })
  // define the home page route
  // router.get('/', (req, res) => {
  //   res.send('Birds home page')
  // })
  router.get('/', getHomepage)
  router.get('/upload-file', uploadFileFunction)
  router.get('/detail/user/:idUser', getDetailUser)
  router.post('/create-new-user', createNewUser)
  router.post('/delete-user/:id', deleteUser)
  router.post('/edit-user', editUser)
  router.post('/update-user', updateUser)

  // route nayf co middleware
  router.post('/handle-upload-file', upload.single('myFile'), handleUploadFile)

  // /edit-user

  // define the about route
  router.get('/about', (req, res) => {
    res.send('About birds')
  })
  return app.use('/', router)
}
module.exports = initWebRoute;