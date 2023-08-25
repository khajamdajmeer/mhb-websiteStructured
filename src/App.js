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
import AdminLoginpage from './Components/Managment/Admin/AdminLoginpage/AdminLoginpage';
import AdminDashborad from './Components/Managment/Admin/AdminDashboard/AdminDashborad';
import Emplooys from './Components/Managment/Admin/Emplooys/Emplooys';
import Clients from './Components/Managment/Admin/Clients/Clients';
import AddEmploy from './Components/Managment/Admin/AddEmploy/AddEmploy';
import EmplooyUpdate from './Components/Managment/Admin/EmplooyUpdate/EmplooyUpdate';
import ViewProgress from './Components/Managment/Admin/ViewProgress/ViewProgress';
import ReviewReq from './Components/Managment/Manager/ReviewReq/ReviewReq';
import ForgotPassword from './Components/Managment/Common/ForgotPassword/ForgotPassword';
import PendingPage from './Components/Managment/Manager/PendingPage/PendingPage';
import CreateReq from './Components/Managment/Manager/CreateReq/CreateReq';
import SignUpPage from './Components/Managment/Admin/SignUpPage/SignUpPage';

function App() {
  return (
    <>
      <HashRouter>
        <Routes>

          <Route path='/' element={<Home />} />

{/* Routes for the manager */}

            <Route path='forgotpassword' element={<ForgotPassword/>}/>
          <Route path='service' element={<Logincomponent />}>
          </Route>
          <Route path='dashboard' element={<Dashborad />}>
            <Route path='requests' element={<ViewRequest />} />
            <Route path='techrequest' element={<ViewTechreq />} />
            <Route path='reviewreq' element={<ReviewReq/>}/>
            <Route path='pending' element={<PendingPage/>}/>
            <Route path='newrequest' element={<CreateReq/>}/>
          </Route>

{/* the routes for the technician */}
          <Route path='technician' element={<TechDashboard/>}>
          <Route path='request' element={<TechRequest/>}/>
          <Route path='myrequests' element={<MyRequest/>}/>
          </Route>

          {/* The Routes for the Administratior */}
          <Route exact path='loginadmin' element={<AdminLoginpage/>}/>
          <Route exact path='adminsignup' element={<SignUpPage/>}/>

          <Route path='admindashboard' element={<AdminDashborad/>}>
          <Route  path='emplooys' element={<Emplooys/>}/>

          
          <Route path='progress' element={<ViewProgress/>}/>
          <Route path='newemplooy' element={<AddEmploy/>} />
          <Route path='updateemplooy' element={<EmplooyUpdate/>}/>
          <Route path='clients' element={<Clients/>}/>
          </Route>


          


        </Routes>

      </HashRouter>
    </>
  );
}

export default App;
