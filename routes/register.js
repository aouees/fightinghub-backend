// import packages
const express = require('express')
const router = express.Router()
const signupController = require('../controller/register')
const uploadImage=require('../static/uploadImage')
router.post('/', signupController.singup)
router.post('/verify', signupController.verify)
router.post('/image',uploadImage.single('file'),signupController.setImage)

module.exports = router