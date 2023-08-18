const mongoose = require('mongoose')
const express = require('express');
const FetchEmplooy = require('../../MiddleWare/FetchEmplooy');
const EmplooyDB = require('../../DBmodels/DBAdmin/NewEmplooyData');
const TechDB = require('../../DBmodels/DBTechnican/ProcessRequest')
const RequestDB = require('../../DBmodels/DBClient/Request')
const ManagerPushDB = require('../../DBmodels/DBManager/WaitingForPush')
const FinishedReqDB = require('../../DBmodels/DBAdmin/FinishedReq')
const DeletedReq_DB = require('../../DBmodels/DBAdmin/Deleted_Req')
const router = express.Router();

//ROUTE FOR THE MANAGER TO FETCH TECHNICIAN
router.get('/findtechnician', FetchEmplooy, async (req, res) => {
    try {
        const response = await EmplooyDB.find({ designation: 'Technician' })

        const data = await Promise.all(response.map(async (ele, index) => {
            const count = await TechDB.countDocuments({ 'Technicain.id': ele._id });
            return {
                _id: ele._id,
                name: ele.name,
                mobile:ele.mobilenumber,
                count: count
            };
        }));

        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({ message: 'Error occurred' })
    }
})

// ROUTE 2 FOR FOWARDING THE REQUEST TO SPECIFIC TECHNICIAN
router.post('/assign/:id',FetchEmplooy,async(req,res)=>{


    try{
    const data = await RequestDB.findById(req.params.id)
    const tid = req.body.tid;
    const managername = req.name;
    if(data){
        const create = await TechDB.create(
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
        },Technicain:{
            id:tid,
            name:null
        }
       
        
    }
        )
        if(create){
            await RequestDB.findByIdAndDelete(req.params.id)
            res.status(200).send({message:'forworded to technician succesfully',success:true})
        }
        
    }
    else{
        res.status(400).send({message:'Request not Found',success:false})
    }



    }catch(error){
        console.log(error)
        res.status(400).send({error})
    }
})

//ROUTE 3 FOR THE MANAGER TO VIEW TECH REQUEST BY THE TECHNICIANS ASSIGNED DATA
router.get('/viewtechreq',FetchEmplooy,async(req,res)=>{
    try{
        const response = await EmplooyDB.find({ designation: 'Technician' })

        const data = await Promise.all(response.map(async (ele, index) => {
            const count = await TechDB.find({ 'Technicain.id': ele._id,"forworded.id":req.user });
            return {
                _id: ele._id,
                name: ele.name,
                mobile:ele.mobilenumber,
                data: count
            };
        }));
        res.status(200).send({data:data,success:true})


    }catch(error){
        res.status(500).send({message:'error occured'})
    }

})


//ROUTER 4 FOR THE MANAGER TO REVIVE THE COMPLETED REQUEST BY THE TECHNICIAN
router.get('/reviewreq',FetchEmplooy,async(req,res)=>{
    try{
        const response = await EmplooyDB.find({ designation: 'Technician' })

        const data = await Promise.all(response.map(async (ele, index) => {
            const count = await ManagerPushDB.find({ 'Technicain.id': ele._id,"forworded.id":req.user });
            return {
                _id: ele._id,
                name: ele.name,
                mobile:ele.mobilenumber,
                data: count
            };
        }));
        res.status(200).send(data)


    }catch(error){
        res.status(500).send({message:'error occured'})
    }

})


//ROUTER 5 FOR THE MANAGER TO FINISH THE REQUEST AND SEND IT TO COMPLETED REQ DATABASE
router.post('/finishreq/:id',FetchEmplooy,async(req,res)=>{

    try{
        const reqid = req.params.id;
        const data = await ManagerPushDB.findById(reqid)
        // data.Discription = Discription
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
            Discription:data.Discription
        }


            const fdata = await FinishedReqDB.create(newdata)
            await ManagerPushDB.findByIdAndDelete(reqid)
            res.status(200).send({message:'Success',Success:true})

        
    }
    catch(error){
        console.log(error)
        res.status(500).send({message:'error occured',Success:false})
    }
})

//ROUTE 6 FOR THE MANAGER TO DELETE THE REQUEST BY WITH DISCRIPTION
router.delete('/delete/:id',FetchEmplooy,async(req,res)=>{
    try{
        const id = req.params.id
        const data = await TechDB.findById(id)
        if(data){
            const newdata ={
                name:data.name,
                mobileNumber:data.mobileNumber,
                mobilenumberString:data.mobilenumberString,
                Location:data.Location,
                Address:data.Address,
                Service:{type:data.Service.type
                          , Date:data.Service.Date  
                        },
                Technicain:{name:data.Technicain.name, id:data.Technicain.id},
                Requestdate:data.Requestdate,
                forworded:{name:data.forworded.name,id:data.forworded.id},
                Deleted:{reason:req.body.reason}
            };
           const push =  await DeletedReq_DB.create(newdata);
            await TechDB.findByIdAndDelete(id)
            res.status(200).send({message:'deleted succesfully',success:true})
        }else{
            res.status(200).send({message:'Request Details not found',success:false})

        }

    }catch(error){
        res.status(500).send({message:'error occured',success:false})
    }
})
//ROUTE 7 FOR THE MANAGER TO CHANGE THE REQ TO OTHER TECHNICIAN
router.put('/revert/:id',FetchEmplooy,async(req,res)=>{

    try{
        const rid = req.params.id;
        const data = await TechDB.findById(rid)
        if(data){
            const techchnician =await EmplooyDB.findById(req.body.id)
            const newdata ={Technicain:{id:req.body.id,name:techchnician.name}}
            await TechDB.findByIdAndUpdate(rid,{$set:newdata},{new:true})
            res.status(200).send({success:true,message:`Assigned to the ${techchnician.name}` })
        }else{
            res.status(200).send({success:false,message:'data not found! Please try again'})

        }

    }catch(error){
        console.log(error)
        res.status(500).send({message:'error occured',success:false})
    }

})


module.exports = router;
