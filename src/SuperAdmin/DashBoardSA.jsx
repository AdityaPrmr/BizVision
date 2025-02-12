import logo from "../Assets/logo.png";
import BusinessList from "./BussinesList";
import "./DashBoardSA.css";
import { useNavigate } from "react-router-dom";
const DashBoardSA = ()=>{
    const navigate = useNavigate();
    const handelLogout = ()=>{
        navigate("/");
    };

    return(<>
        <div className="sa">
            <nav>
                <ul>
                    <li><img src={logo} alt="Logo" /></li>
                    <li><h1>Business Management</h1></li>
                </ul>
                <div className="right">
                    <ul>
                        <li><a onClick={handelLogout}>LOGOUT</a></li>
                    </ul>
                </div>
            </nav>

            <div>
                <BusinessList></BusinessList>
            </div>

            <footer>
                <p>&copy; 2025 Business Management. All rights reserved.</p>
                <div className="footer-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Contact Us</a>
                </div>
            </footer>
        </div>
    </>);
};

export default DashBoardSA;