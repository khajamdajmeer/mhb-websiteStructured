const mongoose = require('mongoose');
const express = require('express');
const FetchAdmin = require('../../MiddleWare/FetchAdmin');
const router = express.Router();
const onlineclientDB = require('../../DBmodels/DBAdmin/FinishedReq')
const ReqDb = require('../../DBmodels/DBClient/Request')
const cusotmer = require('../../DBmodels/DBAdmin/ClientDB');
// const ClientDB = require('../../DBmodels/DBAdmin/ClientDB');
const DeletedDb = require('../../DBmodels/DBAdmin/Deleted_Req');


router.get('/Customers',FetchAdmin,async(req,res)=>{

    try{
        const data = await onlineclientDB.find({})
        if(data.length>0){
            res.status(200).send({message:data,success:true})
        }else{
            res.status(200).send({message:'No data to Show',success:false})
        }
    }
    catch(error){
        console.log('Error:',error)
        res.status(200).send({message:'Error occured Please try again',success:false})
    }

})

/// ROUTE FOR THE ADMIN TO VIEW THE REQEST DATABASE
router.get('/db/requests',FetchAdmin,async(req,res)=>{
    try{
        const data = await ReqDb.find({});
        if(data.length>0){
            res.status(200).send({message:data,success:true})
        }else{
            res.status(200).send({message:'No data to Show',success:false})
        }
    }catch(error){
        console.log('Error:',error)
        res.status(500).send({message:'error occured',success:false})
    }
})

///ROUTE FOR THE ADMIN TO VIEW THE CLIENTS DATABASE
router.get('/db/Clients',FetchAdmin,async(req,res)=>{
    try{
        const data = await cusotmer.find({});
        if(data.length>0){
            res.status(200).send({message:data,success:true})
        }else{
            res.status(200).send({message:'No data to Show',success:false})
        }
    }catch(error){
        console.log('Error:',error)
        res.status(500).send({message:'error occured',success:false})
    }
})

router.get('/db/client/:id',FetchAdmin,async(req,res)=>{
    try{
        const id =  new mongoose.Types.ObjectId(req.params.id)
        const data  = await onlineclientDB.find({cid:id})
        if(data.length>0){
            res.status(200).send({message:data,success:true})
        }else{
            res.status(200).send({message:'No data to Show',success:false})
        }

    }catch(err){
        console.log(err);
        res.status(500).send({message:'error occured',success:false})
    }
})

router.get('/db/deleted',FetchAdmin,async(req,res)=>{
    try{
        const data = await DeletedDb.find({});
        if(data.length>0){
            res.status(200).send({message:data,success:true})
        }else{
            res.status(200).send({message:'No data to Show',success:false})
        }
    }catch(error){
        console.log('Error:',error)
        res.status(500).send({message:'error occured',success:false})
    }
})


module.exports=router