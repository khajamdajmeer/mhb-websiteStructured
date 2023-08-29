import React, { useEffect, useRef, useState } from 'react';
import './FindRequest.css'
import { RequestSearch } from '../../../../../ApiCalls/ManagerCalls/SearchCall';
import Cookies from 'js-cookie';
import ClientHistoryview from '../../ClientHistoryview/ClientHistoryview';

const FindRequest = () => {

    const [data,setData]=useState([])

const [iptype,setIptype]=useState('');
const [ipval,setIpval]=useState('')
const typechange =(e)=>{
    setIptype(e.target.value)
}
const onchange = (e)=>{
    setIpval(e.target.value)
}
const handleserach =async()=>{
    const res = await RequestSearch(iptype,ipval);
    if(res.success){
        setData(res.message)
    }
    console.log(res)
    console.log(Cookies.get('auth-token'))


}
const time = 1000;
const timer = useRef(null);
useEffect(()=>{
    clearTimeout(timer.current);
    timer.current=setTimeout(()=>{
        setIpval(ipval);
        handleserach();
    },time)
// eslint-disable-next-line
},[ipval])


/// logic for handling the view button of the results
const [historyview,setHistoryview]=useState(false);
const [hid,setHid]=useState('')
const handleviewHistory=(data)=>{
    setHid(data);
    setHistoryview(true);
}
const handleclose = ()=>{
    setHistoryview(false);
}

  return (

    <>
    {historyview&&(<ClientHistoryview data={hid} closefunction={handleclose}/>)}
    <div className="ma-cplp-contentbody">
           <div className="ma-cplp-searchbar">
            <select name="iptype" id="" value={iptype} onChange={typechange}>
                <option value="0">-select</option>
                <option value="name">Name</option>
                <option value="mobile">Mobile</option>
            </select>
            <input type="text" name='ipval' value={ipval} onChange={onchange} />
            <button onClick={handleserach}>search</button>
            
           </div>
           
      <div className="ma-rcp-body">
            <h1 className="ma-rcp-heading">Find Requests</h1>
            <div className="ma-rcp-searchbody">
            {data.map((ele,index)=>{
            return (
                <div className="ma-rcp-mapitem">
                <div className="ma-rcp-mapname">{index+1}</div>
                <div className="ma-rcp-mapname">{ele.name}</div>
                <div className="ma-rcp-mapname">{ele.mobileNumber}</div>
                <div className="ma-rcp-mapname"><button onClick={()=>handleviewHistory(ele)}>view</button></div>
            </div>

            )
           })}
            </div>
            
           </div>
           </div>

    </>
  );
}

export default FindRequest;
