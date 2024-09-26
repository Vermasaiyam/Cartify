const express = require('express');
const Signup = require('../controllers/user/signup');
const Login = require('../controllers/user/login');
const authToken = require('../middleware/authToken');
const userDetailsController = require('../controllers/user/userDetails');
const Logout = require('../controllers/user/logout');
const allUsers = require('../controllers/user/allUsers');
const updateUser = require('../controllers/user/updateUser');
const UploadProductController = require('../controllers/product/uploadProduct');
const getProductController = require('../controllers/product/getProduct');
const updateProductController = require('../controllers/product/updateProduct');
const getCategoryProduct = require('../controllers/product/getCategoryProductOne');
const getCategoryWiseProduct = require('../controllers/product/getCategoryWiseProduct');

const router = express.Router();

router.post('/signup', Signup);
router.post('/login', Login);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout",Logout);

// admin
router.get("/all-users",authToken ,allUsers);
router.post("/update-user",authToken ,updateUser);

//upload new product
router.post('/upload-product',authToken ,UploadProductController);
router.get('/get-product',getProductController);
router.post('/update-product',authToken ,updateProductController);
router.get('/get-categoryProduct',getCategoryProduct);
router.post("/category-product",getCategoryWiseProduct);



module.exports = router