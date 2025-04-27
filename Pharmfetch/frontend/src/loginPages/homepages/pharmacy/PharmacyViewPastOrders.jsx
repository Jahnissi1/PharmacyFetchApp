import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";

const PharmacyViewPastOrders = () => {
    
    const location = useLocation();
    const pharmacy = location.state;
    const navigate = useNavigate();

    const[orders, setOrders] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/pharmacy/orders/past/${pharmacy.pharmacy_id}`)
            .then(res => setOrders(res.data))
            .catch(err => console.log("Failed to fetch past orders:", err));
    }, [pharmacy.pharmacy_id]);

  return (
      <div>
          <h2>Past Orders</h2>

          {orders === null ? (
              <p>Loading...</p>
          ) : orders.length === 0 ? (
              <p>No past orders yet.</p>
          ) : (
              <table border="1" cellPadding="8">
                  <thead>
                  <tr>
                      <th>Order ID</th>
                      <th>Customer ID</th>
                      <th>Prescription ID</th>
                      <th>Order Date</th>
                      <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  {orders.map(order => (
                      <tr key={order.order_id}>
                          <td>{order.order_id}</td>
                          <td>{order.customer_id}</td>
                          <td>{order.prescription_id ? `Prescription #${order.prescription_id}` : "Over-the-counter"}</td>
                          <td>{order.order_date?.slice(0, 10)}</td>
                          <td>{order.order_status}</td>
                      </tr>
                  ))}
                  </tbody>
              </table>
          )}

          <br/>
          <button onClick={() => navigate('/pharmacy-homepage', {state: pharmacy})}>
              Back to Homepage
          </button>
      </div>
  )
}

export default PharmacyViewPastOrders