import express from 'express'
import APIController from '../controllers/APIController'
const router = express.Router()
const APIRoute = (app) => {

  // middleware that is specific to this router
  router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  })
  router.get('/all-users', APIController.getAllUsers)
  router.post('/update-user', APIController.updateUser)
  router.post('/add-new-user', APIController.addNewUser)
  router.delete('/delete-user/:id', APIController.deleteUser)
    
  return app.use('/api/v1', router)
}
module.exports = APIRoute;