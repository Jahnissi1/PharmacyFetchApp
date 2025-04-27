# PhamacyFetchApp - Pharmacy Delivery System 

# 📌 Overview  
PharmFetch is a full-stack pharmacy delivery platform that enables users to order **prescription and over-the-counter (OTC) medications** for home delivery. Designed with accessibility in mind, the system supports multiple user roles (customers, pharmacies, drivers, doctors, and admins) with tailored dashboards for each.  

Key Features: 
✅ Role-based access control (5 user types)  
✅ Prescription upload & verification for secure medication orders  
✅ Real-time order tracking for customers and drivers  
✅ Pharmacy order management with acceptance workflow  
✅ Admin dashboard for user and system management  
✅ MySQL database hosted on Azure for reliable data storage  

---

## 🛠 Technologies Used  
| Category       | Technologies |  
|---------------|-------------|  
| Frontend  | React, JavaScript, HTML/CSS |  
| Backend   | Node.js, Express |  
| Database  | MySQL (Azure-hosted) |  
| Version Control | Git |  

---

## 📂 Project Structure  

pharmfetch/  
├── frontend/       # React application (UI)  
├── backend/        # Node.js server (API & database queries)    
└── docs/           # ER diagrams, screenshots, report  
 

---

## 🚀 Installation & Setup  

### Prerequisites  
- Node.js (v14+)  
- MySQL (or Azure Database for MySQL)  
- Git  

### Running Locally  
1. Clone the repository  
   ```bash  
   git clone https://github.com/yourusername/pharmfetch.git  
   cd pharmfetch  
   ```  

2. Set up the backend  
   ```bash  
   cd backend  
   npm install  
   npm start  
   ```  

3. Set up the frontend  
   ```bash  
   cd ../frontend  
   npm install  
   npm start  
   ```  

4. Access the app  
   - Open `http://localhost:3000` in your browser.  
   - Select your user role and log in or create an account.

5. Setup Database
    - Acesss to Database is private, so a new database MySQl database ahs to be setup
    - Go to Pharmfetch/backend/Pharmfetch/settings.py to setup connection

---

## 📷 Screenshots:
    Screenshots of User interface can be seen in the FinalReport pdf


## 📊 Database Schema  
The system uses a MySQL database with tables for users, orders, prescriptions, and medications.  

### Key Tables:  
- `Customer` (Regular & Priority tiers)  
- `Pharmacy` (Manages inventory & orders)  
- `Driver` (Handles deliveries)  
- `Prescription` (Linked to doctors & customers)  
- `Customer_Order` (Tracks order status)  


---

## Contributors 
- Jahnissi Nwakanma  
- Lisa Tatarnikov  
- Dipti Kumar  
