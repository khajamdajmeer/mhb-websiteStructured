
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.REACT_JWT_TOKEN;
const AdminDB = require('../DBmodels/DBAdmin/AdminSignup')
const mongoose = require('mongoose')
const FetchAdmin = async(req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
       return res.status(401).send({message:"Token Doesn't exists"})
    }
    try{
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.isadmin.id;
        const isvalid = await AdminDB.findById(req.user)
        if(isvalid){
            next();
        }
        else{
       return res.status(401).send({message:"user does not exists"})

        }
    }
    catch(error){
        res.status(401).send({message:'error occured',...error})
     }
}

module.exports = FetchAdmin;