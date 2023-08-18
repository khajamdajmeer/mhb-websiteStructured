import React, { useEffect, useState } from 'react';
import './ViewTechreq.css';
import { GetTechReq } from '../../../../ApiCalls/ManagerCalls/RequestCall';
import {actionCreator} from '../../../../Redux/index'
import { useDispatch,useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import dots from '../../../images and tones/3dot.png'
import { useNavigate } from 'react-router-dom';
import DeleteMsg from '../DeleteMsg/DeleteMsg';

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
    const token = localStorage.getItem('auth-token')
    const level = localStorage.getItem('level')
    if(!token||level!=='L2'){
      localStorage.clear()
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

 




  return (
    <>
    {showDelete&&(<DeleteMsg newdata={deleteData} handlecancle={handleCancleDelete}/>)}
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
                      <div className="ma-vtr-dhead-body">{ele.data.length}</div>
                      {/* <div className="ma-vtr-dhead-body">this is body</div> */}
                    </div>
      
                    <div className="ma-vtr-dbody">
                      {ele.data.map((element,iindex)=>{
                        return(
                          <>
                          <div className={`ma-vtr-dreq ${element.Accepted ? 'ma-vtr-colorgreen':''}`}>
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
                              <button onClick={()=>handleDelete(element)}>delete</button>
                              <button>revert</button>
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
