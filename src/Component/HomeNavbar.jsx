import React from "react";
import { Link } from "react-router-dom";

function HomeNavbar() {
  return (
    <header>
      <nav className="navbar-home">
        <ul className="nav-list-home">
          <li>
            <Link to=".."> WE care</Link>
          </li>
          <li>Phone No : 123546987</li>
        </ul>
      </nav>
    </header>
  );
}

export default HomeNavbar;
