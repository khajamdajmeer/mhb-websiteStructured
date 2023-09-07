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
    const email = req.body.email.toLowerCase();
    try{
        let user = await admincredentials.findOne({email:email});
        if(user){
           return res.status(400).send({success:signupsuccess,message:'Sorry Email already Exists'})
        }
        //generating random 6 digin number to send as otp
        const otp = Math.floor(100000+Math.random()*900000);
        const otpadmin = Math.floor(100000+Math.random()*900000);
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
const adminhtmlContent = `
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
            <div class="navbar">MHB Email Verificaiton for ${email}</div>
            <div class="container">
                <h2>your otp is</h2>
                <div class="otpbox">${otpadmin}</div>
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


        //otp sending owners email
        const adminsendmail ={
            from:process.env.REACT_NODEMAILER_EMAIL_ADDRESS,
            to:process.env.REACT_NODEMAILER_ADMIN_MAIN,
            subject:'OTP Verification',
            text:"",
            html:adminhtmlContent
        }
        var adminotpsent = false;
        emailTransport.sendMail(adminsendmail,(err,info)=>{
            if(err){
                console.log(err)
                adminotpsent=false;
            }
            else{
                adminotpsent=true
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
            email:email,
            OTP:otp,
            adminOTP:otpadmin,
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
            success:true,
            message:`otp sent to ${email}`,

            // password:securepassword,
            // Authtoken:AuthToken
        })

    }
    catch(error){
        res.status(500).send({message:'error occured'})
    }
})

router.post('/signin',async(req,res)=>{

    try{
    const email = req.body.email.toLowerCase();

        const {password}= req.body;
        const isadmin = await admincredentials.findOne({email:email})
        if(isadmin){
            var isverified = isadmin.verification;
            var adminverified = isadmin.adminverification;
            if(isverified&&adminverified){
                const comparepassword = await bcrypt.compare(password,isadmin.password)
                console.log(password)
                if(!comparepassword){
                    return res.status(500).send({message:'please use valid credentials',success:false})
                }
                else{
                    const data = {
                        isadmin:{
                            id:isadmin._id
                        }
                    }
                    const AuthToken = jwt.sign(data,JWT_SECRET);
                    return res.status(500).send({message:'Login success',Token:AuthToken,success:true})
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
        // generata a 6 digit otp to send to the adminemail
        const otpadmin = Math.floor(100000+Math.random()*900000);
        //adding Html element for sending email
        const htmlContentadmin = `
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
            <div class="navbar">MHB Email Verificaiton ${email}</div>
            <div class="container">
                <h2>your otp is</h2>
                <div class="otpbox">${otpadmin}</div>
                <p>This a email Verifiction for the MHB website if Your have not initated this plese ignore this email</p>
            </div>
        
        </body>
        </html>
`;

        const sendmailadmin ={
            from:process.env.REACT_NODEMAILER_EMAIL_ADDRESS,
            to:process.env.REACT_NODEMAILER_ADMIN_MAIN,
            subject:'OTP Verification',
            text:"",
            html:htmlContentadmin
        }
        var otpsent = false;
        emailTransport.sendMail(sendmailadmin,(err,info)=>{
            if(err){
                console.log(err)
            }
           
        })
        const otpupdate = await admincredentials.findOneAndUpdate({email:email},{$set:{OTP:otp,adminOTP:otpadmin}},{returnOriginal:false})


 res.status(200).send({message:'OTP Sent for verifcation'})
            }
        }

    }
    catch(error){
        console.log(error)
        res.status(500).send({message:'error occured'})
    }
})

router.post('/adminverification',async(req,res)=>{
    try{
        const email = req.body.email.toLowerCase();
        const {otp,adminotp}=req.body;
        console.log(req.body)
        const data = await admincredentials.findOne({email:email})
        if(data.OTP===otp && data.adminOTP===adminotp){
            const update= await admincredentials.findOneAndUpdate({email:email},{$set:{OTP:null,adminOTP:null,verification:true,adminverification:true}},{returnOriginal:false})
            res.status(200).send({message:'Verification Success Login to continue',success:true})
        }
        else{
            res.status(500).send({message:'Incorrect Otp',success:false})

        }
    }
    catch(error){
        res.status(400).send({message:'error occured please try after some time',success:false})
    }
})


//ROUTE FOR FORGOT PASSWORD FOR THE ADMIN
router.post('/forgotpass',async(req,res)=>{
    try{
        const email = req.body.email.toLowerCase();
        let user = await admincredentials.findOne({email:req.body.email});
        if(!user){
           return res.status(400).send({success:false,message:'Sorry Invalid Email'})
        }
        //generating random 6 digin number to send as otp
        const otp = Math.floor(100000+Math.random()*900000);
        const otpadmin = Math.floor(100000+Math.random()*900000);
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
const adminhtmlContent = `
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
            <div class="navbar">MHB Email Verificaiton for ${email}</div>
            <div class="container">
                <h2>your otp is</h2>
                <div class="otpbox">${otpadmin}</div>
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


        //otp sending owners email
        const adminsendmail ={
            from:process.env.REACT_NODEMAILER_EMAIL_ADDRESS,
            to:process.env.REACT_NODEMAILER_ADMIN_MAIN,
            subject:'OTP Verification',
            text:"",
            html:adminhtmlContent
        }
        var adminotpsent = false;
        emailTransport.sendMail(adminsendmail,(err,info)=>{
            if(err){
                console.log(err)
                adminotpsent=false;
            }
            else{
                adminotpsent=true
            }
        })

        //creating salt for the pasword
        var salt = bcrypt.genSaltSync(10);
        //creating new admin credentials
        user  = await admincredentials.findByIdAndUpdate(user._id,
            
           { $set:{OTP:otp,
            adminOTP:otpadmin}},{new:true}
        )
       

        res.status(200).send({
            success:true,
            message:`otp sent to ${email}`,
        })
        
    }catch(error){
        console.log(error)
        res.status(400).send({message:'error occured please try after some time',success:false})
    }
})
//ROUTE FOR ADMIN TO UPDATE THE PASSWORD
router.post('/updatepassword',async(req,res)=>{
    try{
        const {email,otp,adminotp,password}=req.body;
        const user = await admincredentials.findOne({email:email});
        if(!user){
           return res.status(200).send({success:false,message:'Sorry Invalid Email'})
        }
        else{
            if(otp==user.OTP&&adminotp===user.adminOTP){
                var salt = await bcrypt.genSaltSync(10);
        //convering password to hashvalue
        const securepassword = await bcrypt.hash(password,salt);
                await admincredentials.findByIdAndUpdate(user._id,{$set:{password:securepassword,OTP:null,adminOTP:null,verification:true,adminverification:true}},{returnOriginal:false})
                return res.status(200).send({message:'Verification Success and Password Updated'})
            }
            else{
                return res.status(400).send({message:'invalid OTP'});
            }
        }

    }catch(error){
        res.status(400).send({message:'error occured please try after some time',success:false})
    }
})
module.exports = router;
