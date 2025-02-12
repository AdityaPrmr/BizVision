import { useLocation } from 'react-router-dom';
import "./BussinessDetail.css";
import "./DashBoardSA.css";
import logo from "../Assets/logo.png";
import { Link } from "react-router-dom";

const Business = () => {
    const location = useLocation();
    const { business } = location.state || {}; 

    if (!business) {
        return (<div>No business data available.</div>); 
    }
    
    const {
        businessName,
        businessType,
        industry,
        registrationNumber,
        gstin,
        businessAddress,
        businessEmail,
        businessPhone,
        website,
        joinedDate,
        status,
        owner
    } = business;

    return (
        <>
        <div className="sa">
                    <nav>
                        <ul>
                            <li><img src={logo} alt="Logo" /></li>
                            <li><h1>Business Management</h1></li>
                        </ul>
                        <div className="right">
                            <ul>
                                <li><Link to="/DashBoardSA">GO BACK</Link></li>
                                <li><a href="#">LOGOUT</a></li>
                            </ul>
                        </div>
                    </nav>
        </div>
        <div className="business-details-container">
            <h1 className="text-xl font-bold text-center mb-4">Business Details</h1>

            <div className="p-4 shadow-md rounded-lg">
                <div className="business-section mb-4">
                    <h3 className="text-lg font-semibold">Business Information</h3>
                    <p><strong>Business Name:</strong> {businessName}</p>
                    <p><strong>Business Type:</strong> {businessType}</p>
                    <p><strong>Industry:</strong> {industry}</p>
                    <p><strong>Registration Number:</strong> {registrationNumber}</p>
                    <p><strong>GSTIN:</strong> {gstin}</p>
                    <p><strong>Business Address:</strong> {businessAddress}</p>
                    <p><strong>Business Email:</strong> {businessEmail}</p>
                    <p><strong>Business Phone:</strong> {businessPhone}</p>
                    <p><strong>Website:</strong> <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-500">{website}</a></p>
                    <p><strong>Joined Date:</strong> {new Date(joinedDate).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> {status}</p>
                </div>
                <div className="owner-section">
                    <h3 className="text-lg font-semibold">Owner Information</h3>
                    <p><strong>Owner Name:</strong> {owner.name}</p>
                    <p><strong>Contact Number:</strong> {owner.contactNumber}</p>
                    <p><strong>Email:</strong> {owner.email}</p>
                    <p><strong>Aadhaar/PAN Number:</strong> {owner.aadhaarOrPAN}</p>
                    <p><strong>Residential Address:</strong> {owner.residentialAddress}</p>
                    <p><strong>Ownership Percentage:</strong> {owner.ownershipPercentage}%</p>
                    <p><strong>ID Proof Type:</strong> {owner.idProofType}</p>
                    <p><strong>ID Proof Number:</strong> {owner.idProofNumber}</p>
                </div>
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
        </>
    );
};

export default Business;
