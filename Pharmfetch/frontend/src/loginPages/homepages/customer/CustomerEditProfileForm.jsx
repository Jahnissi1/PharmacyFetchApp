import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../AppTheme.css';


const CustomerEditProfileForm = () => {
  const location = useLocation();
  const customer = location.state;
  const navigate = useNavigate();

  const [fname, setFname] = useState(customer.fname);
  const [lname, setLname] = useState(customer.lname);
  const [email, setEmail] = useState(customer.email);
  const [phone, setPhone] = useState(customer.phone_num);
  const [address, setAddress] = useState(customer.address);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put('http://localhost:3001/update-customer', {
      customer_id: customer.customer_id,
      fname,
      lname,
      email,
      phone_num: phone,
      address
    }).then(res => {
      if (res.data.success) {
        alert("Profile updated!");
        navigate('/customer-homepage', { state: { ...customer, fname, lname, email, phone_num: phone, address } });
      } else {
        alert("Failed to update profile.");
      }
    }).catch(err => {
      console.log("Update error:", err);
      alert("Error updating profile.");
    });
  };

  return (
    <div>
      <h2>Edit Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input value={fname} onChange={e => setFname(e.target.value)} /><br />

        <label>Last Name:</label>
        <input value={lname} onChange={e => setLname(e.target.value)} /><br />

        <label>Email:</label>
        <input value={email} onChange={e => setEmail(e.target.value)} /><br />

        <label>Phone:</label>
        <input value={phone} onChange={e => setPhone(e.target.value)} /><br />

        <label>Address:</label>
        <input value={address} onChange={e => setAddress(e.target.value)} /><br />

        <button type="submit">Save Changes</button>
      </form>

      <button onClick={() => navigate('/customer-homepage', { state: customer })}>
        Cancel
      </button>
    </div>
  );
};

export default CustomerEditProfileForm;
