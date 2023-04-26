const express = require('express');
const router = express.Router();

const {createUser, login, logout} = require('../controller/userController.js')

router.post('/oncab/api/test/cerateUser', createUser)

router.post('/oncab/api/test-login', login)

router.post('/oncab/api/test-logout', logout)


module.exports = router