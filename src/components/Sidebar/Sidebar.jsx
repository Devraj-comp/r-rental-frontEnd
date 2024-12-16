import React, { useState, useEffect } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import navLinks from "../../assets/dummy-data/navLinks";
import "./sidebar.css";
import navLinksRenter from "../../assets/dummy-data/navLinksRenter";
import { jwtDecode } from "jwt-decode";


const Sidebar = () => {
  const [user, setUser] = useState();
  const [userRole, setUserRole] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    console.log("Sidebar access: ", accessToken);

    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
        setUser(decodedToken.user);
        setUserRole(decodedToken.role);
      } catch (error) {
        console.log("Invalid token: ", error);
        setUser(null);
        setUserRole(null);
      }
    } else {
      console.log("No access token found");
      setUser(null);
      setUserRole(null);
    }
  }, []);
  console.log("sidebar role: ", userRole);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  }
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h2>
          <span>
            <i class="ri-taxi-line"></i>
          </span>{" "}
          Right-Rental
        </h2>
      </div>

      <div className="sidebar__content">
        <div className="menu">
          <ul className="nav__list">
            {userRole === 'admin' ? navLinks.map((item, index) => (
              <li className="nav__item" key={index}>
                <NavLink
                  to={item.path}
                  className={(navClass) =>
                    navClass.isActive ? "nav__active nav__link" : "nav__link"
                  }
                >
                  <i className={item.icon}></i>

                  {item.display}
                </NavLink>
              </li>
            )): 
            navLinksRenter.map((item, index) => (
              <li className="nav__item" key={index}>
                <NavLink
                  to={item.path}
                  className={(navClass) =>
                    navClass.isActive ? "nav__active nav__link" : "nav__link"
                  }
                >
                  <i className={item.icon}></i>

                  {item.display}
                </NavLink>
              </li>
            ))
            }
          </ul>
        </div>

        <div className="sidebar__bottom">
        <button onClick={handleLogout} className="ml-4 bg-red-500 p-2 rounded text-white">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
