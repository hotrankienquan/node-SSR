import express from 'express'
import {
  getHomepage, getDetailUser, createNewUser
  , deleteUser, editUser, updateUser
} from '../controllers/homeController'
const router = express.Router() 
const initWebRoute = (app) => {

  // middleware that is specific to this router
  router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  })
  // define the home page route
  // router.get('/', (req, res) => {
  //   res.send('Birds home page')
  // })
  router.get('/', getHomepage)
  router.get('/detail/user/:idUser', getDetailUser)
  router.post('/create-new-user', createNewUser)
  router.post('/delete-user/:id', deleteUser)
  router.post('/edit-user', editUser)
  router.post('/update-user', updateUser)
  // /edit-user

  // define the about route
  router.get('/about', (req, res) => {
    res.send('About birds')
  })
  return app.use('/', router)
}
module.exports = initWebRoute;