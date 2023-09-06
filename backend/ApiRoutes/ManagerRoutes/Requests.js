const mongoose = require('mongoose')
const express = require('express')
const router = express.Router();
const RequestDB = require('../../DBmodels/DBClient/Request');
const FetchEmplooy = require('../../MiddleWare/FetchEmplooy');
const techDB = require('../../DBmodels/DBTechnican/ProcessRequest');
const NewEmplooyData = require('../../DBmodels/DBAdmin/NewEmplooyData');
const InqueryDB = require('../../DBmodels/DBAdmin/InqueryDB');



const nowdate = Date();
const changeformat = new Date(nowdate);
const year = changeformat.getFullYear();
const month = String(changeformat.getMonth()+1).padStart(2,'0');
const day =String(changeformat.getDate()).padStart(2,'0');
const todaydate= `${year}-${month}-${day}`

// ROUTE 1 FOR THE MANAGER FOR VIEWING THE REQUEST
router.get('/requests',FetchEmplooy,async(req,res)=>{


    try{
        if(req.authorization!='Technicain'){
            const data = await RequestDB.find({});
            res.status(200).send(data)
        }
       else{
        return res.status(401).send({message:'unauthorized request'})
       }

    }catch(error){
        res.status(500).send({message:'error occured'})
    }
})
// ROUTE 2 FOR VIEWING THE INDVIDUEL DATA BY THE MANAGER
router.get('/requests/:id',FetchEmplooy,async(req,res)=>{


    try{
        const id = req.params.id;
        const data = await RequestDB.findById(id);
        if(!data){
            return res.status(500).send({message:'req data not found'})
        }
        res.status(200).send(data)
       

    }catch(error){
        res.status(500).send({error:'unknown error occured'})
    }

})
//ROUTE 3 FOR UPDATING THE DATA BY THE MANAGER
router.put('/requests/update/:id',FetchEmplooy,async(req,res)=>{


    try{
        const newdata = {}
    if(req.body.name){newdata.name=req.body.name}
    if(req.body.Location){newdata.Location=req.body.Location}
    if(req.body.Address){newdata.Address=req.body.Address}
    if(req.body.ServiceDate){newdata.ServiceDate=req.body.ServiceDate}
    if(req.body.ServiceTime){newdata.ServiceTime=req.body.ServiceTime}
    if(req.body.ServiceType){newdata.ServiceType=req.body.ServiceType}
    if(req.body.Note){newdata.Note=req.body.Note}
    const id = req.params.id
    const update = await RequestDB.findByIdAndUpdate(id,{$set:newdata},{new:true})
    res.status(200).send({success:true,update});

    }catch(error){
        // console.log(error)
        res.status(500).send({error:'error occured'})
    }
})

//ROUTER 4 FOR THE MANAGER TO FORWORD THE DATA TO THE TECHNICIAN
router.post('/forword/:id',FetchEmplooy,async(req,res)=>{

    try{
        
        const managername = req.name;
        const data = await RequestDB.findById(req.params.id)
     

        if(data){
            const create = await techDB.create(
              {  name:data.name,
            mobileNumber:data.mobileNumber,
            mobilenumberString:data.mobilenumberString,
            Location:data.Location,
            Address:data.Address,
            Requestdate:data.Requestdate,
            Service:{
                type:data.ServiceType,
                Date:data.ServiceDate,
                Time:data.ServiceTime

            },
            forworded:{
                name:managername,
                id:req.user
            }
           
            
        }
            )
            if(create){
                await RequestDB.findByIdAndDelete(req.params.id)
                res.status(200).send({message:'forworded to technician succesfully'})
            }
            
        }
       

    }catch(error){
        res.status(500).send({error:'error occured'})
    }

})

router.get('/techrequests',FetchEmplooy,async(req,res)=>{
    try{
        if(req.authorization!='Technicain'){
            const data = await techDB.find({});
            res.status(200).send(data)
        }
       else{
        return res.status(401).send({message:'unauthorized request'})
       }


    }catch(error){
        res.status(400).send({error:'error occured',error})
    }
})

//Router for the manager to make some req pending on his name without assigning to the techniche
router.post('/pending/:id',FetchEmplooy,async(req,res)=>{
    try{
        const managername = req.name;
        const data = await RequestDB.findById(req.params.id)
        if(data){
            const create = await techDB.create(
              {  name:data.name,
            mobileNumber:data.mobileNumber,
            mobilenumberString:data.mobilenumberString,
            Location:data.Location,
            Address:data.Address,
            Service:{
                type:data.ServiceType,
                Date:data.ServiceDate,
                Time:data.ServiceTime

            },
            forworded:{
                name:managername,
                id:req.user
            },
            Note:data.Note
           
            
        }
            )
            if(create){
                await RequestDB.findByIdAndDelete(req.params.id)
                res.status(200).send({message:'is Pending for forword',success:true})
            }
            
        }
       

    }catch(error){
        res.status(500).send({error:'error occured'})
    }

})

//ROUTE FOR THE MANAGER TO GET HIS PENDING DATA
router.get('/pendingdata',FetchEmplooy,async(req,res)=>{
    try{
        if(req.authorization!='Technicain'){
            const data = await techDB.find({'forworded.id':req.user,'Technicain.id':null});
            res.status(200).send(data)
        }
       else{
        return res.status(401).send({message:'unauthorized request'})
       }
    }catch(error){
        res.status(400).send({error:'error occured',error})
    }
})


//ROUTER FOR THE MANAGER TO FORWORD TECH REQ TO A TECHNICIAN
router.post('/pendingforword/:id',FetchEmplooy,async(req,res)=>{
    try{
        const data = techDB.findById(req.params.id);
        if(data){
            const newdata ={}
            if(req.body.tid){
                newdata.Technicain={id:req.body.tid}}
            if(req.body.Note){
                    newdata.Note=req.body.Note;
                }
                const update = await techDB.findByIdAndUpdate(req.params.id,{$set:newdata},{new:true})
                res.status(200).send({message:'forworded Success',success:true})
        }

    }catch(err){
        console.error(err)
        res.status(500).send({message:'error occured',success:false})
    }
})


//ROUTER FOR THE MANAGER TO CREATE A NEW REQUEST AND SEND IT TO THE PENDING
router.post('/createpending',FetchEmplooy,async(req,res)=>{

    try{
        const managername = req.name;
        const data = req.body.data
       await techDB.create(
            {  name:data.name,
          mobileNumber:data.mobileNumber,
          mobilenumberString:data.mobileNumber,
          Location:data.Location,
          Address:data.Address,
          
          Service:{
              type:data.ServiceType,
              Date:data.ServiceDate,
              Time:data.ServiceTime

          },
          forworded:{
              name:managername,
              id:req.user
          },
          Note:data.Note
        
          
      })
            
        res.status(200).send({message:'Req Created Succeffuly and IN pending State',success:true})
           
            
       

    }catch(error){
        res.status(500).send({error:'error occured',success:false})
    }
})
router.post('/createforword',FetchEmplooy,async(req,res)=>{

    try{
        const managername = req.name;
        const data = req.body.data;
        const tech = await NewEmplooyData.findById(data.Technicainid);
       await techDB.create(
            {  name:data.name,
          mobileNumber:data.mobileNumber,
          mobilenumberString:data.mobileNumber,
          Location:data.Location,
          Address:data.Address,
          
          Service:{
              type:data.ServiceType,
              Date:data.ServiceDate,
              Time:data.ServiceTime

          },
          forworded:{
              name:managername,
              id:req.user
          },Technicain:{
            id:data.Technicianid,
            name:tech.name
          },
          Note:data.Note
        
          
      })
            
        res.status(200).send({message:'Req Created Succefully and Forworded',success:true})
           
            
       

    }catch(error){
        res.status(500).send({error:'error occured',success:false})
    }
})

router.post('/acceptfortech/:id',FetchEmplooy,async(req,res)=>{
    try{
        const change = {Accepted:true};
        const data = await techDB.findByIdAndUpdate(req.params.id,{$set:change},{new:true})
        res.status(200).send({message:'Accepted the req',success:true})

    }catch(error){
        console.error(error)
        res.status(500).send({message:'error occured',success:false})
    }
})

//Router For the Manager to Create any Inquerys for data
router.post('/inqueryrequest',FetchEmplooy,async(req,res)=>{
    try{
        const data = req.body;
        const {name,mobileNumber,Location,Address,Note}=req.body;
        const finddata = await InqueryDB.findOne({mobileNumber:mobileNumber})
        if(finddata){
            await InqueryDB.findByIdAndUpdate(finddata._id,{$push:{Manager:{id:req.user,name:req.name},Note:Note,CallDate:todaydate},$set:{LastCallDate:todaydate}},{new:true})
        }else{
            await InqueryDB.create({
                name:name,
                mobileNumber:mobileNumber,
                mobileNumberString:mobileNumber,
                Location:Location,
                Address:Address,
                Manager:{id:req.user,name:req.name},
                Note:Note,
                CallDate:todaydate,
                LastCallDate:todaydate
            })
        }
        
        res.status(200).send({message:'Submit Successfull',success:true})

    }catch(error){
        res.status(500).send({message:'error occured please Try again',success:false})
    }
})

module.exports = router
