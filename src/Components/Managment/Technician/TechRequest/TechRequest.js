import React, { useEffect, useState } from 'react';
import './TechRequest.css';
import { techAuthorization } from '../../../../ApiCalls/CommonCalls/Authorization';
import { useNavigate } from 'react-router-dom';
import { viewallTechReq,AcceptRequest } from '../../../../ApiCalls/TechnicalCalls/TechnicianRequest';

const TechRequest = () => {

const history = useNavigate();
    const token = localStorage.getItem('auth-token')
    const [name,setName] = useState('')
    const [techdata,setTechdata]=useState([{
        name:'',Location:"",adress:"",_id:""
    }])
    
    const checkauthorization = async()=>{
        if(token){
            const res = await techAuthorization();
            setName(res.name)
            const newdata = await viewallTechReq();
            if(newdata.length<1){
                setTechdata([{
                    name:'',Location:" ",adress: " "  ,_id:" "
                }])
            }
            else{
                setTechdata(newdata);
            }
            // console.log(newdata)
        }
        else{
            history('/service')
        }
    }
    useEffect(()=>{
        checkauthorization();
    },[checkauthorization])


    const handleAcceptReq = async(data)=>{

        const res =await AcceptRequest(data);
        console.log(res);
        const newdata = await viewallTechReq();
        if(newdata.length<1){
            setTechdata([{
                name:'',Location:" ",adress: " "  ,_id:" "
            }])
        }
        else{
            setTechdata(newdata);
        }
    }


  return (
    <>
    <div className="techreqcontainer">

            <h1>Technician request</h1>
        <div id="tech-req-view-center">
            <div id="tech-req-top-emplooydetails">
               <div className="technician-name">
               Name: {name}

               </div>
            </div>
            <div id="tech-data-scrollable">

            {
                techdata.map((item,index)=>{
                    return( <>
                        <div id='tech-data-div' key={item._id}>
                    {techdata.length<2&&item._id.length<2&&(
                        <>No Requests to show</>
                    )}
                <div id="tech-viewdata">
                    <ul><li>{item.name}</li>
                    <li>{item.Location}</li>
                    <li>{item.Address}</li>
                    
                    </ul>
                </div>
                <div id="tech-buttons">
                    {item._id.length>2&&
                    (<button onClick={()=>{handleAcceptReq(item._id)}} >Accept</button>)

                    }

                </div>
            </div>
                        </>)
                    
                })

            }

            </div>

           
        </div>
        
    </div>
   
      
    </>
  );
}

export default TechRequest;
