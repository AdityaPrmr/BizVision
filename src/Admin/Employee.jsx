import axios from "../axiosConfig";
import { useEffect, useState } from "react";
import "./Department.css";
const Employee = ({info})=>{
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
                <div className="overlay">
                <div className="Employee-Add">
                    <div className="grid-card">
                        <h2 className="form-title">Employee INFO</h2>
                        <form className="grid-container">
                            <div className="grid-item">
                                <label>Email</label>
                                <input type="email" value={infoDis[0].email} name="email" readOnly  />
                            </div>
                            <div className="grid-item">
                                <label>Name</label>
                                <input type="text" value={infoDis[0].name} name="name" readOnly />
                            </div>
                            <div className="grid-item">
                                <label>Mobile</label>
                                <input type="number" value={infoDis[0].mobile} name="mobile" readOnly />
                            </div>
                            <div className="grid-item">
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <label>Manager</label>

                                    <input 
                                        type="radio" 
                                        style={{ marginBottom: "2px", width: "20px" }} 
                                        value="true" 
                                        name="manager" 
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
                                        style={{ marginBottom: "2px", width: "20px" }} 
                                        value="false" 
                                        name="manager" 
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


                            <div className="grid-item">
                                <label>Department</label>
                                <input type="text" value={infoDis[0].department} name="name" readOnly />
                            </div>
                        </form>
                        <button className="close-btn" onClick={(event)=>{event.preventDefault();empInfoDisHandel();}}>Close</button>
                    </div>
                </div>
            </div>
            ) : ("")}
        {!v ? (
            <div className="overlay">
                <div className="Employee-Add">
                    <div className="grid-card">
                        <h2 className="form-title">Add Employee</h2>
                        <form className="grid-container" onSubmit={(event)=>{handleSubmit(event)}}>
                            <div className="grid-item">
                                <label>Email</label>
                                <input type="email" name="email" required onChange={handleChange} />
                            </div>
                            <div className="grid-item">
                                <label>Password</label>
                                <input type="password" name="password" required onChange={handleChange} />
                            </div>
                            <div className="grid-item">
                                <label>Name</label>
                                <input type="text" name="name" required onChange={handleChange} />
                            </div>
                            <div className="grid-item">
                                <label>Mobile</label>
                                <input type="number" name="mobile" required onChange={handleChange} />
                            </div>
                            <div className="grid-item">
                            <label>Department</label>
                            {info.department ? (info.department)  : (
                                    dep && dep.length > 0 ?(
                                            <select name="department" required onChange={handleChange}>
                                            <option value="">Select Department</option>
                                                {dep.map((d) => (
                                                    <option key={d.id} value={d.name}>{d.name}</option>
                                                ))}
                                            </select>
                                        )
                                     : (
                                        <p>Loading departments...</p>
                                    ))}
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
        <div className="table-container-dep-emp">  
            <table>    
            <tbody> 
                <tr>  
                    <td colSpan="4"><button className="add-btn" onClick={handleAdd}>ADD EMPLOYEE</button></td>  
                </tr> 
                <tr>
                    <td style={{ padding: "2px" }} colSpan="4"><hr ></hr></td>
                </tr>
                <tr>  
                    <th>ID</th>  
                    <th>Name</th>
                    <th>DEPARTMENT</th>  
                    <th>Action</th>  
                </tr>     
                {data?.map((info) => (  
                    <tr key={info.id} onClick={()=>{empInfoDisHandel(info)}}>  
                    <td>{info.id}</td>  
                    <td>{info.name}</td>  
                    <td>{info.department}</td>
                    <td>  
                        <button className="delete-btn" onClick={() => handleDelete(info.id)}>Delete</button>  
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
