import "./Login.css";
import logo from "../Assets/logo.png";
import { useState } from "react";
import axios from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password ,setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handelSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        localStorage.removeItem("user");
        try {
            const response = await axios.post("/api/auth/login", {
                email,
                password,
            });
            console.log(response);
            if (response.status === 200) {
                if(response.data.name && response.data.department != "")
                {
                    localStorage.setItem("user", JSON.stringify(response.data._id)); 
                    navigate("/DashBoardE");
                }
                else if(response.data.sno > 0 && response.data.status == "Active")
                {
                    localStorage.setItem("user", JSON.stringify(response.data._id)); 
                    navigate("/DashBoardA");
                }
                else if(!response.data.sno)
                {
                    localStorage.setItem("user", response.data._id); // Store user data
                    navigate("/DashBoardSA");
                }
                else
                {
                    setError("Invalid credentials");
                }
            }
        } catch (err) {
            console.log("Error:", err.response ? err.response.data : err.message);
            setError(err.response?.data?.message || "Invalid credentials or server error.");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="login-container">
        <div className="login">
            <nav>
                <div className="left">
                    <ul>
                        <li><img src={logo} alt="Logo" /></li>
                        <li><h1>Business Management</h1></li>
                        <li><Link to="/">HOME</Link></li>
                    </ul>
                </div>
                <div className="right">
                    <ul>
                        <li><Link to="/Register">Register</Link></li>
                    </ul>
                </div>
            </nav>

            <div className="login-form-container">
                <h2>Login</h2>
                <form onSubmit={handelSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    <div className="forgot-password">
                        <a href="#">Forgot Password?</a>
                    </div>
                </form>
            </div>
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
    );
};

export default Login;
