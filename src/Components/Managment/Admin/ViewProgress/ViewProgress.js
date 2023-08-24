import React, { useEffect, useState } from 'react';
import './ViewProgress.css'
import { useLocation, useNavigate } from 'react-router-dom';
import dotsicon from '../../../images and tones/3dot.png'
import { Link } from 'react-router-dom';
import arrow from '../../../images and tones/downarrow.png'
import { GetCount,GetfullDetail } from '../../../../ApiCalls/AdminCalls/ProgressCalls';
import serachicon from '../../../images and tones/search-icon.png';
import ClientView from '../ClientView/ClientView';
const ViewProgress = (props) => {

    const [data,setData ]=useState([])



    const location = useLocation();
    const { id, name, role, mobile } = location.state;
    const history = useNavigate();

    //logic for the 3dots btn
    const [hideupdate, setHideupdate] = useState(false);
    const handle3dots = () => {
        setHideupdate(!hideupdate);
    }

    //logic for handling backbutton
    const handlebackbtn = () => {
        history("/admindashboard/emplooys")
    }
    const [count,setCount]=useState({
        data:{Total:{fullcount:'',Count:[]}
         ,Thismonth:{fullcount:'',Count:[]},
            Today:{fullcount:'',Count:[]}}})


    const onMount=async()=>{
        const res = await GetCount(location.state.id);
        const fulldata = await GetfullDetail(location.state.id);
        if(fulldata.success){
            setData(fulldata.data)
        }
        setCount(res);
    }
    useEffect(()=>{
        onMount()
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
    const fulldata = await GetfullDetail(location.state.id);
        if(fulldata.success){
            const datedata = fulldata.data.map((ele)=>{
               if(ele.Service.Delivery.slice(0,10)===date){
                return(ele)
               }
               else{
                return(null)
               }
            })
            console.log(datedata)
            setData(datedata);
        }
}
const handlereset =async()=>{
    const fulldata = await GetfullDetail(location.state.id);
        if(fulldata.success){
            setData(fulldata.data)
        }
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



    return (
        <>
         {showview &&<ClientView closefunction={handlecloseviewbtn} data={viewdata}/>}
            <div className="ad-vp-fullscreen">
                <div className="ad-emp-center">
                    <div className="ad-emp-boxtop">

                        <button className="ad-emp-dotsbtn" onClick={handle3dots}><img src={dotsicon} alt="" className='ad-emp-3dots' /></button>
                        {hideupdate && (
                            <div className="ad-em-hidbox">
                                <Link to='/admindashboard/updateemplooy' state={{ id: id }} className='ad-emp-upbtn'>update</Link>
                            </div>
                        )
                        }
                        <div className="ad-emp-info-head">
                            <div className="ad-emp-iname"><button onClick={handlebackbtn} className='ad-emp-backbtn'><img src={arrow} alt="" /></button></div>


                            <div className="ad-emp-iname">{name}</div>
                            <div className={`ad-emp-iname ${role === "Manager" ? 'colormanager' : 'colortechnician'}`}>{role}</div>
                            <div className="ad-emp-iname">{mobile}</div>
                        </div>

                        <div className="ad-emp-info-body">
                            <div class="card">
                                <div class="card-inner">
                                    <div class="card-front">
                                        <p>Total request</p>
                                        <div className="ad-emp-count">{count.data.Total.fullcount}</div>
                                    </div>
                                    <div class="card-back">
                                        <div className="ad-vp-bs-head">Details</div>
                                        <div className="ad-vp-bs-body">
                                            {count.data.Total.Count.map((ele,index)=>{
                                                return(
                                                                <div className="ad-vp-bs-subbody">
                                                <div className="ad-vp-bs-bname">{Object.keys(ele)[0]}</div>
                                                <div className="ad-vp-bs-bcount">{ele[Object.keys(ele)[0]]}</div>
                                            </div>
                                                )
                                            })}
                                            
                                            
                                            
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-inner">
                                    <div class="card-front">
                                        <p>This month</p>
                                        <div className="ad-emp-count">{count.data.Thismonth.fullcount}</div>

                                    </div>
                                    <div class="card-back">
                                    <div className="ad-vp-bs-head">Details</div>
                                        <div className="ad-vp-bs-body">

                                        {count.data.Thismonth.Count.map((ele,index)=>{
                                                return(
                                                                <div className="ad-vp-bs-subbody">
                                                <div className="ad-vp-bs-bname">{Object.keys(ele)[0]}</div>
                                                <div className="ad-vp-bs-bcount">{ele[Object.keys(ele)[0]]}</div>
                                            </div>
                                                )
                                            })}
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-inner">
                                    <div class="card-front">
                                        <p>Today</p>
                                        <div className="ad-emp-count">{count.data.Today.fullcount}</div>
                                    </div>
                                    <div class="card-back">
                                    <div className="ad-vp-bs-head">Details</div>
                                        <div className="ad-vp-bs-body">
                                        {count.data.Today.Count.map((ele,index)=>{
                                                return(
                                                                <div className="ad-vp-bs-subbody">
                                                <div className="ad-vp-bs-bname">{Object.keys(ele)[0]}</div>
                                                <div className="ad-vp-bs-bcount">{ele[Object.keys(ele)[0]]}</div>
                                            </div>
                                                )
                                            })}
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
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
                    {data.map((ele,index)=>{
                       return( ele!=null&& (<div className="ad-emp-mapitem">
                        <ul className="ad-emp-dataitem">
                           <span className='ad-emp-spanlen'>{index}. </span> 
                            
                        <li> {ele.name} </li>
                        <li> {ele.mobileNumber} </li>
                        {/* <li>{ele.Discription}</li> */}
                        <li> {ele.Service.type} </li>
                        <li> {ele.Service.Delivery.slice(0,10)} </li>
                        </ul>
                        <div className="ad-emp-inputdiv">

                        <button onClick={()=>handleviewbtn(ele)}>view</button>
                        </div>
                    </div>))
                    })

                    }
                                        

                </div>
            </div>

        </>
    );
}

export default ViewProgress;
