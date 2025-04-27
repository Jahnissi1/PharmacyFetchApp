import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../AppTheme.css';


const AdminEditDriverForm = () => {
  const { driver_id } = useParams();
  const navigate = useNavigate();

  const [driver, setDriver] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/driver/${driver_id}`)
      .then(res => {
        if (res.data.length > 0) {
          setDriver(res.data[0]);
        }
      })
      .catch(err => {
        console.log("Fetch driver error:", err);
      });
  }, [driver_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriver(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    axios.put(`http://localhost:3001/admin/driver/${driver_id}`, driver)
      .then(() => {
        alert("Driver updated successfully!");
        navigate("/admin-edit-drivers");
      })
      .catch(err => {
        console.log("Update error:", err.response?.data || err.message);
        alert("Error updating driver.");
      });
  };

  if (!driver) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Driver</h2>
      <label>Username: <input name="username" value={driver.username} onChange={handleChange} /></label><br />
      <label>First Name: <input name="fname" value={driver.fname} onChange={handleChange} /></label><br />
      <label>Last Name: <input name="lname" value={driver.lname} onChange={handleChange} /></label><br />
      <label>Email: <input name="email" value={driver.email} onChange={handleChange} /></label><br />
      <label>Phone: <input name="phone_num" value={driver.phone_num} onChange={handleChange} /></label><br />
      <label>License #: <input name="license_num" value={driver.license_num} onChange={handleChange} /></label><br /><br />

      <button onClick={handleSave}>Save Changes</button>
      <button onClick={() => navigate(-1)}>Cancel</button>
    </div>
  );
};

export default AdminEditDriverForm;
