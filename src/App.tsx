import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfileSetup from "./pages/Profilesetup";
import UserList from "./pages/UserList";
import './App.css';

const App: React.FC = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile-setup" element={<ProfileSetup />} />
              <Route path="/UserList" element={<UserList />} />
          </Routes>
      </Router>
  );
};

export default App;
