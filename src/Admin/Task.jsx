import axios from "../axiosConfig";
import { useEffect, useState } from "react";
import "./Department.css";
import "./Task.css";

const Task = ({info})=>{
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
        <div className="task-dis-overlay">
            <div className="task-dis-overlay-content">
                <h2>Task Details</h2>
                <form >
                    <div className="task-dis-form-group">
                        <label>ID:</label>
                        <input type="text" value={infoDis[2].id} readOnly />
                    </div>

                    <div className="task-dis-form-group">
                        <label>Name:</label>
                        <input type="text" value={infoDis[2].name} readOnly />
                    </div>

                    <div className="task-dis-form-group">
                        <label>State:</label>
                        <input type="text" value={infoDis[2].state} readOnly />
                    </div>

                    <div className="task-dis-form-group">
                        <label>Deadline:</label>
                        <input 
                            type="datetime-local" 
                            value={infoDis[2].deadline ? new Date(infoDis[2].deadline).toISOString().slice(0, 16) : ''} 
                            readOnly 
                        />
                    </div>


                    <div className="task-dis-form-group">
                        <label>Created Date:</label>
                        <input 
                            type="datetime-local" 
                            value={infoDis[2].doc ? new Date(infoDis[2].doc).toISOString().slice(0, 16) : ''} 
                            readOnly 
                        />
                    </div>

                    <div className="task-dis-form-group">
                        <label>Info:</label>
                        <input type="text" value={infoDis[2].info} readOnly />
                    </div>

                    <div className="task-dis-form-group">
                        <label>Remark:</label>
                        <textarea value={infoDis[2].remark} rows={6} readOnly></textarea>
                        <textarea value={remark} rows={6} onChange={(event)=>{onRemarkChange(event)}} ></textarea>
                        <button onClick={(event)=>{event.preventDefault();handelRemarkSave();}}>SAVE</button>
                    </div>

                    <div className="task-dis-form-group">
                        <label>Members:</label>
                        <table className="task-dis-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {infoDis[2].members.map((member, index) => (
                                    <tr key={index}>
                                        <td>{member.id}</td>
                                        <td>{member.name} {index == 0 ? "~> LEAD" : ""}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="task-dis-form-group">
                        <label>Files:</label>
                        {files.length > 0 ? (<ul>
                            {files.map((file) => (
                                <li key={file._id}>
                                    <a href={`/api/file/${file.path}`} target="_blank" rel="noopener noreferrer">
                                        {file.filename}
                                    </a>
                                </li>
                            ))}
                        </ul>): ("")}
                    </div>

                    <div className="task-dis-form-group">
                        <label>File Uploads:</label>
                        <input type="file" onChange={handleFileChange} />
                        <button className="task-dis-submit-btn" onClick={(event)=>{handleUpload(event);}}>Upload</button>
                    </div>

                    {info.id == infoDis[2].members[0].id  && infoDis[2].state !== "COMPLETE"? (
                    <div className="task-dis-buttons">
                        <button type="button" onClick={()=>{onCompleteTaskDis(infoDis[2]);}} className="task-dis-submit-btn">COMPLETE</button>
                    </div>) : ("")}
                    <button className="close-btn-dis" onClick={()=>{setInfoDis([false,0]);}}>Close</button>
                </form>
            </div>
        </div>

        </>): ("")}
        {!v && (info.businessName || info.manager === true) ? (
            <div className="overlay-task">
            <div className="Task-Add">
                <div className="grid-card">
                    <h2 className="form-title">Add Task</h2>
                    <form className="grid-container" onSubmit={(event) => handleSubmit(event)}>
                        <div className="grid-item">
                            <label>Name</label>
                            <input type="text" name="name" required onChange={handleChange} />
                        </div>
                        <div className="grid-item">
                            <label>Deadline</label>
                            <input type="date" name="deadline" required onChange={handleChange} />
                        </div>
                        <div className="grid-item">
                            <label>Info</label>
                            <textarea name="info" required rows={5} onChange={handleChange}></textarea>
                        </div>
                                <div className="grid-item">
                                    <label>Members <u>TEAM LEAD -- ID:0</u></label>
                                    <table className="table-container-dep-overlay" style={{ width: "600px", minWidth: "600px",marginLeft:"0px" }}>
                                        <tbody>
                                        <tr>
                                            <th>ID</th>
                                            <th>NAME</th>
                                            <th>ACTION</th>
                                        </tr>
                                        {selectedEmp.map((e,index)=>(
                                            <tr key={index}>
                                                <td>{index}</td>
                                                <td>
                                                    <select  required={selectedEmp.length === 0}  onChange={(event)=>{handleEMPChange(event,index);}}>
                                                        <option value="">Select EMPLOYEE</option> 
                                                        {emp.map((d) => (
                                                            <option key={d.id} value={[d.name,d.id]}>{d.name}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td><button  onClick={(event)=>{handelEmpDelete(event,index);}} disabled={e.id === "" ? true: false}>DELETE</button></td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                        <div className="grid-item full-width">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                    <button className="close-btn" onClick={handleAdd}>Close</button>
                </div>
            </div>
        </div>
        ) :
        (
        <div className="table-container-dep-task">  
            <table>    
            <tbody> 
            {(info.businessName || info.manager === true) ? (
                    <>
                        <tr>  
                            <td colSpan="4">
                                <button className="add-btn" onClick={handleAdd}>ADD TASK</button>
                            </td>  
                        </tr> 
                        <tr>
                            <td style={{ padding: "2px" }} colSpan="4">
                                <hr />
                            </td>
                        </tr>
                    </>
            ) : ""}
                
                <tr>  
                    <th>ID</th>  
                    <th>Name</th>
                    <th>STATUS</th> 
                </tr>     
                {taskData?.map((info) => (  
                    <tr key={info.id} style={{ cursor: "pointer" }} onClick={()=>{handelDisplay(info.id);}}>  
                    <td>{info.id}</td>  
                    <td>{info.name}</td>  
                    <td>{info.state}</td> 
                    </tr>  
                ))}  
                </tbody>  
            </table>  
        </div>  
        ) }
    </>);
};

export default Task;