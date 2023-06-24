import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="NavBar">
      <ul>
        <li>
          <Link to="/pokedex">Home</Link>
        </li>

        <li>
          <Link to="/pokedex/bookmarks">Bookmarks</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
