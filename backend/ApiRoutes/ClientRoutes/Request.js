
// importing the required packages

const express = require("express");
const router = express.Router();
const Schema = require('mongoose');
const mongoose = require('mongoose');
const request = require('../../DBmodels/DBClient/Request')


// Route 1: to handle and save the data from the client into MONGODB

router.post('/service',async (req,res)=>{

    try{
     await request.create({
            name:req.body.name,
            mobileNumber:req.body.mobileNumber,
            Location:req.body.Location,
            Address:req.body.Address,
            ServiceDate:req.body.ServiceDate,
            ServiceType:req.body.ServiceType,
            SericeTime:req.body.ServiceTime
        })
        res.status(200).send({success:true,
            name:req.body.name,
            mobileNumber:req.body.mobileNumber,
            Location:req.body.Location,
            Address:req.body.Address,
            ServiceDate:req.body.ServiceDate,
            ServiceType:req.body.ServiceType,
            SericeTime:req.body.ServiceTime
        })
    }
    catch(error){
        res.send({message:'errors Occures Try Again'})
    }
})


module.exports = router;
