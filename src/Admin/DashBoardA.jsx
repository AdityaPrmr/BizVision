import Header from "./Header";
import Footer from"./Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Department from "./Department";
import axios from "../axiosConfig";
import "./DashBoardA.css";
import "./info.css";
import Employee from "./Employee";
import Task from "./Task";
const DashBoardA = ()=>{
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user || user.length === 0) {
            navigate("/");
        }
        const doit = async()=>{
            const d = await axios.post("/api/user/find",{_id:user});
            setData(d.data);
        };
        doit();
    }, [navigate]);

    return(<div className="aa">
                <Header/>
                {data != null ? (
                    <div
                        className="infoUser"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "420px",
                            padding: "24px",
                            borderRadius: "14px",
                            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
                            background: "#fff",
                            border: "1px solid #e5e7eb",
                            textAlign: "center",
                            fontFamily: "Arial, sans-serif",
                        }}
                        >
                        {/* Header Section */}
                        <div
                            style={{
                            width: "100%",
                            padding: "15px",
                            borderRadius: "12px 12px 0 0",
                            background: "linear-gradient(90deg, #4f46e5, #9333ea)",
                            color: "white",
                            }}
                        >
                            <h2 style={{ fontSize: "1.8rem", fontWeight: "bold" }}>{data.businessName}</h2>
                            <p style={{ fontSize: "1rem", opacity: 0.85 }}>{data.businessType}</p>
                        </div>

                        {/* Business Info in Table Layout */}
                        <div style={{ width: "100%", padding: "16px" }}>
                            <table style={{ borderCollapse: "collapse" }}>
                            <tbody>
                                <tr>
                                <td style={{ fontWeight: "bold", color: "#374151", padding: "6px", width: "80px", textAlign: "left" }}>
                                    Industry:
                                </td>
                                <td style={{ color: "#4b5563", padding: "6px", textAlign: "left" }}>{data.industry}</td>
                                </tr>
                                {data.gstin != null && (
                                <tr>
                                    <td style={{ fontWeight: "bold", color: "#374151", padding: "6px", width: "40%", textAlign: "left" }}>
                                    GSTIN:
                                    </td>
                                    <td style={{ color: "#4b5563", padding: "6px", textAlign: "left" }}>{data.gstin}</td>
                                </tr>
                                )}
                                <tr>
                                <td style={{ fontWeight: "bold", color: "#374151", padding: "6px", width: "40%", textAlign: "left" }}>
                                    Email:
                                </td>
                                <td style={{ color: "#4b5563", padding: "6px", textAlign: "left" }}>{data.businessEmail}</td>
                                </tr>
                                <tr>
                                <td style={{ fontWeight: "bold", color: "#374151", padding: "6px", width: "40%", textAlign: "left" }}>
                                    Phone:
                                </td>
                                <td style={{ color: "#4b5563", padding: "6px", textAlign: "left" }}>{data.businessPhone}</td>
                                </tr>
                            </tbody>
                            </table>
                        </div>

                        {/* Status Badge */}
                        <span
                            style={{
                            backgroundColor: data.status === "Active" ? "#22c55e" : "#ef4444",
                            color: "white",
                            fontSize: "0.9rem",
                            padding: "6px 16px",
                            borderRadius: "20px",
                            margin: "10px 0",
                            fontWeight: "bold",
                            }}
                        >
                            {data.status}
                        </span>

                        {/* Owner Details in Table Layout */}
                        <div
                            style={{
                            width: "100%",
                            padding: "16px",
                            background: "#f9fafb",
                            borderRadius: "0 0 12px 12px",
                            borderTop: "1px solid #e5e7eb",
                            marginTop: "10px",
                            }}
                        >
                            <h3 style={{ fontSize: "1.4rem", fontWeight: "bold", color: "#1e293b", marginBottom: "8px" }}>
                            Owner Details
                            </h3>
                            <table style={{  borderCollapse: "collapse" }}>
                            <tbody>
                                <tr>
                                <td style={{ fontWeight: "bold", color: "#374151", padding: "6px", width: "80px", textAlign: "left" }}>
                                    Name:
                                </td>
                                <td style={{ color: "#4b5563", padding: "6px", textAlign: "left" }}>{data.owner.name}</td>
                                </tr>
                                <tr>
                                <td style={{ fontWeight: "bold", color: "#374151", padding: "6px", width: "40%", textAlign: "left" }}>
                                    Contact:
                                </td>
                                <td style={{ color: "#4b5563", padding: "6px", textAlign: "left" }}>{data.owner.contactNumber}</td>
                                </tr>
                                <tr>
                                <td style={{ fontWeight: "bold", color: "#374151", padding: "6px", width: "40%", textAlign: "left" }}>
                                    Email:
                                </td>
                                <td style={{ color: "#4b5563", padding: "6px", textAlign: "left" }}>{data.owner.email}</td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        </div>
                      )  : <p>Loading...</p>}
                <div className="grid-container">
                    <div className="grid-item">
                    {data ? <Department info={data} /> : <p>Loading...</p>}
                    </div>   
                    <div className="grid-item">
                        {data ? <Employee info={data}/> : <p>Loading...</p>}
                    </div>
                    <div className="grid-item">{data ? <Task info={data}/> : <p>Loading...</p>}</div>
                </div>
                <Footer/>
    </div>);

};

export default DashBoardA;