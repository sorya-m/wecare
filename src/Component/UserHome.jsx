import React, { useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Appointment from "./Appointment";
import UserLayout from "../Layout/UserLayout";
import { userContext } from "./UserContextProvider";

function UserHome() {
  const navigate = useNavigate();
  const [coachData, setCoachData] = useState([]);
  const { appointment, setAppointment, userName } = useContext(userContext);

  useEffect(() => {
    setAppointment("");
    console.log("fetch data");

    axios
      .get("http://localhost:8080/coach/all")
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          setCoachData(res.data);
        }
      })
      .catch((rej) => {
        console.log(rej);
      });
  }, []);

  return (
    <UserLayout>
      {appointment.length == 0 ? (
        <main>
          <section className="coach-grid">
            {coachData.length > 0
              ? coachData.map((coach) => {
                  return (
                    <article key={coach.coachId} className="coach-card">
                      <div className="imgBx">
                        <img
                          className="gender-icon"
                          src={
                            coach.gender == "female"
                              ? "female-icon.png"
                              : "male-icon.png"
                          }
                        />
                      </div>
                      <div className="coach-detail">
                        <h2>{coach.name}</h2>
                        <h3>Speciality : {coach.speciality}</h3>
                        <p>Coach ID : {coach.coachId}</p>
                        <p>Mobile No : {coach.mobileNumber}</p>

                        <button
                          onClick={() => {
                            setAppointment(coach);
                          }}
                        >
                          Book an Appointment
                        </button>
                      </div>
                    </article>
                  );
                })
              : ""}
          </section>
        </main>
      ) : (
        <Appointment
          setValue={{
            appointment,
            setAppointment,
            userName,
          }}
        />
      )}
    </UserLayout>
  );
}

export default UserHome;
