import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../AppTheme.css';


const DoctorCreatePrescription = () => {
  const location = useLocation();
  const doc = location.state;
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [meds, setMeds] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [medId, setMedId] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/customers')
      .then(res => setCustomers(res.data))
      .catch(err => console.log('Failed to load customers:', err));

    axios.get('http://localhost:3001/meds')
      .then(res => setMeds(res.data))
      .catch(err => console.log('Failed to load meds:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/create-prescription', {
      doc_id: doc.doc_id,
      customer_id: customerId,
      med_id: medId,
      date: date
    }).then(res => {
      if (res.data.success) {
        alert("Prescription created!");
        navigate('/doctor-homepage', { state: doc });
      } else {
        alert("Failed to create prescription");
      }
    }).catch(err => {
      console.log("Error:", err);
      alert("Error submitting prescription");
    });
  };

  return (
    <div>
      <h2>Create Prescription</h2>
      <form onSubmit={handleSubmit}>
        <label>Customer:</label>
        <select value={customerId} onChange={e => setCustomerId(e.target.value)} required>
          <option value="">Select a customer</option>
          {customers.map(c => (
            <option key={c.customer_id} value={c.customer_id}>
              {c.fname} {c.lname}
            </option>
          ))}
        </select><br />

        <label>Medication:</label>
        <select value={medId} onChange={e => setMedId(e.target.value)} required>
          <option value="">Select a medication</option>
          {meds.map(m => (
            <option key={m.med_id} value={m.med_id}>
              {m.name} ({m.strength})
            </option>
          ))}
        </select><br />

        <label>Date:</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DoctorCreatePrescription;
