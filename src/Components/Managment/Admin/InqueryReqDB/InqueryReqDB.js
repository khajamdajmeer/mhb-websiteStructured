import React, { useEffect, useRef, useState } from 'react';
import './InqueryReqDB.css';
import serachicon from '../../../images and tones/search-icon.png'
import img3dots from '../../../images and tones/3dot.png'
import { CleintDB_Download,Inquery_Data } from '../../../../ApiCalls/AdminCalls/DBCalls';
import Inqueryview from '../Views/Inqueryview/Inqueryview';
import SkeletonLoader from '../../Common/SkeletonLoader/SkeletonLoader';
import { bindActionCreators } from 'redux';
import { useDispatch,useSelector } from 'react-redux';
import { actionCreator } from '../../../../Redux';
const InqueryReqDB = () => {
  
//using REdux for skelton loaders
const dispatch = useDispatch();
const {showloading,hideloading}=bindActionCreators(actionCreator,dispatch);
const loadingstate = useSelector(state=>state.load);

  //logic for showing downloadbtns
  const [showDwnlod,setShowDwnlod]=useState(false)
  const handleShowDwnload =()=>{
    setShowDwnlod(!showDwnlod)
  }

  //Logic for fetching the clients Data
  const [data,setData]=useState([
    {
    _id: "",
    name: "",
    mobileNumber: '',
    mobilenumberString: "",
  CreatedDate:'',
    __v: ""

  }])
  const [showdata,setShowdata]=useState(false)
  const [msg,setMsg]=useState('')
  const [showmsg,setShowmsg]=useState(false)
  const onMount = async()=>{
    showloading();
    const res = await Inquery_Data();
    if(res.success){
      setShowmsg(false);
      setShowdata(true);
      setData(res.message);
      hideloading();
    }
    else{
      setShowdata(false);
      setShowmsg(true);
      setMsg(res.message);
      hideloading();
    }
  }

  useEffect(()=>{
    onMount();
    // eslint-disable-next-line
  },[])

  //LOGIC FOR SHOWING 2O ITEMS PER PAGE
    const itemperpage=15;
    const [currentPage,setCurrentPage]=useState(1);
    const scrolable = document.getElementById('ad-ird-scrolable')

    const handlePageChange = (newPage)=>{
      setCurrentPage(newPage);
      scrolable.scrollTop=0;
    }
    const startIndex = (currentPage-1)*itemperpage;
    const endIndex = Math.min(startIndex + itemperpage,data.length);
    const slicedData = data.slice(startIndex,endIndex)

    const handleNextpage = ()=>{
      setCurrentPage(currentPage+1);
      scrolable.scrollTop=0;

    }
    const handlePrevPage =()=>{
      setCurrentPage(currentPage-1);
      scrolable.scrollTop=0;

    }
    //LOGIC TO CLOSE 3DOT BTNS ON CLICICKING ANYWHERE
    const close3dot = ()=>{
      setShowDwnlod(false)
      setShowsearch(false)
    }
   

    //LOGIC OF DOWNLODING THE ALL CLIENTS DATA
    const handleDownload = ()=>{
      CleintDB_Download(data)
    }

    //LOGIC FOR SEARCH TRIGERING A FUCTION ON STOPING THE TYPING FOR 1SEC
  
    const [searchData,setSearchData]=useState([
      {
      _id: "",
      name: "",
      mobileNumber: '',
      mobileNumberString: "",
      CallDate:""
    }])
    const [showsearch,setShowsearch]=useState(false)
    const [ipval,setIpval] =useState('');
    const [iptype,setIptype]=useState('');

    const typingTimeout = 1000;
    const handleIpChange = (e)=>{
      setIpval(e.target.value)
    }

    const handleIpdataChange = (e)=>{
      setIptype(e.target.value)

    }
    const handleSearch = () => {
      const filteredData = data.filter(item => {
        if(iptype==='name'){
          if(item.name===ipval||item.name.includes(ipval)){
            return true
          }
          return false
        }
        else if(iptype==='mobilenumber'){
          if(item.mobileNumberString===ipval||item.mobileNumberString.includes(ipval)){
            return true
          }
          return false
        }
        else if(iptype==='Date'){
            if(item.CallDate===ipval||item.CallDate.includes(ipval)){
                return true
              }
              return false
        }
        
        else{
          return false;
        }
      });
  
      // Use filteredData for display or further processing
      if(filteredData.length>=1){
        setSearchData(filteredData);
        setShowsearch(true)
        console.log(filteredData)
      }
      else{
        setSearchData([])
        setShowsearch(true)

      }
      if(iptype.length<2){
        setShowsearch(false)

      }
      
    };
    

    var typingTimer =useRef(null);
    useEffect(()=>{
      clearTimeout(typingTimer.current);
      typingTimer.current = setTimeout(()=>{
        setIpval(ipval)
        handleSearch();        
      },typingTimeout)
      // eslint-disable-next-line 
    },[ipval])

    //Logic for showing the view button
    const [ showview,setShowview]=useState(false);
    const [viewdata,setViewdata]=useState('')
    const hanldeviewbtn = (data)=>{
      console.log(data);
      setShowview(true);
      setViewdata(data);
    }
    const handlecloseview=()=>{setShowview(false)}
    
   




  return (
    <>
    {showview&&<Inqueryview data={viewdata} closeview={handlecloseview}/>}

    <div className="ad-ird-fullscreen">
      <div className="ad-ird-centerdiv">
        <div className="ad-ird-head">
          <h1 className="ad-ird-hleft">Inquery DB</h1>
          <div className="ad-ird-hright">
            <div className="ad-ird-serachdiv">
            <select name="type" id="" className='ad-ird-selectip' onChange={handleIpdataChange} value={iptype}>
              <option value="0">---select---</option>
              <option value="name">Name</option>
              <option value="mobilenumber">MobileNumber</option>
              <option value="Date">Date</option>
            </select>
            <input type={iptype==='Date' ? 'Date' : 'text'} className="ad-ird-searchip" id='ad-ird-serachip-client' placeholder='Search' onChange={handleIpChange} value={ipval}/>


            


            <button className="ad-ird-searchbtn" onClick={handleSearch}>
              <img src={serachicon} alt="" />
            </button>
            {showsearch&&(<div className="ad-ird-serachresut">
            {(  searchData.map((element)=>{
              return(
                <div className="ad-ird-serachmapitem">
                <div className="ad-ird-serachname">{element.name}</div>
                <div className="ad-ird-serachname">{element.mobileNumber}</div>
                <div className="ad-ird-serachname">{element.CallDate[0].slice(0,10)}</div>
                <div className="ad-ird-serachname">{element.Note}</div>
                <button className='ad-ird-viewbtn'>view</button>


                {/* <div className="ad-ird-serachview">{element._id.length>2&&(<button onClick={()=>handleviewbtn(element)}>view</button>)}</div> */}
              </div>
              )
            }))}
            <div className="ad-ird-serachmapitem">no Data To show</div>
            </div>)}
            
            </div>
            <div className='ad-ird-3dot-hide'>
            <button className="ad-ird-3dot" onClick={handleShowDwnload}>
              <img src={img3dots} alt="" />
            </button>
            {showDwnlod&&(<div className="ad-ird-3dot-hbody" >
              {/* <button>view BlackList</button>
              <button>aka</button> */}
              <button onClick={handleDownload}>download all</button>
            </div>)}
            </div>
          </div>

        </div>
        <div className="ad-ird-body" id='ad-ird-scrolable' onClick={close3dot}>
        {loadingstate&&<SkeletonLoader/>}
          {showdata&&(
            slicedData.map((ele,index)=>{
             return( <div className="ad-ird-mapitem" key={ele._id}>
              <div className="ad-ird-index">{startIndex+index+1}</div>
              <div className="ad-ird-names">{ele.name}</div>
              <div className="ad-ird-names"> {ele.mobileNumber}</div>
              <div className="ad-ird-names"> {ele.LastCallDate.slice(0,10)}</div>
              <div className="ad-ird-names"> {ele.Note[ele.Note.length-1]}</div>
               <button className='ad-ird-viewbtn' onClick={()=>hanldeviewbtn(ele)}>view</button>

              {/* <div className="ad-ird-names ad-ird-viewbtndiv"> <button className='ad-ird-viewbtn' onClick={()=>handleviewbtn(ele)}>view</button></div> */}
            </div>)
            })
          )}
          {
            showmsg&&(
              <div className='ad-ird-nmsg ad-ird-mapitem'>{msg}</div>
            )
          }

       
        </div>

     {data.length>itemperpage&&( <div className="ad-ird-pages">
        <ul className='ad-ird-pages-ul'>
          <button  className={`ad-ird-ul-prev ${currentPage<=1 ? `ad-ird-disabled`:' '}`} onClick={handlePrevPage} disabled={currentPage<=1}>Prev</button>
          {Array.from({length:Math.ceil(data.length/itemperpage)},(_, index)=>{
            return(<li onClick={()=>{handlePageChange(index+1)}} className={currentPage === index+1 ? 'ad-ird-pageactiv':' '} >{index+1}</li>)
          })}
          <button className={`ad-ird-ul-prev ${(currentPage*itemperpage)>=data.length ? `ad-ird-disabled`:' '}`} onClick={handleNextpage} disabled={(currentPage*itemperpage)>=data.length} >Next</button>
        </ul>
      </div>)}
      </div>
    </div>
     
    </>
  );
}






export default InqueryReqDB;
