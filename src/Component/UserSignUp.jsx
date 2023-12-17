import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import HomeNavbar from "./HomeNavbar";

function UserSignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    dob: "",
    gender: "",
    email: "",
    mobilenumber: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
  });

  const [error, setError] = useState({
    username: "",
    password: "",
    dob: "",
    gender: "",
    email: "",
    mobilenumber: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
  });

  const [fetchResponse, setFetchResponse] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  let checkforanyerror = false;
  const handleSubmit = (e) => {
    validate();
    checkforanyerror = Object.values(error).some((element) => {
      return element.length > 0;
    });

    if (!checkforanyerror) {
      fetchData();
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchData = async () => {
    console.log("fetch data ");
    try {
      await axios
        .post("http://localhost:8080/users", {
          name: formData.username,
          gender: formData.gender,
          password: formData.password,
          dateOfBirth: formData.dob,
          mobileNumber: formData.mobilenumber,
          email: formData.email,
          pincode: formData.pincode,
          city: formData.city,
          state: formData.state,
          country: formData.country,
        })
        .then((res) => {
          console.log(res);
          if (res.status == 201 && res.data.length > 0) {
            setFetchResponse(res.data);
            setErrorResponse("");
          } else {
            setErrorResponse("Invalid Credentials");
          }
        })
        .catch((err) => {
          console.log(err);
          if (err?.response?.data.statusCode == 400) {
            setErrorResponse(err.response.data.message);
            setFetchResponse("");
          }
          setErrorResponse(err.message);
        });
    } catch (err) {
      console.log(err);
      //setErrorResponse(err.response.data.message);
    }
  };
  const validate = () => {
    Object.keys(error).forEach((value) => (error[value] = validateData(value)));
    setError({ ...error });
  };

  const validateData = (fieldName) => {
    switch (fieldName) {
      case "username":
        return formData.username.length >= 3 && formData.username.length <= 50
          ? ""
          : "Name should have 3 to 50 characters";
        break;

      case "password":
        return formData.password.length >= 5 && formData.password.length <= 10
          ? ""
          : "password shoubld have 5 to 10 characters";
        break;

      case "mobilenumber":
        return formData.mobilenumber.length == 10
          ? ""
          : "Mobile number shoubld have 10 digits";

        break;

      case "dob":
        const age =
          new Date().getFullYear() - new Date(formData.dob).getFullYear();

        return age >= 20 && age <= 100
          ? ""
          : "Age should be betweeb 20 and 100 years";
        break;
      case "gender":
        return formData.gender.length == 0 ? "gender is required" : "";
        break;
      case "email":
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
          formData.email
        )
          ? ""
          : "Please enter valid email ex:some@gmail.com";
        break;
      case "pincode":
        return formData.pincode.length == 6
          ? ""
          : "Pincode should have 6 digits";
        break;
      case "city":
        return formData.city.length >= 6 && formData.city.length <= 20
          ? ""
          : "City should have 6 to 20 characters";
        break;
      case "state":
        return formData.state.length >= 6 && formData.state.length <= 20
          ? ""
          : "State should have 6 to 20 characters";
        break;
      case "country":
        return formData.country.length >= 3 && formData.country.length <= 20
          ? ""
          : "Country should have 6 to 20 characters";
        break;

      default:
        return "";
    }
  };

  return (
    <React.Fragment>
      <HomeNavbar />
      <main>
        <section className="user-signup-section">
          {errorResponse.length > 0 ? (
            <div style={{ color: "red" }}>{errorResponse}</div>
          ) : (
            ""
          )}
          {fetchResponse.length > 0 ? (
            <article className="success-window">
              <h2>Your Userid Successfully got created!!</h2>
              <p>
                Your User Id is :<span>{fetchResponse}</span>
              </p>

              <button
                onClick={() => {
                  navigate("/userlogin");
                }}
              >
                Login now
              </button>
            </article>
          ) : (
            <article className="user-signup-article">
              {errorResponse.length > 0 ? (
                <div style={{ color: "red" }}>{errorResponse}</div>
              ) : (
                ""
              )}
              <form className="form">
                <h1>User Profile</h1>
                <div className="form-div">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-input"
                    placeholder=""
                    value={formData.username}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <label htmlFor="username">Name</label>
                  {error.username.length != 0 && (
                    <div className="input-error">{error.username}</div>
                  )}
                </div>
                <div className="form-div">
                  <input
                    type="text"
                    id="mobilenumber"
                    name="mobilenumber"
                    className="form-input"
                    placeholder=""
                    value={formData.mobilenumber}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <label htmlFor="mobilenumber">Mobile Number</label>
                  {error.mobilenumber.length != 0 && (
                    <div className="input-error">{error.mobilenumber}</div>
                  )}
                </div>
                <div className="form-div">
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    className="form-input"
                    placeholder=""
                    style={{ width: "98%" }}
                    value={formData.dob}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <label htmlFor="dob">Date of birth</label>
                  {error.dob.length != 0 && (
                    <div className="input-error">{error.dob}</div>
                  )}
                </div>
                <div className="form-div">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-input"
                    placeholder=""
                    value={formData.password}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <label htmlFor="password">Password</label>
                  {error.password.length != 0 && (
                    <div className="input-error">{error.password}</div>
                  )}
                </div>

                <div className="form-div">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder=""
                    value={formData.email}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <label htmlFor="email">Email</label>
                  {error.email.length != 0 && (
                    <div className="input-error">{error.email}</div>
                  )}
                </div>

                <div className="form-div">
                  <div className="user-form-radio-div">
                    <div className="radio-div">
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="male"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                      <label htmlFor="male">Male</label>
                    </div>
                    <div className="radio-div">
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="female"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                      <label htmlFor="female">Female</label>
                    </div>
                  </div>
                  {error.gender.length != 0 && (
                    <div className="input-error">{error.gender}</div>
                  )}
                </div>
                <div className="form-div">
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    className="form-input"
                    placeholder=""
                    value={formData.pincode}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <label htmlFor="pincode">Pincode</label>
                  {error.pincode.length != 0 && (
                    <div className="input-error">{error.pincode}</div>
                  )}
                </div>
                <div className="form-div">
                  <input
                    type="text"
                    id="state"
                    name="state"
                    className="form-input"
                    placeholder=""
                    value={formData.state}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <label htmlFor="state">State</label>
                  {error.state.length != 0 && (
                    <div className="input-error">{error.state}</div>
                  )}
                </div>
                <div className="form-div">
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="form-input"
                    placeholder=""
                    value={formData.city}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <label htmlFor="city">City</label>
                  {error.city.length != 0 && (
                    <div className="input-error">{error.city}</div>
                  )}
                </div>
                <div className="form-div">
                  <input
                    type="text"
                    id="country"
                    name="country"
                    className="form-input"
                    placeholder=""
                    value={formData.country}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <label htmlFor="country">Country</label>
                  {error.country.length != 0 && (
                    <div className="input-error">{error.country}</div>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSubmit(e);
                  }}
                >
                  Register
                </button>
              </form>
            </article>
          )}
        </section>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default UserSignUp;
