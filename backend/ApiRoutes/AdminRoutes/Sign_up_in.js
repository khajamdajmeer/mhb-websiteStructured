// importing the requriee  libraries
const express = require('express');
const router = express.Router();
require("dotenv").config();
// const {validationResult,body} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

//use dotenv below
const JWT_SECRET = process.env.REACT_JWT_TOKEN;

//importing mongo db to checkout the unique value
const admincredentials = require('../../DBmodels/DBAdmin/AdminSignup')


//creatind email Transporter
const emailTransport = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.REACT_NODEMAILER_EMAIL_ADDRESS,
        pass: process.env.REACT_NODEMAILER_EMAIL_PASSWORD
    },

}) 



// ROUET 1 FOR CREATING ADMIN CREDENTIALS

router.post('/signup',async(req,res)=>{
    let signupsuccess =false;
    try{
        let user = await admincredentials.findOne({email:req.body.email});
        if(user){
           return res.status(400).send({success:signupsuccess,message:'Sorry Emailalready Exists'})
        }
        const email=req.body.email
        //generating random 6 digin number to send as otp
        const otp = Math.floor(100000+Math.random()*900000);
        //adding Html element for sending email
        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                *{
                    margin: 0;
                    padding: 0;
                }
        .navbar{
            background-color: black;
            color: white;
            font-size: large;
            text-align: center;
        }
        .container{
            height: auto;
            background-color: #bde0fe;
            align-items: center;
    text-align: center;

        }
        .container h2{
            text-align: center;
            padding: 20px 0px;
        }
        .container P{
            padding: 20px;
        }
        .otpbox{
            background-color: blueviolet;
            color: whitesmoke;
            display: inline-block;
            justify-content: center;
            padding: 10px;
            border-radius: 4px;
    letter-spacing: 4px;

        }
        
            </style>
        </head>
        <body>
            <div class="navbar">MHB Email Verificaiton</div>
            <div class="container">
                <h2>your otp is</h2>
                <div class="otpbox">${otp}</div>
                <p>This a email Verifiction for the MHB website if Your have not initated this plese ignore this email</p>
            </div>
        
        </body>
        </html>
`;

        const sendmail ={
            from:process.env.REACT_NODEMAILER_EMAIL_ADDRESS,
            to:email,
            subject:'OTP Verification',
            text:"",
            html:htmlContent
        }
        var otpsent = false;
        emailTransport.sendMail(sendmail,(err,info)=>{
            if(err){
                console.log(err)
                otpsent=false;
            }
            else{
                otpsent=true
            }
        })

        //creating salt for the pasword
        var salt = await bcrypt.genSaltSync(10);
        //convering password to hashvalue
        const securepassword = await bcrypt.hash(req.body.password,salt);
        //creating new admin credentials
        user  = await admincredentials.create({
            name:req.body.name,
            mobileNumber:req.body.mobileNumber,
            email:req.body.email,
            OTP:otp,
            password:securepassword
        })
        signupsuccess=true
        const data = {
            user:{
                id:user.id
            }
        }
        const AuthToken = await jwt.sign(data,JWT_SECRET)

        res.status(200).send({
            success:signupsuccess,
            email:email,
            password:securepassword,
            Authtoken:AuthToken
        })

    }
    catch(error){
        res.status(500).send({message:'error occured'})
    }
})

router.post('/signin',async(req,res)=>{

    try{
        const {email,password}= req.body;
        const isadmin = await admincredentials.findOne({email:email})
        if(isadmin){
            var isverified = isadmin.verification;
            if(isverified){
                const comparepassword = await bcrypt.compare(password,isadmin.password)
                if(!comparepassword){
                    return res.status(500).send({message:'please use valid credentials'})
                }
                else{
                    const data = {
                        isadmin:{
                            id:isadmin._id
                        }
                    }
                    const AuthToken = jwt.sign(data,JWT_SECRET);
                    return res.status(500).send({message:'Login success',Token:AuthToken})
                }
                
            }
            else{

                   //generating random 6 digin number to send as otp
        const otp = Math.floor(100000+Math.random()*900000);
        //adding Html element for sending email
        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                *{
                    margin: 0;
                    padding: 0;
                }
        .navbar{
            background-color: black;
            color: white;
            font-size: large;
            text-align: center;
        }
        .container{
            height: auto;
            background-color: #bde0fe;
            align-items: center;
    text-align: center;

        }
        .container h2{
            text-align: center;
            padding: 20px 0px;
        }
        .container P{
            padding: 20px;
        }
        .otpbox{
            background-color: blueviolet;
            color: whitesmoke;
            display: inline-block;
            justify-content: center;
            padding: 10px;
            border-radius: 4px;
    letter-spacing: 4px;

        }
        
            </style>
        </head>
        <body>
            <div class="navbar">MHB Email Verificaiton</div>
            <div class="container">
                <h2>your otp is</h2>
                <div class="otpbox">${otp}</div>
                <p>This a email Verifiction for the MHB website if Your have not initated this plese ignore this email</p>
            </div>
        
        </body>
        </html>
`;

        const sendmail ={
            from:process.env.REACT_NODEMAILER_EMAIL_ADDRESS,
            to:email,
            subject:'OTP Verification',
            text:"",
            html:htmlContent
        }
        var otpsent = false;
        emailTransport.sendMail(sendmail,(err,info)=>{
            if(err){
                console.log(err)
            }
           
        })
 res.status(200).send({message:'sent verifcation'})
            }
        }

    }
    catch(error){
        console.log(error)
        res.status(500).send({message:'error occured'})
    }
})


module.exports = router;
