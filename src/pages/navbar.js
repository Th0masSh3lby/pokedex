import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="NavBar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/bookmarks">Bookmarks</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
