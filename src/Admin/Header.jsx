import "./HF.css";
import logo from "../Assets/logo.png";
import { useNavigate } from "react-router-dom";
const Header = ()=>{

    const navigate = useNavigate();
    const handelLogout = ()=>{
        localStorage.removeItem('user');
        navigate("/");
    };

    return(<>
                     <nav id="admin">
                         <ul>
                             <li><img src={logo} alt="Logo" /></li>
                             <li><h1>Biz Vision</h1></li>
                         </ul>
                         <div className="right">
                            <ul>
                                <li><a onClick={handelLogout}>LOGOUT</a></li>
                            </ul>
                        </div>
                     </nav> 
    </>);
};

export default Header;