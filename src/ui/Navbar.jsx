import { Link, NavLink } from "react-router";

function Navbar() {
  return (
    <div>
      <ul className="navbar">
        <Link className="navbar__logo" to="/">
          <img src="f1_logo.png" />
        </Link>
        <NavLink
          className={`navbar__navitem ${({ isActive }) =>
            isActive ? "active" : ""}`}
          to="/"
        >
          <li>Home</li>
        </NavLink>
        <NavLink className="navbar__navitem" to="/circuits">
          <li>Circuits</li>
        </NavLink>
        <NavLink className="navbar__navitem" to="/teams">
          <li>Teams</li>
        </NavLink>
        <NavLink className="navbar__navitem" to="/pilots">
          <li>Pilots</li>
        </NavLink>
      </ul>
    </div>
  );
}

export default Navbar;
