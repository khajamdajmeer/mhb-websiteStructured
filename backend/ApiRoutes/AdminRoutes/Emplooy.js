const express = require('express')
const router = express.Router();
const FetchAdmin = require('../../MiddleWare/FetchAdmin');
const EmplooyDB = require('../../DBmodels/DBAdmin/NewEmplooyData');
const terminate = require('../../DBmodels/DBAdmin/Terminate')
const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcryptjs');

const twilosid = process.env.TWILIO_SMM_SID;
const twiloAuth = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio')(twilosid,twiloAuth)







// ROUTE 1 FOR CREATING A NEW EMPLOOY DATA BY THE ADMIN

router.post('/newemplooy',FetchAdmin,async(req,res)=>{

        try{
            const {name,age,mobilenumber,email,joiningdate,AdharNumber,presentAdress,permanentAdress,designation,username} =req.body;
            const employ = await EmplooyDB.create({
                name:name,
                age:age,
                mobilenumber:mobilenumber,
                email:email,
                joiningdate:joiningdate,
                AdharNumber:AdharNumber
                ,presentAdress:presentAdress,
                permanentAdress:permanentAdress,
                designation:designation,
                username:username
            })
            
           
            res.status(200).send({success:true,message:'Emplooy data created'})
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

//Route for viewing individual emplooy
router.get('/emplooy/:id',FetchAdmin,async(req,res)=>{
    try{
        const id = req.params.id
        const response = await EmplooyDB.findById(id)
        if(response){
            return res.status(200).send(response)
        }
        return res.status(400).send(response)

    }
    catch(error){
        res.status(200).send({message:'error occures'})
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
        if(req.body.username){newdata.username=req.body.username}

        const emplooy = await EmplooyDB.findByIdAndUpdate(req.params.id,{$set:newdata},{new:true})
        res.status(200).send({message:'emplooy data updated success',success:true})

    }catch(error){
        res.status(500).send({message:'error occured',success:false})
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


///ROUTE 5 FOR THE ADMIN TO TERMINATE EMPLOOY   
router.post('/terminate/:id',FetchAdmin,async(req,res)=>{

try{
    const fetchemploy= await EmplooyDB.findById(req.params.id);
    if(fetchemploy){
        const {name,age,mobilenumber,email,joiningdate,presentAdress,permanentAdress,designation}=fetchemploy;
       
        await terminate.create( {
            name:name,
            age:age,mobilenumber:mobilenumber,email:email,
            joiningdate:joiningdate,
            presentAdress:presentAdress,
            permanentAdress:permanentAdress,
            designation:designation
        })
        await EmplooyDB.findByIdAndDelete(req.params.id)
        res.status(200).send({message:`Emplooy ${fetchemploy.name} has been Terminated`,success:true})
    }
    else{
        res.status(200).send({message:`Emplooy Data not found`,success:true})
    }
}catch(error){
console.log(error);
res.status(500).send({message:`Error Occured please Try again`,success:false})

}

})



module.exports = router