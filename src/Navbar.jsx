import { useNavigate } from "react-router-dom";

const Navbar = ({ currentUser, showSummary, setShowSummary }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h3 className="navbar-title">
          <span className="title-full">Expense Tracker</span>
          <span className="title-short">EXT</span>
        </h3>
      </div>
      <div className="nav-center">
        {currentUser && <span className="navbar-user">Welcome, {currentUser.name}</span>}
      </div>
      <div className="nav-right">
        <button
          className="nav-btn summary-btn"
          onClick={() => setShowSummary(!showSummary)}
          title="Category Summary"
        >
          <span className="btn-text">{showSummary ? "Hide Summary" : "Show Category Summary"}</span>
          <span className="btn-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="12" width="4" height="9" />
              <rect x="10" y="7" width="4" height="14" />
              <rect x="17" y="3" width="4" height="18" />
            </svg>
          </span>
        </button>
        <button className="nav-btn logout-btn" onClick={logout} title="Logout">
          <span className="btn-text">Logout</span>
          <span className="btn-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
