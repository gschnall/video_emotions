var
  express = require('express'),
  userRouter = express.Router(), 
  userCtrl = require('../controllers/user.js')

userRouter.route('/')
  .get(userCtrl.index)
  .post(userCtrl.create)
  .patch(userCtrl.edit)

userRouter.route('/:id')
  .get(userCtrl.show)
  .delete(userCtrl.destroy)


module.exports = userRouter 
