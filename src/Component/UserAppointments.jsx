import React, { useEffect, useState, useContext } from "react";
import UserLayout from "../Layout/UserLayout";
import axios from "axios";
import { userContext } from "./UserContextProvider";
import { useNavigate } from "react-router-dom";
import RescheduleAppointment from "./RescheduleAppointment";

function UserAppointments() {
  const navigate = useNavigate();
  const { appointment, setAppointment, userName } = useContext(userContext);
  const [bookings, setBookings] = useState([]);
  const [fetchResponse, setFetchResponse] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const [deleteResponse, setDeleteResponse] = useState("");
  const [showModal, setShowModal] = useState("");

  useEffect(() => {
    console.log("userAppointments use Effect called");
    setAppointment([]);
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log("user Name" + userName);
    try {
      await axios
        .get("http://localhost:8080/booking/users/" + userName)
        .then((response) => {
          if (response.status == 200) {
            setBookings(response.data);
          }
        })
        .catch((rej) => {
          console.log(rej);
          if (rej.response?.data.statusCode == 500) {
            setErrorResponse(rej.response.data.message);
          }
          setErrorResponse(rej.message);
        });
    } catch (err) {
      console.log(err);
      //setErrorResponse(err.response.data.message);
    }
  };

  const deleteAppointment = async () => {
    try {
      console.log(appointment);
      await axios
        .delete("http://localhost:8080/booking/" + showModal)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            setFetchResponse(response.data);
          }

          setShowModal("");
          setAppointment([]);
          fetchData();
        })
        .catch((rej) => {
          console.log(rej);
          if (rej.response?.data.statusCode == 500) {
            setErrorResponse(rej.response.data.message);
          }
          setErrorResponse(rej.message);
        });
    } catch (err) {
      console.log(err);
      //setErrorResponse(err.response.data.message);
    }
  };

  const modalWindow = () => {
    return (
      <div
        className="modal-show"
        onClick={(e) => {
          if (e.target == e.currentTarget) {
            setShowModal("");
          }
        }}
      >
        <div className="model-window">
          <p>Are you sure you want to cancel the following appointment ?</p>
          <p>Booking Id : {showModal}</p>
          <div>
            <button
              onClick={() => {
                deleteAppointment();
              }}
            >
              Yes
            </button>
            <button
              onClick={() => {
                setShowModal("");
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <UserLayout>
      {showModal.length != 0 && modalWindow()}
      <main>
        {appointment.length == 0 ? (
          <section className="appointment-grid">
            {bookings.length == 0 && (
              <div style={{ gridTemplateColumns: "1fr" }}>
                {"No Appointments scheduled"}
              </div>
            )}
            {bookings &&
              bookings.map((booking) => {
                return (
                  <article className="appointment-card" key={booking.bookingId}>
                    <h2>
                      Appointment Date : <br></br> {booking.appointmentDate}
                    </h2>
                    <p>Slot : {booking.slot}</p>
                    <p>Booking ID : {booking.bookingId}</p>
                    <p>User ID : {booking.userId}</p>
                    <p>Coach ID : {booking.coachId}</p>
                    <button
                      onClick={() => {
                        setAppointment(booking);
                      }}
                    >
                      Reschedule Appointment
                    </button>
                    <button
                      onClick={() => {
                        setShowModal(booking.bookingId);
                      }}
                    >
                      Cancel Appointment
                    </button>
                  </article>
                );
              })}
          </section>
        ) : (
          <React.Fragment>
            {modalWindow.length == 0 && (
              <RescheduleAppointment
                value={{ appointment, setAppointment, userName, fetchData }}
              />
            )}
          </React.Fragment>
        )}
      </main>
    </UserLayout>
  );
}

export default UserAppointments;
