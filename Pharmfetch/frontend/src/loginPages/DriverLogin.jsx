import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../AppTheme.css';
import logo from '../components/pharmfetchLogo.png';

const DriverLogin = () => {

const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();

const [showPopup, setShowPopup] = useState(false);
const [newDriver, setNewDriver] = useState({
  username: '',
  password: '',
  fname: '',
  lname: '',
  email: '',
  phone_num: 0,
  license_num: 0,
  availability: '',
  admin_id: Math.floor(Math.random() * 1) + 1
});

// assigning driver admin is hardcoded



function handleSubmit(event) {
  event.preventDefault();
  
  axios.post('http://localhost:3001/driv-login', { username, password })
    .then(res => {
      if (res.data.success) {
        console.log("Login successful", res.data.driv?.fname, res.data.driv?.lname);
        navigate("/driver-homepage", {
          state: res.data.driv
        });
      } else {
        console.log("Login failed", res.data.message);
      }
    })
    .catch(err => {
      console.log("Request error:", err);
    });
}

function handleDrivAccCreation() {
  setShowPopup(true);
}

function handleCreateSubmit(e) {
  e.preventDefault();
  axios.post('http://localhost:3001/create-driv', newDriver)
    .then(res => {
      if (res.data.success) {
        setShowPopup(false);
        alert("Account created successfully!");
      } else {
        alert("Failed to create account.");
      }
    })
    .catch(err => {
      console.log("Error creating driver:", err);
    });
}


  return (
  <div className="glass-container">
    <div className="logo">
      <img src={logo} alt="PharmFetch Logo" />
    </div>

    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button>Login</button>
    </form>

    <button onClick={handleDrivAccCreation}>Create Account</button>

    {showPopup && (
        <div className="popup">
            <h3>Create New Driver</h3>
            <form onSubmit={handleCreateSubmit}>
              <input
                  type="text"
                  placeholder="First Name"
                  onChange={e => setNewDriver({...newDriver, fname: e.target.value})}
              /><br/>
              <input
                  type="text"
                  placeholder="Last Name"
                  onChange={e => setNewDriver({...newDriver, lname: e.target.value})}
              /><br/>
              <input
                  type="text"
                  placeholder="Username"
                  onChange={e => setNewDriver({...newDriver, username: e.target.value})}
              /><br/>
              <input
                  type="password"
                  placeholder="Password"
                  onChange={e => setNewDriver({...newDriver, password: e.target.value})}
              /><br/>
              <input
                  type="email"
                  placeholder="Email"
                  onChange={e => setNewDriver({...newDriver, email: e.target.value})}
              /><br/>
              <input
                  type="text"
                  placeholder="Phone"
                  onChange={e => setNewDriver({...newDriver, phone_num: e.target.value})}
              /><br/>
              <input
                  type="text"
                  placeholder="License Number"
                  onChange={e => setNewDriver({...newDriver, license_num: e.target.value})}
              /><br/>
              <input
                  type="text"
                  placeholder="Availability"
                  onChange={e => setNewDriver({...newDriver, availability: e.target.value})}
              /><br/>
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setShowPopup(false)}>Cancel</button>
            </form>
          </div>
          )}
        </div>
    );

    }

    export default DriverLogin