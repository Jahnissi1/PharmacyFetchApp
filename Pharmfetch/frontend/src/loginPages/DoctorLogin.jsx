import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../AppTheme.css';
import logo from '../components/pharmfetchLogo.png';

const DoctorLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/doc-login', { username, password })
      .then(res => {
        if (res.data.success) {
          navigate("/doctor-homepage", { state: res.data.doc });
        } else {
          alert("Login failed: " + res.data.message);
        }
      })
      .catch(err => {
        console.log("Login error:", err);
      });
  };

 return (
  <div className="glass-container">
    <div className="logo">
      <img src={logo} alt="PharmFetch Logo" />
    </div>

    <h2>Doctor Login</h2>

    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        onChange={e => setUsername(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      /><br />
      <button type="submit">Login</button>
    </form>
  </div>
);
};

export default DoctorLogin;
