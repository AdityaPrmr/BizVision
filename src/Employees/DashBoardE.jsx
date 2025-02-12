import Header from "../Admin/Header";
import Footer from"../Admin/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import "../Admin/DashBoardA.css";
import Employee from "../Admin/Employee";
import Task from "../Admin/Task";
import "../Admin/info.css";
const DashBoardE = ()=>{
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user || user.length === 0) {
            navigate("/");
        }
        const doit = async()=>{
            const d = await axios.post("/api/Employee/one",{_id:user});
            setData(d.data);
            console.log(d.data);
        };
        doit();
    }, []);

    return(<div className="aa">
                <Header/>
                {data ? (
                           <div
                           style={{
                             display: "flex",
                             flexDirection: "column",
                             alignItems: "center",
                             width: "1000px",
                             margin: "30px 50px 30px 150px",
                             padding: "24px",
                             borderRadius: "14px",
                             boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                             background: "linear-gradient(135deg, #f9fafb, #ffffff)",
                             border: "1px solid #e5e7eb",
                             textAlign: "center",
                           }}
                         >
                           <h2
                             style={{
                               fontSize: "1.6rem",
                               fontWeight: "bold",
                               color: "#1f2937",
                               marginBottom: "14px",
                             }}
                           >
                             {data.name}
                           </h2>
                     
                           <div style={{ width: "100%", textAlign: "left", lineHeight: "1.6" }}>
                             <p style={{ color: "#374151", fontSize: "1rem" }}>
                               <strong>ID:</strong> {data.id}
                             </p>
                             <p style={{ color: "#374151", fontSize: "1rem" }}>
                               <strong>Email:</strong> {data.email}
                             </p>
                             <p style={{ color: "#374151", fontSize: "1rem" }}>
                               <strong>Mobile:</strong> {data.mobile}
                             </p>
                             <p style={{ color: "#374151", fontSize: "1rem" }}>
                               <strong>Department:</strong> {data.department}
                             </p>
                           </div>
                     
                           {data.manager && (
                             <span
                               style={{
                                 backgroundColor: "#10b981",
                                 color: "#ffffff",
                                 fontSize: "0.9rem",
                                 padding: "8px 14px",
                                 borderRadius: "6px",
                                 marginTop: "14px",
                               }}
                             >
                               Manager
                             </span>
                           )}
                         </div>
                ) : ""}                      
                <div className="grid-container"> 
                    {data != null && data.manager == true ? 
                        <div className="grid-item">
                            {data ? <Employee info={data}/> : <p>Loading...</p>}
                        </div>
                    : ("")}
                    <div className="grid-item">{data != null ? <Task info={data}/> : <p>Loading...</p>}</div>
                </div>
                <Footer/>
    </div>);

};

export default DashBoardE;