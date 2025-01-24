import { useState, useRef } from 'react';
import AuthSignupOrLogin from './AuthSignupOrLogin.jsx';
import JavascriptLogic from './Logics/Javascript.js';
import './Auth.css';

const Signup = () => {
  const containerLoginRef = useRef(null);
  const containerSignupRef = useRef(null);

  const { handleLoginEvent, handleSignupEvent } = JavascriptLogic({
    containerLoginRef,
    containerSignupRef,
  });

  // Centralized state for both forms
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="signup-container-box">
      <AuthSignupOrLogin
        pageTitle="Login"
        pageGrandParent="signup-container-login"
        inputTypes={{
          email: 'email',
          password: 'password',
        }}
        containerLSRef={containerLoginRef}
        handleEvents={handleLoginEvent}
        formData={formData} // Pass centralized state
        handleChange={handleChange} // Pass handler
      />
      <AuthSignupOrLogin
        pageTitle="Signup"
        inputTypes={{
          username: 'text',
          email: 'email',
          password: 'password',
          confirmPassword: 'password',
        }}
        containerLSRef={containerSignupRef}
        handleEvents={handleSignupEvent}
        formData={formData} // Pass centralized state
        handleChange={handleChange} // Pass handler
      />
    </div>
  );
};

export default Signup;
