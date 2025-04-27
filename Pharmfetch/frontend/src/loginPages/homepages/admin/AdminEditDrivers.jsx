import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../AppTheme.css';


const AdminEditDrivers = () => {
  
  const location = useLocation();
  const admin = location.state;
  const ad_id = admin?.admin_id;
  const navigate = useNavigate();

  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    if (ad_id) {
      axios
        .get(`http://localhost:3001/adm-edit-driv/${ad_id}`)
        .then((res) => {
          if (res.data.success) {
            setDrivers(res.data.drivers);
          }
        })
        .catch((err) => {
          console.log("Request error:", err);
        });
    }
  }, [ad_id]);

  const handleDelete = (driver_id) => {
     if (window.confirm("Are you sure you want to delete this driver?")) {
    axios
      .delete(`http://localhost:3001/admin/driver/${driver_id}`)
      .then((res) => {
        alert("Driver deleted!");
        // Refresh the list after deletion
        setDrivers(prev => prev.filter(driv => driv.driver_id !== driver_id));
      })
      .catch((err) => {
        console.log("Delete error:", err);
        alert("Error deleting driver.");
      });
  }
  };

  const handleEdit = (driver_id) => {
     navigate(`/admin-edit-driver/${driver_id}`);
  };

  return (
      <div>
        <h2>Driver List</h2>
        {drivers.length > 0 ? (
            <table border="1" cellPadding="8">
              <thead>
              <tr>
                <th>Driver ID</th>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {drivers.map((driv) => (
                  <tr key={driv.driver_id}>
                    <td>{driv.driver_id}</td>
                    <td>{driv.username}</td>
                    <td>{driv.fname} {driv.lname}</td>
                    <td>{driv.email}</td>
                    <td>{driv.phone_num}</td>
                    <td>
                      <button onClick={() => handleEdit(driv.driver_id)}>Edit</button>
                      <button onClick={() => handleDelete(driv.driver_id)}>Delete</button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
        ) : (
            <p>No drivers found.</p>
        )}
        <br/>
        <button onClick={() => window.history.back()}>
          Back to Admin Homepage
        </button>
      </div>
  );
};

export default AdminEditDrivers