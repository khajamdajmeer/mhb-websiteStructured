import React, { useState } from 'react';
import './Clients.css';
import serachicon from '../../../images and tones/search-icon.png'
import img3dots from '../../../images and tones/3dot.png'

const Clients = () => {

  //logic for showing downloadbtns
  const [showDwnlod,setShowDwnlod]=useState(false)
  const handleShowDwnload =()=>{
    setShowDwnlod(!showDwnlod)
  }


  return (
    <>
    <div className="ad-c-fullscreen">
      <div className="ad-c-centerdiv">
        <div className="ad-c-head">
          <div className="ad-c-hleft">Clients</div>
          <div className="ad-c-hright">
            <div className="ad-c-serachdiv">
            <select name="type" id="" className='ad-c-selectip'>
              <option value="0">---select---</option>
              <option value="name">Name</option>
              <option value="mobilenumber">MobileNumber</option>
            </select>
            <input type="text" className="ad-c-searchip" placeholder='Search'/>
            <button className="ad-c-searchbtn">
              <img src={serachicon} alt="" />
            </button></div>
            <div className='ad-c-3dot-hide'>
            <button className="ad-c-3dot" onClick={handleShowDwnload}>
              <img src={img3dots} alt="" />
            </button>
            {showDwnlod&&(<div className="ad-c-3dot-hbody">
              <button>download</button>
              <button>download all</button>
            </div>)}
            </div>
          </div>

        </div>
        <div className="ad-c-body">
        <div className="ad-c-mapitem">
          <div className="ad-c-names">ajmeer khaja</div>
          <div className="ad-c-names"> 9494010203</div>
          <div className="ad-c-names"> malakpet</div>
          <div className="ad-c-names">servcie type acservice here</div>
          <div className="ad-c-names"> discription is discriptiondiscriptiondiscription</div>
          <div className="ad-c-names"> <button className='ad-c-viewbtn'>view</button></div>
        </div>
        </div>

      <div className="ad-c-pages">
        <ul className='ad-c-pages-ul'>
          <li  className='ad-c-ul-prev'>Prev</li>
          <li>1</li>
          <li>1</li>
          
          <li>1</li>
          
          <li className='ad-c-ul-prev' >Next</li>
        </ul>
        
      </div>
      </div>
    </div>
     
    </>
  );
}

export default Clients;
