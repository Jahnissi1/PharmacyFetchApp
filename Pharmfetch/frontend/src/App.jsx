import './App.css';
import { Routes, Route } from 'react-router-dom';
import CustomerLogin from './loginPages/CustomerLogin';
import DriverLogin from './loginPages/DriverLogin';
import PharmacyLogin from './loginPages/PharmacyLogin';
import AdminLogin from './loginPages/AdminLogin';
import CustomerHomePage from './loginPages/homepages/CustomerHomePage'
import DriverHomePage from './loginPages/homepages/DriverHomePage'
import PharmacyHomePage from './loginPages/homepages/PharmacyHomePage'
import AdminHomePage from './loginPages/homepages/AdminHomePage'
import AdminEditCustomers from './loginPages/homepages/admin/AdminEditCustomers'
import AdminEditDrivers from './loginPages/homepages/admin/AdminEditDrivers'
import AdminEditPharmacies from './loginPages/homepages/admin/AdminEditPharmacies'
import CustomerPlaceOrder from './loginPages/homepages/customer/CustomerPlaceOrder'
import CustomerUploadPrescription from './loginPages/homepages/customer/CustomerUploadPrescription'
import CustomerViewOrders from './loginPages/homepages/customer/CustomerViewOrders'
import CustomerEditProfile from './loginPages/homepages/customer/CustomerEditProfile'
import DriverPickupOrder from './loginPages/homepages/driver/DriverPickupOrder'
import DriverViewOrder from './loginPages/homepages/driver/DriverViewOrder'
import DriverEditProfile from './loginPages/homepages/driver/DriverEditProfile'
import PharmacyAcceptOrder from './loginPages/homepages/pharmacy/PharmacyAcceptOrder'
import PharmacyViewCurrentOrders from './loginPages/homepages/pharmacy/PharmacyViewCurrentOrders'
import PharmacyViewPastOrders from './loginPages/homepages/pharmacy/PharmacyViewPastOrders'
import PharmacyEditProfile from './loginPages/homepages/pharmacy/PharmacyEditProfile'
import SelectUser from './SelectUser';
import DoctorLogin from './loginPages/DoctorLogin';
import DoctorHomePage from './loginPages/homepages/DoctorHomePage';
import DoctorCreatePrescription from './loginPages/homepages/doctor/DoctorCreatePrescription';
import DoctorViewPrescriptions from './loginPages/homepages/doctor/DoctorViewPrescriptions';
import CustomerEditProfileForm from './loginPages/homepages/customer/CustomerEditProfileForm';
import DoctorViewCustomerPres from "./loginPages/homepages/doctor/DoctorViewCustomerPres";
import AdminEditDriverForm from './loginPages/homepages/admin/AdminEditDriverForm';
import AdminEditCustomerForm from './loginPages/homepages/admin/AdminEditCustomerForm';
import AdminEditPharmacyForm from './loginPages/homepages/admin/AdminEditPharmacyForm';


function App() {

  return (
      <Routes>
        <Route path="/" element={<SelectUser />} />
        <Route path="/login-customer" element={<CustomerLogin />} />
        <Route path="/login-driver" element={<DriverLogin />} />
        <Route path="/login-pharmacy" element={<PharmacyLogin />} />
        <Route path="/login-admin" element={<AdminLogin />} />
        <Route path="/customer-homepage" element={<CustomerHomePage />}/>
        <Route path="/driver-homepage" element={<DriverHomePage />}/>
        <Route path="/pharmacy-homepage" element={<PharmacyHomePage />}/>
        <Route path="/admin-homepage" element={<AdminHomePage />}/>
        <Route path="/admin-edit-customers" element={<AdminEditCustomers />}/>
        <Route path="/admin-edit-drivers" element={<AdminEditDrivers />}/>
        <Route path="/admin-edit-pharmacies" element={<AdminEditPharmacies />}/>
        <Route path="/customer-place-order" element={<CustomerPlaceOrder />}/>
        <Route path="/customer-upload-prescription" element={<CustomerUploadPrescription />}/>
        <Route path="/customer-view-orders" element={<CustomerViewOrders />}/>
        <Route path="/customer-edit-profile" element={<CustomerEditProfile />}/>
        <Route path="/driver-pickup-order" element={<DriverPickupOrder />}/>
        <Route path="/driver-view-order" element={<DriverViewOrder />}/>
        <Route path="/driver-edit-profile" element={<DriverEditProfile />}/>
        <Route path="/pharmacy-accept-order" element={<PharmacyAcceptOrder />}/>
        <Route path="/pharmacy-view-current-orders" element={<PharmacyViewCurrentOrders />}/>
        <Route path="/pharmacy-view-past-orders" element={<PharmacyViewPastOrders />}/>
        <Route path="/pharmacy-edit-profile" element={<PharmacyEditProfile />}/>
        <Route path="/login-doctor" element={<DoctorLogin />} />
        <Route path="/doctor-homepage" element={<DoctorHomePage />} />
        <Route path="/doctor-create-prescription" element={<DoctorCreatePrescription />} />
        <Route path="/doctor-view-prescriptions" element={<DoctorViewPrescriptions />} />
        <Route path="/customer-edit-profile-form" element={<CustomerEditProfileForm />} />
        <Route path="/doctor-filter-prescriptions" element={<DoctorViewCustomerPres />} />
        <Route path="/admin-edit-driver/:driver_id" element={<AdminEditDriverForm />} />
        <Route path="/admin-edit-customer/:customer_id" element={<AdminEditCustomerForm />} />
        <Route path="/admin-edit-pharmacy/:pharmacy_id" element={<AdminEditPharmacyForm />} />
      </Routes>
  );
}

export default App;
