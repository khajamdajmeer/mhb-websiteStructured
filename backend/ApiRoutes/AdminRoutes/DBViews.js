const mongoose = require('mongoose');
const express = require('express');
const FetchAdmin = require('../../MiddleWare/FetchAdmin');
const router = express.Router();
const onlineclientDB = require('../../DBmodels/DBAdmin/FinishedReq')
const ReqDb = require('../../DBmodels/DBClient/Request')
const cusotmer = require('../../DBmodels/DBAdmin/ClientDB');
const ClientDB = require('../../DBmodels/DBAdmin/ClientDB');
const DeletedDb = require('../../DBmodels/DBAdmin/Deleted_Req');
const InqueryDB = require('../../DBmodels/DBAdmin/InqueryDB');
const EmplooyDB = require('../../DBmodels/DBAdmin/NewEmplooyData')


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


    //ROUTE FOR THE ADMIN TO ACCESS THE INQUERY DATA
    router.get('/db/inquery',FetchAdmin,async(req,res)=>{
        try{
            const data  = await InqueryDB.find({});
        if(data.length>0){
            res.status(200).send({message:data,success:true})
        }else{
            res.status(200).send({message:'No data to Show',success:false})
        }

        }catch(error){
            res.status(500).send({message:'Error Occured Please Try Again',success:false})
        }
    })



    //router for the admin to create a new customer
    // without any involment in online just pushing customers data to the completed database

    router.post('/createcustomer',FetchAdmin,async(req,res)=>{

        try{
            const data = req.body;
            const customer = await ClientDB.findOne({mobileNumber:data.mobileNumber})
            if(customer){
                const technician = await EmplooyDB.findById(data.Technicain.id)
                const newdata = {
                    cid:customer._id,
                    name:data.name,
                    mobileNumber:data.mobileNumber,
                    mobilenumberString:data.mobilenumberString,
                    Location:data.Location,
                    Address:data.Address,
                    Service:{
                        type:data.Service.type,
                        Date:data.Service.Date
                    },
                    Technicain:{
                        name:data.Technicain.name,
                        id:req.user
                        
                    },
                    Requestdate:data.Service.Date
                    ,
                    forworded:{
                        name:'admin',
                        id:req.user
                    },
                    Discription:req.body.Discription
                }
                
                const fdata = await onlineclientDB.create(newdata)
                await InqueryDB.deleteMany({mobileNumber:data.mobileNumber})
                res.status(200).send({message:'Success',Success:true})
    
            }else{
                const cid = await ClientDB.create({name:data.name,mobileNumber:data.mobileNumber,mobilenumberString:data.mobileNumber})
                const technician = await EmplooyDB.findById(data.Technicain.id)
                const newdata = {
                    cid:cid._id,
                    name:data.name,
                    mobileNumber:data.mobileNumber,
                    mobilenumberString:data.mobilenumberString,
                    Location:data.Location,
                    Address:data.Address,
                    Service:{
                        type:data.Service.type,
                        Date:data.Service.Date
                    },
                    Technicain:{
                        name:technician.name,
                        id:data.Technicain.id
                    },
                    Requestdate:data.Requestdate,
                    forworded:{
                        name:data.forworded.name,
                        id:data.forworded.id
                    },
                    Discription:req.body.Discription
                }
    
                const fdata = await onlineclientDB.create(newdata);
                await InqueryDB.deleteMany({mobileNumber:data.mobileNumber})
                res.status(200).send({message:'Success',Success:true})
            }
           
                 
    
    
                
    
            
        }
        catch(error){
            console.log(error)
            res.status(500).send({message:'error occured',Success:false})
        }
    })

module.exports=router