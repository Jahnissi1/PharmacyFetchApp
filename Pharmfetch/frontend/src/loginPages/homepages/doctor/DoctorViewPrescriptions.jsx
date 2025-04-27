import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../AppTheme.css';


const DoctorViewPrescriptions = () => {
  const location = useLocation();
  const doc = location.state;
  const navigate = useNavigate();

  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/prescriptions/doctor/${doc.doc_id}`)
      .then(res => setPrescriptions(res.data))
      .catch(err => console.log('Error fetching prescriptions:', err));
  }, [doc.doc_id]);

  return (
    <div>
      <h2>Prescriptions by Dr. {doc.fname} {doc.lname}</h2>

      {prescriptions.length === 0 ? (
        <p>No prescriptions found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Prescription ID</th>
              <th>Customer ID</th>
              <th>Medication ID</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map(p => (
              <tr key={p.prescription_id}>
                <td>{p.prescription_id}</td>
                <td>{p.customer_id}</td>
                <td>{p.med_id}</td>
                <td>{p.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <br />
      <button onClick={() => navigate('/doctor-homepage', { state: doc })}>
        Back to Homepage
      </button>
    </div>
  );
};

export default DoctorViewPrescriptions;
