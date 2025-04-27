import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../AppTheme.css';


const CustomerUploadPrescription = () => {
  
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  const [meds, setMeds] = useState([]);
  const [docId, setDocId] = useState('');
  const [medId, setMedId] = useState('');
  const [date, setDate] = useState('');

   useEffect(() => {
    axios.get('http://localhost:3001/meds')
      .then(res => setMeds(res.data))
      .catch(err => console.log("Failed to load medications:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/create-prescription', {
      doc_id: docId,
      customer_id: data.customer_id,
      med_id: medId,
      date: date
    }).then(res => {
      if (res.data.success) {
        alert("Prescription uploaded!");
        navigate('/customer-homepage', { state: data });
      } else {
        alert("Failed to upload prescription.");
      }
    }).catch(err => {
      console.log("Upload error:", err);
      alert("Error uploading prescription.");
    });
  };

  return (
      <div><h2>Upload a Prescription</h2>
        <form onSubmit={handleSubmit}>
          <label>Doctor ID (from prescription):</label>
          <input
              type="number"
              value={docId}
              onChange={e => setDocId(e.target.value)}
              required
          /><br/>

          <label>Medication:</label>
          <select value={medId} onChange={e => setMedId(e.target.value)} required>
            <option value="">Select medication</option>
            {meds.map(m => (
                <option key={m.med_id} value={m.med_id}>
                  {m.name} ({m.strength})
                </option>
            ))}
          </select><br/>

          <label>Date:</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} required/><br/>

          <button type="submit">Upload Prescription</button>
        </form>

        <br/>
        <button onClick={() => navigate('/customer-homepage', {state: data})}>
          Back to Homepage
        </button>
      </div>
  )
}

export default CustomerUploadPrescription