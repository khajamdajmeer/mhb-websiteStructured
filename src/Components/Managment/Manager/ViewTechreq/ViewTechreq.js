import React, { useEffect, useState } from 'react';
import './ViewTechreq.css';
import { TechRequest } from '../../../../ApiCalls/ManagerCalls/RequestCall';
import { SerachTechDB } from '../../../../ApiCalls/ManagerCalls/SearchCall';
import serachlogo from '../../../images and tones/search-icon.png'

const ViewTechreq = () => {


  const [searchinput,setSearchinput]=useState({type:"",data:""})
  const onchange = (e)=>{
 setSearchinput({...searchinput,[e.target.name]:e.target.value});
  }

  const [viewdata,setViewdata]=useState({
    _id: "", name: "", mobileNumber: "", Location: "", Address: "", ServiceDate: "", ServiceTime: "", ServiceType: '',
    Requestdate: "",ForwordedBy:"",
    __v: ""
  })
  const [showsearchdata,setShowingdata]=useState(false);

 const handleSearch = async()=>{

  const response = await SerachTechDB(searchinput);
  // setSearchinput({type:"",data:""})
  setShowingdata(true)
  setViewdata(response);
   console.log(response)

 }



  return (
    <>
      <div className="viewtechrequest">

        <div className="techcenterdiv">
          <div className="navtopfortech">
            <div className="techleft">Tech Requests</div>
            <div className='techright'>
              <select name="type" id="techsearchfilter" onChange={onchange}>
                <option value="0">---select---</option>
                <option value="name">name</option>
                <option value="mobilenumber">mobile number</option>
              </select>
              <input type="text" name="data" id="searchinput" onChange={onchange} />
              <button onClick={handleSearch}>
                search
              </button>
            </div>
          </div>
          <div className="techdatalist">
            {showsearchdata&&(
              viewdata.map((ele,index)=>{
                return(
<div className='techdatasublist'>
                <div>{ele.name}</div>
                <div>{ele.mobileNumber}</div>
                <div>{ele.Location}</div>
                <div>{ele.ForwordedBy}</div>
                <div><button>Delete</button>
                <button>revert</button></div>
              </div>
                )
              })
                

            )

            }
        
         
          </div>
        </div>

      </div>

    </>
  );
}

export default ViewTechreq;
