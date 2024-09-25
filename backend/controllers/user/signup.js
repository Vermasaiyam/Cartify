const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');


async function Signup(req, res) {
    try {
        const { email, password, name } = req.body;

        console.log(req.body);

        const user = await userModel.findOne({email});

        if(user){
            throw new Error("Already user exits.")
        }
        

        if (!email) {
            throw new Error("Please enter your email.")
        }
        if (!password) {
            throw new Error("Please enter your password.")
        }
        if (!name) {
            throw new Error("Please enter your name.")
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if (!hashPassword) {
            throw new Error("Something is wrong.")
        }

        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashPassword
        }

        const userData = new userModel(payload);
        const saveUser = await userData.save()

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created !!!"
        })


    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

module.exports = Signup;