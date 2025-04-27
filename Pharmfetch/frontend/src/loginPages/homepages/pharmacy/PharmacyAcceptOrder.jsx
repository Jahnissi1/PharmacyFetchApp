import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";

const PharmacyAcceptOrder = () => {
    
    const location = useLocation();
    const pharmacy = location.state;
    const navigate = useNavigate()

    const [orders, setOrders] = useState([]);


    useEffect(() => {
        fetchPendingOrders();
    }, []);

    const fetchPendingOrders = () => {
    axios.get(`http://localhost:3001/pharmacy/orders/pending/${pharmacy.pharmacy_id}`)
      .then(res => setOrders(res.data))
      .catch(err => console.log("Failed to fetch orders:", err));
    };

   const handleAccept = (order_id) => {
    axios.put('http://localhost:3001/pharmacy/orders/accept', { order_id })
      .then(res => {
        if (res.data.success) {
          alert("Order moved to IN PROGRESS!");
          fetchPendingOrders(); // refresh list
        } else {
          alert("Failed to accept order.");
        }
      })
      .catch(err => {
        console.log("Accept error:", err);
        alert("Error accepting order.");
      });
  };

  return (
      <div>
          <h2>Pending Orders</h2>

          {orders.length === 0 ? (
              <p>No pending orders at the moment.</p>
          ) : (
              <table border="1" cellPadding="8">
                  <thead>
                  <tr>
                      <th>Order ID</th>
                      <th>Customer ID</th>
                      <th>Prescription</th>
                      <th>Order Date</th>
                      <th>Status</th>
                      <th>Accept</th>
                  </tr>
                  </thead>
                  <tbody>
                  {orders.map(order => (
                      <tr key={order.order_id}>
                          <td>{order.order_id}</td>
                          <td>{order.customer_id}</td>
                          <td> {order.prescription_id ? `Prescription #${order.prescription_id}` : "Over-the-counter"} </td>
                          <td>{order.order_date?.slice(0, 10)}</td>
                          <td>{order.order_status}</td>
                          <td>
                              <button onClick={() => handleAccept(order.order_id)}>Accept</button>
                          </td>
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

export default PharmacyAcceptOrder