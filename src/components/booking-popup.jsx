import React, { useState } from 'react';
import { LoginPop } from './login-pop';
import { SignUpPop } from './signup-pop';

export const LoginSignupToggle = ({ onClose }) => {
  const [showLogin, setShowLogin] = useState(true);  // Default to login initially

  const toggleSignUp = () => {
    setShowLogin(false);  // Switch to signup
  };

  const toggleLogin = () => {
    setShowLogin(true);  // Switch to login
  };

  const closeAll = () => {
    onClose();  // Close all modals and reset state in parent (Navbar)
  };

  return (
    <>
      {showLogin && <LoginPop onClose={closeAll} toggleSignUp={toggleSignUp} />}
      {!showLogin && <SignUpPop onClose={closeAll} toggleLogin={toggleLogin} />}
    </>
  );
};
