import React from "react";
import { useResolvedPath } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Component/Footer";

function CoachLayout({ children }) {
  const resolvedpath = useResolvedPath("");

  return (
    <React.Fragment>
      <header>
        <nav className="navbar">
          <Link to="..">WeCare</Link>
          <ul className="nav-list">
            <li>
              <Link
                to="../coachviewprofile"
                className={
                  resolvedpath.pathname == "/coachviewprofile" ? "isactive" : ""
                }
              >
                View Profile
              </Link>
            </li>
            <li>
              <Link
                to="../coachappointments"
                className={
                  resolvedpath.pathname == "/coachappointments"
                    ? "isactive"
                    : ""
                }
              >
                My Appointments
              </Link>
            </li>

            <li>Call us : 123546987</li>
          </ul>
          <Link to="..">Logout</Link>
        </nav>
      </header>
      {children}
      <Footer />
    </React.Fragment>
  );
}

export default CoachLayout;
