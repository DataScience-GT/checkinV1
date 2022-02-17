import { React, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";
import "./App.css";

//load pages
import AdminPage from "./Components/AdminPage";
import CheckinPage from "./Components/CheckinPage";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";

//load components
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
            {/*<Route path="/event/:identifier">
              <EventPage />
            </Route>*/}
            <Route path="/">
              <Redirect to="/login" />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
