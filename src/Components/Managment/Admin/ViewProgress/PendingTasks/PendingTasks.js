import React,{useEffect, useState} from 'react';
import serachicon from '../../../../images and tones/search-icon.png';
import { getPendingTasks } from '../../../../../ApiCalls/AdminCalls/ProgressCalls';


const PendingTasks = (props) => {


      //logic for geting the current data

   const currentDate = new Date(); // Current date in local time
   const year = currentDate.getFullYear();
   const month = String(currentDate.getMonth() + 1).padStart(2, '0');
   const day = String(currentDate.getDate()).padStart(2, '0');
   const formattedDate = `${year}-${month}-${day}`;


  const [data,setData]=useState([])
  const[showdata,setShowdata]=useState([])


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


const onMount=async()=>{
  const res = await getPendingTasks(props.id);
  if(res.success){
    setShowdata(res.message)
    setData(res.message)
  }

}
useEffect(()=>{
  onMount();
  // eslint-disable-next-line
},[])


//const handlesearch 
const handlesearch=()=>{
  const fileterdata= data.filter((ele)=>{
    if(ele.Date.slice(0,10)===date){
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


  return (
    <>
    <div className="ma-tsk-head">
        <h1>Pending Tasks</h1>
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
    {showdata.map((ele,index)=>{
      return(
        <div className="ma-tsk-mapitem">
          <ul>
            <li>{ele.name}</li>
            <li>{ele.mobileNumber}</li>
            <li className={ele.Date.slice(0,10)<formattedDate ? 'color-red':''}>{ele.Date.slice(0,10)}</li>
            <li>{ele.Task}</li>
            <li className="ma-tsk-viewbtn"><button>view</button></li>
        </ul>
    </div>

      )
    })}
   

   {showdata.length<=0 && <div className="ma-tsk-nodata">no Data to show</div>}
    
      
    </>
  );
}

export default PendingTasks;
