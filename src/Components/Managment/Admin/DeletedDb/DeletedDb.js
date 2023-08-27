
import React, { useEffect, useRef, useState } from 'react';
import  './DeletedDb.css'
import serachicon from '../../../images and tones/search-icon.png'
import { Deleted_req } from '../../../../ApiCalls/AdminCalls/DBCalls';
import DeleteView from '../Views/DeleteView/DeleteView';

const DeletedDb = () => {



  //Logic for fetching the clients Data
  const [data,setData]=useState([
    {
    Service: {
      type: "",
      Date: "",
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
    const res = await Deleted_req();
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
    const scrolable = document.getElementById('ad-ddb-scrolable')

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
      setShowsearch(false)
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
    const handleviewbtn = (data)=>{
      setShowview(true);
      setViewdata(data)
    }

    const handlecloseviewbtn = ()=>{
      setShowview(false)
    }




  return (
    <>
    {showview &&<DeleteView closefunction={handlecloseviewbtn} data={viewdata}/>}
    <div className="ad-ddb-fullscreen">
      <div className="ad-ddb-centerdiv">
        <div className="ad-ddb-head">
          <h1 className="ad-ddb-hleft color-red">Deleted Data</h1>
          <div className="ad-ddb-hright">
            <div className="ad-ddb-serachdiv">
            <select name="type" id="" className='ad-ddb-selectip' onChange={handleIpdataChange} value={iptype}>
              <option value="0">---select---</option>
              <option value="name">Name</option>
              <option value="mobilenumber">MobileNumber</option>
            </select>
          
            <input type="text" className="ad-ddb-searchip" id='ad-ddb-serachip-client' placeholder='Search' onChange={handleIpChange} value={ipval}/>

            
            <button className="ad-ddb-searchbtn" onClick={handleSearch}>
              <img src={serachicon} alt="" />
            </button>
            {showsearch&&(<div className="ad-ddb-serachresut">
            {(  searchData.map((element)=>{
              return(
                <div className="ad-ddb-serachmapitem">
                <div className="ad-ddb-serachname">{element.name}</div>
                <div className="ad-ddb-serachname">{element.mobileNumber}</div>
                {/* <div className="ad-ddb-serachname">{element.Location}</div>
                <div className="ad-ddb-serachname">{element.Address}</div> */}
                <div className="ad-ddb-serachname">{element.Service.type}</div>
                <div className="ad-ddb-serachview">{element._id.length>2&&(<button onClick={()=>handleviewbtn(element)}>view</button>)}</div>
              </div>
              )
            }))}
            <div className="ad-ddb-serachmapitem">no Data To show</div>
            </div>)}
            
            </div>
           
          </div>

        </div>
        <div className="ad-ddb-body" id='ad-ddb-scrolable' onClick={close3dot}>
          {showdata&&(
            slicedData.map((ele,index)=>{
             return( <div className="ad-ddb-mapitem" key={ele._id}>
              <div className="ad-ddb-index">{startIndex+index+1}</div>
              <div className="ad-ddb-names">{ele.name}</div>
              <div className="ad-ddb-names"> {ele.mobileNumber}</div>
              {/* <div className="ad-ddb-names"> {ele.Service.Delivery.slice(0,10)}</div> */}
              <div className="ad-ddb-names">{ele.Service.type}</div>
              <div className="ad-ddb-names"> {ele.Discription}</div>
              <div className="ad-ddb-names ad-ddb-viewbtndiv"> <button className='ad-ddb-viewbtn' onClick={()=>handleviewbtn(ele)}>view</button></div>
            </div>)
            })
          )}
          {
            showmsg&&(
              <div className='ad-ddb-nmsg ad-ddb-mapitem'>{msg}</div>
            )
          }

       
        </div>

     {data.length>itemperpage&&( <div className="ad-ddb-pages">
        <ul className='ad-ddb-pages-ul'>
          <button  className={`ad-ddb-ul-prev ${currentPage<=1 ? `ad-ddb-disabled`:' '}`} onClick={handlePrevPage} disabled={currentPage<=1}>Prev</button>
          {Array.from({length:Math.ceil(data.length/itemperpage)},(_, index)=>{
            return(<li onClick={()=>{handlePageChange(index+1)}} className={currentPage === index+1 ? 'ad-ddb-pageactiv':' '} >{index+1}</li>)
          })}
          
          
          <button className={`ad-ddb-ul-prev ${(currentPage*itemperpage)>=data.length ? `ad-ddb-disabled`:' '}`} onClick={handleNextpage} disabled={(currentPage*itemperpage)>=data.length} >Next</button>
        </ul>
        
      </div>)}
      </div>
    </div>
     
    </>
  );
}



export default DeletedDb;
