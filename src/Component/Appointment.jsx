import React, { useState } from "react";
import axios from "axios";

const Appointment = ({ setValue }) => {
  const { appointment, setAppointment, userName } = setValue;

  const [formData, setFormData] = useState({
    dateofappointment: "",
    slottime: "",
  });

  const [error, setError] = useState({
    dateofappointment: "",
    slottime: "",
  });
  const [back, setBack] = useState(false);

  const [fetchResponse, setFetchResponse] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  let checkforanyerror = false;
  const handleSubmit = () => {
    validate();
    checkforanyerror = Object.values(error).some((element) => {
      return element.length > 0;
    });

    if (!checkforanyerror) {
      fetchData();
    }
  };

  const fetchData = async () => {
    console.log("fetch");
    try {
      await axios
        .post(
          "http://localhost:8080/booking/users/" +
            `${userName}` +
            "/booking/" +
            `${appointment.coachId}`,
          {},
          {
            params: {
              dateofappointment: formData.dateofappointment,
              slot: formData.slottime,
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.status == 201) {
            setFetchResponse(res.data);
            setErrorResponse("");
            setBack(true);
          } else {
            setBack(false);
          }
        })
        .catch((err) => {
          console.log(err);
          if (err?.response?.data.statusCode == 400) {
            setErrorResponse(err.response.data.message);
            setFetchResponse("");
            setBack(false);
          }
          setErrorResponse(err.message);
          setBack(false);
        });
    } catch (err) {
      console.log(err);
      setBack(false);
      //setErrorResponse(err.response.data.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    Object.keys(error).forEach((value) => (error[value] = validateData(value)));
    setError({ ...error });
  };

  const validateData = (fieldName) => {
    switch (fieldName) {
      case "dateofappointment":
        let currentDate = new Date();
        let inputDate = new Date(formData.dateofappointment);
        let newDate = new Date();
        newDate.setDate(currentDate.getDate() + 7);
        if (currentDate.getDate() == inputDate.getDate()) {
          return "";
        }

        if (currentDate < inputDate && inputDate <= newDate) {
          return "";
        } else {
          return "Date of appointment should be within 7 days";
        }
        break;

      case "slottime":
        return formData.slottime.length != 0 ? "" : "Please select slot time";
        break;
      default:
        return "";
    }
  };

  return (
    <React.Fragment>
      {!back && (
        <main>
          <section className="appointment-form">
            <article>
              <h2> Book an Appointment</h2>
              <div>
                <label htmlFor="date">Date Of Appointment</label>
                <input
                  type="date"
                  name="dateofappointment"
                  placeholder="dd/mm/yyyy"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                {error.dateofappointment.length > 0 && (
                  <div
                    style={{ color: "red", fontSize: "0.75rem" }}
                    className="error"
                  >
                    {error.dateofappointment}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="slotdate">Slot</label>
                <select
                  value={formData.drop}
                  name="slottime"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  <option value="">Select a slot</option>
                  <option value="9 AM to 10 AM">9 AM to 10 AM</option>
                  <option value="10 AM to 11 AM">10 AM to 11 AM</option>
                  <option value="11 AM to 12 PM">11 AM to 12 AM</option>
                  <option value="2 PM to 3 PM">2 PM to 3 PM</option>
                  <option value="3 PM to 4 PM">3 PM to 4 PM</option>
                  <option value="4 PM to 5 PM">4 PM to 5 PM</option>
                </select>

                {error.slottime.length != 0 && (
                  <div
                    style={{ color: "red", fontSize: "0.75rem" }}
                    className="error"
                  >
                    {error.slottime}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  handleSubmit();
                }}
              >
                Confirm your Appointment
              </button>
            </article>
          </section>
        </main>
      )}

      {back && (
        <main>
          <section className="success-window">
            <h2>Appointment Created Successfully</h2>
            <button
              onClick={() => {
                setAppointment([]);
              }}
            >
              {"Back To Home"}
            </button>
          </section>
        </main>
      )}
    </React.Fragment>
  );
};

export default Appointment;
