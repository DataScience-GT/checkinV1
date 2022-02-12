import { React, useState } from "react";
import { ReactDOM } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

//load pages
import LandingPage from "./Components/LandingPage";
import EventPage from "./Components/EventPage";
//load components
import PageHeader from "./Components/PageHeader";
import ThemeContext from "./Components/ThemeContext";
import AdminPage from "./Components/AdminPage";

//console.log(process.env.REACT_APP_CHECKIN_API_KEY);

function App() {
  const theme = useState("rgb(158, 157, 231)");
  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <Router>
          <Switch>
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
