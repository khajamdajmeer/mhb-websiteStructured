const express = require('express');
const FetchAdmin = require('../../MiddleWare/FetchAdmin');
const FinishDB = require('../../DBmodels/DBAdmin/FinishedReq')
const EmplooyDB = require('../../DBmodels/DBAdmin/NewEmplooyData')
const Tech_Process_DB = require('../../DBmodels/DBTechnican/ProcessRequest');
const Complain_DB = require('../../DBmodels/DBTechnican/Complain');
const taskDB = require('../../DBmodels/DBManager/Tasks');
const DeletedDb = require('../../DBmodels/DBAdmin/Deleted_Req');


const { finished } = require('stream');
const InqueryDB = require('../../DBmodels/DBAdmin/InqueryDB');
const router = express.Router();

//ROUTE FOR THE ADMIN TO GET COUNT OF THE MANAGERS WORK PROGRESS

router.get('/reqcount/:id',FetchAdmin,async(req,res)=>{

    try{
        const emplooy = await EmplooyDB.findById(req.params.id);
        if(emplooy){
          var TodayDate = new Date();
          var getMonth = (TodayDate.getMonth()+1).toString().padStart(2,'0');

          var formatTodayDate = TodayDate.getFullYear() +'-'+getMonth+'-'+TodayDate.getDate();

          var ThisMonth = TodayDate.getFullYear()+'-'+getMonth

            if(emplooy.designation==='Manager'){
                const data = await FinishDB.find({'forworded.id':req.params.id})
                const manager= await EmplooyDB.find({designation:'Technician'})

                const val = manager.map((ele) => {
                    const newObj = {};
                    newObj[ele.name] = 0;
                    return newObj;
                  });
                  data.forEach((item) => {
                    const matchingVal = val.find((valItem) => Object.keys(valItem)[0] === item.Technicain.name);
                    if (matchingVal) {
                      matchingVal[item.Technicain.name]++;
                    }
                  });
                  //for geting the count for this month
                  let mtcount = 0;
                  const findmt = manager.map((ele)=>{
                    const mtobj ={};
                    mtobj[ele.name]=0;
                    return mtobj
                  })
                  data.forEach((item)=>{
                    var matchval = findmt.find((valItem)=>{
                   return  ( Object.keys(valItem)[0] === item.Technicain.name && 
                      item.Service.Delivery.getFullYear() === new Date().getFullYear() &&
                      item.Service.Delivery.getMonth() ===new Date().getMonth()) 
                    })

                    if(matchval){
                      matchval[item.Technicain.name]++;
                      mtcount++;
                    }
                  })


                  //for geting the count for every day
                  let tdycount =0;
                  const findtdy=manager.map((ele)=>{
                    const mtobj ={};
                    mtobj[ele.name]=0;
                    return mtobj
                  })
                  data.forEach((item)=>{
                    var matchval = findtdy.find((valItem)=>{
                   return  ( Object.keys(valItem)[0] === item.Technicain.name && 
                      item.Service.Delivery.getFullYear() === new Date().getFullYear() &&
                      item.Service.Delivery.getMonth() ===new Date().getMonth()&&item.Service.Delivery.getDate()===new Date().getDate()) 
                    })

                    if(matchval){
                      matchval[item.Technicain.name]++;
                      tdycount++;
                    }
                  })

                  const full ={Total:{
                                      fullcount:data.length,
                                      Count:val
                                    },
                                Thismonth:{
                                      fullcount:mtcount,
                                      Count:findmt
                                    },
                                Today:{
                                      fullcount:tdycount,
                                      Count:findtdy
                                    }}
                

                res.status(200).send({data:full,success:true})

            }
            else{
                const data = await FinishDB.find({'Technicain.id':req.params.id})
                const manager= await EmplooyDB.find({designation:'Manager'})
                const val = manager.map((ele) => {
                  const newObj = {};
                  newObj[ele.name] = 0;
                  return newObj;
                });
                data.forEach((item) => {
                  const matchingVal = val.find((valItem) => Object.keys(valItem)[0] === item.forworded.name);
                  if (matchingVal) {
                    matchingVal[item.forworded.name]++;
                  }
                });
                //for geting the count for this month
                let mtcount = 0;
                const findmt = manager.map((ele)=>{
                  const mtobj ={};
                  mtobj[ele.name]=0;
                  return mtobj
                })
                data.forEach((item)=>{
                  var matchval = findmt.find((valItem)=>{
                 return  ( Object.keys(valItem)[0] === item.forworded.name && 
                    item.Service.Delivery.getFullYear() === new Date().getFullYear() &&
                    item.Service.Delivery.getMonth() ===new Date().getMonth()) 
                  })

                  if(matchval){
                    matchval[item.forworded.name]++;
                    mtcount++;
                  }
                })


                //for geting the count for every day
                let tdycount =0;
                const findtdy=manager.map((ele)=>{
                  const mtobj ={};
                  mtobj[ele.name]=0;
                  return mtobj
                })
                data.forEach((item)=>{
                  var matchval = findtdy.find((valItem)=>{
                 return  ( Object.keys(valItem)[0] === item.forworded.name && 
                    item.Service.Delivery.getFullYear() === new Date().getFullYear() &&
                    item.Service.Delivery.getMonth() ===new Date().getMonth()&&item.Service.Delivery.getDate()===new Date().getDate()) 
                  })

                  if(matchval){
                    matchval[item.forworded.name]++;
                    tdycount++;
                  }
                })

                const full ={Total:{
                                    fullcount:data.length,
                                    Count:val
                                  },
                              Thismonth:{
                                    fullcount:mtcount,
                                    Count:findmt
                                  },
                              Today:{
                                    fullcount:tdycount,
                                    Count:findtdy
                                  }}
              

              res.status(200).send({data:full,success:true})

            }



        }
        else{

            res.status(400).send({message:'data not found',success:false})
        }
        

    }catch(error){
      console.log(error);
        res.status(500).send({message:'error occured Please try again',success:false})
    }


})
//ROUTE FOR THE ADIMN TO CREATE COMPLAIN FROM THE PRESENT FINISHED DB
router.post('/complain/:id',FetchAdmin,async(req,res)=>{
  try{
    const findingdata = await FinishDB.findById(req.params.id);
    if(findingdata){
         const createComplain = await Complain_DB.create(
       { name:findingdata.name,
        mobileNumber:findingdata.mobileNumber,
       mobilenumberString: findingdata.mobilenumberString,
        Location:findingdata.Location, 
        Address:findingdata.Address,
        Service:{
          type:findingdata.Service.type,
       Date: findingdata.Service.Date },
       Technicain:{ name: findingdata.Technicain.name,
        id:findingdata.Technicain.id },
        Requestdate:findingdata.Requestdate,
        forworded:{name:findingdata.forworded.name,
       id: findingdata.forworded.id},
       Discription:findingdata.Discription,
      complain:req.body.complain}
      )
      res.status(200).send({createComplain})
    }
    else{

      res.status(200).send({message:'data not found'})
    }
    

  }catch(error){
    console.error('error:',error)
    res.status(500).send({message:'error Occured try again',success:false})
  }
})

//FOR THE ADMIN TO GET THE LIST FOR WORK DONE BY EACH EMPLOY
router.get('/getdetails/:id',FetchAdmin,async(req,res)=>{
  const emplooy = await EmplooyDB.findById(req.params.id);
  if(emplooy){
      if(emplooy.designation==='Manager'){
          const data = await FinishDB.find({'forworded.id':req.params.id,'Technicain.id':{ $ne: null }})
          res.status(200).send({data:data,success:true})
      }
      else{
          const data = await FinishDB.find({'Technicain.id':req.params.id})
        res.status(200).send({data:data,success:true})
      }
  }
  else{
      res.status(400).send({message:'data not found',success:false})
  }
})

//ROUTE FOR THE ADMIN TO GET THE LIST TASKS COMPLETED BY THE MANAGER
router.get('/getcompleteTasks/:id',FetchAdmin,async(req,res)=>{
  const emplooy = await EmplooyDB.findById(req.params.id);
  if(emplooy){
      if(emplooy.designation==='Manager'){
        const data = await taskDB.find({'Manager.id':req.params.id,'finished.yes':true});
        if(data.length>0){
      res.status(200).send({message:data,success:true})
        }
        else{
          res.status(200).send({message:'data not  found',success:false})
        }
      }
      else{
      res.status(200).send({message:'data not found',success:false})
      }
  }
  else{
      res.status(400).send({message:'data not found',success:false})
  }
})


//ROUTE FOR THE ADMIN TO GET THE PENDING SERVICE REQUESTS OF THE EMPLOOY

router.get('/pendingtechreq/:id',FetchAdmin,async(req,res)=>{
  const emplooy = await EmplooyDB.findById(req.params.id);
  if(emplooy){
      if(emplooy.designation==='Manager'){
        const data = await Tech_Process_DB.find({'forworded.id':req.params.id,'Technicain.id':null})
        if(data.length>0){
          res.status(200).send({message:data,success:true})
        }
        else{
          res.status(200).send({message:'no data found',success:false})
        }
    
      }
      else{
        const data = await Tech_Process_DB.find({'Technicain.id':req.params.id})
        if(data.length>0){
          res.status(200).send({message:data,success:true})
        }
        else{
          res.status(200).send({message:'no data found',success:false})
        }

      }
  }
  else{
      res.status(400).send({message:'data not found',success:false})
  }
})


//ROUTE FOR THE ADMIN TO GET PENDING TASKS DEATIALS
router.get('/getpendingtasks/:id',FetchAdmin,async(req,res)=>{
  const emplooy = await EmplooyDB.findById(req.params.id);
  if(emplooy){
      if(emplooy.designation==='Manager'){
        const data = await taskDB.find({'Manager.id':req.params.id,'finished.yes':false});
        if(data.length>0){
      res.status(200).send({message:data,success:true})
        }
        else{
          res.status(200).send({message:'data not  found',success:false})
        }
      }
      else{
      res.status(200).send({message:'data not found',success:false})
      }
  }
  else{
      res.status(400).send({message:'data not found',success:false})
  }
})


//Router  FOR THE ADMIN TO FORWORD A DATA TO TASK A MANAGER
  //DELETED DATA TO TASK

router.post('/deleteToTask/:id',FetchAdmin,async(req,res)=>{
  try{
    const {mid,note,mname}=req.body;
    const data = await DeletedDb.findById(req.params.id)
    if(data){
        await taskDB.create({
          name:data.name,
          mobileNumber:data.mobileNumber,
          mobileNumberString:data.mobileNumber,
          Task:note,
          Manager:{
            id:mid,
            name:mname
          }
        })
        res.status(200).send({message:'Task Created Successfully',success:true})

    }else{
    res.status(200).send({message:'error occured',success:false})
    }
  }catch(error){
    console.log(error)
    res.status(500).send({message:'error occured',success:false})
  }
})


//ROUTE FOR THE ADMIN TO CREATE A TASK FROM INQUERY data
router.post('/InqueryToTask/:id',FetchAdmin,async(req,res)=>{
  try{
    const {mid,note,mname}=req.body;
     const data = await InqueryDB.findById(req.params.id);
     if(data){
      await taskDB.create({
        name:data.name,
        mobileNumber:data.mobileNumber,
        mobileNumberString:data.mobileNumber,
        Task:note,
        Manager:{
          id:mid,
          name:mname
        }

      })

     }else{
      res.status(200).send({message:'error occured',success:false})
      }



  }catch(error){
    res.status(500).send({message:'error occured',success:false})
  }
})

// ROUTE FOR THE ADMIN TO GET ALL THE MANAGER DETAILS
  router.get('/MangaerData',FetchAdmin,async(req,res)=>{
    try{
      const data = await EmplooyDB.find({designation:'Manager'});
      if(data.length>0){
        res.status(200).send({message:data,success:true})
      }else{
        res.status(200).send({message:'no managers found in Emplooys data',success:false})

      }

    }catch(error){
      res.status(500).send({message:'error occured try again',success:false})
    }
  })

module.exports = router;
