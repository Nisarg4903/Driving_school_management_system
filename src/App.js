import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import New from "./pages/new/New";
import Schedule from "./pages/schedule/Schedule";
import Lecturer from "./pages/Lecturer/Lecturer";
import LecturerForm from "./components/Lecturer/LecturerForm";
import StudentPage from "./pages/StudentScheduling/StudentPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";


function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children, role }) => {
    if (!currentUser) {
      return <Navigate to="/login" replace />;
    }
    if (role && currentUser.role !== role) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <RequireAuth role="admin">
                <Home />
              </RequireAuth>
            }
          />
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
                <LecturerForm title="Add New Instructor" />
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
          <Route
            path="/StudentPage"
            element={
              <RequireAuth role="student">
                <StudentPage />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
