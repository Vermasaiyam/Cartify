const express = require('express');
const Signup = require('../controllers/signup');
const Login = require('../controllers/login');
const authToken = require('../middleware/authToken');
const userDetailsController = require('../controllers/userDetails');
const Logout = require('../controllers/logout');

const router = express.Router();

router.post('/signup', Signup);
router.post('/login', Login);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout",Logout);


module.exports = router