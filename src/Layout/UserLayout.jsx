import React from "react";
import { useResolvedPath } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Component/Footer";

const UserLayout = ({ children }) => {
  const resolvedpath = useResolvedPath("");
  // const isActive = useMatch({ path: resolvedpath.pathname, end: true });
  // console.log(resolvedpath, isActive);

  return (
    <React.Fragment>
      <header>
        <nav className="navbar">
          <Link to="..">WeCare</Link>
          <ul className="nav-list">
            <li>
              <Link
                to="../userviewprofile"
                className={
                  resolvedpath.pathname == "/userviewprofile" ? "isactive" : ""
                }
              >
                View Profile
              </Link>
            </li>
            <li>
              <Link
                to="../userappointments"
                className={
                  resolvedpath.pathname == "/userappointments" ? "isactive" : ""
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
};

export default UserLayout;
