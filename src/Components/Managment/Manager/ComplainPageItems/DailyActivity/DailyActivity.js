import React, { useEffect, useState } from 'react';
import './DailyActivity.css'
import { getTasks } from '../../../../../ApiCalls/ManagerCalls/RequestCall';

const DailyActivity = () => {

    //seting up data 
    const [data,setData]= useState([])
    //functino to run on Mount of the component
    const onMount=async()=>{
        const data = await getTasks();
        
        setData(data.message);
    }
    useEffect(()=>{
        onMount();
    },[])


    //logic for view and finsh the task
    const [viewdata,setViewdata]=useState({_id:'',name:'',mobileNumber:'',Task:''});
    const [showview,setShowview]=useState(false)
    const handleview = (ele)=>{
        setShowview(true);
        setViewdata(ele);
    }

    const closeview = ()=>{
        setShowview(false)
    }


    //handling the data that has to be send to api
    const [note,setNote]=useState('')
    const onchange=(e)=>{
        setNote(e.target.value);
    }
    const handlefinish =(id)=>{
        console.log(id,note)
    }




  return (
    <>
    <div className="ad-dly-conatainer">
       <div className="ad-dly-centerdiv">
        <h2 className="ma-dly-head">
            Tasks
        </h2>
        <div className="ma-dly-body">
            {data.map((ele,index)=>{
                return(<div className="ma-dly-mapitem">
                <div className="ma-dly-name">{ele.name}</div>
                <div className="ma-dly-name">{ele.mobileNumber}</div>
                <div className="ma-dly-name">{ele.Task}</div>
                {/* <div className="ma-dly-name">ajmeer khajA</div> */}
                <div className="ma-dly-name"><button onClick={()=>handleview(ele)}>view</button></div>

            </div>)
            })

            }
            {data.length===0? <div  className="ma-dly-mapitem textcenter">No Tasks To show</div>:''}

            {showview&&(
                <div className="ma-dly-viewbox">
                <h3 className="ma-dly-viewhead">Details</h3>
                <div className="ma-dly-viewbody">
                    <div className="ma-dly-bodyhead"><div>{viewdata.name}</div><div>{viewdata.mobileNumber}</div></div>
                    <div className="ma-dly-viewitem">
                    <div className="ma-dly-viewname">
                            <label htmlFor="">Task</label>
                            <div >{viewdata.Task}</div>
                        </div>
                        <div className="ma-dly-viewname">
                            <label htmlFor="">Note</label>
                            <textarea name="note"value={note} onChange={onchange} id="" placeholder='Enter Note'></textarea>
                        </div>
                        <div className="ma-dly-viewbtn">
                        <button onClick={closeview}>close</button>
                            <button onClick={()=>{handlefinish(viewdata._id)}}>Finish</button>

                        </div>
                    </div>
                </div>
            </div>)
            }
        </div>
       </div>
    </div>
    
    </>
  );
}

export default DailyActivity;
