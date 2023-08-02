
const express = require('express');
const router = express.Router();
const FetchAdmin = require('../../MiddleWare/FetchAdmin');
const AdminDB = require("../../DBmodels/DBAdmin/AdminSignup");
const RequestDB = require("../../DBmodels/DBClient/Request");
const mongoose = require('mongoose')


// ROUTE 1 : FOR VIEWING CLIENT REQUESTS FOR TEH ADMIN

router.get('/requests',FetchAdmin,async(req,res)=>{

    const requests = await RequestDB.find({})
    res.status(200).send(requests);
})

// ROUTE 2 : FOR VIEWING INDIVIDUAL REQUESTS FOR THE ADMIN

router.get('/requests/:id',FetchAdmin,async(req,res)=>{


    try{
        const reqid = new mongoose.Types.ObjectId(req.params.id);
        let data = await RequestDB.findOne({_id:reqid});
        if(data){
            return res.status(200).send(data)
        }
        else{
            return res.status(500).send({message:'Request does not Exists'})
        }

    }catch(error){
        res.status(400).send({message:'and internal error occured'})
    }
})


// ROUTE 3 : FOR UPDATING INDIVIDUAL REQUEST FOR THE ADMIN

router.put('/requests/update/:id',FetchAdmin,async(req,res)=>{

    const {name,Location,Address,ServiceDate,ServiceTime,ServiceType} = req.body;
    const newdata = {}
    if(name){newdata.name=name}
    if(Location){newdata.Location=Location}
    if(Address){newdata.Address=Address}
    if(ServiceDate){newdata.ServiceDate=ServiceDate}
    if(ServiceTime){newdata.ServiceTime=ServiceTime}
    if(ServiceType){newdata.ServicType=ServiceType}

    try{
        const id = new mongoose.Types.ObjectId(req.params.id);
        let update = await RequestDB.findByIdAndUpdate(id,{$set:newdata},{new:true});
        res.status(200).send(update)
    }
    catch(error){
        res.status(500).send({message:"error occured "})

    }



})



module.exports = router;