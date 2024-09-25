const express = require('express');
const Signup = require('../controllers/signup');
const Login = require('../controllers/login');
const authToken = require('../middleware/authToken');
const userDetailsController = require('../controllers/userDetails');
const Logout = require('../controllers/logout');
const allUsers = require('../controllers/allUsers');
const updateUser = require('../controllers/updateUser');
const { default: uploadProduct } = require('../controllers/uploadProduct');

const router = express.Router();

router.post('/signup', Signup);
router.post('/login', Login);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout",Logout);

// admin
router.get("/all-users",authToken ,allUsers);
router.post("/update-user",authToken ,updateUser);

//upload new product
router.post('/upload-product',authToken ,uploadProduct);



module.exports = router