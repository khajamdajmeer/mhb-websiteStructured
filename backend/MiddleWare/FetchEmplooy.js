
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwt_secret = process.env.REACT_JWT_TOKEN;
const mongoose = require('mongoose')
const EmplooyDB = require('../DBmodels/DBAdmin/NewEmplooyData')

const FetchEmplooy = async (req,res,next)=>{
    const token = req.header('auth-token'); 
    if(!token){
        res.status(401).send({message:'invalid token'})
    }
    try{
        const data = jwt.verify(token,jwt_secret)
        req.user=data.user.id;
        req.authorization = data.user.authorization;
        const isvalid = await EmplooyDB.findById(req.user)
        req.name = isvalid.name
        if(req.authorization!='Technicain'&&isvalid){
            next();
        }
        else{
            throw new Error();
        }
    }
    catch(error){
        res.status(401).send({error:"invalid token used"})
    }
}

module.exports = FetchEmplooy;