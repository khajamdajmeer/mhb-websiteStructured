import React, { useEffect, useState } from 'react';
import './CreateReq.css';
import { CreateReqSendtoPending,GetTechDetails,CreateReqandForword } from '../../../../ApiCalls/ManagerCalls/RequestCall';
import Message from '../../Common/Message/Message';
const CreateReq = () => {
  //LOGIC FOR GETING THE TECH DETAILS
  const [techname,setTechname]=useState([])
    const onMount=async()=>{
        const res = await GetTechDetails();
        setTechname(res)
    }
    useEffect(()=>{
      onMount();
    },[])


  //LOGIC FOR TODAYS DATE
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  //logic of the input data
  const [data,setData]=useState({
    name:'',mobileNumber:'',Location:'',Address:"",ServiceType:'',ServiceDate:'',
    ServiceTime:'',Note:'',Technicianid:''

  })
  const onchange =(e)=>[
    setData({...data,[e.target.name]:e.target.value})
  ]

  //Logic for submit button 

  
  //LOGIC FOR HANDLING CREATING PENDING REQUEST
  const [showmsg,setShowmsg]=useState(false);
  const [msgdata,setMsgdata]=useState({message:'',showOk:'true',navigate:''})
  const handlepending=async()=>{
    const res = await CreateReqSendtoPending(data);
    if(res.success){
      setShowmsg(true);
      setMsgdata({message:res.message,showOk:true,navigate:'/dashboard/requests'})
      setData({
        name:'',mobileNumber:'',Location:'',Address:"",ServiceType:'',ServiceDate:'',
        ServiceTime:'',Note:'',Technicianid:''
    
      })
    }
    else{
      setShowmsg(true);
      setMsgdata({message:res.message,showOk:true,navigate:'/dashboard/requests'})
    }
    
    setTimeout(() => {
      setShowmsg(false)
    }, 3000);
  }
  
  //LOGIC FOR HANDLING THE FORWORD
  const handleForword = async()=>{
      const res = await CreateReqandForword(data);
      if(res.success){
        setShowmsg(true);
        setMsgdata({message:res.message,showOk:true,navigate:'/dashboard/requests'})
        setData({
          name:'',mobileNumber:'',Location:'',Address:"",ServiceType:'',ServiceDate:'',
          ServiceTime:'',Note:'',Technicianid:''
      
        })
      }
      else{
        setShowmsg(true);
        setMsgdata({message:res.message,showOk:true,navigate:'/dashboard/requests'})
      }
  
      setTimeout(() => {
        setShowmsg(false)
      }, 3000);
  }
  



  return (
    <>
    {showmsg&&(
      <Message message={msgdata.message} showOk={msgdata.showOk} navigate={msgdata.navigate}/>
    )}
    <div className="ma-cr-fullscreen">
        <div className="ma-cr-center">
            <div className="ma-cr-head"><h2>Book a Service</h2></div>
            <div className="ma-cr-body">
              <div className="ma-cr-item">
                <ul className="ma-cr-ul">
                  <li className='ma-cr-lileft'><label htmlFor="">Name</label></li>
                  <li className='ma-cr-liright'><input type="text" name='name' value={data.name} onChange={onchange} placeholder='Enter Your Name'/></li>
                </ul>
              </div>
              <div className="ma-cr-item">
                <ul className="ma-cr-ul">
                  <li className='ma-cr-lileft'><label htmlFor="">MobileNumber</label></li>
                  <li className='ma-cr-liright'><input type="number" name='mobileNumber' onChange={onchange} value={data.mobileNumber} placeholder='Enter MobileNumber' /></li>
                </ul>
              </div>

              <div className="ma-cr-item">
                <ul className="ma-cr-ul">
                  <li className='ma-cr-lileft'><label htmlFor="">Location</label></li>
                  <li className='ma-cr-liright'><input type="text" placeholder='Location' name='Location' value={data.Location} onChange={onchange} /></li>
                </ul>
              </div>
              <div className="ma-cr-item">
                <ul className="ma-cr-ul">
                  <li className='ma-cr-lileft'><label htmlFor="">Adress</label></li>
                  <li className='ma-cr-liright'><textarea name='Address' onChange={onchange} value={data.Address} type="text" placeholder='Address'/></li>
                </ul>
              </div>

              <div className="ma-cr-item">
                <ul className="ma-cr-ul">
                  <li className='ma-cr-lileft'><label htmlFor="">Service Type</label></li>
                  <li className='ma-cr-liright'><input name='ServiceType' onChange={onchange} value={data.ServiceType} type="text" placeholder='Servie Type' /></li>
                </ul>
              </div>
              <div className="ma-cr-item">
                <ul className="ma-cr-ul">
                  <li className='ma-cr-lileft'><label htmlFor="">Service Date</label></li>
                  <li className='ma-cr-liright'><input type="Date" name='ServiceDate' onChange={onchange} value={data.ServiceDate} placeholder='Service Date' min={getCurrentDate()}/></li>
                </ul>
              </div>
              <div className="ma-cr-item">
                <ul className="ma-cr-ul">
                  <li className='ma-cr-lileft'><label htmlFor="">Service Time</label></li>
                  <li className='ma-cr-liright'><input type="type" name='ServiceTime' onChange={onchange} value={data.ServiceTime} placeholder='Service Date' /></li>
                </ul>
              </div>
              <div className="ma-cr-item">
                <ul className="ma-cr-ul">
                  <li className='ma-cr-lileft'><label htmlFor="">Note</label></li>
                  <li className='ma-cr-liright'><textarea type="text" placeholder='Note' name='Note' onChange={onchange} value={data.Note} /></li>
                </ul>
              </div>
              <div className="ma-cr-item">
                <ul className="ma-cr-ul">
                <li className='ma-cr-lileft'>Technicain</li>
                <li className='ma-cr-liright'>
                    <select id="" value={data.Technicianid} name='Technicianid' onChange={onchange}>
                        <option value="0">---select---</option>
                        {techname.map((ele,index)=>{
                            return (
                        <option value={ele._id}>{ele.name} ({ele.count})</option>
                            )
                        })}

                    </select>
                </li>
                </ul>
              </div>
              
              <div className="ma-cr-item">
                <ul className="ma-cr-ul">
                <li className='ma-cr-liright'><button onClick={handlepending} disabled={data.Technicianid.length>2||
                data.mobileNumber.length!==10||data.ServiceType.length<5||
                data.Address.length<8||data.name.length<5}>Pending</button></li>
                  <li className='ma-cr-liright'><button onClick={handleForword} disabled={data.mobileNumber.length!==10||data.ServiceType.length<5||
                    data.Address.length<8||data.name.length<5||data.Technicianid.length<4}>Forword</button></li>
                </ul>
              </div>

            </div>
        </div>
    </div>
      
    </>
  );
}

export default CreateReq;
