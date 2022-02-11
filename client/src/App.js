import { React, useEffect } from "react";
import { ReactDOM } from "react-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

//load pages
import LandingPage from './Components/LandingPage'
//load components
import PageHeader from "./Components/PageHeader";

//console.log(process.env.REACT_APP_CHECKIN_API_KEY);

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
