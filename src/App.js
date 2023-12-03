import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import New from "./pages/new/New";
import Single from "./pages/single/Single";
import Schedule from "./pages/schedule/Schedule";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";

function App() {
  const currentUser = true; // Placeholder for authentication logic

  // RequireAuth component to protect routes
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" replace />;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              currentUser ? (
                <Navigate to="/home" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
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
            path="/users"
            element={
              <RequireAuth>
                <List />
              </RequireAuth>
            }
          />
          <Route
            path="/users/:userId"
            element={
              <RequireAuth>
                <Single />
              </RequireAuth>
            }
          />
          <Route
            path="/users/new"
            element={
              <RequireAuth>
                <New inputs={userInputs} title="Add New User" />
              </RequireAuth>
            }
          />

          <Route
            path="/products"
            element={
              <RequireAuth>
                <List />
              </RequireAuth>
            }
          />
          <Route
            path="/products/:productId"
            element={
              <RequireAuth>
                <Single />
              </RequireAuth>
            }
          />
          <Route
            path="/products/new"
            element={
              <RequireAuth>
                <New inputs={productInputs} title="Add New Product" />
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
