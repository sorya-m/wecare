import React, { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeNavbar from "./HomeNavbar";
import Footer from "./Footer";
import { userContext } from "./UserContextProvider";

function CoachLogin() {
  const { coach, setCoach } = useContext(userContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    coachid: "",
    password: "",
  });

  const [error, setError] = useState({
    password: "",
    coachid: "",
  });

  const [errorResponse, setErrorResponse] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    validate();
    const checkforanyerror = Object.values(error).some((element) => {
      return element.length > 0;
    });

    if (!checkforanyerror) {
      fetchData();
    }
  };

  const validate = () => {
    Object.keys(error).forEach((value) => (error[value] = validateData(value)));
    setError({ ...error });
  };

  const validateData = (fieldName) => {
    switch (fieldName) {
      case "coachid":
        return formData.coachid.length == 0 ? "Coach ID is required" : "";
        break;

      case "password":
        return !(
          formData.password.length >= 5 && formData.password.length <= 10
        )
          ? "password shoubld have 5 to 10 characters"
          : "";
        break;

      default:
        return "";
    }
  };

  const fetchData = async () => {
    try {
      await axios
        .post("http://localhost:8080/coach/login", {
          id: formData.coachid,
          password: formData.password,
        })
        .then((response) => {
          if (response.status == 200 && response.data == true) {
            navigate("/coachhome");
            setCoach(formData.coachid);
          } else {
            setErrorResponse("Invalid Credentials");
          }
        })
        .catch((rej) => {
          console.log(rej);
          if (rej.response) {
            setErrorResponse(rej.response.data.message);
          } else {
            setErrorResponse(rej.message);
          }
        });
    } catch (err) {
      setErrorResponse(err.response.data.message);
    }
  };

  const d = Object.values(error).some((element) => element.length > 0);
  return (
    <React.Fragment>
      <HomeNavbar />
      <main>
        <section>
          <article className="l-form">
            <form className="form">
              {errorResponse.length > 0 && (
                <span className="form-error-response">{errorResponse}</span>
              )}
              <h1 className="form__title">Login As Coach</h1>

              <div className="form-div">
                <input
                  type="text"
                  id="coachid"
                  name="coachid"
                  // autoComplete="off"
                  className="form-input"
                  placeholder=" "
                  value={formData.coachid}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                {error.coachid.length > 0 && (
                  <div className="input-error">{error.coachid}</div>
                )}
                <label htmlFor="coachid">Coach Id</label>
              </div>

              <div className="form-div">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-input"
                  placeholder=" "
                  value={formData.password}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <label htmlFor="password">Password</label>
                {error.password.length > 0 && (
                  <div className="input-error">{error.password}</div>
                )}
              </div>

              <button
                className="form-button"
                onClick={(e) => {
                  e.preventDefault();

                  handleSubmit(e);
                }}
              >
                Login
              </button>
            </form>
          </article>
        </section>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default CoachLogin;
