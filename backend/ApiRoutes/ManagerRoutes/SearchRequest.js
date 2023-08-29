const mongoose = require('mongoose')
const express = require('express')
const router = express.Router();
const techDB = require('../../DBmodels/DBTechnican/ProcessRequest')
const FetchEmplooy = require('../../MiddleWare/FetchEmplooy')
const RequestDb = require('../../DBmodels/DBClient/Request')
const ClientDB = require('../../DBmodels/DBAdmin/ClientDB')
const FinishedReq = require('../../DBmodels/DBAdmin/FinishedReq')





//Route 1: for teh manager to search by mobilenumber and name in techDB
router.post('/techdata',FetchEmplooy,async(req,res)=>{

    try{
        const {type,data}=req.body
        if(type==='name'){
            const response = await techDB.find({
                name: { $regex: data, $options: 'i' }
            });
            res.status(200).send(response)

        }
        else if(type==='mobilenumber'){
            const response = await techDB.find({
                mobilenumberString: { $regex: data, $options: 'i' }
            });
            res.status(200).send(response)
        }

    }catch(error){
        console.log(error)
        res.status(400).send(error)

    }

})


//Route 2 : for seraching the data in request database

router.post('/requests',FetchEmplooy,async(req,res)=>{


    try{
        const {type,data}=req.body
        if(type==='name'){
            const response = await ClientDB.find({
                name: { $regex: data, $options: 'i' }
            });
            res.status(200).send({message:response,success:true})

        }
        else if(type==='mobile'){
            const response = await ClientDB.find({
                mobilenumberString: { $regex: data, $options: 'i' }
            });
            res.status(200).send({message:response,success:true})
        }

    }catch(error){
        console.log(error)
        res.status(400).send({message:" Error Occured Please try again",success:false})

    }

})
//Route 3 : FOR THE MANAGER TO GET THE HISTORY OF THE CLIENT
router.post('/gethistory',FetchEmplooy,async(req,res)=>{
    try{
        const id =  new mongoose.Types.ObjectId(req.body.id)
        const data = await FinishedReq.find({cid:id})
        if(data.length>0){
            res.status(200).send({message:data,success:true})
        }else{
            res.status(200).send({message:'No data to Show',success:false})
        }

    }catch(error){
        res.status(500).send({message:'error occured',success:false})
    }
})

module.exports = router
