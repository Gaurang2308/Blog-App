import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
const Nav = ({ showCard = true }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogoutClick = () => {
    // Clear login status from local storage
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleClick = () => {
    // Navigate to a different route
    navigate("/signup");
  };

  return (
    <div className="container-fluid">
      <div className="navbar bg-primary">
        <span className="title">Blog</span>
        <div className="button-group">
          {!isLoggedIn && (
            <>
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => navigate("/signin")}
              >
                Log in
              </button>
              <button
                type="button"
                className="btn btn-dark"
                onClick={handleClick}
              >
                Sign up
              </button>
            </>
          )}
          {isLoggedIn && (
            <button
              type="button"
              className="btn btn-dark"
              onClick={handleLogoutClick}
            >
              Logout
            </button>
          )}
        </div>
      </div>
      {showCard && <Card />}
    </div>
  );
};

export default Nav;
