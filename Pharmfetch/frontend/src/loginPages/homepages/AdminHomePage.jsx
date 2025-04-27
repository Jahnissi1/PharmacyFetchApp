import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../../AppTheme.css';
import logo from '../../components/pharmfetchLogo.png';
import NavBar from '../../components/NavBar';

const AdminHomePage = () => {

  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  return (
  <>
    <NavBar user={data} onLogout={() => navigate('/')} />

    <div className="glass-container">
      <div className="logo">
        <img src={logo} alt="PharmFetch Logo" />
      </div>

      <h2>Hi {data?.fname} {data?.lname}</h2>

      <div>
        <button onClick={() => navigate("/admin-edit-customers", { state: data })}>
          Edit Customers
        </button>
      </div>

      <div>
        <button onClick={() => navigate("/admin-edit-drivers", { state: data })}>
          Edit Drivers
        </button>
      </div>

      <div>
        <button onClick={() => navigate("/admin-edit-pharmacies", { state: data })}>
          Edit Pharmacies
        </button>
      </div>
    </div>
  </>
);

}

export default AdminHomePage