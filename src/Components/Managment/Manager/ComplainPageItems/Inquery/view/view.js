import React from 'react';
import './view.css';


const View = (props) => {

    const closeview = props.closeview;

    //logic for the mapping of history
    const mdata = props.data
    const arrLen = props.data.CallDate.length;
    const historyarr = [];
    for(let i =0;i<arrLen;i++){
        const combineobject = {
            CallDate:mdata.CallDate[i]||'',
            Manager: mdata.Manager[i]|| {id:'',name:''},
            Note:mdata.Note[i]||''
        };
        historyarr.push(combineobject);
    }
    
  return (
    <>


    <div className="ma-iqvw-fullscreen" >
       <div className="ma-iqvw-center">
        <h2 className="ma-iqvw-head"> Details</h2>
        <h4 className="ma-iqvw-head head2">
            <div>{props.data.name} </div>
            <div>{props.data.mobileNumber}</div>
            </h4>
        <div className="ma-iqvw-body">
            {historyarr.map((ele,index)=>{
                return(
<div className="ma-iqvw-history">
                <div className="ma-iqvw-date">{ele.CallDate.slice(0,10)}</div>
                <div className="ma-iqvw-date">{ele.Note}</div>
                <div className="ma-iqvw-date">{ele.Manager.name}</div>
            </div>
                )
            })}
            
          
          
         
            
            <ul className='ma-iqvw-bodyul'>
                <li className='ma-iqvw-lileft'>
            <button className='ma-iqvw-closebtn' onClick={closeview} >Close</button>
                </li>
            </ul>

        </div>
       </div>
    </div>
      
    </>
  );
}






export default View;
