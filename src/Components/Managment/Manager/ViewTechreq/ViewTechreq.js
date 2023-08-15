import React, {  useEffect, useState } from 'react';
import './ViewTechreq.css';
// import { TechRequest } from '../../../../ApiCalls/ManagerCalls/RequestCall';
import { SerachTechDB } from '../../../../ApiCalls/ManagerCalls/SearchCall';
import { useNavigate } from 'react-router-dom';
// import serachlogo from '../../../images and tones/search-icon.png'

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
 const history = useNavigate()
  useEffect(()=>{
    const level = localStorage.getItem('level')
    if(level==='l2'){
    }
    else if(level==='l3'){
       history('/technician/request')
     }
     else if(level==='l1'){
       history('/admindashboard/emplooys')
     }
  },[history])


 //auto serach on stoping the typing for .5 seconds
 const [ typingTimer,setTypingTimer]  = useState(null);
 const doneTypingIntervel = 500;
 const inputElement = React.createRef();
 const handleInput = async()=>{
  clearTimeout(typingTimer);
 setTypingTimer(setTimeout(doneTyping,doneTypingIntervel));
 };
 const doneTyping = async()=>{

  if(searchinput.data.length>0){
    
  }
  const res = await SerachTechDB(searchinput);
  setViewdata(res);

 }




  return (
    <>
      <div className="viewtechrequest">

        <div className="techcenterdiv">
          <div className="navtopfortech">
            <div className="techleft">Tech Requests</div>
            <div className='techright'>
              <select name="type" id="techsearchfilter"value={searchinput.type} onChange={onchange}>
                <option value="0">---select---</option>
                <option value="name">name</option>
                <option value="mobilenumber">mobile number</option>
              </select>
              <input type="text" name="data" id="searchinput" ref={inputElement} onInput={handleInput} value={searchinput.data} onChange={onchange} />
              <button onClick={handleSearch}>
                search
              </button>
            </div>
          </div>
          <div className="techdatalist">
            {showsearchdata&&searchinput.data.length>0&&(
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
