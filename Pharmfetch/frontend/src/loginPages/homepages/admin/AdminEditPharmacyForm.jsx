import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../AppTheme.css';


const AdminEditPharmacyForm = () => {
  const { pharmacy_id } = useParams();
  const navigate = useNavigate();

  const [pharmacy, setPharmacy] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/pharmacy/${pharmacy_id}`)
      .then(res => {
        if (res.data.length > 0) {
          setPharmacy(res.data[0]);
        }
      })
      .catch(err => {
        console.log("Fetch pharmacy error:", err.response?.data || err.message);
      });
  }, [pharmacy_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPharmacy(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    axios.put(`http://localhost:3001/admin/pharmacy/${pharmacy_id}`, pharmacy)
      .then(() => {
        alert("Pharmacy updated successfully!");
        navigate("/admin-edit-pharmacies");
      })
      .catch(err => {
        console.log("Update error:", err.response?.data || err.message);
        alert("Error updating pharmacy.");
      });
  };

  if (!pharmacy) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Pharmacy</h2>
      <label>Username: <input name="username" value={pharmacy.username} onChange={handleChange} /></label><br />
      <label>Name: <input name="name" value={pharmacy.name} onChange={handleChange} /></label><br />
      <label>Email: <input name="email" value={pharmacy.email} onChange={handleChange} /></label><br />
      <label>Phone: <input name="phone_num" value={pharmacy.phone_num} onChange={handleChange} /></label><br />
      <label>Address: <input name="address" value={pharmacy.address} onChange={handleChange} /></label><br />
      <label>Operating Hours: <input name="operating_hours" value={pharmacy.operating_hours} onChange={handleChange} /></label><br /><br />

      <button onClick={handleSave}>Save Changes</button>
      <button onClick={() => navigate(-1)}>Cancel</button>
    </div>
  );
};

export default AdminEditPharmacyForm;
