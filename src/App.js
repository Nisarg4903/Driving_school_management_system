import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import New from "./pages/new/New";
import Schedule from "./pages/schedule/Schedule";
import Lecturer from "./pages/Lecturer/Lecturer"
import LecturerForm from "./components/Lecturer/LecturerForm"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useContext } from 'react';
import { AuthContext } from "./context/AuthContext";

function App() {

  const { currentUser } = useContext(AuthContext)

  // RequireAuth component to protect routes
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" replace />;
  };
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />

          {/* Other Protected Routes */}
          <Route
            path="/student"
            element={
              <RequireAuth>
                <List />
              </RequireAuth>
            }
          />
          <Route
            path="/student/new"
            element={
              <RequireAuth>
                <New title="Add New Student" />
              </RequireAuth>
            }
          />

          <Route
            path="/lecturer"
            element={
              <RequireAuth>
                <Lecturer />
              </RequireAuth>
            }
          />
          <Route
            path="/lecturer/new"
            element={
              <RequireAuth>
                <LecturerForm
                  title="Add New Instructor"
                />
              </RequireAuth>
            }
          />

          <Route
            path="/schedule"
            element={
              <RequireAuth>
                <Schedule />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
