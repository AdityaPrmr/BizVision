import { useState } from "react";
import "./Register.css";
import logo from "../Assets/logo.png";
import "./HF.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";

const Register = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [cp, setCp] = useState("");
    const [data, setData] = useState({
        "sno": null,
        "businessName": "",
        "businessType": "",
        "industry": "",
        "registrationNumber": "",
        "gstin": "",
        "businessAddress": "",
        "businessEmail": "",
        "businessPhone": "",
        "website": null,
        "joinedDate": null,
        "status": "",
        "password":"",
        "owner": {
            "name": "",
            "contactNumber": "",
            "email": "",
            "aadhaarOrPAN": "",
            "residentialAddress": "",
            "ownershipPercentage": null,
            "idProofType": "",
            "idProofNumber": ""
        }
    });

    const saveData=async()=>{
        data.joinedDate = new Date().toLocaleDateString();
        data.status = "Active";
        const update = await axios.post("/api/user",data);
        try
        {
            console.log(update);
            if(update.data.businessName == data.businessName)
            {
                navigate("/DashBoardA");
            }
        }
        catch(erorr)
        {
            
            alert(erorr.message);
        }
    };

    const handelSubmit = (event)=>{
        event.preventDefault();
        const form = event.target.closest('form');
        if (form.checkValidity()) {
            if(cp === data.password)
            {
                saveData();
            }
            else
            {
                alert("PASSWORD AND COMFIRM PASSWORD DONT MATCH.");
            }
        }
        else
        {
            form.reportValidity();
        }
    };

    return (
         <div className="aa">
             <nav>
                 <ul>
                     <li><img src={logo} alt="Logo" /></li>
                     <li><h1>Business Management</h1></li>
                 </ul>
                 <div className="right">
                            <ul>
                                <li><Link to="/">GO BACK</Link></li>
                            </ul>
                </div>
             </nav>   

            <div className="container">
                <div className="form-box">
                    <h2>Business Registration</h2>

                    {/* Phase 1: Business Details */}
                    {step === 1 && (
                        <form>
                            <h3>Business Details</h3>
                            <div className="grid">
                                <div>
                                    <label>Business Name <p className="r">*</p></label>
                                    <input
                                        type="text"
                                        placeholder="Enter Business Name"
                                        onBlur={(event) => setData(prevData => ({ ...prevData, businessName: event.target.value }))}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Business Type <p className="r">*</p></label>
                                    <select
                                        onBlur={(event) => setData(prevData => ({ ...prevData, businessType: event.target.value }))}
                                        required
                                    >
                                        <option value="">Select Business Type</option>
                                        <option value="Sole Proprietorship">Sole Proprietorship</option>
                                        <option value="Partnership">Partnership</option>
                                        <option value="Pvt. Ltd.">Pvt. Ltd.</option>
                                        <option value="LLP">LLP</option>
                                        <option value="Public Ltd.">Public Ltd.</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Industry <p className="r">*</p></label>
                                    <input
                                        type="text"
                                        placeholder="Enter Industry"
                                        onBlur={(event) => setData(prevData => ({ ...prevData, industry: event.target.value }))}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Registration Number</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Registration Number"
                                        onBlur={(event) => setData(prevData => ({ ...prevData, registrationNumber: event.target.value }))}
                                    />
                                </div>
                                <div>
                                    <label>GSTIN</label>
                                    <input
                                        type="text"
                                        placeholder="Enter GSTIN"
                                        onBlur={(event) => setData(prevData => ({ ...prevData, gstin: event.target.value }))}
                                    />
                                </div>
                                <div>
                                    <label>Business Address <p className="r">*</p></label>
                                    <input
                                        type="text"
                                        placeholder="Enter Business Address"
                                        onBlur={(event) => setData(prevData => ({ ...prevData, businessAddress: event.target.value }))}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Business Email <p className="r">*</p></label>
                                    <input
                                        type="email"
                                        placeholder="Enter Business Email"
                                        onBlur={(event) => setData(prevData => ({ ...prevData, businessEmail: event.target.value }))}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Business Phone <p className="r">*</p></label>
                                    <input
                                        type="text"
                                        placeholder="Enter Business Phone"
                                        onBlur={(event) => setData(prevData => ({ ...prevData, businessPhone: event.target.value }))}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="button" className="btn" onClick={() => setStep(2)}>Next</button>
                        </form>
                    )}

                    {/* Phase 2: Owner Details */}
                    {step === 2 && (
                        <form>
                            <h3>Owner Details</h3>
                            <div className="grid">
                                <div>
                                    <label>Owner Name <p className="r">*</p></label>
                                    <input
                                        type="text"
                                        placeholder="Enter Owner Name"
                                        onBlur={(event) => setData(prevData => ({ ...prevData, owner: { ...prevData.owner, name: event.target.value } }))}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Contact Number <p className="r">*</p></label>
                                    <input
                                        type="text"
                                        placeholder="Enter Contact Number"
                                        onBlur={(event) => setData(prevData => ({ ...prevData, owner: { ...prevData.owner, contactNumber: event.target.value } }))}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Owner Email <p className="r">*</p></label>
                                    <input
                                        type="email"
                                        placeholder="Enter Owner Email"
                                        onBlur={(event) => setData(prevData => ({ ...prevData, owner: { ...prevData.owner, email: event.target.value } }))}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Aadhaar/PAN <p className="r">*</p></label>
                                    <input
                                        type="text"
                                        placeholder="Enter Aadhaar/PAN"
                                        onBlur={(event) => setData(prevData => ({ ...prevData, owner: { ...prevData.owner, aadhaarOrPAN: event.target.value } }))}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Residential Address <p className="r">*</p></label>
                                    <input
                                        type="text"
                                        placeholder="Enter Address"
                                        onBlur={(event) => setData(prevData => ({ ...prevData, owner: { ...prevData.owner, residentialAddress: event.target.value } }))}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Ownership Percentage <p className="r">*</p></label>
                                    <input
                                        type="number"
                                        placeholder="Enter %"
                                        onBlur={(event) => setData(prevData => ({ ...prevData, owner: { ...prevData.owner, ownershipPercentage: event.target.value } }))}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>ID Proof Type <p className="r">*</p></label>
                                    <select
                                        onBlur={(event) => setData(prevData => ({ ...prevData, owner: { ...prevData.owner, idProofType: event.target.value } }))}
                                        required
                                    >
                                        <option value="">Select ID Proof Type</option>
                                        <option value="Driving License">Driving License</option>
                                        <option value="Passport">Passport</option>
                                        <option value="Voter ID">Voter ID</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label>ID Proof Number <p className="r">*</p></label>
                                    <input
                                        type="text"
                                        placeholder="Enter ID Proof Number"
                                        onBlur={(event) => setData(prevData => ({ ...prevData, owner: { ...prevData.owner, idProofNumber: event.target.value } }))}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="button" className="btn" onClick={() => setStep(1)}>Back</button>
                            <button type="button" className="btn" onClick={() => setStep(3)}>Next</button>
                        </form>
                    )}

                    {/* Phase 3: Account Setup */}
                    {step === 3 && (
                        <form>
                            <h3>Account Setup</h3>
                            <div className="grid">
                                <div>
                                    <label>Password <p className="r">*</p></label>
                                    <input
                                        type="password"
                                        placeholder="Enter Password"
                                        onBlur={(event) => setData(prevData => ({ ...prevData, password: event.target.value }))}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Confirm Password <p className="r">*</p></label>
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        onBlur={(event) => setCp(event.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="button" className="btn" onClick={() => setStep(2)}>Back</button>
                            <button type="submit" className="btn" onClick={(event)=>{handelSubmit(event);}}>Submit</button>
                        </form>
                    )}
                </div>
            </div>

            <footer>
                <p>&copy; 2025 Business Management. All rights reserved.</p>
                <div className="footer-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Contact Us</a>
                </div>
            </footer>
        </div>
    );
};

export default Register;
