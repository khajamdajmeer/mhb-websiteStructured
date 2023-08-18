
const jwt = require('jsonwebtoken');
const express = require('express')
const router = express.Router();
require('dotenv').config();
const JWT_SECRET = process.env.REACT_JWT_TOKEN;
const AdminDB = require('../../DBmodels/DBAdmin/AdminSignup')
const mongoose = require('mongoose')


router.get('/authorize',async(req,res)=>{
    const token = req.header('auth-token');
    if(!token){
       return res.status(401).send({message:"unAuthorized User 1",validation:false})
    }
    try{
        const data = jwt.verify(token,JWT_SECRET);
        // console.log(data)
        req.user = data.isadmin.id;
        const isvalid = await AdminDB.findById(req.user)
        if(isvalid){
        return res.status(200).send({message:`welcome ${isvalid.name}`,validation:true})
        }
        else{
            return res.status(401).send({message:"invalid Credentials ",validation:false})
        }
    }
    catch(error){
        res.status(401).send({message:'error occured',...error})
     }
})


module.exports = router;