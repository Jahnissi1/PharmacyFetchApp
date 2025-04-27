import './App.css';
import Dropdown from "./components/Dropdown/Dropdown";
import DropdownItem from './components/DropdownItem/DropdownItem';
import { useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import './AppTheme.css';
import './SelectUser.css';
import logo from './components/pharmfetchLogo.png';

const  SelectUser = () => {
  const navigate = useNavigate();
  const items = ["Customer", "Driver", "Pharmacy", "Admin", "Doctor"];
  
  const handleLogin = (item) => {
    switch (item) {
      case "Customer":
        navigate("/login-customer");
        break;
      case "Driver":
        navigate("/login-driver")
        break
      case "Pharmacy":
        navigate("/login-pharmacy")
        break
      case "Admin":
        navigate("/login-admin")
        break
      case "Doctor":
        navigate("/login-doctor")
      default:
        break;
    }
  };

  useEffect(() => {
    fetch('http://localhost:3001/customers')
      .then(res => res.json())
      .then(data => {
        console.log('Tables:', data);
      });
  }, []);


  return (
  <div className="SelectUser">
    <div className="user-type-container">
      <img src={require('./components/pharmfetchLogo.png')} alt="PharmFetch Logo" className="main-logo" />
      <h2>Select your user type</h2>
      <div className="dropdown-wrapper">
        <Dropdown buttonText="Select User Type"
          content={
            <>
              {items.map((item) => (
                <DropdownItem key={item} onClick={() => handleLogin(item)}>
                  {item}
                </DropdownItem>
              ))}
            </>
          }
        />
      </div>
    </div>
  </div>
);
}


export default SelectUser;
