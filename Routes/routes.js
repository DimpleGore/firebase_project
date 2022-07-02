const route=require('express').Router();
const userController=require('../Controller/UserController');
const auth = require('../Middleware/middleware')

route.post('/signup', userController.signUp)
route.post('/signin', userController.signIn)
route.get('/getallusers',auth.authenticate, userController.getAllUsers)

module.exports=route;