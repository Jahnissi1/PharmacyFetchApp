import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../AppTheme.css';
import logo from '../../components/pharmfetchLogo.png'; // adjust path as needed
import NavBar from '../../components/NavBar';


const DoctorHomePage = () => {
  const location = useLocation();
  const doc = location.state;
  const navigate = useNavigate();

  return (
      <>
      <NavBar onLogout={() => navigate('/')}/>
  <div className="glass-container">
    <div className="logo">
      <img src={logo} alt="PharmFetch Logo" />
    </div>

    <h2>Welcome Dr. {doc?.fname} {doc?.lname}</h2>

    <div>
      <button onClick={() => navigate("/doctor-create-prescription", { state: doc })}>
        Create Prescription
      </button>
    </div>

    <div>
      <button onClick={() => navigate("/doctor-view-prescriptions", { state: doc })}>
        View Prescriptions
      </button>
    </div>

    <div>
      <button onClick={() => navigate("/doctor-filter-prescriptions", { state: doc })}>
        View Prescriptions by Customer
      </button>
    </div>
  </div>
        </>
);
};

export default DoctorHomePage;
