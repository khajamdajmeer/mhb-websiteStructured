import './App.css';
import Home from './Components/Client/Home';
import { Route, Routes } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import Logincomponent from './Components/Managment/Common/Logincomponent/Logincomponent';
import Dashborad from './Components/Managment/Manager/Dashboard/Dashborad';
import ViewRequest from './Components/Managment/Manager/ViewRequest/ViewRequest';
import ViewTechreq from './Components/Managment/Manager/ViewTechreq/ViewTechreq';
import TechDashboard from './Components/Managment/Technician/TechDashboard/TechDashboard';
import TechRequest from './Components/Managment/Technician/TechRequest/TechRequest';
import MyRequest from './Components/Managment/Technician/MyRequest/MyRequest';

function App() {
  return (
    <>
      <HashRouter>
        <Routes>

          <Route path='/' element={<Home />} />


          <Route path='service' element={<Logincomponent />}></Route>
          <Route path='dashboard' element={<Dashborad />}>
            <Route path='requests' element={<ViewRequest />} />
            <Route path='techrequest' element={<ViewTechreq />} />
          </Route>

          <Route path='technician' element={<TechDashboard/>}>
          <Route path='request' element={<TechRequest/>}/>
          <Route path='myrequests' element={<MyRequest/>}/>
          </Route>

        </Routes>

      </HashRouter>
    </>
  );
}

export default App;
