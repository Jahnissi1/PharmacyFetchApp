import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../../AppTheme.css';
import logo from '../../components/pharmfetchLogo.png'; // adjust path as needed
import NavBar from '../../components/NavBar';

const CustomerHomePage = () => {

  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  return (
      <>
        <NavBar onLogout={() => navigate('/')}/>
  <div className="glass-container">
    <div className="logo">
      <img src={logo} alt="PharmFetch Logo" />
    </div>

    <h2>Hi {data?.fname} {data?.lname}</h2>

    <div>
      <button onClick={() => navigate("/customer-place-order", { state: data })}>
        Place an order
      </button>
    </div>

    <div>
      <button onClick={() => navigate("/customer-upload-prescription", { state: data })}>
        Upload prescription
      </button>
    </div>

    <div>
      <button onClick={() => navigate("/customer-view-orders", { state: data })}>
        View orders
      </button>
    </div>

    <div>
      <button onClick={() => navigate("/customer-edit-profile", { state: data })}>
        Edit profile
      </button>
    </div>
  </div>
        </>
);
}

export default CustomerHomePage