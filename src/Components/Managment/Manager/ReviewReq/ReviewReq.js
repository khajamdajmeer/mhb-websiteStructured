import './ReviewReq.css'
import React, { useEffect, useState } from 'react';
import { GetReviewReq } from '../../../../ApiCalls/ManagerCalls/RequestCall';

const ReviewReq = () => {

  const [activeIndex,setActiveIndex]=useState(0);
const [data,setData]=useState([
  {_id:'',name:'',mobile:'',data:[ {
    Service: {
      type:'',
      Date: "",
      Service: ""
    },
    Technicain: {
      name: "",
      id: ""
    },
    forworded: {
      name: "",
      id: ""
    },
    _id: "",
    name: "",
    mobileNumber: '',
    mobilenumberString: "",
    Location: "",
    Address: "  ",
    Requestdate: "",
    Accepted: '',
    __v: 0
  }]}
])
  //functions to load onMount
  const onMount=async(e)=>{
    const res = await GetReviewReq();
    if(res){
      setData({...data,[e.target.name]:null})
    }
    else{

      setData(res)
    }
  }
  useEffect(()=>{
onMount();
// eslint-disable-next-line
  },[])




  const handlewrap = (index)=>{
  setActiveIndex(activeIndex === index ? null : index)

  }

 




  return (
    <>
      <div className="viewtechrequest">

        <div className="techcenterdiv">
          <div className="navtopfortech">
            <div className="techleft">Review Requests</div>
          </div>
          <div className="ma-vrr-bottom">
            {
              data.map((ele,index)=>{
                return(
<div className={`ma-vrr-fullhead ${activeIndex===index ? 'ma-vrr-openwrap':''}`}>
              <div className="ma-vrr-dhead" onClick={()=>handlewrap(index)}>
                <div className="ma-vrr-dhead-body">{ele.name}</div>
                <div className="ma-vrr-dhead-body">{ele.mobile}</div>
                <div className="ma-vrr-dhead-body">{ele.data.length}</div>
                {/* <div className="ma-vrr-dhead-body">this is body</div> */}
              </div>

              <div className="ma-vrr-dbody">
                {ele.data.map((element)=>{
                  return(
                    <>
                    <div className={`ma-vrr-dreq ${element.Accepted ? 'ma-vrr-colorgreen':''}`}>
                  <div className="ma-vrr-name">
                    {element.name}
                    </div>
                  <div className="ma-vrr-name">{element.mobileNumber}</div>
                  <div className="ma-vrr-name">{element.Location}</div>
                  <div className="ma-vrr-name">{element.Service.type}</div>
                  <div className="ma-vrr-name">{element.Requestdate.slice(0,10)}</div>
                  <div className="ma-vrr-name">

                  <button>Delivered</button>
                  </div>
                 </div>
                    
                    </>
                  )
                })

                }
                 
                 
              
              </div>
             </div>
                )
              })
            }

          </div>
      
         
          </div>
        </div>


    </>
  );
}

























export default ReviewReq;
