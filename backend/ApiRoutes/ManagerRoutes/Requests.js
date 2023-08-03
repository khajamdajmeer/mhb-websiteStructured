const mongoose = require('mongoose')
const express = require('express')
const router = express.Router();
const RequestDB = require('../../DBmodels/DBClient/Request');
const FetchEmplooy = require('../../MiddleWare/FetchEmplooy');
const techDB = require('../../DBmodels/DBTechnican/ProcessRequest');


// ROUTE 1 FOR THE MANAGER FOR VIEWING THE REQUEST
router.get('/requests',FetchEmplooy,async(req,res)=>{


    try{
        if(req.authorization!='technicain'){
            const data = await RequestDB.find({});
            res.status(200).send(data)
        }
       else{
        return res.status(401).send({message:'unauthorized request'})
       }

    }catch(error){
        res.status(500).send({message:'error occured'})
    }
})
// ROUTE 2 FOR VIEWING THE INDVIDUEL DATA BY THE MANAGER
router.get('/requests/:id',FetchEmplooy,async(req,res)=>{


    try{
        const id = req.params.id;
        const data = await RequestDB.findById(id);
        if(!data){
            return res.status(500).send({message:'req data not found'})
        }
        res.status(200).send(data)
       

    }catch(error){
        res.status(500).send({error:'unknown error occured'})
    }

})
//ROUTE 3 FOR UPDATING THE DATA BY THE MANAGER
router.put('/requests/update/:id',FetchEmplooy,async(req,res)=>{


    try{
        const newdata = {}
    if(req.body.name){newdata.name=req.body.name}
    if(req.body.Location){newdata.Location=req.body.Location}
    if(req.body.Address){newdata.Address=req.body.Address}
    if(req.body.ServiceDate){newdata.ServiceDate=req.body.ServiceDate}
    if(req.body.ServiceTime){newdata.ServiceTime=req.body.ServiceTime}
    if(req.body.ServiceType){newdata.ServicType=req.body.ServiceType}
    const id = req.params.id
    const update = await RequestDB.findByIdAndUpdate(id,{$set:newdata},{new:true})
    res.status(200).send(update);

    }catch(error){
        console.log(error)
        res.status(500).send({error:'error occured'})
    }
})

//ROUTER 4 FOR THE MANAGER TO FORWORD THE DATA TO THE TECHNICIAN
router.post('/forword/:id',FetchEmplooy,async(req,res)=>{

    try{

        const managername = req.name;
        const data = await RequestDB.findById(req.params.id)
        if(data){
            const create = await techDB.create(
              {  name:data.name,
            mobileNumber:data.mobileNumber,
            Location:data.Location,
            Address:data.Address,
            ServiceDate:data.ServiceDate,
            ServiceType:data.ServiceType,
            ForwordedBy:managername
        }
            )
            if(create){
                await RequestDB.findByIdAndDelete(req.params.id)
                res.status(200).send({message:'forworded to technician succesfully'})
            }
            
        }
       

    }catch(error){
        res.status(500).send({error:'error occured'})
    }

})




module.exports = router
