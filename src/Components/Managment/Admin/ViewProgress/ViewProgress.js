import React, { useEffect, useState } from 'react';
import './ViewProgress.css'
import { useLocation, useNavigate } from 'react-router-dom';
import dotsicon from '../../../images and tones/3dot.png'
import { Link } from 'react-router-dom';
import arrow from '../../../images and tones/downarrow.png'
import { GetCount } from '../../../../ApiCalls/AdminCalls/ProgressCalls';
const ViewProgress = (props) => {

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
        const res = await GetCount(location.state.id)
        setCount(res);
    }
    useEffect(()=>{
        onMount()


    // eslint-disable-next-line
},[])



    return (
        <>
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
                </div>
            </div>

        </>
    );
}

export default ViewProgress;
