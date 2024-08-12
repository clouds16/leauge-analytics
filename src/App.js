import React from "react";
import HomePage from "./pages/HomePage";
import JakesPage from "./pages/JakesPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jake" element={<JakesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
