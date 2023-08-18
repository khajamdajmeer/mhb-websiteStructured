const express = require('express');
const FetchAdmin = require('../../MiddleWare/FetchAdmin');
const FinishDB = require('../../DBmodels/DBAdmin/FinishedReq')
const EmplooyDB = require('../../DBmodels/DBAdmin/NewEmplooyData')
const router = express.Router();



router.get('/reqcount/:id',FetchAdmin,async(req,res)=>{

    try{
        const emplooy = await EmplooyDB.findById(req.params.id);
        if(emplooy){

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
                console.log(val)
                res.status(200).send({data,Count:val})

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
                  
                
                res.status(200).send({data,Count:val})

            }



        }
        else{

            res.status(400).send({message:'data not found'})
        }
        

    }catch(error){
        res.status(500).send({message:'error occured Please try again',success:false})
    }


})


module.exports = router;
