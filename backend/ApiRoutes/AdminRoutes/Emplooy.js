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
                mobilenumber:mobilenumber,
                email:email,
                joiningdate:joiningdate,
                AdharNumber:AdharNumber
                ,presentAdress:presentAdress,
                permanentAdress:permanentAdress,
                designation:designation
            })
           
            res.status(200).send(employ)
        }
        catch(error){
            res.status(500).send(error)
        }


})



//ROUTE 2 FOR VIEWING THE EMPLOOY DETAILS BY THE ADMIN
router.get('/emplooy',FetchAdmin,async(req,res)=>{

    try{
        const emplooys = await EmplooyDB.find({});
        res.status(200).send(emplooys)

    }catch(error){
        res.status(500).send({message:'error occured please try later'})
    }

})



//ROUTE 3 FOR UPDATING A EMPLOOY DETAILS BY THE ADMIN
router.put('/emplooy/update/:id',FetchAdmin,async(req,res)=>{

    try{
        const newdata = {};
        if(req.body.name){newdata.name=req.body.name}
        if(req.body.mobilenumber){newdata.mobilenumber=req.body.mobilenumber}
        if(req.body.email){newdata.email=req.body.email}
        if(req.body.joiningdate){newdata.joiningdate=req.body.joiningdate}
        if(req.body.AdharNumber){newdata.AdharNumber=req.body.AdharNumber}
        if(req.body.presentAdress){newdata.presentAdress=req.body.presentAdress}
        if(req.body.permanentAdress){newdata.permanentAdress=req.body.permanentAdress}
        if(req.body.designation){newdata.designation=req.body.designation}

        const emplooy = await EmplooyDB.findByIdAndUpdate(req.params.id,{$set:newdata},{new:true})
        res.status(200).send({message:'emplooy data updated success',emplooy})

    }catch(error){
        res.status(500).send({message:'error occured'})
    }


})

// ROUTE 4 FOR CREATING LOGIN CREDENTILAS FOR THE EMPLOOYS BY THE ADMIN

router.put('/emplooysignup/:id',FetchAdmin,async(req,res)=>{

    try{
        const{username}=req.body;
        const id = req.params.id;
        const isEmplooy = await EmplooyDB.findById(id);
        if(isEmplooy){
        const newdata = {}
        if(username){newdata.username=username}
        const emplooy = await EmplooyDB.findByIdAndUpdate(id,{$set:newdata},{new:true})

        res.status(200).send({message:'username created success',usernameIs:emplooy.username})


        }
        else{
            return res.status(500).send({message:'emplooy does not exists'})
        }

    }catch(error){
        res.status(500).send({message:'error occured unable to process the Request'})
    }
})




module.exports = router