import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import '../../AppTheme.css';
import logo from '../../components/pharmfetchLogo.png'; // adjust path as needed
import NavBar from '../../components/NavBar';


const DriverHomePage = () => {

    const location = useLocation();
    const data = location.state;
    const navigate = useNavigate();

    return (
        <>
        <NavBar onLogout={() => navigate('/')}/>
        <div className="glass-container">
            <div className="logo">
                <img src={logo} alt="PharmFetch Logo"/>
            </div>

            <h2>Hi {data?.fname} {data?.lname}</h2>

            <div>
                <button onClick={() => navigate("/driver-pickup-order", {state: data})}>
                    Pick up an order
                </button>
            </div>

            <div>
                <button onClick={() => navigate("/driver-view-order", {state: data})}>
                    View orders
                </button>
            </div>

            <div>
                <button onClick={() => navigate("/driver-edit-profile", {state: data})}>
                    Edit profile
                </button>
            </div>
        </div>
            </>
    );
}

export default DriverHomePage