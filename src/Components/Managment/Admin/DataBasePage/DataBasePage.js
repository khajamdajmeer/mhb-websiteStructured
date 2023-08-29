import React from 'react';
// import './DataBasePage.css'
import './DataBasePage.css';
import { Link,Outlet } from 'react-router-dom';

const DataBasePage = () => {
  return (
    <>
    <main>
    <div className="ad-dbp-fullscreen">
      <div className="ad-dbp-center">
        <div className="ad-dbp-link-container">
          <ul>
            <li>
          <Link className='ad-dbp-linktag' to="/admindashboard/Data/Request">Requests Data</Link>
            </li>
            <li>
          <Link className='ad-dbp-linktag' to="/admindashboard/Data/Service">Service Data</Link>
            </li>
            <li>
            <Link className='ad-dbp-linktag' to="/admindashboard/Data/Customer">Clients Data</Link>
            </li>
            <li>
            <Link className='ad-dbp-linktag' to="/admindashboard/Data/Deleted">Deleted Data</Link>
            </li>
            <li>
            
          <Link className='ad-dbp-linktag' to="/admindashboard/Data/Inquery">Inquery Data</Link>
            </li>
            <li>
          <Link className='ad-dbp-linktag'>Blacklist</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Outlet>

    </Outlet>
    </main>

    </>
  );
}

export default DataBasePage;
