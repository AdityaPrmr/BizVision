import { useEffect, useState } from "react";
import "./BussinesList.css";  // Fix typo: BussinesList -> BusinessList
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";

const BusinessList = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const changeHandler = (Bussiness)=>{
        const fetchData = async () => {
            try {
                const res = await axios.post("/api/user/update",{
                    sno:Bussiness.sno
                });
                setData(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/api/user");
                setData(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="business-container">
            <h2>Business List</h2>
            <table>
                <thead>
                    <tr>
                        <th>SNO</th>
                        <th>BUSINESS NAME</th>
                        <th>OWNER NAME</th>
                        <th>JOINED DATE</th>
                        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((business, index) => (
                        <tr
                            key={index}
                            onClick={() => navigate("/BussinessDetail", { state: { business } })}
                        >
                            <td>{business.sno}</td>
                            <td>{business.businessName}</td>
                            <td>{business.owner?.name}</td>  {/* Use optional chaining */}
                            <td>{new Date(business.joinedDate).toLocaleDateString()}</td>
                            <td>
                                <button className={(business.status ?? "Inactive").toLowerCase()} onClick={(event)=>{ event.stopPropagation();changeHandler(business)}}>
                                    {business.status ?? "Inactive"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BusinessList;  // Fix component name
