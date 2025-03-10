import "./Login.css";
import logo from "../Assets/logo.png";
import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import Notification from "../Pages/Notification";

const Login = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password ,setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [forg, setForg] = useState(false);
    const[loadingUser,setLoadingUser] = useState(true);
    const[resEmail,setResEmail] = useState("");
    const [notification, setNotification] = useState(null);

    const modalStyles = {
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
        },
        modal: {
            background: "#fff",
            padding: "20px",
            width: "350px",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
            position: "relative"
        },
        closeBtn: {
            position: "absolute",
            top: "10px",
            right: "15px",
            fontSize: "20px",
            cursor: "pointer",
            color: "#555",
            transition: "color 0.3s ease"
        },
        closeBtnHover: {
            color: "red"
        },
        input: {
            width: "90%",
            padding: "10px",
            marginTop: "15px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "16px",
            outline: "none"
        },
        buttons: {
            marginTop: "20px"
        },
        forgotBtn: {
            background: "#007bff",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background 0.3s ease"
        },
        forgotBtnHover: {
            background: "#0056b3"
        }
    };

    const handelEmailChange = (e)=>{
        setResEmail(e.target.value);

    };

    const reSendPass = async(e)=>{
        e.preventDefault();
        try
        {
            if(resEmail.length == 0)
            {
                setNotification({ message: "Enter proper email", type: "error" });
            }
            else
            {
                setNotification({ message: "Send details successfully, if account exists.", type: "success" });
                let response = await axios.post("/api/auth/res", {email: resEmail});
            }
        }
        catch(error)
        {
        }
    };

    useEffect(()=>{
        if(! localStorage.getItem("user")) { setLoadingUser(false);}
        else
        {
            handleSubmit();
        }
    },[]);

    const handleSubmit = async (e = null) => {
        if (e) e.preventDefault();
        setLoading(true);
        setError("");
        let response;
        try {
            if(! localStorage.getItem("user"))
            {
                response = response = await axios.post("/api/auth/login", {
                    email,
                    password,
                });
               
            }
            else
            {
                response = await axios.post("/api/auth/detail", {
                    _id:localStorage.getItem("user").toString()
                });
            }
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
    
    const resetHandle = ()=>{
        setForg(true);
    };

    return (
        <>
        {notification && <Notification message={notification.message} type={notification.type} />}
            {loadingUser ? (
                <h1 style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    fontSize: "3rem",
                    fontWeight: "bold"
                }}>
                    🔄 Loading...
                </h1>
            ) : forg ? (
                <div style={modalStyles.overlay}>
                    <div style={modalStyles.modal}>
                        <span 
                            style={modalStyles.closeBtn} 
                            onMouseOver={(e) => e.target.style.color = modalStyles.closeBtnHover.color}
                            onMouseOut={(e) => e.target.style.color = modalStyles.closeBtn.color}
                            onClick={(event) => setForg(false)}
                        >
                            ×
                        </span>
                        <h2>Reset Password</h2>
                        <input type="email" placeholder="Enter your email" value={resEmail} onChange={(event)=>{handelEmailChange(event);}} required style={modalStyles.input} />
                        <div style={modalStyles.buttons}>
                            <button 
                                style={modalStyles.forgotBtn} 
                                onMouseOver={(e) => e.target.style.background = modalStyles.forgotBtnHover.background}
                                onMouseOut={(e) => e.target.style.background = modalStyles.forgotBtn.background}
                                onClick={(event) => {reSendPass(event); setForg(false);}}
                            >
                                SUBMIT
                            </button>
                        </div>
                    </div>
                </div>

            ) : (                
                <div className="login-container">
                    <div className="login">
                        <nav>
                            <div className="left">
                                <ul>
                                    <li><img src={logo} alt="Logo" /></li>
                                    <li><h1>Biz Version</h1></li>
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
                            <form onSubmit={handleSubmit}>
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
                                    <a href="#" onClick={(e) => { e.preventDefault(); resetHandle(); }}>Forgot Password?</a>
                                </div>
                            </form>
                        </div>
                    </div>

                    <footer>
                        <p>&copy; 2025 Biz Verion. All rights reserved.</p>
                        <div className="footer-links">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                            <a href="#">Contact Us</a>
                        </div>
                    </footer>
                </div>
            )}
        </>
    );
};

export default Login;
