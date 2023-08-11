import './App.css';
import Home from './Components/Client/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Logincomponent from './Components/Managment/Common/Logincomponent/Logincomponent';
import Dashborad from './Components/Managment/Manager/Dashboard/Dashborad';
import ViewRequest from './Components/Managment/Manager/ViewRequest/ViewRequest';
import ViewTechreq from './Components/Managment/Manager/ViewTechreq/ViewTechreq';

function App() {
  return (
    <>
      <Router>
        <Routes>

          <Route path='/' element={<Home />} />


          <Route path='service' element={<Logincomponent />}></Route>
          <Route path='dashboard' element={<Dashborad />}>
            <Route path='requests' element={<ViewRequest />} />
            <Route path='techrequest' element={<ViewTechreq />} />
          </Route>

        </Routes>

      </Router>
    </>
  );
}

export default App;
