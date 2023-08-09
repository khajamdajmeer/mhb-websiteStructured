import './App.css';
import Home from './Components/Client/Home';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Logincomponent from './Components/Managment/Common/Logincomponent/Logincomponent';

function App() {
  return (
   <>
  <Router>
    <Routes>

      <Route path='/' element={<Home/>}/>


      <Route path='service' element={<Logincomponent/>}></Route>

  {/* <Home/> */}
    </Routes>

  </Router>
   </>
  );
}

export default App;
