const mongoose = require('mongoose')
const express = require('express')
const router = express.Router();
const techDB = require('../../DBmodels/DBTechnican/ProcessRequest')
const FetchEmplooy = require('../../MiddleWare/FetchEmplooy')
const RequestDb = require('../../DBmodels/DBClient/Request')





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
            const response = await RequestDb.find({
                name: { $regex: data, $options: 'i' }
            });
            res.status(200).send(response)

        }
        else if(type==='mobilenumber'){
            const response = await RequestDb.find({
                mobilenumberString: { $regex: data, $options: 'i' }
            });
            res.status(200).send(response)
        }

    }catch(error){
        console.log(error)
        res.status(400).send(error)

    }

})


module.exports = router
