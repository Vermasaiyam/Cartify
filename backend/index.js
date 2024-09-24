const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const router = require('./routes');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api', router);

const PORT = 8000 || process.env.PORT;

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connnected to DB")
        console.log("Server is running "+PORT)
    })
})