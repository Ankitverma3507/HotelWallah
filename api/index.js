const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config()
const app= express();

const bcryptSalt= bcrypt.genSaltSync(10);
const jwtSecret= 'sldkasdjfasdnkasjdfaskdljsdf';
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URL);



app.get('/test', (req,res) => {
    // console.log('test ok');
    res.json('test ok');
  });

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    try{
        const userDoc= await User.create({
            name, 
            email, 
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        // console.log(userDoc);
        res.json(userDoc);
    }
    catch(e){
        res.status(422).json(e);
    }
   
});

app.post('/login', async (req, res) => {
    const {email, password}= req.body;
    const userDoc= await User.findOne({email});

    if(userDoc){
        const isPasswordValid= bcrypt.compareSync(password, userDoc.password);

        if(isPasswordValid){
            jwt.sign({email:userDoc.email, id:userDoc._id },jwtSecret, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json('pass ok');
            });
            
        }
        else{
            res.status(422).json('pass not ok');
        }
    }
    else{
        res.json('User not found');
    }
});

app.listen(4000);