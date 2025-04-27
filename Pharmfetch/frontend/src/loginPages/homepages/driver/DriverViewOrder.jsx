import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import '../../../AppTheme.css';


const DriverViewOrder = () => {
    
        const location = useLocation();
        const data = location.state;
        const navigate = useNavigate();

        const [orders, setOrders] = useState([]);

        const handleMarkDelivered = (order_id) => {
            if (window.confirm("Mark this order as delivered?")) {
                axios.put(`http://localhost:3001/driver/deliver-order/${order_id}`)
                    .then(res => {
                        if (res.data.success) {
                        alert("Order marked as delivered!");
                        setOrders(prev => prev.map(order =>
                            order.order_id === order_id ? { ...order, order_status: 'DELIVERED' } : order
                ));
            } else {
                alert("Failed to mark as delivered.");
            }
        })
        .catch(err => {
            console.error("Delivery update error:", err);
            alert("Something went wrong.");
            });
        }
        };


        useEffect(() => {
            axios.get(`http://localhost:3001/orders/driver/${data.driver_id}`)
                .then(res => setOrders(res.data))
                .catch(err => console.log("Error loading driver orders:", err));
        }, [data.driver_id]);

  return (
  <div>
    <h2>My Deliveries</h2>

    {orders.length === 0 ? (
      <p>You haven't claimed any orders yet.</p>
    ) : (
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer ID</th>
            <th>Pharmacy ID</th>
            <th>Prescription</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.customer_id}</td>
              <td>{order.pharmacy_id}</td>
              <td>{order.prescription_id ? `Prescription #${order.prescription_id}` : "Over-the-counter"}</td>
              <td>{order.order_date?.slice(0, 10)}</td>
              <td>{order.order_status}</td>
              <td>
                {order.order_status !== 'DELIVERED' && (
                  <button onClick={() => handleMarkDelivered(order.order_id)}>
                    Mark as Delivered
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}

    <br />
    <button onClick={() => navigate('/driver-homepage', { state: data })}>
      Back to Homepage
    </button>
  </div>
);

};

export default DriverViewOrder