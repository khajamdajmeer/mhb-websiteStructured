
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwt_secret = process.env.REACT_JWT_TOKEN;
const mongoose = require('mongoose')
const EmplooyDB = require('../DBmodels/DBAdmin/NewEmplooyData');
const AdminDB = require('../DBmodels/DBAdmin/AdminSignup')


const FetchEmplooy = async (req,res,next)=>{
    const token = req.header('auth-token'); 
    if(!token){
        res.status(401).send({message:'invalid token'})
    }
    try{
        const data = jwt.verify(token,jwt_secret);
        req.user;
        req.name;
        if(data.isadmin){
            req.user=data.isadmin.id
            const isadmin = await AdminDB.findById(req.user);
            if(isadmin){
                req.name=isadmin.name
                next();
            }
            else{
                throw new Error();
            }
        }
        else if(data.user){

            req.user=data.user.id;
            req.authorization = data.user.authorization;
            const isvalid = await EmplooyDB.findById(req.user)
            if(req.authorization!='Technicain'&&isvalid){
                req.name = isvalid.name
                next();
            }
            else{
                throw new Error();
            }
        }
    }
    catch(error){
        res.status(401).send({error:"invalid token used"})
    }
}

module.exports = FetchEmplooy;