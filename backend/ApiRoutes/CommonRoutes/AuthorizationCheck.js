
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwt_secret = process.env.REACT_JWT_TOKEN;
const EmplooyDB = require('../../DBmodels/DBAdmin/NewEmplooyData')

//checking emplooy authorization 
 router.get('/technician',async(req,res)=>{

    try{
        const token = req.header('auth-token');
        if(!token){
            res.status(404).send({message:'please login to continue'})
        }
        else{
            const data = jwt.verify(token,jwt_secret)
        const user=data.user.id;
        const authorization = data.user.authorization;
        const isvalid = await EmplooyDB.findById(user)
        const name = isvalid.name
        if(authorization=='technician'&&isvalid){
                res.status(200).send({name:name})
        }
        else{
            res.status(404).send({message:'unauthorized user'})
        }

        }


    }
    catch(error){
        res.status(500).send({message:'error occured'})
    }
 })



module.exports=router
