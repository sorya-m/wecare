import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import React from "react";
import CoachSignUp from "./Component/CoachSignUp";
import CoachLogin from "./Component/CoachLogin";
import UserSignUp from "./Component/UserSignUp";
import CoachHome from "./Component/CoachHome";
import UserLogin from "./Component/UserLogin";
import UserHome from "./Component/UserHome";
import UserViewProfile from "./Component/UserViewProfile";
import UserContextProvider from "./Component/UserContextProvider";
import UserAppointments from "./Component/UserAppointments";
import CoachViewProfile from "./Component/CoachViewProfile";
import CoachAppointments from "./Component/CoachAppointments";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route index path="/" Component={Home} />
          <Route path="/coachsignup" Component={CoachSignUp} />
          <Route path="/coachlogin" Component={CoachLogin} />
          <Route path="/coachhome" Component={CoachHome} />
          <Route path="/coachviewprofile" element={<CoachViewProfile />} />
          <Route path="/coachappointments" element={<CoachAppointments />} />
          <Route path="/userlogin" Component={UserLogin} />
          <Route path="/usersignup" Component={UserSignUp} />
          <Route path="/userhome" element={<UserHome />} />
          <Route path="/userappointments" element={<UserAppointments />} />
          <Route path="/userviewprofile" Component={UserViewProfile} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
