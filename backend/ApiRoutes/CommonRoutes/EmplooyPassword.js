const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcryptjs')
const EmplooyDB =require('../../DBmodels/DBAdmin/NewEmplooyData')
const JWT_SECRET = process.env.REACT_JWT_TOKEN;
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')



//creatind email Transporter
const emailTransport = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.REACT_NODEMAILER_EMAIL_ADDRESS,
        pass: process.env.REACT_NODEMAILER_EMAIL_PASSWORD
    },

}) 

// ROUTE 1 FOR EMPLOOY TO CHANGE PASWORD

router.post('/forgotpassword',async(req,res)=>{


    try{
        const {username}=req.body;
        const emplooy= await EmplooyDB.findOne({username:username});
        if(emplooy){

        //sending email for verificaition 
        const otp = Math.floor(100000 + Math.random() * 900000);
        //adding html element for sending email
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
            const mailOptions = {
                from: process.env.REACT_NODEMAILER_EMAIL_ADDRESS,
                to: emplooy.email,
                subject: 'OTP Verfication',
                text: ``,
                html:htmlContent
            }
            var otpsent=false
            emailTransport.sendMail(mailOptions,(err,info)=>{
                if(err){
                    otpsent=false
                }
                else{otpsent=true}
            })
            const newdata = {OTP:otp}

            const updateOtp = await EmplooyDB.findByIdAndUpdate(emplooy._id,{$set:newdata},{new:true})



            res.status(200).send({message:`verification otp sent to the email ${emplooy.email.slice(0,4)}****${emplooy.email.slice(-8)}`,success:true    })

        }
        else{
            return res.status(400).send({message:'invalid username ',success:false})
        }

    }
    catch(error){
        res.status(500).send({message:'error occured'})
    }

})



// ROUTE 2 FOR VERIFCATION OF THE OTP AND SET PASSWORD
router.put('/verifyotp',async(req,res)=>{
    try{
       
        const{username,password,OTP}=req.body
        const emplooy = await EmplooyDB.findOne({username:username})
        if(emplooy){
            if(OTP===emplooy.OTP){
                const newdata = {};
                var salt = await bcrypt.genSaltSync(10);
                const securepassword = await bcrypt.hash(password,salt);
                newdata.password = securepassword;
                newdata.OTP = null;
                newdata.verification=true;
                const update = await EmplooyDB.findByIdAndUpdate(emplooy._id,{$set:newdata},{new:true})
                res.status(200).send({message:'Password Updated Successfully'})
            }
            else{
                return res.status(400).send({message:'invalid OTP'});
            }


        }
        else{
            return res.status(400).send({message:'invalid username'})
        }

    }
    catch(error){
        res.status(500).send({message:'error occured while processing teh request'})
    }
})

//ROUTE 3 FOR LOGIN OF THE EMPLOOY

router.post('/login',async(req,res)=>{
    try{
        const {username,password} = req.body;
        const isEmplooy = await EmplooyDB.findOne({username:username})
        if(!isEmplooy){
            console.log()
            return res.status(400).send({message:'invalid credentils '})
        }
        const comparepassword = await bcrypt.compare(password,isEmplooy.password)
        if(!comparepassword){
            return res.status(400).send({message:'invalid credentils '})
        }
        if(isEmplooy.verification){
            const data = {
                user:{
                    id:isEmplooy._id,
                    authorization:isEmplooy.designation,
                }
            }
            const AuthToken = jwt.sign(data,JWT_SECRET)
                    authorization:isEmplooy.designation,
            res.status(200).send({message:"login success",Token:AuthToken,level:isEmplooy.designation,})
        }
        else{
            return res.status(200).send({message:"account not verified"})
        }


    }catch(error){
        console.log(error)
        res.status(400).send({message:"error occured unable to prcess the request"})
    }
})



module.exports=router