import React, {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import '../../../AppTheme.css';


const DriverEditProfile = () => {

    const location = useLocation();
    const driver = location.state;
    const navigate = useNavigate();

    const [fname, setFname] = useState(driver.fname);
    const [lname, setLname] = useState(driver.lname);
    const [email, setEmail] = useState(driver.email);
    const [phone, setPhone] = useState(driver.phone_num);
    const [license, setLicense] = useState(driver.license_num);
    const [availability, setAvailability] = useState(driver.availability);

    const handleSubmit = (e) => {
    e.preventDefault();

    axios.put('http://localhost:3001/update-driver', {
      driver_id: driver.driver_id,
      fname,
      lname,
      email,
      phone_num: phone,
      license_num: license,
      availability
    }).then(res => {
      if (res.data.success) {
        alert("Profile updated!");
        navigate('/driver-homepage', {
          state: {
            ...driver,
            fname,
            lname,
            email,
            phone_num: phone,
            license_num: license,
            availability
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
          <h2>Edit Your Profile</h2>
          <form onSubmit={handleSubmit}>
              <label>First Name:</label>
              <input value={fname} onChange={e => setFname(e.target.value)} required/><br/>

              <label>Last Name:</label>
              <input value={lname} onChange={e => setLname(e.target.value)} required/><br/>

              <label>Email:</label>
              <input value={email} onChange={e => setEmail(e.target.value)} required/><br/>

              <label>Phone:</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} required/><br/>

              <label>License Number:</label>
              <input value={license} onChange={e => setLicense(e.target.value)} required/><br/>

              <label>Availability:</label>
              <input value={availability} onChange={e => setAvailability(e.target.value)} required/><br/>

              <button type="submit">Save Changes</button>
          </form>

          <br/>
          <button onClick={() => navigate('/driver-homepage', {state: driver})}>
              Cancel
          </button>
      </div>
  )
}

export default DriverEditProfile