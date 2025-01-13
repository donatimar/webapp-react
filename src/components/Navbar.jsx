import { NavLink } from "react-router-dom";

export default function Navbar() {
  const handleClick = (event) => {
    event.preventDefault(); // Previene il comportamento di default (navigazione)
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <a className="navbar-brand" href="#">
          {import.meta.env.VITE_APP_NAME || "Webapp-React"}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link disabled"
                to="/moviedetail"
                onClick={handleClick}
                aria-disabled="true"
              >
                Movie Details
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
