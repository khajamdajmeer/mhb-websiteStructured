import React, { useEffect, useRef, useState } from 'react';
import './Inquery.css';
import serachicon from '../../../../images and tones/search-icon.png'
// import img3dots from '../../../images and tones/3dot.png'
import { getInqueryDb } from '../../../../../ApiCalls/ManagerCalls/RequestCall';
import View from './view/view';
const Inquery = () => {




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
    const res = await getInqueryDb();
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
    onMount();
  },[])

  //LOGIC FOR SHOWING 2O ITEMS PER PAGE
    const itemperpage=15;
    const [currentPage,setCurrentPage]=useState(1);
    const scrolable = document.getElementById('ma-irdd-scrolable')

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
    {showview&&<View data={viewdata} closeview={handlecloseview}/>}

    <div className="ma-irdd-fullscreen">
      <div className="ma-irdd-centerdiv">
        <div className="ma-irdd-head">
          <h1 className="ma-irdd-hleft">Inquery DB</h1>
          <div className="ma-irdd-hright">
            <div className="ma-irdd-serachdiv">
            <select name="type" id="" className='ma-irdd-selectip' onChange={handleIpdataChange} value={iptype}>
              <option value="0">---select---</option>
              <option value="name">Name</option>
              <option value="mobilenumber">MobileNumber</option>
              <option value="Date">Date</option>
            </select>
            <input type={iptype==='Date' ? 'Date' : 'text'} className="ma-irdd-searchip" id='ma-irdd-serachip-client' placeholder='Search' onChange={handleIpChange} value={ipval}/>


            


            <button className="ma-irdd-searchbtn" onClick={handleSearch}>
              <img src={serachicon} alt="" />
            </button>
            {showsearch&&(<div className="ma-irdd-serachresut">
            {(  searchData.map((element)=>{
              return(
                <div className="ma-irdd-serachmapitem">
                <div className="ma-irdd-serachname">{element.name}</div>
                <div className="ma-irdd-serachname">{element.mobileNumber}</div>
                <div className="ma-irdd-serachname">{element.CallDate[0].slice(0,10)}</div>
                <div className="ma-irdd-serachname">{element.Note}</div>
                <button className='ma-irdd-viewbtn'>view</button>


                {/* <div className="ma-irdd-serachview">{element._id.length>2&&(<button onClick={()=>handleviewbtn(element)}>view</button>)}</div> */}
              </div>
              )
            }))}
            <div className="ma-irdd-serachmapitem">no Data To show</div>
            </div>)}
            
            </div>
          
          </div>

        </div>
        <div className="ma-irdd-body" id='ma-irdd-scrolable' onClick={close3dot}>
          {showdata&&(
            slicedData.map((ele,index)=>{
             return( <div className="ma-irdd-mapitem" key={ele._id}>
              <div className="ma-irdd-index">{startIndex+index+1}</div>
              <div className="ma-irdd-names">{ele.name}</div>
              <div className="ma-irdd-names"> {ele.mobileNumber}</div>
              <div className="ma-irdd-names"> {ele.LastCallDate.slice(0,10)}</div>
              <div className="ma-irdd-names"> {ele.Note[ele.Note.length-1]}</div>
               <button className='ma-irdd-viewbtn' onClick={()=>hanldeviewbtn(ele)}>view</button>

              {/* <div className="ma-irdd-names ma-irdd-viewbtndiv"> <button className='ma-irdd-viewbtn' onClick={()=>handleviewbtn(ele)}>view</button></div> */}
            </div>)
            })
          )}
          {
            showmsg&&(
              <div className='ma-irdd-nmsg ma-irdd-mapitem'>{msg}</div>
            )
          }

       
        </div>

     {data.length>itemperpage&&( <div className="ma-irdd-pages">
        <ul className='ma-irdd-pages-ul'>
          <button  className={`ma-irdd-ul-prev ${currentPage<=1 ? `ma-irdd-disabled`:' '}`} onClick={handlePrevPage} disabled={currentPage<=1}>Prev</button>
          {Array.from({length:Math.ceil(data.length/itemperpage)},(_, index)=>{
            return(<li onClick={()=>{handlePageChange(index+1)}} className={currentPage === index+1 ? 'ma-irdd-pageactiv':' '} >{index+1}</li>)
          })}
          <button className={`ma-irdd-ul-prev ${(currentPage*itemperpage)>=data.length ? `ma-irdd-disabled`:' '}`} onClick={handleNextpage} disabled={(currentPage*itemperpage)>=data.length} >Next</button>
        </ul>
      </div>)}
      </div>
    </div>
     
    </>
  );
}









export default Inquery;
