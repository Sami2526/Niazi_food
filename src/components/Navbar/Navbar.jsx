import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { auth } from "../../firebase/firebase";
import "./Navbar.css";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const { user, role, getTotalCartAmount } = useContext(StoreContext);
  const [menu, setMenu] = useState("home");
  const [showDropdown, setShowDropdown] = useState(false);
  const accountRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    window.location.href = "/";
  };

  // Get user initials from displayName or email
  const getInitials = () => {
    if (user?.displayName) {
      const nameParts = user.displayName.split(" ");
      if (nameParts.length >= 2) {
        return nameParts[0][0] + nameParts[1][0];
      }
      return nameParts[0][0];
    }
    return user?.email ? user.email[0].toUpperCase() : "?";
  };

  // If user has a photoURL from Firebase Auth, use it; otherwise show initials
  const avatarUrl = user?.photoURL || null;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="navbar">
      <Link to="/" onClick={scrollToTop}>
        <img src={assets.logo_niazi} alt="Logo" className="logo" />
      </Link>

      <ul className="navbar-menu">
        <a
          href="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </a>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile App
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>

      <div className="navbar-right">
        <div className="navbar-search">
          <img src={assets.search_icon} alt="" />
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search food"
            aria-label="Search food"
          />
        </div>

        <div className="navbar-search-icon">
          <Link to="/cart" onClick={scrollToTop}>
            <img src={assets.bag_icon} alt="Cart" />
          </Link>
          <div
            className={
              getTotalCartAmount && getTotalCartAmount() === 0 ? "" : "dot"
            }
          />
        </div>

        {user ? (
          <div className="user-profile" ref={accountRef}>
            {role === "admin" && (
              <Link to="/admin" className="admin-link">
                Admin
              </Link>
            )}

            <div
              className="avatar-wrapper"
              onClick={() => setShowDropdown((visible) => !visible)}
              aria-expanded={showDropdown}
              aria-label="Open account menu"
              role="button"
              tabIndex={0}
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="avatar-img"
                />
              ) : (
                <div className="avatar-initials">{getInitials()}</div>
              )}
            </div>

            {showDropdown && (
              <div className="dropdown-menu" role="menu">
                <div className="dropdown-header">
                  <span>Your Account</span>
                  <button type="button" onClick={() => setShowDropdown(false)} aria-label="Close account menu">×</button>
                </div>
                <Link to="/profile" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                  Profile
                </Link>
                <button onClick={handleLogout} className="dropdown-item logout-btn">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" onClick={scrollToTop}>
            <button>Sign in</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;