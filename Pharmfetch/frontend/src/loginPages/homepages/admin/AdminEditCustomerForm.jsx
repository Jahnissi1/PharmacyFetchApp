import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../AppTheme.css';

const AdminEditCustomerForm = () => {
  const { customer_id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/customer/${customer_id}`)
      .then(res => {
        if (res.data.length > 0) {
          setCustomer(res.data[0]);
        }
      })
      .catch(err => {
        console.log("Fetch customer error:", err.response?.data || err.message);
      });
  }, [customer_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    axios.put(`http://localhost:3001/admin/customer/${customer_id}`, customer)
      .then(() => {
        alert("Customer updated successfully!");
        navigate("/admin-edit-customers");
      })
      .catch(err => {
        console.log("Update error:", err.response?.data || err.message);
        alert("Error updating customer.");
      });
  };

  if (!customer) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Customer</h2>
      <label>Username: <input name="username" value={customer.username} onChange={handleChange} /></label><br />
      <label>First Name: <input name="fname" value={customer.fname} onChange={handleChange} /></label><br />
      <label>Last Name: <input name="lname" value={customer.lname} onChange={handleChange} /></label><br />
      <label>Email: <input name="email" value={customer.email} onChange={handleChange} /></label><br />
      <label>Phone: <input name="phone_num" value={customer.phone_num} onChange={handleChange} /></label><br />
      <label>Address: <input name="address" value={customer.address} onChange={handleChange} /></label><br /><br />

      <button onClick={handleSave}>Save Changes</button>
      <button onClick={() => navigate(-1)}>Cancel</button>
    </div>
  );
};

export default AdminEditCustomerForm;
