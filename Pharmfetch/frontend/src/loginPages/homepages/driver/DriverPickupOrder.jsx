import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../AppTheme.css';


const DriverPickupOrder = () => {
    
    const location = useLocation();
    const data = location.state;
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);

    useEffect(() => {
    fetchUnassignedOrders();
    }, []);

    const fetchUnassignedOrders = () => {
    axios.get('http://localhost:3001/orders/unassigned')
      .then(res => setOrders(res.data))
      .catch(err => console.log("Error loading orders:", err));
    };

    const handleClaim = (order_id) => {
    axios.put('http://localhost:3001/assign-driver', {
      order_id,
      driver_id: data.driver_id
    })
    .then(res => {
      if (res.data.success) {
        alert("Order claimed!");
        fetchUnassignedOrders(); // refresh list after claiming
      } else {
        alert("Failed to claim order.");
      }
    })
    .catch(err => {
      console.log("Error claiming order:", err);
      alert("Error claiming order.");
    });
    };

    return (
        <div>
            <h2>Unassigned Orders</h2>

            {orders.length === 0 ? (
                <p>No available orders to claim.</p>
            ) : (
                <table border="1" cellPadding="8">
                    <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer ID</th>
                        <th>Pharmacy ID</th>
                        <th>Prescription ID</th>
                        <th>Order Date</th>
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
                            <td>
                                <button onClick={() => handleClaim(order.order_id)}>
                                    Claim
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            <br/>
            <button onClick={() => navigate('/driver-homepage', {state: data})}>
                Back to Homepage
            </button>
        </div>
    );
};

export default DriverPickupOrder