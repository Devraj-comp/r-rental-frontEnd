import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { LoginSignupToggle } from "./loginsignup-pop";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null); // State to store the user information
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in (you can also use Context API or Redux for this)
    const token = localStorage.getItem("access_token");
    if (token) {
      // Optionally, you could fetch user data from an API using the token
      // For now, we assume user information is available in localStorage
      const userData = localStorage.getItem("user"); // Assuming you store user info in localStorage
      setUser(userData);
      console.log(userData);
    }
  }, []);

  const getInitial = (name) => {
    if(!name) return "U";
    return name.charAt(0).toUpperCase();
  }

  const handleNav = () => {
    setNav(!nav);
  };

  const togglePopup = () => {
    setShowLogin(!showLogin);
    setIsLogin(true);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    // Clear the user data and token on logout
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    setUser(null);
  };

  return (
    <div className="flex justify-between items-center h-24 w-full mx-auto px-20 text-white bg-black">
      <h1 className="w-full text-3xl font-bold text-[#00df9a]">RIGHT-RENTAL</h1>
      <ul className="hidden md:flex cursor-pointer">
        <li className="p-4" onClick={() => handleNavigation("/")}>Home</li>
        <li className="p-4 whitespace-nowrap" onClick={() => handleNavigation("/hire")}>Hire a Driver</li>
        <li className="p-4" onClick={() => handleNavigation("/partner")}>Partner</li>
        <li className="p-4" onClick={() => handleNavigation("/blog")}>Blog</li>
        <li className="p-4" onClick={() => handleNavigation("/about")}>About</li>
        <li className="p-4 whitespace-nowrap" onClick={() => handleNavigation("/contact")}>Contact Us</li>
        {!user ? (
          <li onClick={togglePopup} className="p-4 bg-[#00df9a] py-2 rounded-md text-lg">SignIn</li>
        ) : (
          <div className="flex items-center">
            <li 
                onClick={() => handleNavigation("/dashboard")}
                className="p-4 bg-[#00df9a] py-2 rounded-full text-lg flex items-center justify-center w-10 h-10 text-black">
                {getInitial(user)}
            </li>
            {/* <button onClick={handleLogout} className="ml-4 bg-red-500 p-2 rounded text-white">Logout</button> */}
          </div>
        )}
        {showLogin && (
          <LoginSignupToggle
            isLogin={isLogin}
            onClose={() => setShowLogin(false)}
            toggleMode={() => setIsLogin(!isLogin)}
          />
        )}
      </ul>
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "fixed left-[-100%]"
        }
      >
        <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">RIGHT-RENTAL</h1>
        <ul className="uppercase p-4 cursor-pointer">
          <li className="p-4" onClick={() => handleNavigation("/")}>Home</li>
          <li className="p-4 whitespace-nowrap" onClick={() => handleNavigation("/hire")}>Hire a Driver</li>
          <li className="p-4" onClick={() => handleNavigation("/partner")}>Partner</li>
          <li className="p-4" onClick={() => handleNavigation("/blog")}>Blog</li>
          <li className="p-4" onClick={() => handleNavigation("/about")}>About</li>
          <li className="p-4 whitespace-nowrap" onClick={() => handleNavigation("/contact")}>Contact Us</li>
          {!user ? (
            <li onClick={togglePopup} className="p-4 bg-[#00df9a] py-2 rounded-md text-lg">SignIn</li>
          ) : (
            <div className="flex items-center">
              <li
                onClick={() => handleNavigation("/dashboard")}
                className="p-4 bg-[#00df9a] py-2 rounded-full text-lg flex items-center justify-center w-10 h-10 text-black">
                {getInitial(user)}
            </li>
              {/* <button onClick={handleLogout} className="ml-4 bg-red-500 p-2 rounded text-white">Logout</button> */}
            </div>
          )}
          {showLogin && (
            <LoginSignupToggle
              isLogin={isLogin}
              onClose={() => setShowLogin(false)}
              toggleMode={() => setIsLogin(!isLogin)}
            />
          )}
        </ul>
      </div>
    </div>
  );
};