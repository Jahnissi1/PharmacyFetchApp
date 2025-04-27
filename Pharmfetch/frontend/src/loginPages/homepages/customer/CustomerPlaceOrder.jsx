import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../AppTheme.css';

const CustomerPlaceOrder = () => {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  const [pharmacies, setPharmacies] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [otcMeds, setOtcMeds] = useState([]);

  const [selectedPharmacy, setSelectedPharmacy] = useState('');
  const [selectedPrescription, setSelectedPrescription] = useState('');
  const [selectedOtcMed, setSelectedOtcMed] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/pharmacy')
      .then(res => setPharmacies(res.data))
      .catch(err => console.log("Failed to load pharmacies:", err));

    axios.get(`http://localhost:3001/prescriptions/customer/${data.customer_id}`)
      .then(res => setPrescriptions(res.data))
      .catch(err => console.log("Failed to load prescriptions:", err));

    axios.get(`http://localhost:3001/meds/otc`)
      .then(res => setOtcMeds(res.data))
      .catch(err => console.log("Failed to load OTC meds:", err));
  }, [data.customer_id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedPharmacy) {
      return alert("Please select a pharmacy.");
    }

    if (!selectedPrescription && !selectedOtcMed) {
      return alert("Please select either a prescription or an OTC medication.");
    }

    if (selectedPrescription && selectedOtcMed) {
      return alert("Please select only one: prescription OR OTC medication.");
    }

    const payload = {
      customer_id: data.customer_id,
      pharmacy_id: selectedPharmacy,
      prescription_id: selectedPrescription || null,
      med_id: selectedOtcMed || null
    };

    axios.post('http://localhost:3001/create-order', payload)
      .then(res => {
        if (res.data.success) {
          alert("Order placed!");
          navigate('/customer-homepage', { state: data });
        } else {
          alert("Failed to place order.");
        }
      })
      .catch(err => {
        console.log("Error creating order:", err);
        alert("Error submitting order.");
      });
  };

  return (
    <div className="glass-container">
      <h2>Place an Order</h2>
      <form onSubmit={handleSubmit}>

        <label>Select a Prescription (if applicable):</label>
        <select value={selectedPrescription} onChange={e => {
          setSelectedPrescription(e.target.value);
          setSelectedOtcMed('');  // clear OTC if selected
        }}>
          <option value="">-- Select a prescription --</option>
          {prescriptions.map(p => (
            <option key={p.prescription_id} value={p.prescription_id}>
              Prescription #{p.prescription_id} (med_id: {p.med_id})
            </option>
          ))}
        </select><br />

        <label>OR Select an OTC Medication:</label>
        <select value={selectedOtcMed} onChange={e => {
          setSelectedOtcMed(e.target.value);
          setSelectedPrescription('');  // clear prescription if selected
        }}>
          <option value="">-- Select OTC medication --</option>
          {otcMeds.map(m => (
            <option key={m.med_id} value={m.med_id}>
              {m.name} - ${m.price}
            </option>
          ))}
        </select><br />

        <label>Select Pharmacy:</label>
        <select value={selectedPharmacy} onChange={e => setSelectedPharmacy(e.target.value)} required>
          <option value="">-- Select pharmacy --</option>
          {pharmacies.map(p => (
            <option key={p.pharmacy_id} value={p.pharmacy_id}>
              {p.name} - {p.address}
            </option>
          ))}
        </select><br />

        <button type="submit">Place Order</button>
      </form>

      <br />
      <button onClick={() => navigate('/customer-homepage', { state: data })}>
        Back to Homepage
      </button>
    </div>
  );
};

export default CustomerPlaceOrder;
