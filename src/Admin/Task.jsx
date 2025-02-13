import axios from "../axiosConfig";
import { useEffect, useState } from "react";
import "./Department.css";
import "./Task.css";

const Task = ({info})=>{



    const stylesTaskDisOverlay = {
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
        },
        content: {
            background: "white",
            padding: "20px",
            width: "50%",
            maxHeight: "90vh",
            overflowY: "auto",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        },
        formGroup: {
            display: "flex",
            flexDirection: "column",
            marginBottom: "15px",
        },
        label: {
            fontWeight: "bold",
            marginBottom: "5px",
        },
        input: {
            padding: "8px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
        },
        table: {
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
        },
        tableCell: {
            border: "1px solid #ccc",
            padding: "8px",
            textAlign: "left",
        },
        buttons: {
            display: "flex",
            justifyContent: "space-between",
            marginTop: "15px",
        },
        submitButton: {
            background: "#007bff",
            color: "white",
            padding: "10px 15px",
            fontSize: "16px",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
        },
        closeButton: {
            background: "red",
            color: "white",
            padding: "10px 15px",
            fontSize: "16px",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
        },
    };

      

    const stylesTableDepOverlay = {
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
      
        tableCell: {
          border: "1px solid #ddd",
          padding: "8px",
          textAlign: "center",
        },
      
        tableHeader: {
          background: "#007bff",
          color: "white",
        },
      
        inputField: {
          width: "90%",
          padding: "5px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          margin: "0",
        },
      
        addButton: {
          padding: "5px 10px",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
          background: "#28a745",
          color: "white",
        },
      
        deleteButton: {
          padding: "5px 10px",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
          background: "#dc3545",
          color: "white",
        },
      
        addButtonHover: {
          background: "#218838",
        },
      
        deleteButtonHover: {
          background: "#c82333",
        },
      
        separator: {
          padding: "2px",
        },
      
        cursorPointer: {
          cursor: "pointer",
        },
      };
      


    const stylesTableDepTask = {
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
      
        addButton: {
          padding: "5px 10px",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
          background: "#28a745",
          color: "white",
        },
      
        deleteButton: {
          padding: "5px 10px",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
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
      



    const stylesTaskAdd = {
        taskAdd: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "100%", // Increased width
          maxHeight: "90vh", // Prevent form from exceeding screen
        },
      
        overlayTask: {
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          background: "rgba(0, 0, 0, 0.6)", // Semi-transparent black
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
          padding: "20px", // Prevents form from touching the screen edges
        },
      
        gridCard: {
          background: "linear-gradient(135deg, #ffffff, #f8f9fa)", // Soft gradient background
          borderRadius: "15px 30px 30px 15px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)", // Deeper shadow for 3D effect
          padding: "30px",
          width: "100% !important",
          maxWidth: "1000px !important",
          maxHeight: "85vh",
          overflowY: "auto",
          border: "2px solid #e0e0e0", // Light border for structure
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
      
        buttonDisabled: {
          background: "linear-gradient(90deg, #cccccc, #999999)", // Gray out effect
          color: "#666666", // Dim text
          cursor: "not-allowed",
          opacity: 0.6,
        },
      
        buttonHover: {
          background: "linear-gradient(90deg, #0056b3, #003c80)",
        },
      
        closeBtn: {
          marginTop: "15px",
          background: "linear-gradient(90deg, #ff4d4d, #d60000)",
          fontWeight: "bold",
        },
      
        closeBtnHover: {
          background: "linear-gradient(90deg, #d60000, #a00000)",
        },
      };
      














    const [v,setV] = useState(true);
    const [emp, setEmp] = useState([]);
    const [taskData,setTaskData] = useState([]);
    const [selectedEmp,setSelectedEmp] = useState([{id:"",name:""}]);
    const [refresh, setRefresh] = useState("0");
    const [infoDis, setInfoDis] = useState([false,0]);
    const [remark,setRemark] = useState("");
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [task,setTask] = useState({
        id:null,
        name:"",
        state:"BEGIN",
        deadline:"",
        doc:"",
        info: "",
        members:[{lead:"TRUE",name:"",id:""}],
        remark:"",
        sno:info.sno,
        department: info.department ? info.department : ""
    });

    const handleEMPChange = (e, index) => {
        const { value } = e.target;
        if(value != "")
        {
        const [name, id] = value.split(',');
        console.log(name +" "+id);
        setSelectedEmp((selectedEmp) => {
            const newSelectedEmp = [...selectedEmp];
            const exist = newSelectedEmp.some(emp => emp.id === id);

            if (!exist) {
                newSelectedEmp[index] = { id, name };
            }
            const empty = newSelectedEmp.some(emp => emp.id === "")
            if(!empty)
            {
                newSelectedEmp.push({ id: "", name: "" });
            }
            return newSelectedEmp;
        });
    }
    };

    const handelDisplay = async(i)=>{
        try
        {
            if(infoDis[0] == false)
            {
                const d = await axios.post("/api/task/find",{id:i});
                if(d.status == 200)
                {
                    setInfoDis([true,i,d.data[0]]);
                }
                else
                {
                    console.log(d);
                }
            }
            else
            {
                setInfoDis([false,0]);
            }
        }
        catch(error)
        {
            console.log(error);
        }
    };

    useEffect(()=>{
        const data = async()=>{
            try
            {
                let para;
                if(info.department)
                {
                    para = {sno:info.sno,department: info.department};
                }
                else
                {
                    para = {sno: info.sno};
                }

                const d = await axios.post("/api/employee/find",para);
                if(d.status == 200)
                {
                    setEmp(d.data);
                }
                else
                {
                    console.log(d);
                }
            }
            catch(error)
            {
                console.log(error);
            }
        };
        if(info.businessName || info.manager === true)
        {
            data();
        }
    },[refresh]);

    useEffect(()=>{
        const tDAta = async()=>{
            try
            {
                let para;
                if(info.department)
                {
                    para = {department: info.department,sno: info.sno};
                }
                else
                {
                    para = {sno: info.sno};
                }
                const d = await axios.post("/api/task",para);
                if(d.status == 200)
                {
                    setTaskData(d.data);
                }
                else
                {
                    console.log(d);
                }
            }
            catch(error)
            {
                console.log(error);
            }
        };
        tDAta();
    },[refresh]);

    const handleAdd = ()=>{
        setV( v == true ? false : true);
        setRefresh(()=>{return "0" === refresh ? "1" : "0"});
        setTask({
            id:null,
            name:"",
            state:"BEGIN",
            deadline:"",
            doc:"",
            info: "",
            members:[{lead:"TRUE",name:"",id:""}],
            remark:"",
            sno:info.sno,
            department: info.department ? info.department : ""
        });
        setSelectedEmp([{id:"",name:""}]);
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        let mem = [{lead:"TRUE",name:"",id:""}];
        for(var i in selectedEmp)
        {
            if(i == 0)
            {
                mem[0].name = selectedEmp[i].name;
                mem[0].id = selectedEmp[i].id;
            }
            else if(selectedEmp[i].id != "" && selectedEmp[i].name != "")
            {
                let p = {name:"",id:""};
                p.name = selectedEmp[i].name;
                p.id = selectedEmp[i].id;
                mem.push(p);              
            }
        }
        try
        {
            const pa = {...task,members:mem};
        setTask((task)=>{return {...task,members:mem};});   
           const p = await axios.post("/api/task/create",pa);
            if(p.status == 200)
            {
                handleAdd();
            }
            else
            {
                console.log(p);
            }
        }
        catch(error)
        {
            console.log(error);
        }

    };

    const handelEmpDelete =(e, index) => {
            const { value } = e.target;
            if(value != "info")
            {
            const [name, id] = value.split(',');
            e.target.value = "info";
            setSelectedEmp((selectedEmp) => {
                const newSelectedEmp = [...selectedEmp];
                newSelectedEmp.splice(index, 1);
                return newSelectedEmp;
            });
        }
        };

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setTask((task)=>{ return {...task,[name]:value}});
    };


    const onRemarkChange = (event) => {
        setRemark(event.target.value);
    };
    
    const onCompleteTaskDis = async(completeData) => {
        try 
        {

            completeData.state = "COMPLETE";
            const n = await axios.post("/api/task/update",{...completeData});
            if(n.status == 200)
            {
                setInfoDis((prevInfoDis) =>
                    prevInfoDis.map((item, index) =>
                        index === 2 ? { ...n.data } : item
                    )
                );     
                setRemark("");
                setRefresh(()=>{return "0" === refresh ? "1" : "0"});
                handelDisplay(completeData.id);
            }
            else
            {
                console.log(n);
            }
        }
        catch(error)
        {
            console.log(error);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault(); 
    
        if(infoDis[2].state === "COMPLETE")
        {
            alert("TASK COMPLETED");
            return;
        }
        if (!file) {
            alert("Please select a file");
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("taskID", infoDis[2].id);
            formData.append("sno", info.sno);
            formData.append("byID", info?.sno || info?.id || "");
            const res = await axios.post("/api/file/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
    
            if (res.status === 201) {
                alert("File uploaded successfully");
                fetchFiles(infoDis[2].id);
            } else {
                console.log("Upload failed:", res);
            }
        } catch (error) {
            console.error("Error uploading file:", error.response ? error.response.data : error.message);
        }
        };
        
    
    

    const fetchFiles = async (id) => {
        try {
            if(id > 0)
            {
                const res = await axios.post("/api/file/files",{taskID:id});
                if(res.status == 200)
                {
                    setFiles(res.data);
                }
                else
                {
                    console.log(res);
                }
            }
        } catch (error) {
            console.error("Error fetching files", error);
        }
    };

    useEffect(() => {
        if (infoDis[0] == true) { 
            if(infoDis[2].id > 0)
            {
                fetchFiles(infoDis[2].id);
            }
        }
    }, [infoDis]);

    const handelRemarkSave = async()=>{
        try 
        {
        infoDis[2].remark = ((info.name.length > 0 ? info.name : info.businessName) +" ~> "+new Date().toLocaleString()+ " : "+ remark +"\n") + infoDis[2].remark;
        console.log(infoDis[2]);
            const n = await axios.post("/api/task/update",{...infoDis[2]});
            if(n.status == 200)
            {
                setInfoDis((prevInfoDis) =>
                    prevInfoDis.map((item, index) =>
                        index === 2 ? { ...n.data } : item
                    )
                );     
                setRemark("");
            }
            else
            {
                console.log(n);
            }
        }
        catch(error)
        {
            console.log(error);
        }
    };

    return (<>
        <h1>MANAGE TASK</h1>
        {infoDis[0] == true ? (<>
            <div style={stylesTaskDisOverlay.overlay}>
        <div style={stylesTaskDisOverlay.content}>
            <h2>Task Details</h2>
            <form>
                <div style={stylesTaskDisOverlay.formGroup}>
                    <label style={stylesTaskDisOverlay.label}>ID:</label>
                    <input style={stylesTaskDisOverlay.input} value={infoDis[2].id} type="text" readOnly />
                </div>

                <div style={stylesTaskDisOverlay.formGroup}>
                    <label style={stylesTaskDisOverlay.label}>Name:</label>
                    <input style={stylesTaskDisOverlay.input} value={infoDis[2].name} type="text" readOnly />
                </div>

                <div style={stylesTaskDisOverlay.formGroup}>
                    <label style={stylesTaskDisOverlay.label}>State:</label>
                    <input style={stylesTaskDisOverlay.input} value={infoDis[2].state} type="text" readOnly />
                </div>

                <div style={stylesTaskDisOverlay.formGroup}>
                    <label style={stylesTaskDisOverlay.label}>Deadline:</label>
                    <input 
                        style={stylesTaskDisOverlay.input}
                        type="datetime-local" 
                        value={infoDis[2].deadline ? new Date(infoDis[2].deadline).toISOString().slice(0, 16) : ''} 
                        readOnly 
                    />
                </div>

                <div style={stylesTaskDisOverlay.formGroup}>
                    <label style={stylesTaskDisOverlay.label}>Created Date:</label>
                    <input 
                        style={stylesTaskDisOverlay.input}
                        type="datetime-local" 
                        value={infoDis[2].doc ? new Date(infoDis[2].doc).toISOString().slice(0, 16) : ''} 
                        readOnly 
                    />
                </div>

                <div style={stylesTaskDisOverlay.formGroup}>
                    <label style={stylesTaskDisOverlay.label}>Info:</label>
                    <input style={stylesTaskDisOverlay.input} value={infoDis[2].info}  type="text" readOnly />
                </div>

                <div style={stylesTaskDisOverlay.formGroup}>
                    <label style={stylesTaskDisOverlay.label}>Remark:</label>
                    <textarea style={stylesTaskDisOverlay.input} value={infoDis[2].remark} rows={6} readOnly></textarea>
                    <textarea style={stylesTaskDisOverlay.input} value={remark}  rows={6} onChange={(event) => onRemarkChange(event)}></textarea>
                    <button style={stylesTaskDisOverlay.submitButton} onClick={(event) => { event.preventDefault(); handelRemarkSave(); }}>SAVE</button>
                </div>

                <div style={stylesTaskDisOverlay.formGroup}>
                    <label style={stylesTaskDisOverlay.label}>Members:</label>
                    <table style={stylesTaskDisOverlay.table}>
                        <thead>
                            <tr>
                                <th style={stylesTaskDisOverlay.tableCell}>ID</th>
                                <th style={stylesTaskDisOverlay.tableCell}>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {infoDis[2].members.map((member, index) => (
                                <tr key={index}>
                                    <td style={stylesTaskDisOverlay.tableCell}>{member.id}</td>
                                    <td style={stylesTaskDisOverlay.tableCell}>{member.name} {index === 0 ? "~> LEAD" : ""}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={stylesTaskDisOverlay.formGroup}>
                    <label style={stylesTaskDisOverlay.label}>Files:</label>
                    {files.length > 0 ? (
                        <ul>
                            {files.map((file) => (
                                <li key={file._id}>
                                    <a href={`/api/file/${file.path}`} target="_blank" rel="noopener noreferrer">
                                        {file.filename}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : ""}
                </div>

                <div style={stylesTaskDisOverlay.formGroup}>
                    <label style={stylesTaskDisOverlay.label}>File Uploads:</label>
                    <input style={stylesTaskDisOverlay.input} type="file" onChange={handleFileChange} />
                    <button style={stylesTaskDisOverlay.submitButton} onClick={(event) => { handleUpload(event); }}>Upload</button>
                </div>

                {info.id === infoDis[2].members[0].id && infoDis[2].state !== "COMPLETE" ? (
                    <div style={stylesTaskDisOverlay.buttons}>
                        <button style={stylesTaskDisOverlay.submitButton} type="button" onClick={() => onCompleteTaskDis(infoDis[2])}>COMPLETE</button>
                    </div>
                ) : null}
                <button style={stylesTaskDisOverlay.closeButton} onClick={() => setInfoDis([false, 0])}>Close</button>
            </form>
        </div>
    </div>
        </>): ("")}
        {!v && (info.businessName || info.manager === true) ? (
            <div style={stylesTaskAdd.overlayTask}>
            <div style={stylesTaskAdd.taskAdd}>
                <div style={stylesTaskAdd.gridCard}>
                    <h2 style={stylesTaskAdd.formTitle}>Add Task</h2>
                    <form style={stylesTaskAdd.gridContainer} onSubmit={(event) => handleSubmit(event)}>
                        <div style={stylesTaskAdd.gridItem}>
                            <label style={stylesTaskAdd.label}>Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                required 
                                onChange={handleChange} 
                                style={stylesTaskAdd.input} 
                            />
                        </div>
                        <div style={stylesTaskAdd.gridItem}>
                            <label style={stylesTaskAdd.label}>Deadline</label>
                            <input 
                                type="date" 
                                name="deadline" 
                                required 
                                onChange={handleChange} 
                                style={stylesTaskAdd.input} 
                            />
                        </div>
                        <div style={stylesTaskAdd.gridItem}>
                            <label style={stylesTaskAdd.label}>Info</label>
                            <textarea 
                                name="info" 
                                required 
                                rows={5} 
                                onChange={handleChange} 
                                style={stylesTaskAdd.input}
                            ></textarea>
                        </div>
        
                        <div style={stylesTaskAdd.gridItem}>
                            <label style={stylesTaskAdd.label}>
                                Members <u>TEAM LEAD -- ID:0</u>
                            </label>
                            <table style={stylesTableDepOverlay.table}>
                                <tbody>
                                    <tr>
                                        <th style={{ ...stylesTableDepOverlay.tableCell, ...stylesTableDepOverlay.tableHeader }}>ID</th>
                                        <th style={{ ...stylesTableDepOverlay.tableCell, ...stylesTableDepOverlay.tableHeader }}>NAME</th>
                                        <th style={{ ...stylesTableDepOverlay.tableCell, ...stylesTableDepOverlay.tableHeader }}>ACTION</th>
                                    </tr>

                                    {selectedEmp.map((e, index) => (
                                        <tr key={index}>
                                            <td style={stylesTableDepOverlay.tableCell}>{index}</td>
                                            <td style={stylesTableDepOverlay.tableCell}>
                                                <select
                                                    required={selectedEmp.length === 0}
                                                    onChange={(event) => handleEMPChange(event, index)}
                                                    style={stylesTableDepOverlay.selectField}
                                                >
                                                    <option value="">Select EMPLOYEE</option>
                                                    {emp.map((d) => (
                                                        <option key={d.id} value={[d.name, d.id]}>{d.name}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td style={stylesTableDepOverlay.tableCell}>
                                                <button
                                                    onClick={(event) => handelEmpDelete(event, index)}
                                                    disabled={e.id === ""}
                                                    style={e.id === "" ? stylesTableDepOverlay.buttonDisabled : stylesTableDepOverlay.button}
                                                >
                                                    DELETE
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
        
                        <div style={{ ...stylesTaskAdd.gridItem, ...stylesTaskAdd.fullWidth }}>
                            <button type="submit" style={stylesTaskAdd.button}>Submit</button>
                        </div>
                    </form>
                    <button style={{ ...stylesTaskAdd.button, ...stylesTaskAdd.closeBtn }} onClick={handleAdd}>
                        Close
                    </button>
                </div>
            </div>
        </div>
        
        ) :
        (
            <div style={stylesTableDepTask.tableContainer}>
            <table style={stylesTableDepTask.table}>
                <tbody>
                    {(info.businessName || info.manager === true) ? (
                        <>
                            <tr>  
                                <td colSpan="4">
                                    <button 
                                        style={stylesTableDepTask.addButton} 
                                        onClick={handleAdd}
                                    >
                                        ADD TASK
                                    </button>
                                </td>  
                            </tr> 
                            <tr>
                                <td style={stylesTableDepTask.separator} colSpan="4">
                                    <hr />
                                </td>
                            </tr>
                        </>
                    ) : null}
                    
                    <tr>  
                        <th style={{ ...stylesTableDepTask.tableCell, ...stylesTableDepTask.tableHeader }}>ID</th>  
                        <th style={{ ...stylesTableDepTask.tableCell, ...stylesTableDepTask.tableHeader }}>Name</th>
                        <th style={{ ...stylesTableDepTask.tableCell, ...stylesTableDepTask.tableHeader }}>STATUS</th> 
                    </tr>     
        
                    {taskData?.map((info) => (  
                        <tr 
                            key={info.id} 
                            style={stylesTableDepTask.cursorPointer} 
                            onClick={() => handelDisplay(info.id)}
                        >  
                            <td style={stylesTableDepTask.tableCell}>{info.id}</td>  
                            <td style={stylesTableDepTask.tableCell}>{info.name}</td>  
                            <td style={stylesTableDepTask.tableCell}>{info.state}</td> 
                        </tr>  
                    ))}  
                </tbody>  
            </table>  
        </div>        
        ) }
    </>);
};

export default Task;