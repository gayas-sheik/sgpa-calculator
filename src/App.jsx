import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import StudentGradingSystem from "./components/Grade";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentGradingSystem />} />
      </Routes>
    </Router>
  );
}

export default App;
