import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth"; // Import Firebase auth functions
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Import the logout icon

import "./navbar.scss";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // This should be set based on your actual authentication logic
  useEffect(() => {
    // Check if the user is authenticated
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // Redirect to login page or update the state as necessary
        setIsAuthenticated(false);
      })
      .catch((error) => {
        // An error happened.
        console.error("Logout failed", error);
      });
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          {isAuthenticated && (
            <div className="item" onClick={handleLogout}>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </div>
          )}
          <div className="item">
            <img
              src="images/IMG-0024.jpg"
              alt="profile-pic"
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
