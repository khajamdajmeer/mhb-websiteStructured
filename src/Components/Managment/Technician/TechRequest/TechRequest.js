import React, { useCallback, useEffect, useState } from 'react';
import './TechRequest.css';
import { techAuthorization } from '../../../../ApiCalls/CommonCalls/Authorization';
import { useNavigate } from 'react-router-dom';
import { AcceptRequest,ViewMyReq } from '../../../../ApiCalls/TechnicalCalls/TechnicianRequest';

const TechRequest = () => {

const history = useNavigate();
    const token = localStorage.getItem('auth-token')
    const [name,setName] = useState('')
    const [techdata,setTechdata]=useState([{
        name:'',Location:"",adress:"",_id:""
    },{
        name:'',Location:"",adress:"",_id:""
    }])
    
    const checkauthorization = useCallback(async()=>{
        if(token){
            const res = await techAuthorization();
            if(res.name){
            setName(res.name)

                const newdata = await ViewMyReq();
                if(newdata.length<1){
                    setTechdata([{
                        name:'',Location:" ",adress: " "  ,_id:" "
                    }])
                }
                else{
                    setTechdata(newdata);
                }
            }
            else{
                history('/service')
            }
           
            // console.log(newdata)
        }
        else{
            history('/service')
        }
    },[token,history])
    useEffect(()=>{
        checkauthorization();
    },[checkauthorization])

    const [showmsg,setShowmsg]= useState(false);
    const [msg,setMsg]=useState({message:"",name:""})
    const handleMsgOkClick = ()=>{
        setShowmsg(false);
        setMsg({message:"",name:""})
    }

    const handleAcceptReq = async(data)=>{

        const res =await AcceptRequest(data);
        console.log(res);
        setMsg(res);
        setShowmsg(true);
        const newdata = await ViewMyReq();
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
    {showmsg&&msg&&(
        <div id="tech-msgfullScreen">
        <div id="techmsg-centerbox">
            <div id="techmsg-body"> {msg.name}{msg.message}</div>
            <div id="techmsgbtn">
                <button id='techmsgokbtn' onClick={handleMsgOkClick}>ok</button>
            </div>
        </div>
    </div>
    )

    }
    
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
                    return( 
                    <>
                    { !item.Accepted&&(    <div id='tech-data-div' key={item._id}>
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
            </div>)}
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
