import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../AppTheme.css';


const AdminEditCustomers = () => {
  
  const location = useLocation();
  const admin = location.state;
  const ad_id = admin?.admin_id;
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    if (ad_id) {
      axios
        .get(`http://localhost:3001/adm-edit-cust/${ad_id}`)
        .then((res) => {
          if (res.data.success) {
            setCustomers(res.data.customers);
          }
        })
        .catch((err) => {
          console.log("Request error:", err);
        });
    }
  }, [ad_id]);

  const handleDelete = (customer_id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
    axios
      .delete(`http://localhost:3001/admin/customer/${customer_id}`)
      .then(() => {
        alert("Customer deleted!");
        setCustomers(prev => prev.filter(c => c.customer_id !== customer_id));
      })
      .catch((err) => {
        console.log("Delete error:", err);
        alert("Error deleting customer.");
      });
  }
  };

  const handleEdit = (customer_id) => {
    navigate(`/admin-edit-customer/${customer_id}`);
  };

  return (
      <div>
        <h2>Customer List</h2>
        {customers.length > 0 ? (
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
              {customers.map((cust) => (
                  <tr key={cust.customer_id}>
                    <td>{cust.customer_id}</td>
                    <td>{cust.username}</td>
                    <td>{cust.fname} {cust.lname}</td>
                    <td>{cust.email}</td>
                    <td>{cust.phone_num}</td>
                    <td>{cust.address}</td>
                    <td>
                      <button onClick={() => handleEdit(cust.customer_id)}>Edit</button>
                      <button onClick={() => handleDelete(cust.customer_id)}>Delete</button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
        ) : (
            <p>No customers found.</p>
        )}
        <br/>
        <button onClick={() => window.history.back()}>
          Back to Admin Homepage
        </button>
      </div>
  );
};

export default AdminEditCustomers