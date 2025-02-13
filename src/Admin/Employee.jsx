import axios from "../axiosConfig";
import { useEffect, useState } from "react";
import "./Department.css";
const Employee = ({info})=>{



    const stylesEmployeeAdd = {
        employeeAdd: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          maxWidth: "600px",
          maxHeight: "90vh",
        },
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          background: "rgba(0, 0, 0, 0.6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
          padding: "20px",
        },
        gridCard: {
          background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
          borderRadius: "15px 30px 30px 15px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
          padding: "30px",
          width: "100%",
          maxWidth: "600px",
          maxHeight: "85vh",
          overflowY: "auto",
          border: "2px solid #e0e0e0",
        },
        formTitle: {
          textAlign: "center",
          marginBottom: "25px",
          fontSize: "1.8rem",
          fontWeight: "bold",
          color: "#333",
        },
        gridContainer: {
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
        },
        gridItem: {
          display: "flex",
          flexDirection: "column",
        },
        label: {
          fontSize: "15px",
          fontWeight: "bold",
          marginBottom: "5px",
          color: "#444",
        },
        input: {
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          transition: "0.3s",
          fontSize: "14px",
          backgroundColor: "#f9f9f9",
        },
        inputFocus: {
          borderColor: "#007bff",
          outline: "none",
          boxShadow: "0 0 8px rgba(0, 123, 255, 0.3)",
        },
        fullWidth: {
          gridColumn: "span 2",
          textAlign: "center",
        },
        button: {
          padding: "12px",
          width: "100%",
          border: "none",
          background: "linear-gradient(90deg, #007bff, #0056b3)",
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "0.3s",
        },
        buttonHover: {
          background: "linear-gradient(90deg, #0056b3, #003c80)",
        },
        closeButton: {
          marginTop: "15px",
          background: "linear-gradient(90deg, #ff4d4d, #d60000)",
          fontWeight: "bold",
        },
        closeButtonHover: {
          background: "linear-gradient(90deg, #d60000, #a00000)",
        },
      };
      

    const stylesDepEmp = {
        container: {
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
        one: {
          width: "100px",
        },
        two: {
          width: "220px",
        },
        thTd: {
          border: "1px solid #ddd",
          padding: "8px",
          textAlign: "center",
        },
        th: {
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
        button: {
          padding: "5px 10px",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
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
    const [v,setV] = useState(true);
    const [dep,setDep] = useState({});
    const [refresh , setRefresh] = useState("0");
    const [infoDis,setInfoDis] = useState([false]);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        mobile: "",
        department: "",
        id: null,
        manager: false,
        sno:info.sno,
      });

    const handleChange = (e) => {
        const { name, value} = e.target;
        console.log(name+" "+value);
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    useEffect(()=>{
        const getData = async()=>{
            try
            {
                let p = {};
                if(info.department)
                {
                    p = {sno:info.sno,department:info.department};
                }
                else
                {
                    p = {sno:info.sno};
                }
                const d = await axios.post("/api/employee/find",{...p});
                if(d.status !== 200)
                {
                    console.log(d);
                }
                else
                {
                    setData(d.data);
                }
            }
            catch(error)
            {
                console.log(error);
            }
        };
        getData();
        const d = async()=>{
            try
            {
                const da = await axios.post("/api/department/find",{sno:info.sno});
                if(da.status === 200)
                {
                    setDep(da.data);
                }
                else
                {
                    console.log(da);
                }
            }
            catch(error)
            {
                console.log(error);
            }
        };
        if(!info.department)
        {
            d();
        }
    },[refresh]);


    const empInfoDisHandel = (i)=>{
        setInfoDis((infoDis)=>{
            let t = [...infoDis];
            if(t[0] === false)
            {
                t[0] = i;
            }
            else
            {
                t[0] = false;
            }
            return t;
        })
    };

    useEffect(() => {
        if (info.department) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            department: info.department,
          }));
        }
      }, [info.department]);

    const handleAdd = ()=>{
        setRefresh(()=>{return "0" === refresh ? "1" : "0"});
        setV((v)=>{ return v === true ? false : true});
    };
    const handleDelete = async(id)=>{
        try
        {
            const data  = await axios.post("/api/employee/delete",{id:id});
            if(data.status === 200)
            {
                setRefresh(()=>{return "0" === refresh ? "1" : "0"});
            }
            else
            {
                console.log(data);
            }
        }
        catch(error)
        {
            console.log(error);
        }
    };
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const form = e.target;
        
        if (form.checkValidity()) {
            try
            {
                const addEMP = await  axios.post("/api/employee/",formData);
                if(addEMP.status === 200)
                {
                    setRefresh(()=>{return "0" === refresh ? "1" : "0"});
                    setV(true);
                }
                else
                {
                    console.log(addEMP);
                }
            }
            catch(error)
            {
                console.log(error);
            }
        }
        else
        {
            form.reportValidity();
        }
    };

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleUpdate = async()=>{
            try
            {
                await delay(1000);
                const updateEMP = await  axios.post("/api/employee/update",{...infoDis[0]});
                if(updateEMP.status === 200)
                {
                    setRefresh(()=>{return "0" === refresh ? "1" : "0"});
                    setV(true);
                }
                else
                {
                    console.log(updateEMP);
                }
            }
            catch(error)
            {
                console.log(error);
            }
    };

    return(<>
            <h1>MANAGE EMPLOYEE</h1>
            {infoDis[0] !== false ? (
                 <div style={stylesEmployeeAdd.overlay}>
                 <div style={stylesEmployeeAdd.gridCard}>
                   <h2 style={stylesEmployeeAdd.formTitle}>Employee INFO</h2>
                   <form style={stylesEmployeeAdd.gridContainer}>
                     <div style={stylesEmployeeAdd.gridItem}>
                       <label style={stylesEmployeeAdd.label}>Email</label>
                       <input type="email" value={infoDis[0].email} name="email" readOnly style={stylesEmployeeAdd.input} />
                     </div>
                     <div style={stylesEmployeeAdd.gridItem}>
                       <label style={stylesEmployeeAdd.label}>Name</label>
                       <input type="text" value={infoDis[0].name} name="name" readOnly style={stylesEmployeeAdd.input} />
                     </div>
                     <div style={stylesEmployeeAdd.gridItem}>
                       <label style={stylesEmployeeAdd.label}>Mobile</label>
                       <input type="number" value={infoDis[0].mobile} name="mobile" readOnly style={stylesEmployeeAdd.input} />
                     </div>
                     <div style={stylesEmployeeAdd.gridItem}>
                       <label style={stylesEmployeeAdd.label}>Manager</label>
                       <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                         <input 
                           type="radio" 
                           value="true" 
                           name="manager" 
                           style={{marginBottom:"0"}}
                           checked={infoDis[0]?.manager === true} 
                           onChange={() => {
                             setInfoDis(prev => {
                               const newInfoDis = [...prev];
                               newInfoDis[0] = { ...newInfoDis[0], manager: true };
                               return newInfoDis;
                             });
                             handleUpdate();
                           }}
                         />
                         <span>Yes</span>
                         <input 
                           type="radio" 
                           value="false" 
                           name="manager" 
                           style={{marginBottom:"0"}}
                           checked={infoDis[0]?.manager === false} 
                           onChange={() => {
                             setInfoDis(prev => {
                               const newInfoDis = [...prev];
                               newInfoDis[0] = { ...newInfoDis[0], manager: false };
                               return newInfoDis;
                             });
                             handleUpdate();
                           }}
                         />
                         <span>No</span>
                       </div>
                     </div>
                     <div style={stylesEmployeeAdd.gridItem}>
                       <label style={stylesEmployeeAdd.label}>Department</label>
                       <input type="text" value={infoDis[0].department} name="department" readOnly style={stylesEmployeeAdd.input} />
                     </div>
                   </form>
                   <button style={{ ...stylesEmployeeAdd.button, ...stylesEmployeeAdd.closeButton }} onClick={(event) => { event.preventDefault(); empInfoDisHandel(); }}>Close</button>
                 </div>
               </div>
            ) : ("")}
        {!v ? (
            <div style={stylesEmployeeAdd.overlay}>
            <div style={stylesEmployeeAdd.gridCard}>
            <h2 style={stylesEmployeeAdd.formTitle}>Add Employee</h2>
            <form style={stylesEmployeeAdd.gridContainer} onSubmit={handleSubmit}>
                <div style={stylesEmployeeAdd.gridItem}>
                <label style={stylesEmployeeAdd.label}>Email</label>
                <input type="email" name="email" required onChange={handleChange} style={stylesEmployeeAdd.input} />
                </div>
                <div style={stylesEmployeeAdd.gridItem}>
                <label style={stylesEmployeeAdd.label}>Password</label>
                <input type="password" name="password" required onChange={handleChange} style={stylesEmployeeAdd.input} />
                </div>
                <div style={stylesEmployeeAdd.gridItem}>
                <label style={stylesEmployeeAdd.label}>Name</label>
                <input type="text" name="name" required onChange={handleChange} style={stylesEmployeeAdd.input} />
                </div>
                <div style={stylesEmployeeAdd.gridItem}>
                <label style={stylesEmployeeAdd.label}>Mobile</label>
                <input type="number" name="mobile" required onChange={handleChange} style={stylesEmployeeAdd.input} />
                </div>
                <div style={stylesEmployeeAdd.gridItem}>
                <label style={stylesEmployeeAdd.label}>Department</label>
                {info.department ? (
                    info.department
                ) : dep && dep.length > 0 ? (
                    <select name="department" required onChange={handleChange} style={stylesEmployeeAdd.input}>
                    <option value="">Select Department</option>
                    {dep.map((d) => (
                        <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                    </select>
                ) : (
                    <p>Loading departments...</p>
                )}
                </div>
                <div style={{ ...stylesEmployeeAdd.gridItem, ...stylesEmployeeAdd.fullWidth }}>
                <button type="submit" style={stylesEmployeeAdd.button}>Submit</button>
                </div>
            </form>
            <button style={{ ...stylesEmployeeAdd.button, ...stylesEmployeeAdd.closeButton }} onClick={handleAdd}>Close</button>
            </div>
        </div>
        ) :
        (
            <div style={stylesDepEmp.container}>  
            <table style={stylesDepEmp.table}>    
                <tbody> 
                    <tr>  
                        <td colSpan="4">
                            <button style={{ ...stylesDepEmp.button, ...stylesDepEmp.addButton }} 
                                onClick={handleAdd}>
                                ADD EMPLOYEE
                            </button>
                        </td>  
                    </tr> 
                    <tr>
                        <td style={{ padding: "2px" }} colSpan="4"><hr /></td>
                    </tr>
                    <tr>  
                        <th style={{ ...stylesDepEmp.thTd, ...stylesDepEmp.th }}>ID</th>  
                        <th style={{ ...stylesDepEmp.thTd, ...stylesDepEmp.th }}>Name</th>
                        <th style={{ ...stylesDepEmp.thTd, ...stylesDepEmp.th }}>DEPARTMENT</th>  
                        <th style={{ ...stylesDepEmp.thTd, ...stylesDepEmp.th }}>Action</th>  
                    </tr>     
                    {data?.map((info) => (  
                        <tr key={info.id} onClick={() => empInfoDisHandel(info)}>  
                            <td style={stylesDepEmp.thTd}>{info.id}</td>  
                            <td style={stylesDepEmp.thTd}>{info.name}</td>  
                            <td style={stylesDepEmp.thTd}>{info.department}</td>
                            <td>  
                                <button style={{ ...stylesDepEmp.button, ...stylesDepEmp.deleteButton }} 
                                    onClick={() => handleDelete(info.id)}>
                                    Delete
                                </button>  
                            </td>  
                        </tr>  
                    ))}  
                </tbody>  
            </table>  
        </div>          
        ) }
    </>);
};

export default Employee;
