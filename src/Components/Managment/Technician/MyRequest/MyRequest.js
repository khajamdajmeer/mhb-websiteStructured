import React, {  useEffect, useState } from 'react';
import './MyRequest.css';
import downarrow  from '../../../images and tones/downarrow.png'
import { ViewMyReq,finishReq } from '../../../../ApiCalls/TechnicalCalls/TechnicianRequest';
import { techAuthorization } from '../../../../ApiCalls/CommonCalls/Authorization';
import {  useNavigate } from 'react-router-dom';
import TechReqFinish from '../TechReqFinish/TechReqFinish';
import Cookies from 'js-cookie';
const MyRequest = () => {



    const history = useNavigate();
    const token = Cookies.get('auth-token')
    const [name,setName]=useState('')



   

    const [mydata,setMydata]=useState(
       [ {
            _id:"",name:'',mobileNumber:'',Address:'',Location:'',Service:{type:"",Date:'',Time:''},Accepted:''
        }]
    )

    const request = async()=>{
        if(token){
            const res = await techAuthorization();
            setName(res.name)
            if(res){

                const newdata = await ViewMyReq();
                if(newdata.length<1){
                    setMydata(  [ {
                        _id:"",name:'',mobileNumber:'',Address:'',Location:'',Service:{type:"",Date:'',Time:''}
                    }])
                }
                else{
                    setMydata(newdata);
                    // console.log(newdata)
                }
            }
            else{
                const cookies = Cookies.get();
                for(const cookie in cookies){
                    Cookies.remove(cookie)
                }
            }
        }
        else{
            history('/service')
        }
    }

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleWrap = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    useEffect(()=>{
        request()
        // eslint-disable-next-line
    },[])



    //js for rendering the finish reqpage
    const [showfinish,setShowfinish]=useState(false);
    const [senddata,setSenddata]=useState('')
    const handlecompletbtn = (index)=>{
        setShowfinish(true)
        setSenddata(mydata[index])
    }

    //js for the cancle button
    const handlecancle = ()=>{
        setShowfinish(false);
    }
     //js for showing finsih msg
     const [showfinishmsg,setShowfinishmsg]=useState(false);
     const [showmsgdata,setShowmsgdata]=useState({message:''})
     const handleMsgOkClick =()=>{
        setShowfinishmsg(false)


     }

    //js for complete req btn
    const handleComplete = async(data)=>{
        const res = await finishReq(data);
        if(res.Success){
            setShowfinish(false)
            setShowfinishmsg(true)
            setShowmsgdata({message:res.message})
            request()
        }
        else{
            setShowfinish(false)
            setShowfinishmsg(true)
            setShowmsgdata({message:res.message})
            request()

        }

    }
   


  return (
    <>
    {
        showfinishmsg&&(
            (
                <div id="tech-msgfullScreen">
                <div id="techmsg-centerbox">
                    <div id="techmsg-body"> {showmsgdata.message}</div>
                    <div id="techmsgbtn">
                        <button id='techmsgokbtn' onClick={handleMsgOkClick}>ok</button>
                    </div>
                </div>
            </div>
            )
        )
    }
    {showfinish&&(
                     <TechReqFinish handleComplete = {handleComplete} newdata={senddata} name={name} handlecancle={handlecancle}/>
    )

    }

        <div id="tech-myreqest-fullscreen">
            <h1>My request</h1>
           <div className="tech-myreq-box">
           <div className="tech-my-name">
               Name: {name}

               </div>
        {
            mydata.map((ele,index)=>{
                return(
                    ele.name.length>2&&ele.Accepted&& (<>
                    <div  className={`techdatabox ${activeIndex===index ? 'techdatawrapbox':''}`}>
               <div className="techdataboxshow" onClick={()=>toggleWrap(index)}>
                <div className="techdatabox-left">
                    <div className="techdataname">{ele.name}</div>
                    <div className="techdataname">{ele.Location}</div>
                    {/* <div className="techdataname">{ele.mobileNumber}</div> */}
                </div>
                {ele._id.length>3&&(
                <div className="techdatabox-right"><img src={downarrow} alt="" /></div>
                )

                }
               </div>
          

                    <div className="techdataboxwrap">
                            <div className="techwrapbox-left">
                                <ul>
                                    <li>name</li>
                                    <li>{ele.name}</li>
                                </ul>
                            </div>
                            <div className="techwrapbox-left">
                                <ul>
                                    <li>Mobilenumber</li>
                                    <li>{ele.mobileNumber}</li>
                                </ul>
                            </div>
                            <div className="techwrapbox-left">
                                <ul>
                                    <li>Location</li>
                                    <li>{ele.Location}</li>
                                </ul>
                            </div>
                            <div className="techwrapbox-left">
                                <ul>
                                    <li>Address</li>
                                    <li> {ele.Address}</li>
                                </ul>
                            </div>
                            <div className="techwrapbox-left">
                                <ul>
                                    <li>Service</li>
                                    <li>{ele.Service.type} </li>
                                </ul>
                            </div>
                            <div className="techwrapbox-left">
                                <ul>
                                    <li> Date</li>
                                    <li> {ele.Service.Date} </li>
                                </ul>

                            </div>
                            <div className="techwrapbox-left-btn">
                                <button className='tech-link' onClick={()=>handlecompletbtn(index)}>complete Request</button>
                                
                            </div>

                    </div>
               
            </div>
                    </>)
                )
            })
        }
            
            
            </div>
            
        </div>
  
    </>
  );
}

export default MyRequest;
