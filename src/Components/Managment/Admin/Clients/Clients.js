import React from 'react';
import './Clients.css';
import serachicon from '../../../images and tones/search-icon.png'

const Clients = () => {
  return (
    <>
    <div className="ad-c-fullscreen">
      <div className="ad-c-centerdiv">
        <div className="ad-c-head">
          <div className="ad-c-hleft">Clients</div>
          <div className="ad-c-hright">
            <select name="type" id="" className='ad-c-selectip'>
              <option value="0">---select---</option>
              <option value="name">Name</option>
              <option value="mobilenumber">MobileNumber</option>
            </select>
            <input type="text" className="ad-c-searchip" placeholder='Search'/>
            <button className="ad-c-searchbtn">
              <img src={serachicon} alt="" />
            </button>
          </div>
        </div>
        <div className="ad-c-body">
        <div className="ad-c-mapitem">
          <div className="ad-c-names">ajmeer khaja</div>
          <div className="ad-c-names"> 9494010203</div>
          <div className="ad-c-names"> malakpet</div>
          <div className="ad-c-names">servcie type acservice here</div>
          <div className="ad-c-names"> discription is discriptiondiscriptiondiscription</div>
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
