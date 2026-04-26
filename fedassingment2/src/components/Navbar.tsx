import { NavLink, useNavigate } from "react-router";
import { parseJwt } from '../util/parsJWT';

export function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const user = token ? parseJwt(token) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login');
  };
  if (!user) {
    return null
  };


  return (
    <nav className="navbar-container">
      {/* Venstre side - Logo */}
      <div className="navbar-logo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#2563eb', marginRight: '8px' }}>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <path d="M12 11h4"></path>
          <path d="M12 16h4"></path>
        </svg>
        <span style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#111827' }}>
          ModelManagement
        </span>
      </div>

      {/* Højre side - Bruger info og Log ud */}
      <div className="navbar-user-section">
        <div className="user-info">
          <span className="user-name">{user.name || 'Bruger'}</span>
          <span className="user-role">{user.role || 'ingen rolle fundet'}</span>
        </div>

        <button onClick={handleLogout} className="logout-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Log ud
        </button>
      </div>
    </nav>
  );
}
// Den der styrer login skal lave en navbar som indikerer om man logger ind som model eller manager
