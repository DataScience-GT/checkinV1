import { React, useState } from "react";
import { ReactDOM } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

//load pages
import LandingPage from "./Components/LandingPage";
import EventPage from "./Components/EventPage";
import AdminPage from "./Components/AdminPage";
import CheckinPage from "./Components/CheckinPage";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";

//load components
import PageHeader from "./Components/PageHeader";
import ThemeContext from "./Components/ThemeContext";

//console.log(process.env.REACT_APP_CHECKIN_API_KEY);

function App() {
  const theme = useState("rgb(158, 157, 231)");
  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <Router>
          <Switch>
            <Route path="/register/:token">
              <RegisterPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/checkin">
              <CheckinPage />
            </Route>
            <Route path="/admin">
              <AdminPage />
            </Route>
            <Route path="/event/:identifier">
              <EventPage />
            </Route>
            <Route path="/">
              <LandingPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
