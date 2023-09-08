const mongoose = require('mongoose')
const express = require('express');
const FetchEmplooy = require('../../MiddleWare/FetchEmplooy');
const router = express.Router();
const techDB = require('../../DBmodels/DBTechnican/ProcessRequest')
const ClientDB = require('../../DBmodels/DBAdmin/FinishedReq');
const employ_db = require('../../DBmodels/DBAdmin/NewEmplooyData')
const { findByIdAndDelete } = require('../../DBmodels/DBAdmin/NewEmplooyData');
const ManagerPushDB = require('../../DBmodels/DBManager/WaitingForPush')



// route 1 for the technician to accept the request
router.post('/viewtechRequest',FetchEmplooy,async(req,res)=>{

    try{
        if(req.authorization==='Technician'){
            const data = await techDB.find({"Technicain.name":null})
            const extractdata = data.map(item=>{
                return{
                    name:item.name,
                    Location:item.Location,
                    Address:item.Address.replace(/\n/g,' '),
                    _id:item._id
                }
            })
            res.status(200).send(extractdata);

        }
        else{
            return res.status(401).send({message:'unauthorized request'})
           }

    }
    catch(error){
        res.status(500).send({message:'error occured'})


    }
})



router.post('/acceptreq/:id',FetchEmplooy,async(req,res)=>{


    try{
        if(req.authorization==='Technician'){
            const rid =  req.params.id;
        const emplooyname = req.name;
        const emplooyid = req.user;
        const newdata = {Technicain:{name:emplooyname,id:emplooyid},Accepted:true}
        const updatedata = await techDB.findByIdAndUpdate(rid,{$set:newdata},{new:true})
        res.status(200).send({message:'Accepted the Request',name:req.name})  

        }
        else{
            return res.status(401).send({message:'unauthorized request'})
           }
       


    }
    catch(error){
        res.status(500).send({message:'error occured'})

    }
})


router.get('/viewmyreq',FetchEmplooy,async(req,res)=>{

try{
    if(req.authorization==='Technician'){
        
    const emplooyid = req.user;
    const data = await techDB.find({"Technicain.id":emplooyid})
    res.status(200).send(data)  
    }
    else{
        return res.status(401).send({message:'unauthorized request'})
       }
}
catch(error){
    res.status(500).send({message:'error occured'})
}
})

router.post('/completedreq/:id',FetchEmplooy,async(req,res)=>{

    try{
        
        // const emplooyid = req.user;
        const reqid = req.params.id;
        const Discription = req.body.discription;
        const data = await techDB.findById( reqid )
        const newdata = {
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
                id:data.Technicain.id
            },
            Requestdate:data.Requestdate,
            forworded:{
                name:data.forworded.name,
                id:data.forworded.id
            },
            Discription:Discription
        }
            const fdata = await ManagerPushDB.create(newdata)
           const ddata= await techDB.findByIdAndDelete(reqid)
            res.status(200).send({message:'Success',Success:true})
    }
    catch(error){
        console.log(error)
        res.status(500).send({message:'error occured',Success:false})
    }
})

module.exports = router
