const express = require('express');
const FetchAdmin = require('../../MiddleWare/FetchAdmin');
const FinishDB = require('../../DBmodels/DBAdmin/FinishedReq')
const EmplooyDB = require('../../DBmodels/DBAdmin/NewEmplooyData')
const router = express.Router();



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


module.exports = router;
