const express = require('express');
const router = express.Router();

const {createUser, login} = require('../controller/userController.js')

router.post('/hittok.in/oncab/api/test/cerateUser', createUser)

router.post('/login', login)




module.exports = router