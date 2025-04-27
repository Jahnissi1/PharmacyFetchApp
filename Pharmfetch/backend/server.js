const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // or '*' to allow all origins (not recommended in production)
  credentials: true
}));
app.use(express.json());
const port = 3001;

const db = mysql.createConnection({
    host: "pharmfetch.mysql.database.azure.com",
    user: "pharmfetchteam",
    password: "Uncontrolleddrugs123",
    database: "pharmacyfetch",
    ssl: {
        rejectUnauthorized: true
      }
});

db.connect(err => {
    if (err) {
      console.error('DB connection failed:', err);
      return;
    }
    console.log('Connected to MySQL!');
  });


app.get('/', (req, res)=> {
  db.query('SHOW TABLES', (err, results) => {
    if (err) throw err;
    res.json(results);
  })
});



app.post('/cust-login', (req, res) => {
  const sql = "SELECT * FROM customer AS C WHERE C.username = ? AND C.password = ?";

  db.query(sql, [req.body.username, req.body.password], (err, data) => {
    if (err) return res.json({ success: false, message: "Database error" });

    if (data.length > 0) {
      const cust = data[0]
      return res.json({
        success: true,
        message: "Logged in",
        cust
      });
    } else {
      return res.json({
        success: false,
        message: "Login failed: invalid username or password"
      });
    }
  });
});

app.post('/driv-login', (req, res) => {
  const sql = "SELECT * FROM driver AS D WHERE D.username = ? AND D.password = ?";

  db.query(sql, [req.body.username, req.body.password], (err, data) => {
    if (err) return res.json({ success: false, message: "Database error" });

    if (data.length > 0) {
      const driv = data[0]
      return res.json({
        success: true,
        message: "Logged in",
        driv
      });
    } else {
      return res.json({
        success: false,
        message: "Login failed: invalid username or password"
      });
    }
  });
});

app.post('/create-driv', (req, res) => {

  const{ username, password, fname, lname, email, phone_num, license_num, availability, admin_id } = req.body;

  const sql = `
  INSERT INTO driver (username, password, fname, lname, email, phone_num, license_num, availability, admin_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql, [username, password, fname, lname, email, phone_num, license_num, availability, admin_id], (err, result) => {

      if (err) {
        console.log("Account creation error", err);
        return res.json( {success: false, message:"Failed to create driver"} );
      }

      return res.json({ success: true, message: "Customer created successfully", driver: result});

    }
  );

});

app.post('/pharm-login', (req, res) => {
  const sql = "SELECT * FROM pharmacy AS P WHERE P.username = ? AND P.password = ?";

  db.query(sql, [req.body.username, req.body.password], (err, data) => {
    if (err) return res.json({ success: false, message: "Database error" });

    if (data.length > 0) {
      const pharm = data[0]
      return res.json({
        success: true,
        message: "Logged in",
        pharm
      });
    } else {
      return res.json({
        success: false,
        message: "Login failed: invalid username or password"
      });
    }
  });
});

//update pharmacy
app.put('/update-pharmacy', (req, res) => {
  const { pharmacy_id, name, email, phone_num, address, operating_hours } = req.body;
  const sql = `
    UPDATE pharmacy
       SET name = ?, email = ?, phone_num = ?, address = ?, operating_hours = ?
     WHERE pharmacy_id = ?
  `;
  db.query(sql, [name, email, phone_num, address, operating_hours, pharmacy_id], (err, result) => {
    if (err) {
      console.log("Pharmacy update error:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true });
  });
});


app.post('/adm-login', (req, res) => {
  const sql = "SELECT * FROM admin AS A WHERE A.username = ? AND A.password = ?";

  db.query(sql, [req.body.username, req.body.password], (err, data) => {
    if (err) return res.json({ success: false, message: "Database error" });

    if (data.length > 0) {
      const adm = data[0]
      return res.json({
        success: true,
        message: "Logged in",
        adm
      });
    } else {
      return res.json({
        success: false,
        message: "Login failed: invalid username or password"
      });
    }
  });
});

//create doctor
app.post('/create-doc', (req, res) => {
  const { fname, lname, username, password } = req.body;

  const sql = `
    INSERT INTO doc
      (fname, lname, username, password)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [ fname, lname, username, password ],
    (err, result) => {
      if (err) {
        console.log("Doctor creation error", err);
        return res.json({ success: false, message: "Failed to create doctor" });
      }

      res.json({
        success: true,
        message: "Doctor created successfully",
        doc_id: result.insertId
      });
    }
  );
});



// Doctor login
app.post('/doc-login', (req, res) => {
  const sql = "SELECT * FROM doc WHERE username = ? AND password = ?";

  db.query(sql, [req.body.username, req.body.password], (err, data) => {
    if (err) return res.json({ success: false, message: "Database error" });

    if (data.length > 0) {
      const doc = data[0];
      return res.json({
        success: true,
        message: "Logged in",
        doc
      });
    } else {
      return res.json({
        success: false,
        message: "Login failed: invalid username or password"
      });
    }
  });
});





app.get('/adm-edit-cust/:admin_id', (req, res) => {
  const admin_id = req.params.admin_id;

  const sql = "SELECT * FROM customer WHERE admin_id = ?";
  db.query(sql, [admin_id], (err, results) => {
    if (err) return res.json({ success: false, message: "Database error" });

    return res.json({
      success: true,
      customers: results
    });
  });
});

app.get('/adm-edit-driv/:admin_id', (req, res) => {
  const admin_id = req.params.admin_id;

  const sql = "SELECT * FROM driver WHERE admin_id = ?";
  db.query(sql, [admin_id], (err, results) => {
    if (err) return res.json({ success: false, message: "Database error" });

    return res.json({
      success: true,
      drivers: results
    });
  });
});

app.get('/adm-edit-pharm/:admin_id', (req, res) => {
  const admin_id = req.params.admin_id;

  const sql = "SELECT * FROM pharmacy WHERE admin_id = ?";
  db.query(sql, [admin_id], (err, results) => {
    if (err) return res.json({ success: false, message: "Database error" });

    return res.json({
      success: true,
      pharmacies: results
    });
  });
});

app.get('/cust-edit-profile/:customer_id', (req, res) => {
  const admin_id = req.params.admin_id;

  const sql = "SELECT * FROM customer WHERE customer_id = ?";
  db.query(sql, [customer_id], (err, results) => {
    if (err) return res.json({ success: false, message: "Database error" });

    return res.json({
      success: true,
      customer: results
    });
  });
});

app.post('/create-cust', (req, res) => {

  const{ username, password, fname, lname, email, phone_num, address, admin_id } = req.body;

  const sql = `
  INSERT INTO customer (username, password, fname, lname, email, phone_num, address, admin_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql, [username, password, fname, lname, email, phone_num, address, admin_id], (err, result) => {

      if (err) {
        console.log("Account creation error", err);
        return res.json( {success: false, message:"Failed to create customer"} );
      }

      return res.json({ success: true, message: "Customer created successfully", customer: result});

    }
  );

});

// all customers
app.get('/customers', (req, res) => {
  db.query('SELECT * FROM customer', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// update customer information
app.put('/update-customer', (req, res) => {
  const { customer_id, fname, lname, email, phone_num, address } = req.body;
  const sql = `
    UPDATE customer
       SET fname = ?, lname = ?, email = ?, phone_num = ?, address = ?
     WHERE customer_id = ?
  `;
  db.query(sql, [fname, lname, email, phone_num, address, customer_id], (err, result) => {
    if (err) {
      console.log("Update error:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true });
  });
});

//get customer by customer id for admin
app.get('/customer/:customer_id', (req, res) => {
  const { customer_id } = req.params;
  const sql = `SELECT * FROM customer WHERE customer_id = ?`;

  db.query(sql, [customer_id], (err, results) => {
    if (err) {
      console.log("Fetch customer by ID error:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json(results);
  });
});

//update customer from admin
app.put('/admin/customer/:customer_id', (req, res) => {
  const { customer_id } = req.params;
  const { username, fname, lname, email, phone_num, address } = req.body;

  const sql = `
    UPDATE customer
    SET username = ?, fname = ?, lname = ?, email = ?, phone_num = ?, address = ?
    WHERE customer_id = ?
  `;

  db.query(sql, [username, fname, lname, email, phone_num, address, customer_id], (err, result) => {
    if (err) {
      console.log("Update customer error:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, message: "Customer updated" });
  });
});


// delete customer
app.delete('/delete-customer/:customer_id', (req, res) => {
  const { customer_id } = req.params;
  const sql = `DELETE FROM customer WHERE customer_id = ?`;

  db.query(sql, [customer_id], (err, result) => {
    if (err) {
      console.log("Delete error:", err);
      return res.status(500).json({ success: false, error: err.message });
    }

    res.json({ success: true, message: "Customer deleted." });
  });
});

//get customer by admin id
app.get('/adm-edit-cust/:admin_id', (req, res) => {
  const admin_id = req.params.admin_id;

  const sql = "SELECT * FROM customer WHERE admin_id = ?";
  db.query(sql, [admin_id], (err, results) => {
    if (err) return res.json({ success: false, message: "Database error" });

    return res.json({
      success: true,
      customers: results
    });
  });
});

// delete customer by admin ID
app.delete('/admin/customer/:customer_id', (req, res) => {
  const { customer_id } = req.params;

  const deleteOrders = `DELETE FROM customer_order WHERE customer_id = ?`;
  const deletePrescriptions = `DELETE FROM prescription WHERE customer_id = ?`;
  const deleteCustomer = `DELETE FROM customer WHERE customer_id = ?`;

  db.query(deleteOrders, [customer_id], (err1) => {
    if (err1) {
      console.error("Error deleting orders:", err1);
      return res.status(500).json({ success: false, error: err1.message });
    }

    db.query(deletePrescriptions, [customer_id], (err2) => {
      if (err2) {
        console.error("Error deleting prescriptions:", err2);
        return res.status(500).json({ success: false, error: err2.message });
      }

      db.query(deleteCustomer, [customer_id], (err3) => {
        if (err3) {
          console.error("Error deleting customer:", err3);
          return res.status(500).json({ success: false, error: err3.message });
        }

        res.json({ success: true, message: "Customer and related records deleted." });
      });
    });
  });
});



// all drivers
app.get('/drivers', (req, res) => {
    db.query('SELECT * FROM driver', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

//get driver by driver_id
app.get('/driver/:driver_id', (req, res) => {
  const { driver_id } = req.params;
  const sql = `SELECT * FROM driver WHERE driver_id = ?`;

  db.query(sql, [driver_id], (err, results) => {
    if (err) {
      console.log("Fetch driver by ID error:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json(results);
  });
});


//delete driver
app.delete('/admin/driver/:driver_id', (req, res) => {
  const { driver_id } = req.params;

  const deleteOrders = `DELETE FROM customer_order WHERE driver_id = ?`;
  const deleteDriver = `DELETE FROM driver WHERE driver_id = ?`;

  db.query(deleteOrders, [driver_id], (err1) => {
    if (err1) {
      console.error("Error deleting orders:", err1);
      return res.status(500).json({ success: false, error: err1.message });
    }

    db.query(deleteDriver, [driver_id], (err2) => {
      if (err2) {
        console.error("Error deleting driver:", err2);
        return res.status(500).json({ success: false, error: err2.message });
      }

      res.json({ success: true, message: "Driver and assigned orders deleted." });
    });
  });
});


//update driver
app.put('/admin/driver/:driver_id', (req, res) => {
  const { driver_id } = req.params;
  const { username, fname, lname, email, phone_num, license_num } = req.body;

  const sql = `
    UPDATE driver
    SET username = ?, fname = ?, lname = ?, email = ?, phone_num = ?, license_num = ?
    WHERE driver_id = ?
  `;

  db.query(sql, [username, fname, lname, email, phone_num, license_num, driver_id], (err, result) => {
    if (err) {
      console.log("Update driver error:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, message: "Driver updated" });
  });
});


// all pharmacies
app.get('/pharmacy', (req, res) => {
    db.query('SELECT * FROM pharmacy', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

//delete pharmacy
app.delete('/admin/pharmacy/:pharmacy_id', (req, res) => {
  const { pharmacy_id } = req.params;

  const deleteOrders = `DELETE FROM customer_order WHERE pharmacy_id = ?`;
  const deletePharmacy = `DELETE FROM pharmacy WHERE pharmacy_id = ?`;

  db.query(deleteOrders, [pharmacy_id], (err1) => {
    if (err1) {
      console.error("Error deleting orders for pharmacy:", err1);
      return res.status(500).json({ success: false, error: err1.message });
    }

    db.query(deletePharmacy, [pharmacy_id], (err2) => {
      if (err2) {
        console.error("Error deleting pharmacy:", err2);
        return res.status(500).json({ success: false, error: err2.message });
      }

      res.json({ success: true, message: "Pharmacy and associated orders deleted." });
    });
  });
});


//get pharmacy by pharmacy id
app.get('/pharmacy/:pharmacy_id', (req, res) => {
  const { pharmacy_id } = req.params;
  const sql = `SELECT * FROM pharmacy WHERE pharmacy_id = ?`;

  db.query(sql, [pharmacy_id], (err, results) => {
    if (err) {
      console.log("Fetch pharmacy by ID error:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json(results);
  });
});

//update pharmacy
app.put('/admin/pharmacy/:pharmacy_id', (req, res) => {
  const { pharmacy_id } = req.params;
  const { username, name, email, phone_num, address, operating_hours } = req.body;

  const sql = `
    UPDATE pharmacy
    SET username = ?, name = ?, email = ?, phone_num = ?, address = ?, operating_hours = ?
    WHERE pharmacy_id = ?
  `;

  db.query(sql, [username, name, email, phone_num, address, operating_hours, pharmacy_id], (err, result) => {
    if (err) {
      console.log("Update pharmacy error:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, message: "Pharmacy updated" });
  });
});


// all admins
app.get('/admins', (req, res) => {
    db.query('SELECT * FROM admin', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

// Create an order
app.post('/create-order', (req, res) => {
  const {
    customer_id,
    pharmacy_id,
    prescription_id,
    med_id, // NEW: used if no prescription_id
    driver_id = null,
    order_status = 'PENDING'
  } = req.body;

  const insertOrder = (finalPrescriptionId) => {
    const orderSql = `
      INSERT INTO customer_order
        (customer_id, pharmacy_id, prescription_id, driver_id, order_status, order_date)
      VALUES (?, ?, ?, ?, ?, CURDATE())
    `;

    db.query(orderSql,
      [customer_id, pharmacy_id, finalPrescriptionId, driver_id, order_status],
      (err, result) => {
        if (err) {
          console.log("Order creation error", err);
          return res.json({ success: false, message: "Failed to create order", error: err.message });
        }
        res.json({ success: true, order_id: result.insertId });
      }
    );
  };

  // If prescription_id provided, use it directly
  if (prescription_id) {
    insertOrder(prescription_id);
  }
  // Otherwise, create a dummy prescription for OTC medication
  else if (med_id) {
    const dummyDocId = -1; // Make sure this value is consistent across your DB
    const prescSql = `
      INSERT INTO prescription (doc_id, med_id, customer_id, date)
      VALUES (?, ?, ?, CURDATE())
    `;
    db.query(prescSql, [dummyDocId, med_id, customer_id], (err, result) => {
      if (err) {
        console.log("Prescription creation error", err);
        return res.json({ success: false, message: "Failed to create prescription", error: err.message });
      }

      const newPrescriptionId = result.insertId;
      insertOrder(newPrescriptionId);
    });
  }
  else {
    res.json({ success: false, message: "Missing prescription_id or med_id" });
  }
});


// Get all over-the-counter medications
app.get('/meds/otc', (req, res) => {
  const sql = `
    SELECT * FROM med
    WHERE med_id LIKE '9%'
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json(results);
  });
});



//get all orders that are PENDING
app.get('/pharmacy/orders/pending/:pharmacy_id', (req, res) => {
  const pharmacyId = req.params.pharmacy_id;

  const sql = `
    SELECT 
      order_id,
      customer_id,
      prescription_id,
      order_date,
      order_status
    FROM customer_order
    WHERE pharmacy_id = ? AND order_status = 'PENDING'
    ORDER BY order_date DESC
  `;

  db.query(sql, [pharmacyId], (err, results) => {
    if (err) {
      console.error("Error fetching pending orders:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json(results);
  });
});



//update an order to be IN PROGRESS
app.put('/pharmacy/orders/accept', (req, res) => {
  const { order_id } = req.body;
  const sql = `UPDATE customer_order SET order_status = 'IN PROGRESS' WHERE order_id = ?`;

  db.query(sql, [order_id], (err, result) => {
    if (err) {
      console.log("Accept order error:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, message: "Order moved to IN PROGRESS" });
  });
});

// get all IN PROGRESS orders
app.get('/pharmacy/orders/in-progress/:pharmacy_id', (req, res) => {
  const pharmacyId = req.params.pharmacy_id;

  const sql = `
    SELECT 
      order_id,
      customer_id,
      prescription_id,
      order_date,
      order_status
    FROM customer_order
    WHERE pharmacy_id = ? AND order_status = 'IN PROGRESS'
    ORDER BY order_date DESC
  `;

  db.query(sql, [pharmacyId], (err, results) => {
    if (err) {
      console.error("Error fetching in-progress orders:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json(results);
  });
});


// get all orders that are DELIVERED
app.get('/pharmacy/orders/past/:pharmacy_id', (req, res) => {
  const pharmacyId = req.params.pharmacy_id;

  const sql = `
    SELECT 
      order_id,
      customer_id,
      prescription_id,
      order_date,
      order_status
    FROM customer_order
    WHERE pharmacy_id = ? AND order_status = 'DELIVERED'
    ORDER BY order_date DESC
  `;

  db.query(sql, [pharmacyId], (err, results) => {
    if (err) {
      console.error("Error fetching past orders:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json(results);
  });
});


//all orders
app.get('/orders', (req, res) => {
  db.query('SELECT * FROM customer_order', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get all orders for one customer
app.get('/orders/customer/:customer_id', (req, res) => {
  const sql = `
    SELECT *
      FROM customer_order
     WHERE customer_id = ?
     ORDER BY order_date DESC
  `;
  db.query(sql, [req.params.customer_id], (err, rows) => {
    if (err) return res.status(500).json({ success:false, error: err.message });
    res.json(rows);
  });
});

//get all orders for a driver
app.get('/orders/driver/:driver_id', (req, res) => {
  db.query(
    'SELECT * FROM customer_order WHERE driver_id = ?',
    [ req.params.driver_id ],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// get all orders without a driver
app.get('/orders/unassigned', (req, res) => {
  const sql = `SELECT * FROM customer_order WHERE driver_id IS NULL`;

  db.query(sql, (err, results) => {
    if (err) {
      console.log("Error fetching unassigned orders:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json(results);
  });
});

// assign a driver to an order
app.put('/assign-driver', (req, res) => {
  const { order_id, driver_id } = req.body;
  const sql = `
    UPDATE customer_order
       SET driver_id = ?
     WHERE order_id = ?
  `;

  db.query(sql, [driver_id, order_id], (err, result) => {
    if (err) {
      console.log("Error assigning driver:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true });
  });
});

// update a driver's profile
app.put('/update-driver', (req, res) => {
  const { driver_id, fname, lname, email, phone_num, license_num, availability } = req.body;
  const sql = `
    UPDATE driver
       SET fname = ?, lname = ?, email = ?, phone_num = ?, license_num = ?, availability = ?
     WHERE driver_id = ?
  `;
  db.query(sql, [fname, lname, email, phone_num, license_num, availability, driver_id], (err, result) => {
    if (err) {
      console.log("Driver update error:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true });
  });
});

// Mark order as delivered
app.put('/driver/deliver-order/:order_id', (req, res) => {
  const { order_id } = req.params;

  const sql = `
    UPDATE customer_order
       SET order_status = 'DELIVERED'
     WHERE order_id = ?
  `;

  db.query(sql, [order_id], (err, result) => {
    if (err) {
      console.error("Error updating order:", err);
      return res.status(500).json({ success: false, message: "Failed to mark as delivered" });
    }

    return res.json({ success: true, message: "Order marked as delivered" });
  });
});




//make a prescription
app.post('/create-prescription', (req, res) => {
  const { doc_id, med_id, customer_id, date } = req.body;

  const sql = `
    INSERT INTO prescription
      (doc_id, customer_id, med_id, date)
    VALUES (?, ?, ?, ?)
  `;
  db.query(
    sql,
    [ doc_id, customer_id, med_id, date ],
    (err, result) => {
      if (err) {
        console.log("Prescription creation error", err);
        return res.status(400).json({
          success: false,
          message: "Failed to create prescription",
          error: err.message
        });
      }
      res.json({
        success: true,
        prescription_id: result.insertId
      });
    }
  );
});

//get all prescriptions
app.get('/prescriptions', (req, res) => {
  db.query('SELECT * FROM prescription', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get all prescriptions for one customer
app.get('/prescriptions/customer/:customer_id', (req, res) => {
  const sql = `
    SELECT *
      FROM prescription
     WHERE customer_id = ?
  `;
  db.query(sql, [req.params.customer_id], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//get all prescriptions by one doctor
app.get('/prescriptions/doctor/:doc_id', (req, res) => {
  const sql = `
    SELECT *
      FROM prescription
     WHERE doc_id = ?
  `;
  db.query(sql, [req.params.doc_id], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//get all prescriptions written by the same doctor for one customer
app.get('/prescriptions/doctor/:doc_id/customer/:customer_id', (req, res) => {
  const { doc_id, customer_id } = req.params;
  const sql = `
    SELECT *
      FROM prescription
     WHERE doc_id = ? AND customer_id = ?
  `;

  db.query(sql, [doc_id, customer_id], (err, results) => {
    if (err) {
      console.log("Error fetching filtered prescriptions:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json(results);
  });
});


// Create a new medication
app.post('/create-med', (req, res) => {
  const { name, description, price, quantity } = req.body;

  const sql = `
    INSERT INTO med
      (name, description, price, quantity)
    VALUES (?,?,?,?)
  `;
  db.query(
    sql,
    [ name, description, price, quantity ],
    (err, result) => {
      if (err) {
        console.log("Medication creation error", err);
        return res
          .status(400)
          .json({
            success: false,
            message: "Failed to create medication",
            error: err.message
          });
      }
      res.json({
        success: true,
        message: "Medication created successfully",
        med_id: result.insertId
      });
    }
  );
});

//get all medications
app.get('/meds', (req, res) => {
  db.query('SELECT * FROM med', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});




app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });