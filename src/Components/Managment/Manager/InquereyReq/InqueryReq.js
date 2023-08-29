import React, {useState } from 'react';
import './InqueryReq.css';
import TopMsg from '../../Common/TopMsg/TopMsg';
import { Create_Inquery_Data } from '../../../../ApiCalls/ManagerCalls/RequestCall';
const InqueryReq = () => {





  //logic of the input data
  const [data,setData]=useState({
    name:'',mobileNumber:'',Location:'',Address:"",Note:''
  })
  const onchange =(e)=>[
    setData({...data,[e.target.name]:e.target.value})
  ]


  
  //LOGIC FOR HANDLING CREATING PENDING REQUEST
  const [showmsg,setShowmsg]=useState(false);
  const [msg,setMsg]=useState('')

  const handleclose = ()=>{
    setShowmsg(false)
  }
  
  const handlesubmit = async()=>{
    const res = await Create_Inquery_Data(data);
    if(res.success){
        setShowmsg(true);
        setMsg(res.message);
        setData({name:'',mobileNumber:'',Location:'',Address:"",Note:''})
    }
    setTimeout(()=>{
        setShowmsg(false);
    },3000)
  }
  



  return (
    <>
    {showmsg&&(
      <TopMsg message={msg} handleclose={handleclose}/>
    )}
    <div className="ma-inr-fullscreen">
        <div className="ma-inr-center">
            <div className="ma-inr-head"><h2>Inquery Details</h2></div>
            <div className="ma-inr-body">
              <div className="ma-inr-item">
                <ul className="ma-inr-ul">
                  <li className='ma-inr-lileft'><label htmlFor="">Name</label></li>
                  <li className='ma-inr-liright'><input type="text" name='name' value={data.name} onChange={onchange} placeholder='Enter Your Name'/></li>
                </ul>
              </div>
              <div className="ma-inr-item">
                <ul className="ma-inr-ul">
                  <li className='ma-inr-lileft'><label htmlFor="">MobileNumber</label></li>
                  <li className='ma-inr-liright'><input type="number" name='mobileNumber' onChange={onchange} value={data.mobileNumber} placeholder='Enter MobileNumber' /></li>
                </ul>
              </div>

              <div className="ma-inr-item">
                <ul className="ma-inr-ul">
                  <li className='ma-inr-lileft'><label htmlFor="">Location</label></li>
                  <li className='ma-inr-liright'><input type="text" placeholder='Location (optional)' name='Location' value={data.Location} onChange={onchange} /></li>
                </ul>
              </div>
              <div className="ma-inr-item">
                <ul className="ma-inr-ul">
                  <li className='ma-inr-lileft'><label htmlFor="">Adress</label></li>
                  <li className='ma-inr-liright'><textarea name='Address' onChange={onchange} value={data.Address} type="text" placeholder='Address (optional)'/></li>
                </ul>
              </div>

             
              <div className="ma-inr-item">
                <ul className="ma-inr-ul">
                  <li className='ma-inr-lileft'><label htmlFor="">Note</label></li>
                  <li className='ma-inr-liright'><textarea type="text" placeholder='Note (optional)' name='Note' onChange={onchange} value={data.Note} /></li>
                </ul>
              </div>
              <div className="ma-inr-item">
                <button className='ma-inr-submitbtn' onClick={handlesubmit}>submit</button>
              </div>
             
              
             

            </div>
        </div>
    </div>
      
    </>
  );
}


export default InqueryReq;
