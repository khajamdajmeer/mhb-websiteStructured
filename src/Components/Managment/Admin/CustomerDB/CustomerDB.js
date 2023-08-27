import React, { useEffect, useRef, useState } from 'react';
import './CustomerDB.css';
import serachicon from '../../../images and tones/search-icon.png'
import img3dots from '../../../images and tones/3dot.png'
import { CleintDB_Download,ClientId_DB,client_history } from '../../../../ApiCalls/AdminCalls/DBCalls';
import CustomerDBView from '../Views/CustomerDBView/CustomerDBView';

const CustomerDB = () => {

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
  const viewclients = async()=>{
    const res = await ClientId_DB();
    console.log(res.message)

    if(res.success){
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
    const scrolable = document.getElementById('ad-cdb-scrolable')

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
      mobilenumberString: "",
      CreatedDate:""
  
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
          if(item.mobilenumberString===ipval||item.mobilenumberString.includes(ipval)){
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
    
    //logic for view button 
    const [showview,setShowview]=useState(false)
    const [viewdata,setViewdata]=useState('')
    const [historydata,setHistorydata]=useState([])
    const handleviewbtn = async(data)=>{
        const res = await client_history(data._id);
        if(res.success){
            setHistorydata(res.message)

        }
      setShowview(true);
      setViewdata(data)
    }

    const handlecloseviewbtn = ()=>{
      setShowview(false)
    }




  return (
    <>
    {showview &&<CustomerDBView history={historydata} closefunction={handlecloseviewbtn} data={viewdata}/>}

    <div className="ad-cdb-fullscreen">
      <div className="ad-cdb-centerdiv">
        <div className="ad-cdb-head">
          <h1 className="ad-cdb-hleft">Customer DB</h1>
          <div className="ad-cdb-hright">
            <div className="ad-cdb-serachdiv">
            <select name="type" id="" className='ad-cdb-selectip' onChange={handleIpdataChange} value={iptype}>
              <option value="0">---select---</option>
              <option value="name">Name</option>
              <option value="mobilenumber">MobileNumber</option>
            </select>
            
            <input type="text" className="ad-cdb-searchip" id='ad-cdb-serachip-client' placeholder='Search' onChange={handleIpChange} value={ipval}/>


            <button className="ad-cdb-searchbtn" onClick={handleSearch}>
              <img src={serachicon} alt="" />
            </button>
            {showsearch&&(<div className="ad-cdb-serachresut">
            {(  searchData.map((element)=>{
              return(
                <div className="ad-cdb-serachmapitem">
                <div className="ad-cdb-serachname">{element.name}</div>
                <div className="ad-cdb-serachname">{element.mobileNumber}</div>
               
                
                <div className="ad-cdb-serachview">{element._id.length>2&&(<button onClick={()=>handleviewbtn(element)}>view</button>)}</div>
              </div>
              )
            }))}
            <div className="ad-cdb-serachmapitem">no Data To show</div>
            </div>)}
            
            </div>
            <div className='ad-cdb-3dot-hide'>
            <button className="ad-cdb-3dot" onClick={handleShowDwnload}>
              <img src={img3dots} alt="" />
            </button>
            {showDwnlod&&(<div className="ad-cdb-3dot-hbody" >
              {/* <button>view BlackList</button>
              <button>aka</button> */}
              <button onClick={handleDownload}>download all</button>
            </div>)}
            </div>
          </div>

        </div>
        <div className="ad-cdb-body" id='ad-cdb-scrolable' onClick={close3dot}>
          {showdata&&(
            slicedData.map((ele,index)=>{
             return( <div className="ad-cdb-mapitem" key={ele._id}>
              <div className="ad-cdb-index">{startIndex+index+1}</div>
              <div className="ad-cdb-names">{ele.name}</div>
              <div className="ad-cdb-names"> {ele.mobileNumber}</div>
              <div className="ad-cdb-names ad-cdb-viewbtndiv"> <button className='ad-cdb-viewbtn' onClick={()=>handleviewbtn(ele)}>view</button></div>
            </div>)
            })
          )}
          {
            showmsg&&(
              <div className='ad-cdb-nmsg ad-cdb-mapitem'>{msg}</div>
            )
          }

       
        </div>

     {data.length>itemperpage&&( <div className="ad-cdb-pages">
        <ul className='ad-cdb-pages-ul'>
          <button  className={`ad-cdb-ul-prev ${currentPage<=1 ? `ad-cdb-disabled`:' '}`} onClick={handlePrevPage} disabled={currentPage<=1}>Prev</button>
          {Array.from({length:Math.ceil(data.length/itemperpage)},(_, index)=>{
            return(<li onClick={()=>{handlePageChange(index+1)}} className={currentPage === index+1 ? 'ad-cdb-pageactiv':' '} >{index+1}</li>)
          })}
          
          
          <button className={`ad-cdb-ul-prev ${(currentPage*itemperpage)>=data.length ? `ad-cdb-disabled`:' '}`} onClick={handleNextpage} disabled={(currentPage*itemperpage)>=data.length} >Next</button>
        </ul>
        
      </div>)}
      </div>
    </div>
     
    </>
  );
}




export default CustomerDB;
