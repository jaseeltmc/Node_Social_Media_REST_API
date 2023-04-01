const express = require('express');
const app = express();
const logger = require('morgan');
const mongoose = require('mongoose');
const env = require('dotenv');
const { default: helmet } = require('helmet');
env.config();




mongoose.connect(
    "mongodb://127.0.0.1:27017/social_Media"
    )
    .then(()=>console.log("DB Connection successfull"))
    .catch((err)=>{

        console.log(err);
    });

app.listen(4000,function(){

    console.log("Backend Server is running....");
})


app.use(express.json());
app.use(helmet());
app.use(logger('common'))


const userRouter = require('./routes/userRouters')
app.use('/api/users',userRouter);

const authRouter = require('./routes/authRouters');
app.use('/api/auth',authRouter);




