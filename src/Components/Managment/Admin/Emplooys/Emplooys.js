import React, {  useEffect, useState } from 'react';
import './Emplooys.css'
import arrow from '../../../images and tones/downarrow.png'
import { AllEmploydata } from '../../../../ApiCalls/AdminCalls/EmplooyCalls';
import plus from '../../../images and tones/plus.png'
import { Link } from 'react-router-dom';
import progressicon from '../../../images and tones/progess-icon.png';
import SkeletonLoader from '../../Common/SkeletonLoader/SkeletonLoader';
import { bindActionCreators } from 'redux';
import { useDispatch,useSelector } from 'react-redux';
import { actionCreator } from '../../../../Redux';
const Emplooys = () => {

  //using REdux for skelton loaders
const dispatch = useDispatch();
const {showloading,hideloading}=bindActionCreators(actionCreator,dispatch);
const loadingstate = useSelector(state=>state.load);

  // const data = [{test:'1'},{test:'1'},{test:'1'},{test:'1'},]

  const [data,setData] = useState([{
    _id:'',name:'',age:'',mobilenumber:'',joiningdate:'',AdharNumber:'',presentAdress:'',designation:''
    ,username:''
  }])

  const onMount = async()=>{
    showloading();
   const res = await AllEmploydata();
   if(res.length>=1){
     setData(res)
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

  const [activeindex,setActiveindex]=useState();
  const toggleWrap = (index)=>{
    setActiveindex(activeindex===index?null:index);
  }

  return (
    <>
     <div className="ad-em-fullscreen">
      <div className="ad-em-center">
        <h1 className="ad-em-heading">
          Employs data
        </h1>
        <div className="ad-em-scrolable">
        {loadingstate&&<SkeletonLoader/>}


{
  data.map((ele,index)=>{
        return(
          < >
        <div key={ele._id} className={`ad-em-id-data ${activeindex===index? 'ad-em-id-data-wrap':''}`}>
          <div className="ad-em-edata" onClick={()=>toggleWrap(index)}>
            <div className="ad-emleft">
              <div className="ad-leftname">{ele.name}</div>
              {ele.designation!=='Manager'&&(
              <div className="ad-leftrole colortech">{ele.designation}</div>

              )

              }
              {ele.designation==='Manager'&&(
              <div className="ad-leftrole">{ele.designation}</div>
              )}
              
              {/* 
              <div className="ad-leftcount">aabbbaaaa</div> */}
            </div>
            <Link state={{id:ele._id,name:ele.name,role:ele.designation,mobile:ele.mobilenumber}} to='/admindashboard/progress' className='ad-em-updatelink'>
             <span>view progress</span> 
              <img src={progressicon} alt="" />
              </Link>
            <div className="ad-emright">
              <img src={arrow} alt="" /></div>
          </div>
          <div className="ad-em-rdata">
            {/* <button className='info-dots'> <img src={dotsicom} alt="" /></button> */}
          <div className="ad-em-rdata-center">
            <ul>
              <li className='ad-em-lileft'>name:</li>
              <li className='ad-em-liright'>{ele.name}</li>
            </ul>
            <ul>
              <li className='ad-em-lileft'>age:</li>
              <li className='ad-em-liright'>{ele.age}</li>
            </ul><ul>
              <li className='ad-em-lileft'>mobile:</li>
              <li className='ad-em-liright'>{ele.mobilenumber}</li>
            </ul><ul>
              <li className='ad-em-lileft'>Username:</li>
              <li className='ad-em-liright'>{ele.username}</li>
            </ul>
            <ul>
              <li className='ad-em-lileft'>email:</li>
              <li className='ad-em-liright'>{ele.email}</li>
            </ul>
            <ul>
              <li className='ad-em-lileft'>Joining Date:</li>
              <li className='ad-em-liright'>{ele.joiningdate}</li>
            </ul>
            <ul>
              <li className='ad-em-lileft'>Adhar no:</li>
              <li className='ad-em-liright'>{ele.AdharNumber}</li>
            </ul>
            <ul>
              <li className='ad-em-lileft'>Role:</li>
              <li className='ad-em-liright'>{ele.designation}</li>
            </ul>
            <ul>
              <li className='ad-em-lileft'>Address:</li>
              <li className='ad-em-liright'>{ele.presentAdress}</li>
            </ul>

            <ul className='ad-em-pabsolute'>
              {/* <li className='ad-em-lileft'><Link state={{id:ele._id,name:ele.name,role:ele.designation,mobile:ele.mobilenumber}} to='/admindashboard/progress' className='ad-em-updatelink'>view progress</Link></li> */}
              {/* <li className='ad-em-liright'><Link to='/admindashboard/updateemplooy' state={{id:ele._id}} className='ad-em-updatelink'>Update Data</Link></li> */}
            </ul>
            
            
          </div>
            
          </div>
        </div>
        </>
        
        )

  })
}
        
        </div>

      
        <Link className='ad-em-add' to='/admindashboard/newemplooy' >
          <img className='ad-em-plusimg'src={plus} alt="" />
        </Link>
      </div>
     </div>
    </>
  );
}

export default Emplooys;
