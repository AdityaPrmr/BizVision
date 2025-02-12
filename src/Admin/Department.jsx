import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import "./Department.css";

const Department = ({info})=>{
    
    const [data,setData] = useState([]);
    const [number,setNumber] = useState("");
    const [name,setName] = useState("");
    const [refresh, setRefresh] = useState("0");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const d = await axios.post("/api/department/find", { sno: info.sno });
                if (d.data) {
                    setData(d.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [refresh]);

    const handleAdd = async()=>{
        try
        {
        let d = {
            "sno":info.sno,
            "name":name,
            "id":number
        };
        const r = await axios.post("/api/department/",d);
        if(r.status === 200)
        {
            setName("");
            setNumber("");
            setRefresh(()=>{return "0" === refresh ? "1" : "0"});
        }
        else
        {
            console.log(r);
        }
        }
        catch(error)
        {
            console.log(error);
        }
    };

    const handleDelete = async (i) => {
        try {
            const response = await axios.post("/api/department/delete", { id: i });
            if (response.status === 200) {
                const newRefresh = refresh === "0" ? "1" : "0";
                setRefresh(newRefresh); 
            } 
        } catch (error) {
            const e = error.response?.data?.message || "Unknown error";
                if(e == "delete employees first")
                {
                    alert("DELETE EMPLOYEE OF THIS DEPARTMENT FIRST");
                }
                else
                {
                console.log("Unexpected response:", error);
                }
        }
    };
    
    

    return(<>
    <h1>MANAGE DEPARTMENTS</h1>
       <div className="table-container-dep">  
            <table>  
                <thead>  
                <tr>  
                    <th>ID</th>  
                    <th>Name</th>  
                    <th>Action</th>  
                </tr>  
                </thead>  
                <tbody>  
                <tr>  
                    <td className="one"><input type="number" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="Enter id" /></td>  
                    <td className="two"><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" /></td>  
                    <td><button className="add-btn" onClick={handleAdd}>+</button></td>  
                </tr>  
                {data?.map((info) => (  
                    <tr key={info.id}>  
                    <td>{info.id}</td>  
                    <td>{info.name}</td>  
                    <td>  
                        <button className="delete-btn" onClick={() => handleDelete(info.id)}>Delete</button>  
                    </td>  
                    </tr>  
                ))}  
                </tbody>  
            </table>  
            </div>  

    </>);

};

export default Department;