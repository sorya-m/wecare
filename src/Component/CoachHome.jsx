import React, { useContext, useEffect } from "react";
import CoachLayout from "../Layout/CoachLayout";
import { userContext } from "./UserContextProvider";
import axios from "axios";

function CoachHome() {
  const { coach, coachAppointment, setCoachAppointment } =
    useContext(userContext);

  useEffect(() => {
    console.log("use Effect called");
    setCoachAppointment([]);
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log("coach Id" + coach);

    await axios
      .get("http://localhost:8080/booking/coach/" + coach)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          setCoachAppointment(response.data);
        }
      })
      .catch((rej) => {
        console.log(rej);
        if (rej.response?.data.statusCode) {
          setErrorResponse(rej.response.data.message);
        }
        setErrorResponse(rej.message);
      });
  };

  return (
    <CoachLayout>
      <main>
        <section className="coach-appointment-section">
          {coachAppointment.length > 0 &&
            coachAppointment.map((schedule) => {
              return (
                <article key={schedule.bookingId}>
                  <h2>
                    Appointment Date :<br></br> {schedule.appointmentDate}
                  </h2>
                  <h3>slot : {schedule.slot}</h3>
                  <p>Booking Id : {schedule.bookingId}</p>
                  <p>User Id : {schedule.userId}</p>
                </article>
              );
            })}
        </section>
      </main>
    </CoachLayout>
  );
}

export default CoachHome;
