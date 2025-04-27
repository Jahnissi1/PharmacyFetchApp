import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import logo from '../components/pharmfetchLogo.png';
import '../AppTheme.css';


const CustomerLogin = () => {

const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();

const [showPopup, setShowPopup] = useState(false);
const [newCustomer, setNewCustomer] = useState({
  username: '',
  password: '',
  fname: '',
  lname: '',
  email: '',
  phone_num: 0,
  address: '',
  admin_id: Math.floor(Math.random() * 1) + 1
});

// assigning customer admin is hardcoded



function handleSubmit(event) {
  event.preventDefault();
  
  axios.post('http://localhost:3001/cust-login', { username, password })
    .then(res => {
      if (res.data.success) {
        console.log("Login successful", res.data.cust?.fname, res.data.cust?.lname);
        navigate("/customer-homepage", {
          state: res.data.cust
        });
      } else {
        console.log("Login failed", res.data.message);
      }
    })
    .catch(err => {
      console.log("Request error:", err);
    });

}

function handleCustAccCreation() {
  setShowPopup(true);
}

function handleCreateSubmit(e) {
  e.preventDefault();
  axios.post('http://localhost:3001/create-cust', newCustomer)
    .then(res => {
      if (res.data.success) {
        setShowPopup(false);
        alert("Account created successfully!");
      } else {
        alert("Failed to create account.");
      }
    })
    .catch(err => {
      console.log("Error creating customer:", err);
    });
}

return (
  <div className="login-container">
    <div className="login-box">
      <form onSubmit={handleSubmit}>
        <h2>Customer Login</h2>
        <div className="login-logo">
          <img src={logo} alt="PharmFetch Logo"/>
        </div>
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
        <button type="submit">Login</button>
      </form>

      <button onClick={handleCustAccCreation} style={{marginTop: '10px'}}>
        Create Account
      </button>
    </div>

    {showPopup && (
  <>
    <div className="popup">
      <h3>Create New Customer</h3>
      <form onSubmit={handleCreateSubmit}>
        <input
          type="text"
          placeholder="First Name"
          onChange={e => setNewCustomer({ ...newCustomer, fname: e.target.value })}
        /><br />
        <input
          type="text"
          placeholder="Last Name"
          onChange={e => setNewCustomer({ ...newCustomer, lname: e.target.value })}
        /><br />
        <input
          type="text"
          placeholder="Username"
          onChange={e => setNewCustomer({ ...newCustomer, username: e.target.value })}
        /><br />
        <input
          type="password"
          placeholder="Password"
          onChange={e => setNewCustomer({ ...newCustomer, password: e.target.value })}
        /><br />
        <input
          type="email"
          placeholder="Email"
          onChange={e => setNewCustomer({ ...newCustomer, email: e.target.value })}
        /><br />
        <input
          type="text"
          placeholder="Phone"
          onChange={e => setNewCustomer({ ...newCustomer, phone_num: e.target.value })}
        /><br />
        <input
          type="text"
          placeholder="Address"
          onChange={e => setNewCustomer({ ...newCustomer, address: e.target.value })}
        /><br />
        <button type="submit">Submit</button>
        <button type="button" onClick={() => setShowPopup(false)}>Cancel</button>
      </form>
    </div>
  </>
)}
  </div>
);}

export default CustomerLogin