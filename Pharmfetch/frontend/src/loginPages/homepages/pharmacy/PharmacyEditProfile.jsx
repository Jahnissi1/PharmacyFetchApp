import React, {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'

const PharmacyEditProfile = () => {
    
    const location = useLocation();
    const pharmacy = location.state;
    const navigate = useNavigate();

    const [name, setName] = useState(pharmacy.name);
    const [email, setEmail] = useState(pharmacy.email);
    const [phone, setPhone] = useState(pharmacy.phone_num);
    const [address, setAddress] = useState(pharmacy.address);
    const [hours, setHours] = useState(pharmacy.operating_hours);

    const handleSubmit = (e) => {
    e.preventDefault();

    axios.put('http://localhost:3001/update-pharmacy', {
      pharmacy_id: pharmacy.pharmacy_id,
      name,
      email,
      phone_num: phone,
      address,
      operating_hours: hours
    }).then(res => {
      if (res.data.success) {
        alert("Pharmacy profile updated!");
        navigate('/pharmacy-homepage', {
          state: {
            ...pharmacy,
            name,
            email,
            phone_num: phone,
            address,
            operating_hours: hours
          }
        });
      } else {
        alert("Update failed.");
      }
    }).catch(err => {
      console.log("Update error:", err);
      alert("Error updating profile.");
    });
  };

  return (
      <div>
          <h2>Edit Pharmacy Profile</h2>
          <form onSubmit={handleSubmit}>
              <label>Pharmacy Name:</label>
              <input value={name} onChange={e => setName(e.target.value)} required/><br/>

              <label>Email:</label>
              <input value={email} onChange={e => setEmail(e.target.value)} required/><br/>

              <label>Phone Number:</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} required/><br/>

              <label>Address:</label>
              <input value={address} onChange={e => setAddress(e.target.value)} required/><br/>

              <label>Operating Hours:</label>
              <input value={hours} onChange={e => setHours(e.target.value)} required/><br/>

              <button type="submit">Save Changes</button>
          </form>

          <br/>
          <button onClick={() => navigate('/pharmacy-homepage', {state: pharmacy})}>
              Cancel
          </button>
      </div>
  )
}

export default PharmacyEditProfile