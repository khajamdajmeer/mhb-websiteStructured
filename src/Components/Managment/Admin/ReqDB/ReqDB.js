import React, { useEffect, useRef, useState } from 'react';
import './ReqDB.css';
import serachicon from '../../../images and tones/search-icon.png'
import img3dots from '../../../images and tones/3dot.png'
import { newDownload,ViewRequest } from '../../../../ApiCalls/AdminCalls/DBCalls';
import ReqView from '../Views/ReqView/ReqView';

const ReqDB = () => {

  //Logic for the real data 
  const [realdata,setRealdata]=useState([]);

  //logic for showing downloadbtns
  const [showDwnlod,setShowDwnlod]=useState(false)
  const handleShowDwnload =()=>{
    setShowDwnlod(!showDwnlod)
  }

  //Logic for fetching the clients Data
  const [data,setData]=useState([
    {
    Service: {
      type: "",
      Date: "",
      Delivery: ""
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
    Address: "",
    Requestdate: "",
    Discription: "",
    __v: ""

  }])
  const [showdata,setShowdata]=useState(false)
  const [msg,setMsg]=useState('')
  const [showmsg,setShowmsg]=useState(false)
  const viewclients = async()=>{
    const res = await ViewRequest();

    if(res.success){
      setRealdata(res.message)
      setShowmsg(false);
      setShowdata(true)
      setData(res.message)
    }
    else{
      setShowdata(false)
      setShowmsg(true);
      setMsg(res.message)
    }
  }

  useEffect(()=>{
    viewclients();
  },[])

  //LOGIC FOR SHOWING 2O ITEMS PER PAGE
    const itemperpage=15;
    const [currentPage,setCurrentPage]=useState(1);
    const scrolable = document.getElementById('ad-rdb-scrolable')

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
      newDownload(data)
    }

    //LOGIC FOR SEARCH TRIGERING A FUCTION ON STOPING THE TYPING FOR 1SEC
  
    const [searchData,setSearchData]=useState([
      {
      
      _id: "",
      name: "",
      mobileNumber: '',
      mobilenumberString: "",
      Location: "",
      Address: "",
      ServiceDate:'',
      ServiceType:'',
      Requestdate: "",
      Note: "",
      __v: ""
  
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
      setData(realdata)

    }
    const handleSearch = () => {
      const filteredData = realdata.filter(item => {
        if(iptype==='name'){
          if(item.name.toLowerCase()===ipval.toLowerCase()||item.name.toLowerCase().includes(ipval.toLowerCase())){
            return true
          }
          return false
        }
        else if(iptype==='mobilenumber'){
          if(item.mobilenumberString===ipval||item.mobilenumberString.includes(ipval)){
            return true
          }
          return false
        }
        else if(iptype==='Date'){
          if(item.ServiceDate.slice(0,10)===ipval||item.ServiceDate.includes(ipval)){
            console.log(item)
            return true;
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
        setData(filteredData)
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
    
    //logic for view button 
    const [showview,setShowview]=useState(false)
    const [viewdata,setViewdata]=useState('')
    const handleviewbtn = (data)=>{
      setShowview(true);
      setViewdata(data)
    }

    const handlecloseviewbtn = ()=>{
      setShowview(false)
    }




  return (
    <>
    {showview &&<ReqView closefunction={handlecloseviewbtn} data={viewdata}/>}
    <div className="ad-rdb-fullscreen">
      <div className="ad-rdb-centerdiv">
        <div className="ad-rdb-head">
          <h1 className="ad-rdb-hleft">Request DB</h1>
          <div className="ad-rdb-hright">
            <div className="ad-rdb-serachdiv">
            <select name="type" id="" className='ad-rdb-selectip' onChange={handleIpdataChange} value={iptype}>
              <option value="0">---select---</option>
              <option value="name">Name</option>
              <option value="mobilenumber">MobileNumber</option>
              <option value="Date">Date</option>
            </select>
            {iptype==='Date'? (
            <input type="date" className="ad-rdb-searchip" id='ad-rdb-serachip-client' placeholder='Search' onChange={handleIpChange} value={ipval} />
            ):
            (
            <input type="text" className="ad-rdb-searchip" id='ad-rdb-serachip-client' placeholder='Search' onChange={handleIpChange} value={ipval}/>

            )

            }
            <button className="ad-rdb-searchbtn" onClick={handleSearch}>
              <img src={serachicon} alt="" />
            </button>
            {showsearch&&(<div className="ad-rdb-serachresut">
            {(  searchData.map((element)=>{
              return(
                <div className="ad-rdb-serachmapitem">
                <div className="ad-rdb-serachname">{element.name}</div>
                <div className="ad-rdb-serachname">{element.mobileNumber}</div>
                {/* <div className="ad-rdb-serachname">{element.Location}</div>
                <div className="ad-rdb-serachname">{element.Address}</div> */}
                <div className="ad-rdb-serachname">{element.ServiceType}</div>
                <div className="ad-rdb-serachname">{element.ServiceDate.slice(0,10)}</div>
                <div className="ad-rdb-serachview">{element._id.length>2&&(<button onClick={()=>handleviewbtn(element)}>view</button>)}</div>
              </div>
              )
            }))}
            <div className="ad-rdb-serachmapitem">no Data To show</div>
            </div>)}
            
            </div>
            <div className='ad-rdb-3dot-hide'>
            <button className="ad-rdb-3dot" onClick={handleShowDwnload}>
              <img src={img3dots} alt="" />
            </button>
            {showDwnlod&&(<div className="ad-rdb-3dot-hbody" >
              {/* <button>view BlackList</button>
              <button>aka</button> */}
              <button onClick={handleDownload}>download all</button>
            </div>)}
            </div>
          </div>

        </div>
        <div className="ad-rdb-body" id='ad-rdb-scrolable' onClick={close3dot}>
          {showdata&&(
            slicedData.map((ele,index)=>{
             return( <div className="ad-rdb-mapitem" key={ele._id}>
              <div className="ad-rdb-index">{startIndex+index+1}</div>
              <div className="ad-rdb-names">{ele.name}</div>
              <div className="ad-rdb-names"> {ele.mobileNumber}</div>
              <div className="ad-rdb-names"> {ele.ServiceDate.slice(0,10)}</div>
              <div className="ad-rdb-names">{ele.ServiceType}</div>
              <div className="ad-rdb-names"> {ele.Note}</div>
              <div className="ad-rdb-names ad-rdb-viewbtndiv"> <button className='ad-rdb-viewbtn' onClick={()=>handleviewbtn(ele)}>view</button></div>
            </div>)
            })
          )}
          {
            showmsg&&(
              <div className='ad-rdb-nmsg ad-rdb-mapitem'>{msg}</div>
            )
          }

       
        </div>

     {data.length>itemperpage&&( <div className="ad-rdb-pages">
        <ul className='ad-rdb-pages-ul'>
          <button  className={`ad-rdb-ul-prev ${currentPage<=1 ? `ad-rdb-disabled`:' '}`} onClick={handlePrevPage} disabled={currentPage<=1}>Prev</button>
          {Array.from({length:Math.ceil(data.length/itemperpage)},(_, index)=>{
            return(<li onClick={()=>{handlePageChange(index+1)}} className={currentPage === index+1 ? 'ad-rdb-pageactiv':' '} >{index+1}</li>)
          })}
          
          
          <button className={`ad-rdb-ul-prev ${(currentPage*itemperpage)>=data.length ? `ad-rdb-disabled`:' '}`} onClick={handleNextpage} disabled={(currentPage*itemperpage)>=data.length} >Next</button>
        </ul>
        
      </div>)}
      </div>
    </div>
     
    </>
  );
}



export default ReqDB;
