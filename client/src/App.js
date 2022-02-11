import { React, useState } from "react";
import { ReactDOM } from "react-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

//load pages
import LandingPage from "./Components/LandingPage";
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
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
