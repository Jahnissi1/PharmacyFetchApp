import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../AppTheme.css';


const CustomerViewOrders = () => {
  
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

    const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/orders/customer/${data.customer_id}`)
      .then(res => setOrders(res.data))
      .catch(err => console.log("Error loading orders:", err));
  }, [data.customer_id]);

  return (
      <div><h2>Welcome, {data.fname} {data.lname}</h2>
        <h3>Your Orders</h3>

        {orders.length === 0 ? (
            <p>No orders yet.</p>
        ) : (
            <table>
              <thead>
              <tr>
                <th>Order ID</th>
                <th>Prescription ID</th>
                <th>Pharmacy ID</th>
                <th>Driver ID</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
              </thead>
              <tbody>
              {orders.map(o => (
                  <tr key={o.order_id}>
                    <td>{o.order_id}</td>
                    <td>{o.prescription_id ? `Prescription #${o.prescription_id}` : "Over-the-counter"}</td>
                    <td>{o.pharmacy_id}</td>
                    <td>{o.driver_id}</td>
                    <td>{o.order_status}</td>
                    <td>{o.order_date?.slice(0, 10)}</td>
                  </tr>
              ))}
              </tbody>
            </table>
        )}

        <br/>
        <button onClick={() => navigate('/customer-homepage', {state: data})}>
          Back to Homepage
        </button>
      </div>
  )
}

export default CustomerViewOrders