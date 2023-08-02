const express = require('express')
const router = express.Router();
const FetchAdmin = require('../../MiddleWare/FetchAdmin');
const EmplooyDB = require('../../DBmodels/DBAdmin/NewEmplooyData');
const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcryptjs')

const twilosid = process.env.TWILIO_SMM_SID;
const twiloAuth = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio')(twilosid,twiloAuth)







// ROUTE 1 FOR CREATING A NEW EMPLOOY DATA BY THE ADMIN

router.post('/newemplooy',FetchAdmin,async(req,res)=>{

        try{
            const {name,age,mobilenumber,email,joiningdate,AdharNumber,presentAdress,permanentAdress,designation} =req.body;
            const employ = await EmplooyDB.create({
                name:name,
                age:age,
                mobilenumber:mobilenumber,email:email,joiningdate:joiningdate,AdharNumber:AdharNumber
                ,presentAdress:presentAdress,
                permanentAdress:permanentAdress,
                designation:designation
            })
            // twilio.messages.create({
            //     body:'this is message for the ajmeer khaja from twilo about veification',
            //     from:556306,
            //     to:mobilenumber
            // })
            res.status(400).send(employ)
        }
        catch(error){
            res.status(500).send(error)
        }


})

module.exports = router