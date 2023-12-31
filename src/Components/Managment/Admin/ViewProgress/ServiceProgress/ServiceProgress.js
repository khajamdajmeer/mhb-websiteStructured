import React, { useEffect, useState } from 'react';
import { GetfullDetail } from '../../../../../ApiCalls/AdminCalls/ProgressCalls';
import serachicon from '../../../../images and tones/search-icon.png';
import ClientView from '../../ClientView/ClientView'
import './ServiceProgress.css';
import SkeletonLoader from '../../../Common/SkeletonLoader/SkeletonLoader';
import { bindActionCreators } from 'redux';
import { actionCreator } from '../../../../../Redux';

import { useDispatch,useSelector } from 'react-redux';

const ServiceProgress = (props) => {

  //using redux for the skeleton loader
  const dispatch = useDispatch();
  const {showloading,hideloading}= bindActionCreators(actionCreator,dispatch)
  const loadingstate = useSelector(state=>state.load)

    const [data,setData ]=useState([])
    const [showdata,setShowdata]=useState([])

    //logic to sort the data by the date latest to oldest
    const sortDataByDate = [...showdata].sort((a, b) => {
      // Assuming 'Date' is a property inside 'Service'
      const dateA = new Date(a.Service.Delivery);
      const dateB = new Date(b.Service.Delivery);
    
      // Extract only the date part (year, month, and day)
      const datePartA = new Date(dateA.getFullYear(), dateA.getMonth(), dateA.getDate());
      const datePartB = new Date(dateB.getFullYear(), dateB.getMonth(), dateB.getDate());
    
      // Compare the date parts
      if (datePartA < datePartB) return 1;
      if (datePartA > datePartB) return -1;
      return 0;
    });
    

   const onMount=async()=>{
     showloading();
    const res = await GetfullDetail(props.id);
    if(res.success){
        setData(res.data)
        setShowdata(res.data)
        hideloading();

    }
    else{
      hideloading();
    }
   }
   useEffect(()=>{
    onMount();
    // eslint-disable-next-line
   },[])






//LOGIC FOR HANDLING THE VIEW BTN
const [showview,setShowview]=useState(false)
const [viewdata,setViewdata]=useState('')
const handleviewbtn = (data)=>{
  setShowview(true);
  setViewdata(data)
}

const handlecloseviewbtn = ()=>{
  setShowview(false)
}
const [date,setDate]=useState('')
const datechange = (e)=>{
    setDate(e.target.value);
}
const handledateSerach=async()=>{
            const datedata = data.filter((ele)=>{
               if(ele.Service.Delivery.slice(0,10)===date){
                return(ele)
               }
               else{
                return(null)
               }
            })
            setShowdata(datedata);
        }

const handlereset =async()=>{
       setShowdata(data)
}

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

const raisecomplainhandle = (id,val)=>{
    console.log(id,val);

}


    return (
      <>
         {showview &&<ClientView closefunction={handlecloseviewbtn} data={viewdata} complainfunction={raisecomplainhandle}/>}

         <h1 className="ad-emp-heading">
            Service Data
</h1>
       <div className="ad-emp-maphead">
                 

                 <ul className="ad-emp-dataitemhead bolditem">
                    <span className='ad-emp-spanlen'>S no</span> 
                     <li>Name</li>
                     <li>mobilenumber</li>
                     <li>Servicetype</li>
                     <li>Delivered Date</li>
                 </ul>
                     <div className="ad-emp-inputdivhead"> <input type="date" max={maxdate} name='data' value={date} onChange={datechange} />
           <button onClick={handledateSerach}><img src={serachicon} alt="" /></button>
           <button className='ad-emp-rstbtn' onClick={handlereset}>reset</button>
             </div> 
             </div>
{loadingstate&&<SkeletonLoader/>}

             {sortDataByDate.map((ele,index)=>{
                return( ele!=null&& (<div className="ad-emp-mapitem">
                 <ul className="ad-emp-dataitem">
                    <span className='ad-emp-spanlen'>{sortDataByDate.length-index}. </span> 
                     
                 <li> {ele.name} </li>
                 <li> {ele.mobileNumber} </li>
                 {/* <li>{ele.Discription}</li> */}
                 <li> {ele.Service.type} </li>
                 <li> {ele.Service.Delivery.slice(0,10)} </li>
                 </ul>
                 <div className="ad-emp-inputdiv ad-adm-vibtn">

                 <button className='' onClick={()=>handleviewbtn(ele)}>view</button>
                 </div>
             </div>))
             })

             }

      </>
    );
}


export default ServiceProgress;
