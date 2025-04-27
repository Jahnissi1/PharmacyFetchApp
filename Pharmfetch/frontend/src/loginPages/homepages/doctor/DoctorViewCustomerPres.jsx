import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../AppTheme.css';


const DoctorFilterPrescriptions = () => {
  const location = useLocation();
  const doc = location.state;
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [prescriptions, setPrescriptions] = useState([]);

  // Load all customers (for dropdown)
  useEffect(() => {
    axios.get('http://localhost:3001/customers')
      .then(res => setCustomers(res.data))
      .catch(err => console.log("Failed to load customers:", err));
  }, []);

  // Fetch prescriptions once a customer is selected
  const handleFetch = () => {
    if (!selectedCustomer) return;

    axios.get(`http://localhost:3001/prescriptions/doctor/${doc.doc_id}/customer/${selectedCustomer}`)
      .then(res => setPrescriptions(res.data))
      .catch(err => console.log("Error fetching prescriptions:", err));
  };

  return (
    <div>
      <h2>Filter Prescriptions by Customer</h2>

      <label>Select Customer:</label>
      <select value={selectedCustomer} onChange={e => setSelectedCustomer(e.target.value)}>
        <option value="">Choose one</option>
        {customers.map(c => (
          <option key={c.customer_id} value={c.customer_id}>
            {c.fname} {c.lname} (ID: {c.customer_id})
          </option>
        ))}
      </select>

      <button onClick={handleFetch}>View Prescriptions</button>

      <br /><br />

      {prescriptions.length > 0 && (
        <table border="1" cellPadding="6">
          <thead>
            <tr>
              <th>Prescription ID</th>
              <th>Medication ID</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map(p => (
              <tr key={p.prescription_id}>
                <td>{p.prescription_id}</td>
                <td>{p.med_id}</td>
                <td>{p.date?.slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {prescriptions.length === 0 && selectedCustomer && (
        <p>No prescriptions found for this customer.</p>
      )}

      <br />
      <button onClick={() => navigate('/doctor-homepage', { state: doc })}>
        Back to Homepage
      </button>
    </div>
  );
};

export default DoctorFilterPrescriptions;
