import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import "./Department.css";

const Department = ({info})=>{
    

    const stylesTableContainerDep = {
        tableContainer: {
          width: "380px",
          height: "auto",
          overflowY: "auto",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
          background: "#f9f9f9",
          margin: "0px 0px 0px 100px",
        },
        table: {
          width: "100%",
          borderCollapse: "collapse",
        },
        columnOne: {
          width: "100px",
        },
        columnTwo: {
          width: "220px",
        },
        tableCell: {
          border: "1px solid #ddd",
          padding: "8px",
          textAlign: "center",
        },
        tableHeader: {
          background: "#007bff",
          color: "white",
        },
        input: {
          width: "90%",
          padding: "5px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          margin: "0",
        },
        buttonBase: {
          padding: "5px 10px",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
          transition: "0.3s",
        },
        addButton: {
          background: "#28a745",
          color: "white",
        },
        deleteButton: {
          background: "#dc3545",
          color: "white",
        },
        addButtonHover: {
          background: "#218838",
        },
        deleteButtonHover: {
          background: "#c82333",
        },
      };


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
    <div style={stylesTableContainerDep.tableContainer}>
      <table style={stylesTableContainerDep.table}>
        <thead>
          <tr>
            <th style={{ ...stylesTableContainerDep.tableCell, ...stylesTableContainerDep.tableHeader }}>ID</th>
            <th style={{ ...stylesTableContainerDep.tableCell, ...stylesTableContainerDep.tableHeader }}>Name</th>
            <th style={{ ...stylesTableContainerDep.tableCell, ...stylesTableContainerDep.tableHeader }}>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ ...stylesTableContainerDep.tableCell, ...stylesTableContainerDep.columnOne }}>
              <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter ID"
                style={stylesTableContainerDep.input}
              />
            </td>
            <td style={{ ...stylesTableContainerDep.tableCell, ...stylesTableContainerDep.columnTwo }}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
                style={stylesTableContainerDep.input}
              />
            </td>
            <td style={stylesTableContainerDep.tableCell}>
              <button
                style={stylesTableContainerDep.addButton}
                onMouseOver={(e) => (e.target.style.background = stylesTableContainerDep.addButtonHover.background)}
                onMouseOut={(e) => (e.target.style.background = stylesTableContainerDep.addButton.background)}
                onClick={handleAdd}
              >
                +
              </button>
            </td>
          </tr>
          {data.map((info) => (
            <tr key={info.id}>
              <td style={stylesTableContainerDep.tableCell}>{info.id}</td>
              <td style={stylesTableContainerDep.tableCell}>{info.name}</td>
              <td style={stylesTableContainerDep.tableCell}>
                <button
                  style={stylesTableContainerDep.deleteButton}
                  onMouseOver={(e) => (e.target.style.background = stylesTableContainerDep.deleteButtonHover.background)}
                  onMouseOut={(e) => (e.target.style.background = stylesTableContainerDep.deleteButton.background)}
                  onClick={() => handleDelete(info.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </>);

};

export default Department;