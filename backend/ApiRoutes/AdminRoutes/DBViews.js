const mongoose = require('mongoose');
const express = require('express');
const FetchAdmin = require('../../MiddleWare/FetchAdmin');
const router = express.Router();
const clientDB = require('../../DBmodels/DBAdmin/FinishedReq')


router.get('/Customers',FetchAdmin,async(req,res)=>{

    try{
        const data = await clientDB.find({})
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




module.exports=router