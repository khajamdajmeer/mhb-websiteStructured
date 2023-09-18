import React, { useEffect, useState } from 'react';
import './DailyActivity.css'
import { getTasks,finshTask } from '../../../../../ApiCalls/ManagerCalls/RequestCall';
import TopMsg from '../../../Common/TopMsg/TopMsg';

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

    const [showmsg,setShowmsg]=useState(false);
    const [msg,setMsg]=useState('')
    const handlefinish =async(id)=>{
        console.log(id,note)
        const res = await finshTask(id,note);
        if(res.success){
            setShowview(false)
            setShowmsg(true);
            setMsg(res.message);
            onMount()
            setNote('')
        }
        setTimeout(()=>{setShowmsg(false)},3000)
    }

    const closemsg = ()=>{
        setShowmsg(false)
    }




  return (
    <>
{showmsg&&<TopMsg message={msg} handleclose={closemsg} />}
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
                <div className="ma-dly-name"><button className='ma-dly-vbtn' onClick={()=>handleview(ele)}>view</button></div>

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
                            <textarea name="note" value={note} onChange={onchange} id="" placeholder='Enter Note'></textarea>
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
