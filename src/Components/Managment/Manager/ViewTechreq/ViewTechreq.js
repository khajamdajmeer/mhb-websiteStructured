import React, { useEffect, useState } from 'react';
import './ViewTechreq.css';
import { GetTechReq,AcceptTechReq,TechfinishReq } from '../../../../ApiCalls/ManagerCalls/RequestCall';
import {actionCreator} from '../../../../Redux/index'
import { useDispatch,useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import dots from '../../../images and tones/3dot.png'
import { useNavigate } from 'react-router-dom';
import DeleteMsg from '../DeleteMsg/DeleteMsg';
import RevertMsg from '../RevertMsg/RevertMsg';
import Cookies from 'js-cookie';
import Message from '../../Common/Message/Message';
import TechreqView from '../TechreqView/TechreqView';
const ViewTechreq = () => {
  const history = useNavigate();

  const [activeIndex,setActiveIndex]=useState(null);
  const [btnindex,setBtnindex]=useState(null);
  
const [data,setData]=useState([
  {_id:'',name:'',mobile:'',data:[ {
    Service: {
      type:'',
      Date: "",
      Service: ""
    },
    Technicain: {
      name: "",
      id: ""
    },
    forworded: {
      name: "",
      id: ""
    },
    _id: "",
    name: "",
    mobileNumber: '',
    mobilenumberString: "",
    Location: "",
    Address: "  ",
    Requestdate: "",
    Accepted: '',
    __v: 0
  }]}
])
const dispatch= useDispatch()
const {showloading,hideloading} = bindActionCreators(actionCreator,dispatch)
const loadinstate = useSelector(state=>state.load)
  //functions to load onMount
  const onMount=async()=>{
    showloading();
    const res = await GetTechReq();
    console.log(res)
    if(res.success){
      setData(res.data)
      hideloading();
    }
    else{
      hideloading();
    }
    
  }
  const validationcheck = ()=>{
    const token = Cookies.get('auth-token')
    const level = Cookies.get('level')
    if(!token||level==='L3'){
      const cookies = Cookies.get();
      for(const cookie in cookies){
        Cookies.remove(cookie)
      }
      history('/service')
      return false;
    } else{
      return true
    }
    
  }


  useEffect(()=>{
    const valid = validationcheck();
    if(valid){

      onMount();
    }

// eslint-disable-next-line
  },[])




  const handlewrap = (index)=>{
  setActiveIndex(activeIndex === index ? null : index)
  setBtnindex(null)

  }
  const handle3dots = (iindex)=>{
    setBtnindex(btnindex===iindex?null:iindex)
  }
//LOGIC FOR THE DELETE FUNCION
const [showDelete,setShowDelete]=useState(false);
const [deleteData,setDeleteData]=useState('')
const handleDelete = (data)=>{
  setShowDelete(true);
  setDeleteData(data);
  
}
const handleCancleDelete = ()=>{
  onMount();
  setShowDelete(false)
}
///HANDLING REVERT BUTTON LOGIC HERE
const [showRevert,setShowRevert]=useState(false)
const [RevertData,setRevertData]=useState('')
const [oldTid,setOldTid]=useState('')
 const handleRevert =(data,tid)=>{
  setShowRevert(true)
  setRevertData(data)
  setOldTid(tid)

 }
 const handleCancleRevert=()=>{
  setShowRevert(false);
  onMount();
  setBtnindex(null)
 }



 ///LOGIC FOR HANDLING THE ACCEPT REQUEST
 const [showmsg,setShowmsg]=useState(false)
 const [msg,setMsg]=useState('')
 const handleAccept = async(id)=>{
  const res = await AcceptTechReq(id);
  if(res.success){
    setShowmsg(true);
    setMsg(res.message)
  }
  onMount();
  setTimeout(()=>{
    setShowmsg(false)
  },2000)
 }
//LOGIC FOR HANDLING THE VIEW BTN
const [showviewreq,setShowviewreq]=useState(false);
const [reqviewdata,setReqviewdata]=useState({})
const handleView = (data)=>{
  setShowviewreq(true);
  setReqviewdata(data);

}
const handlecancle = ()=>{
  setShowviewreq(false)
  onMount();
}
const handleClose=async(id)=>{
  const res=await TechfinishReq(id);
  console.log(res)
  if(res.Success){
    onMount();
    setShowmsg(true);
    setMsg(res.message)
  }
  setTimeout(()=>{
    setShowmsg(false)
  },2000)

}

  return (
    <>
    {showDelete&&(<DeleteMsg newdata={deleteData} handlecancle={handleCancleDelete}/>)}
    {showRevert&&(<RevertMsg newdata={RevertData} tid={oldTid} handlecancle={handleCancleRevert}/>)}
    {showmsg&&(<Message message={msg}/>)}
    {showviewreq&&(<TechreqView data={reqviewdata} handlecancle={handlecancle}/>)}
      <div className="viewtechrequest">

        <div className="techcenterdiv">
          <div className="navtopfortech">
            <div className="techleft">Tech Requests</div>
          </div>
          <div className="ma-vtr-bottom">
            {
              data.map((ele,index)=>{
                return(
                  <>
                  {ele._id.length>2&&(
                    <div className={`ma-vtr-fullhead ${activeIndex===index ? 'ma-vtr-openwrap':''}`}>
                    <div className="ma-vtr-dhead" onClick={()=>handlewrap(index)}>
                      <div className="ma-vtr-dhead-body">{ele.name}</div>
                      <div className="ma-vtr-dhead-body">{ele.mobile}</div>
                      <div className="ma-vtr-dhead-body"><div className='ma-vtr-count'>{ele.data.length}</div></div>
                      {/* <div className="ma-vtr-dhead-body">this is body</div> */}
                    </div>
      
                    <div className="ma-vtr-dbody">
                      {ele.data.map((element,iindex)=>{
                        return(
                          <>
                          <div className={`ma-vtr-dreq ${element.Accepted ? 'ma-vtr-colorgreen':''} ${element.Complain ? 'complainbg':''}`}>
                        <div className="ma-vtr-name">
                          {element.name}
                          </div>
                        <div className="ma-vtr-name">{element.mobileNumber}</div>
                        <div className="ma-vtr-name">{element.Location}</div>
                        <div className="ma-vtr-name">{element.Service.type}</div>
                        <div className="ma-vtr-name">{element.Requestdate.slice(0,10)}</div>
                        <div className="ma-vtr-name">
      
                        <button className='ma-vtr-btn' onClick={()=>handle3dots(iindex)}><img src={dots} alt="" /></button>
                        {activeIndex===index &&btnindex===iindex&&(
                          <div className="ma-vtr-dbtn">
                            <button onClick={()=>handleView(element)}>view</button>
                              <button disabled={element.Accepted} onClick={()=>handleAccept(element._id) }>Accept</button>
                              <button onClick={()=>handleRevert(element,ele._id)}>revert</button>
                              <button onClick={()=>handleDelete(element)}>delete</button>
                            <button onClick={()=>handleClose(element._id)}>Close Req</button>
                            </div>
                        )

                        }
                            
                        </div>
                       </div>
                          
                          </>
                        )
                      })
      
                      }
                       
                       
                    
                    </div>
                   </div>
                  )}

             </>
                )
              })
            }
            {loadinstate&&(
              <>
            <div className="ma-vtr-dhead-loader"></div>
            <div className="ma-vtr-dhead-loader"></div>
            <div className="ma-vtr-dhead-loader"></div>
            <div className="ma-vtr-dhead-loader"></div>
            <div className="ma-vtr-dhead-loader"></div>
            <div className="ma-vtr-dhead-loader"></div>
            <div className="ma-vtr-dhead-loader"></div>
            <div className="ma-vtr-dhead-loader"></div>
            </>

            )}
           

          </div>
      
         
          </div>
        </div>


    </>
  );
}

export default ViewTechreq;
