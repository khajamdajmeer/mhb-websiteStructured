import React, { useEffect, useRef, useState } from 'react';
import './Clients.css';
import serachicon from '../../../images and tones/search-icon.png'
import img3dots from '../../../images and tones/3dot.png'
import { ViewClients,newDownload } from '../../../../ApiCalls/AdminCalls/DBCalls';
import ClientView from '../ClientView/ClientView';

const Clients = () => {
  //logic for real data
  const [realdata,setRealdata]=useState([])

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
    const res = await ViewClients();
    if(res.success){
      setShowmsg(false);
      setShowdata(true)
      setData(res.message)
      setRealdata(res.message)
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
    const scrolable = document.getElementById('ad-c-scrolable')

    const handlePageChange = (newPage)=>{
      setCurrentPage(newPage);
      scrolable.scrollTop=0;
    }
//LOGIC TO SORT THE DATA FROM LATEST DATE TO OLD DATE
    const sortDataByDate = [...data].sort((a, b) => {
      // Assuming 'Date' is a property inside 'Service'
      const dateA = new Date(a.Service.Delivery);
      const dateB = new Date(b.Service.Delivery);
    
      // Extract only the date part (year, month, and day)
      const datePartA = new Date(dateA.getFullYear(), dateA.getMonth(), dateA.getDate());
      const datePartB = new Date(dateB.getFullYear(), dateB.getMonth(), dateB.getDate());
    
      // Compare the date parts
      if (datePartA < datePartB) return 1;
      if (datePartA > datePartB) return -1;
      return 0;
    });
    

    const startIndex = (currentPage-1)*itemperpage;
    const endIndex = Math.min(startIndex + itemperpage,data.length);
    const slicedData = sortDataByDate.slice(startIndex,endIndex)

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
          if(item.Service.Delivery.slice(0,10)===ipval||item.Service.Delivery.includes(ipval)){
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

    const today = new Date().toISOString().split('T')[0];



  return (
    <>
    {showview &&<ClientView closefunction={handlecloseviewbtn} data={viewdata}/>}
    <div className="ad-c-fullscreen">
      <div className="ad-c-centerdiv">
        <div className="ad-c-head">
          <h1 className="ad-c-hleft">Service Data</h1>
          <div className="ad-c-hright">
            <div className="ad-c-serachdiv">
            <select name="type" id="" className='ad-c-selectip' onChange={handleIpdataChange} value={iptype}>
              <option value="0">---select---</option>
              <option value="name">Name</option>
              <option value="mobilenumber">MobileNumber</option>
              <option value="Date">Date</option>
            </select>
            {iptype==='Date'? (
            <input type="date" className="ad-c-searchip" id='ad-c-serachip-client' placeholder='Search' onChange={handleIpChange} value={ipval} max={today}/>
            ):
            (
            <input type="text" className="ad-c-searchip" id='ad-c-serachip-client' placeholder='Search' onChange={handleIpChange} value={ipval}/>

            )

            }
            <button className="ad-c-searchbtn" onClick={handleSearch}>
              <img src={serachicon} alt="" />
            </button>
            {showsearch&&(<div className="ad-c-serachresut">
            {(  searchData.map((element)=>{
              return(
                <div className="ad-c-serachmapitem">
                <div className="ad-c-serachname">{element.name}</div>
                <div className="ad-c-serachname">{element.mobileNumber}</div>
                {/* <div className="ad-c-serachname">{element.Location}</div>
                <div className="ad-c-serachname">{element.Address}</div> */}
                <div className="ad-c-serachname">{element.Service.type}</div>
                <div className="ad-c-serachname">{element.Service.Delivery.slice(0,10)}</div>
                <div className="ad-c-serachview">{element._id.length>2&&(<button onClick={()=>handleviewbtn(element)}>view</button>)}</div>
              </div>
              )
            }))}
            <div className="ad-c-serachmapitem">no Data To show</div>
            </div>)}
            
            </div>
            <div className='ad-c-3dot-hide'>
            <button className="ad-c-3dot" onClick={handleShowDwnload}>
              <img src={img3dots} alt="" />
            </button>
            {showDwnlod&&(<div className="ad-c-3dot-hbody" >
              {/* <button>view BlackList</button>
              <button>aka</button> */}
              <button onClick={handleDownload}>download all</button>
            </div>)}
            </div>
          </div>

        </div>
        <div className="ad-c-body" id='ad-c-scrolable' onClick={close3dot}>
          {showdata&&(
            slicedData.map((ele,index)=>{
             return( <div className="ad-c-mapitem" key={ele._id}>
              <div className="ad-c-index">{sortDataByDate.length-startIndex-index}</div>
              <div className="ad-c-names">{ele.name}</div>
              <div className="ad-c-names"> {ele.mobileNumber}</div>
              <div className="ad-c-names"> {ele.Service.Delivery.slice(0,10)}</div>
              <div className="ad-c-names">{ele.Service.type}</div>
              <div className="ad-c-names"> {ele.Discription}</div>
              <div className="ad-c-names ad-c-viewbtndiv"> <button className='ad-c-viewbtn' onClick={()=>handleviewbtn(ele)}>view</button></div>
            </div>)
            })
          )}
          {
            showmsg&&(
              <div className='ad-c-nmsg ad-c-mapitem'>{msg}</div>
            )
          }

       
        </div>

     {data.length>itemperpage&&( <div className="ad-c-pages">
        <ul className='ad-c-pages-ul'>
          <button  className={`ad-c-ul-prev ${currentPage<=1 ? `ad-c-disabled`:' '}`} onClick={handlePrevPage} disabled={currentPage<=1}>Prev</button>
          {Array.from({length:Math.ceil(data.length/itemperpage)},(_, index)=>{
            return(<li onClick={()=>{handlePageChange(index+1)}} className={currentPage === index+1 ? 'ad-c-pageactiv':' '} >{index+1}</li>)
          })}
          
          
          <button className={`ad-c-ul-prev ${(currentPage*itemperpage)>=data.length ? `ad-c-disabled`:' '}`} onClick={handleNextpage} disabled={(currentPage*itemperpage)>=data.length} >Next</button>
        </ul>
        
      </div>)}
      </div>
    </div>
     
    </>
  );
}

export default Clients;
