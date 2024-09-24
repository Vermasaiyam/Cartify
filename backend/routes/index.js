const express = require('express');
const Signup = require('../controllers/signup');
const Login = require('../controllers/login');

const router = express.Router();

router.post('/signup', Signup);
router.post('/login', Login);


module.exports = router