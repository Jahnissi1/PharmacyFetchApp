import { useLocation, useNavigate } from 'react-router-dom';
import '../../AppTheme.css';
import NavBar from '../../components/NavBar';
import logo from '../../components/pharmfetchLogo.png';

const PharmacyHomePage = () => {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  return (
    <>
      <NavBar onLogout={() => navigate('/')} />

      <div className="glass-container">
        <div className="logo">
          <img src={logo} alt="PharmFetch Logo" />
        </div>

        <h2>Hi {data?.name}</h2>

        <div>
          <button onClick={() => navigate("/pharmacy-accept-order", { state: data })}>
            Accept orders
          </button>
        </div>

        <div>
          <button onClick={() => navigate("/pharmacy-view-current-orders", { state: data })}>
            View orders in progress
          </button>
        </div>

        <div>
          <button onClick={() => navigate("/pharmacy-view-past-orders", { state: data })}>
            View past orders
          </button>
        </div>

        <div>
          <button onClick={() => navigate("/pharmacy-edit-profile", { state: data })}>
            Edit pharmacy info
          </button>
        </div>
      </div>
    </>
  );
};

export default PharmacyHomePage;
