import React, { useEffect, useState, useContext } from "react";
import UserLayout from "../Layout/UserLayout";
import { userContext } from "./UserContextProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserViewProfile() {
  const navigate = useNavigate();
  const { userName } = useContext(userContext);

  const [user, setUser] = useState([]);
  const [errorResponse, setErrorResponse] = useState("");
  useEffect(() => {
    console.log("fetch data");

    axios
      .get("http://localhost:8080/users/" + userName)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          setUser(res.data);
        }
      })
      .catch((rej) => {
        if (rej.response) {
          setErrorResponse(rej.response.data.message);
        } else {
          setErrorResponse(rej.message);
        }
        setUser([]);
      });
  }, []);

  return (
    <UserLayout>
      <main>
        <section className="user-profile-section">
          <article className="user-profile-article">
            <img
              className="gender-icon"
              src={
                user.gender == "female" ? "female-icon.png" : "male-icon.png"
              }
            />
            <div className="user-content">
              <h3>{user.name}</h3>
              <p>Date of Birth : {user.dateOfBirth}</p>
              <p>Email Id : {user.email}</p>
              <p>Mobile No : {user.mobileNumber}</p>
              <p style={{ textTransform: "capitalize" }}>
                Address :{" "}
                {user.city + " , " + user.state + " , " + user.country}
              </p>
              <p>Pincode : {user.pincode}</p>
              <button
                onClick={() => {
                  navigate("/userhome");
                }}
              >
                {"Back To Home"}
              </button>
            </div>
          </article>
        </section>
      </main>
    </UserLayout>
  );
}

export default UserViewProfile;
