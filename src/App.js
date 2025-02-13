import { HashRor as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home'; 
import Login from "./Login/Login";
import DashBoardSA from './SuperAdmin/DashBoardSA';
import BussinessDetail from './SuperAdmin/BussinessDetail';
import Register from './Admin/Register';
import DashBoardA from "./Admin/DashBoardA";
import DashBoardE from "./Employees/DashBoardE";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/BizVersion-react" element={<Home />} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/DashBoardSA" element={<DashBoardSA/>}/>
        <Route path="/BussinessDetail" element={<BussinessDetail/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/DashBoardA" element={<DashBoardA/>} />
        <Route path="/DashBoardE" element={<DashBoardE/>} />
        <Route path="*" element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;
