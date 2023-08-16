import React, { useEffect, useState } from 'react';
import './ViewTechreq.css';
import { GetTechReq } from '../../../../ApiCalls/ManagerCalls/RequestCall';

const ViewTechreq = () => {

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
  const onMount=async()=>{
    const res = await GetTechReq();
    setData(res)
  }
  useEffect(()=>{
onMount();
  },[])




  const handlewrap = (index)=>{
  setActiveIndex(activeIndex === index ? null : index)

  }

 




  return (
    <>
      <div className="viewtechrequest">

        <div className="techcenterdiv">
          <div className="navtopfortech">
            <div className="techleft">Tech Requests</div>
          </div>
          <div className="ma-vtr-bottom">
            {
              data.map((ele,index)=>{
                return(
<div className={`ma-vtr-fullhead ${activeIndex===index ? 'ma-vtr-openwrap':''}`}>
              <div className="ma-vtr-dhead" onClick={()=>handlewrap(index)}>
                <div className="ma-vtr-dhead-body">{ele.name}</div>
                <div className="ma-vtr-dhead-body">{ele.mobile}</div>
                <div className="ma-vtr-dhead-body">{ele.data.length}</div>
                {/* <div className="ma-vtr-dhead-body">this is body</div> */}
              </div>

              <div className="ma-vtr-dbody">
                {ele.data.map((element)=>{
                  return(
                    <>
                    <div className={`ma-vtr-dreq ${element.Accepted ? 'ma-vtr-colorgreen':''}`}>
                  <div className="ma-vtr-name">
                    {element.name}
                    </div>
                  <div className="ma-vtr-name">{element.mobileNumber}</div>
                  <div className="ma-vtr-name">{element.Location}</div>
                  <div className="ma-vtr-name">{element.Service.type}</div>
                  <div className="ma-vtr-name">{element.Requestdate.slice(0,10)}</div>
                  <div className="ma-vtr-name">

                  <button>Delete</button>
                  <button>revert</button>
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

export default ViewTechreq;
