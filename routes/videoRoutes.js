var
  express = require('express'),
  videoRouter = express.Router()
  videoCtrl = require('../controllers/video.js')

videoRouter.route('/')
  .get(videoCtrl.index)

videoRouter.route('/create/:email')
  .post(videoCtrl.create)

videoRouter.route('/:id')
  .get(videoCtrl.show)
  .delete(videoCtrl.destroy)
  .patch(videoCtrl.edit)



module.exports = videoRouter
