import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../AppTheme.css';
import logo from '../components/pharmfetchLogo.png';

const AdminLogin = () => {

const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const navigate = useNavigate()


function handleSubmit(event) {
  event.preventDefault();
  
  axios.post('http://localhost:3001/adm-login', { username, password })
    .then(res => {
      if (res.data.success) {
        console.log("Login successful", res.data.adm?.fname, res.data.adm?.lname);
        navigate("/admin-homepage", {
          state: res.data.adm
        });
      } else {
        console.log("Login failed", res.data.message);
      }
    })
    .catch(err => {
      console.log("Request error:", err);
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
  </div>
);
}

export default AdminLogin