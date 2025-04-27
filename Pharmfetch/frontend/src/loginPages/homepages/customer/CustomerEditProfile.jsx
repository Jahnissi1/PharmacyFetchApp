import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import '../../../AppTheme.css';


const CustomerEditProfile = () => {
  
  const location = useLocation();
  const customer = location.state;
  const navigate = useNavigate();

  const handleDelete = (customer_id) => {
  if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
    axios
      .delete(`http://localhost:3001/admin/customer/${customer_id}`)
      .then(() => {
        alert("Your account has been deleted.");
        window.location.href = "/"; // redirect to homepage or login
      })
      .catch((err) => {
        console.error("Error deleting customer:", err);
        alert("Something went wrong. Please try again.");
      });
    }
  };

  const handleEdit = (customer_id) => {
    navigate('/customer-edit-profile-form', { state: customer });
  };

  return (
    <div>
      <h2>Customer Information</h2>
      {customer ? (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr key={customer.customer_id}>
              <td>{customer.customer_id}</td>
              <td>{customer.username}</td>
              <td>{customer.fname} {customer.lname}</td>
              <td>{customer.email}</td>
              <td>{customer.phone_num}</td>
              <td>{customer.address}</td>
              <td>
                <button onClick={handleEdit}>Edit Profile</button>
                <button onClick={() => handleDelete(customer.customer_id)}>Delete Account</button>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>No customers found.</p>
      )}
    </div>
  );
};

export default CustomerEditProfile