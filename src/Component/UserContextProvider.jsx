import React, { createContext, useState } from "react";

export const userContext = createContext(null);

function UserContextProvider({ children }) {
  const [userName, setUserName] = useState("");
  const [appointment, setAppointment] = useState([]);
  const [coachAppointment, setCoachAppointment] = useState([]);

  const [coach, setCoach] = useState([]);

  const value = {
    userName,
    setUserName,
    appointment,
    setAppointment,
    coach,
    setCoach,
    coachAppointment,
    setCoachAppointment,
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
}

export const useUserContext = () => {
  if (userContext !== null) {
    throw new Error("null in user context");
  }

  return userContext;
};

export default UserContextProvider;
