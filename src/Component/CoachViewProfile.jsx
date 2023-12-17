import React, { useContext, useState, useEffect } from "react";
import { userContext } from "./UserContextProvider";
import { useNavigate } from "react-router-dom";
import CoachLayout from "../Layout/CoachLayout";
import axios from "axios";

function CoachViewProfile() {
  const navigate = useNavigate();
  const { coach: coachData } = useContext(userContext);

  const [coach, setCoach] = useState([]);
  const [errorResponse, setErrorResponse] = useState("");
  console.log(coachData);
  useEffect(() => {
    console.log("fetch data");
    axios
      .get("http://localhost:8080/coach/" + coachData)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          setCoach(res.data);
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
  }, []);
  console.log(coachData);
  return (
    <CoachLayout>
      <main>
        <section className="coach-profile-section">
          <article className="coach-profile-article">
            <img
              className="gender-icon"
              src={
                coach.gender == "female" ? "female-icon.png" : "male-icon.png"
              }
            />
            <div className="coach-content">
              <h3>{coach.name}</h3>
              <h4>{coach.speciality}</h4>
              <p>Date of Birth : {coach.dateOfBirth}</p>
              <p>Mobile No : {coach.mobileNumber}</p>
              <button
                onClick={() => {
                  navigate("/coachhome");
                }}
              >
                {"back to home"}
              </button>
            </div>
          </article>
        </section>
      </main>
    </CoachLayout>
  );
}

export default CoachViewProfile;
