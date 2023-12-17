import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "./UserContextProvider";
import HomeNavbar from "./HomeNavbar";
import Footer from "./Footer";

function UserLogin() {
  const { setUserName } = useContext(userContext);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userid: "",
    password: "",
  });

  const [error, setError] = useState({
    password: "",
    userid: "",
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
      case "userid":
        return formData.userid.length == 0 ? "User ID is required" : "";
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
    await axios
      .post("http://localhost:8080/users/login", {
        id: formData.userid,
        password: formData.password,
      })
      .then((response) => {
        console.log(response);
        if (response.status == 200 && response.data == true) {
          setUserName(formData.userid);
          navigate("/userhome");
        } else {
          setErrorResponse("Invalid Credentials");
        }
      })
      .catch((rej) => {
        if (rej.response) {
          setErrorResponse(rej.response.data.message);
        } else {
          setErrorResponse(rej.message);
        }
      });
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
              <h1 className="form__title">Login As User</h1>

              <div className="form-div">
                <input
                  type="text"
                  id="userid"
                  name="userid"
                  // autoComplete="off"
                  className="form-input"
                  placeholder=" "
                  value={formData.userid}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                {error.userid.length > 0 && (
                  <div className="input-error">{error.userid}</div>
                )}
                <label htmlFor="userid">User Id</label>
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

export default UserLogin;
