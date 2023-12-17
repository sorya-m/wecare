import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CoachLayout from "../Layout/CoachLayout";
import HomeNavbar from "./HomeNavbar";
import Footer from "./Footer";

function CoachSignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    coachname: "",
    password: "",
    dob: "",
    gender: "",
    mobilenumber: "",
    speciality: "",
  });

  const [erromessage, setErroMessage] = useState({
    coachname: "",
    password: "",
    dob: "",
    gender: "",
    mobilenumber: "",
    speciality: "",
  });

  const [fetchResponse, setFetchResponse] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  let checkforanyerror = false;

  const handleSubmit = (e) => {
    validate();
    checkforanyerror = Object.values(erromessage).some((element) => {
      return element.length > 0;
    });

    if (!checkforanyerror) {
      fetchData();
    }
  };

  const validate = () => {
    Object.keys(erromessage).forEach(
      (value) => (erromessage[value] = validateData(value))
    );
    setErroMessage({ ...erromessage });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateData = (fieldName) => {
    switch (fieldName) {
      case "coachname":
        return formData.coachname.length >= 3 && formData.coachname.length <= 50
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
      case "speciality":
        return formData.speciality.length >= 10 &&
          formData.speciality.length <= 20
          ? ""
          : "Speciality should have 10 to 20 characters";
        break;
      default:
        return "";
    }
  };

  const fetchData = async () => {
    console.log("fetcch data");
    try {
      await axios
        .post("http://localhost:8080/coach", {
          name: formData.coachname,
          dateOfBirth: formData.dob,
          password: formData.password,
          mobileNumber: formData.mobilenumber,
          speciality: formData.speciality,
          gender: formData.gender,
        })
        .then((res) => {
          setFetchResponse(res.data);
        })
        .catch((err) => {
          setErrorResponse(err.message);
        });
    } catch (err) {
      setErrorResponse(err.response.data.message);
    }
  };
  console.log(formData.gender);
  return (
    <React.Fragment>
      <HomeNavbar />
      <main>
        <section className="coach-signup-section">
          {fetchResponse.length > 0 ? (
            <article className="success-window">
              <h2>Your Coach Now!</h2>
              <p>
                Your Coach Id is <span>{fetchResponse}</span>
              </p>
              <button
                onClick={() => {
                  navigate("/coachlogin");
                }}
              >
                Login now
              </button>
            </article>
          ) : (
            <article className="coach-signup-form">
              {errorResponse.length > 0 ? (
                <div style={{ color: "red" }}>{errorResponse}</div>
              ) : (
                ""
              )}
              <form className="form">
                <h1>Sign up As Coach</h1>
                <div className="form-div">
                  <input
                    type="text"
                    id="coachname"
                    name="coachname"
                    className="form-input"
                    placeholder=""
                    value={formData.coachname}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <label htmlFor="coachname">Name</label>
                  {erromessage.coachname.length != 0 && (
                    <div className="input-error">{erromessage.coachname}</div>
                  )}
                </div>

                <div className="form-div">
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    className="form-input"
                    value={formData.dob}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <label htmlFor="dob">Date of birth</label>
                  {erromessage.dob.length != 0 && (
                    <div className="input-error">{erromessage.dob}</div>
                  )}
                </div>
                <div className="form-div">
                  <input
                    type="numeric"
                    id="mobilenumber"
                    name="mobilenumber"
                    placeholder=""
                    className="form-input"
                    value={formData.mobilenumber}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <label htmlFor="mobilenumber">Mobile Number</label>
                  {erromessage.mobilenumber.length != 0 && (
                    <div className="input-error">
                      {erromessage.mobilenumber}
                    </div>
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
                  {erromessage.password.length != 0 && (
                    <div className="input-error">{erromessage.password}</div>
                  )}
                </div>
                <div className="form-div">
                  <div className="coach-form-radio-div">
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
                  {erromessage.gender.length != 0 && (
                    <div className="input-error">{erromessage.gender}</div>
                  )}
                </div>
                <div className="form-div">
                  <input
                    type="text"
                    id="speciality"
                    name="speciality"
                    className="form-input"
                    placeholder=""
                    value={formData.speciality}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <label htmlFor="speciality">Speciality</label>
                  {erromessage.speciality.length != 0 && (
                    <div className="input-error">{erromessage.speciality}</div>
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

export default CoachSignUp;
