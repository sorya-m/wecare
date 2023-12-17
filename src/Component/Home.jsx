import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import HomeNavbar from "./HomeNavbar";

function Home() {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <HomeNavbar />
      <main>
        <section className="home-grid">
          <div>
            <article>
              <button
                onClick={() => {
                  navigate("/coachlogin");
                }}
              >
                Login as Coach
              </button>
              <button
                onClick={() => {
                  navigate("/coachsignup");
                }}
              >
                Join as Coach
              </button>
            </article>
          </div>
          <div>
            <article>
              <button
                onClick={() => {
                  navigate("/userlogin");
                }}
              >
                Login as User
              </button>
              <button
                onClick={() => {
                  navigate("/usersignup");
                }}
              >
                Join as User
              </button>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default Home;
