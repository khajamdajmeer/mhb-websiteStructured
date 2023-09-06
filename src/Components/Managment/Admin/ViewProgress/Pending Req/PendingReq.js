import React,{useEffect, useState} from 'react';
import serachicon from '../../../../images and tones/search-icon.png';
import { getPendingTechReq } from '../../../../../ApiCalls/AdminCalls/ProgressCalls';
import ReqView from '../../Views/ReqView/ReqView';



const PendingReq = (props) => {
   //logic for geting the current data

   const currentDate = new Date(); // Current date in local time
   const year = currentDate.getFullYear();
   const month = String(currentDate.getMonth() + 1).padStart(2, '0');
   const day = String(currentDate.getDate()).padStart(2, '0');
   const formattedDate = `${year}-${month}-${day}`;


  const [data,setData]=useState([])
  const[showdata,setShowdata]=useState([])

     //logic to sort the data by the date latest to oldest
     const sortDataByDate = [...showdata].sort((a, b) => {
      // Assuming 'Date' is a property inside 'Service'
      const dateA = new Date(a.RequestDate);
      const dateB = new Date(b.RequestDate);
    
      // Extract only the date part (year, month, and day)
      const datePartA = new Date(dateA.getFullYear(), dateA.getMonth(), dateA.getDate());
      const datePartB = new Date(dateB.getFullYear(), dateB.getMonth(), dateB.getDate());
    
      // Compare the date parts
      if (datePartA < datePartB) return 1;
      if (datePartA > datePartB) return -1;
      return 0;
    });

  const getformatemaxdate =()=>{
      const today = new Date();
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1;
      let dd = today.getDate();
  
      if (mm < 10) {
        mm = `0${mm}`;
      }
      if (dd < 10) {
        dd = `0${dd}`;
      }
  
      return `${yyyy}-${mm}-${dd}`;
  }
  const maxdate=getformatemaxdate()
  

  const [date,setDate]=useState('')
const datechange = (e)=>{
  setDate(e.target.value);
}

//this is the logic to run while the component is mounted
const onMount=async()=>{
  const res = await getPendingTechReq(props.id);
  if(res.success){
    setShowdata(res.message)
    setData(res.message)
  }

}

//useEffect triggering the function that need to run on component mount
useEffect(()=>{
  onMount();
  // eslint-disable-next-line
},[])


//const handlesearch 
const handlesearch=()=>{
  const fileterdata= data.filter((ele)=>{
    if(ele.Service.Date.slice(0,10)===date){
      return(ele)
     }
     else{
      return(null)
     }
  })
  setShowdata(fileterdata)
}

const handlereset=()=>{
  setShowdata(data)
}

//Logic to show the view req details compnent
const [showview,setShowview]=useState(false);
const [viewdata,setViewdata]= useState('')
const handleshowview = (data)=>{
  setShowview(true);
  setViewdata(data);
  
}
const handlecloseview=()=>{
  setShowview(false);
}

  return (
    <>
    {showview && <ReqView closefunction={handlecloseview} data={viewdata}/>}
    <div className="ma-tsk-head">
        <h1>Pending Request</h1>
        <div className="ad-emp-inputdivhead"> <input type="date" max={maxdate} name='data' value={date} onChange={datechange} />
           <button onClick={handlesearch} ><img src={serachicon} alt="" /></button>
           <button onClick={handlereset} className='ad-emp-rstbtn' >reset</button>
           </div>
    </div>
    <div className="ma-tsk-body">
        <ul>
            <li>Name</li>
            <li>mobile</li>
            <li>Req Date</li>
            <li>Note</li>
            <li> </li>
        </ul>
    </div>
    {sortDataByDate.map((ele,index)=>{
      return(
        <div className="ma-tsk-mapitem">
          <ul>
            <li>{ele.name}</li>
            <li>{ele.mobileNumber}</li>
            <li className={ele.Service.Date.slice(0,10)<=formattedDate ? 'color-red':''}>{ele.Service.Date}</li>
            <li>{ele.Address}</li>
            <li className="ma-tsk-viewbtn"><button onClick={()=>{handleshowview(ele)}}>view</button></li>
        </ul>
    </div>

      )
    })}
   

    
      
    </>
  );
}

export default PendingReq;
