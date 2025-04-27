import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../AppTheme.css';


const AdminEditPharmacies = () => {
  
  const location = useLocation();
  const admin = location.state;
  const ad_id = admin?.admin_id;
  const navigate = useNavigate();

  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    if (ad_id) {
      axios
        .get(`http://localhost:3001/adm-edit-pharm/${ad_id}`)
        .then((res) => {
          if (res.data.success) {
            setPharmacies(res.data.pharmacies);
          }
        })
        .catch((err) => {
          console.log("Request error:", err);
        });
    }
  }, [ad_id]);

  const handleDelete = (pharmacy_id) => {
    if (window.confirm("Are you sure you want to delete this pharmacy?")) {
    axios
      .delete(`http://localhost:3001/admin/pharmacy/${pharmacy_id}`)
      .then(() => {
        alert("Pharmacy deleted!");
        setPharmacies(prev => prev.filter(p => p.pharmacy_id !== pharmacy_id));
      })
      .catch((err) => {
        console.log("Delete error:", err.response?.data || err.message);
        alert("Error deleting pharmacy.");
      });
    }
  };

  const handleEdit = (pharmacy_id) => {
    navigate(`/admin-edit-pharmacy/${pharmacy_id}`);
  };

  return (
      <div>
        <h2>Pharmacy List</h2>
        {pharmacies.length > 0 ? (
            <table border="1" cellPadding="8">
              <thead>
              <tr>
                <th>Pharmacy ID</th>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Operating Hours</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {pharmacies.map((pharm) => (
                  <tr key={pharm.pharmacy_id}>
                      <td>{pharm.pharmacy_id}</td>
                      <td>{pharm.username}</td>
                      <td>{pharm.name}</td>
                      <td>{pharm.email}</td>
                      <td>{pharm.phone_num}</td>
                      <td>{pharm.address}</td>
                      <td>{pharm.operating_hours}</td>
                      <td>
                          <button onClick={() => handleEdit(pharm.pharmacy_id)}>Edit</button>
                          <button onClick={() => handleDelete(pharm.pharmacy_id)}>Delete</button>
                      </td>

                  </tr>
              ))}
              </tbody>
            </table>
        ) : (
            <p>No pharmacies found.</p>
        )}
          <br/>
          <button onClick={() => window.history.back()}>
          Back to Admin Homepage
        </button>
      </div>
  );
};

export default AdminEditPharmacies