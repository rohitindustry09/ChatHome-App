import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function AuthSignupOrLogin({ pageTitle, pageGrandParent, inputTypes, containerLSRef, handleEvents, formData, handleChange }) {
  
    const navigate = useNavigate();
    const BackendLink = useSelector((state)=> state.backendLink.BackendLink);
  const handleSubmit = async (e) => {
  e.preventDefault();
  const inputTypeKeys = Object.keys(inputTypes);
  const formDataKeys = Object.keys(formData);

  // Find common keys
  const commonKeys = inputTypeKeys.filter((key) => formDataKeys.includes(key));

  // Check for 'password' and 'confirmPassword'
  if (commonKeys.includes('password') && commonKeys.includes('confirmPassword')) {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
    } else {
      try {
        const response = await axios.post(`${BackendLink}/api/user`, formData);
        if (response && response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          navigate('/');
          console.log('response getted : ', response.data.user);
        }
      } catch(error) {
          console.error('Error occurred:', error.response?.data || error.message);
        alert(error.response?.data?.error || 'Something went wrong. Please try again.');
       }
      
    }
  }
  // Check for 'email' and 'password' (Login form)
  else if (commonKeys.includes('email') && commonKeys.includes('password')) {
   // console.log('called for login')
      try {
        const response = await axios.post(`${BackendLink}/api/user`, { email: formData.email, password: formData.password });
        if (response && response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          navigate('/');
          console.log('response getted : ', response.data.user);
        }
      } catch(error) {
          console.error('Error occurred:', error.response?.data || error.message);
        alert(error.response?.data?.error || 'Something went wrong. Please try again.');
       }
  } else {
     alert('Invalid form data');
  }
};


  return (
    <>
      <div
        className={`signup-container signup-container-2 ${pageGrandParent}`}  
        onClick={handleEvents}
        ref={containerLSRef}
      >
        <div className="signup-box">
          <h2>{pageTitle}</h2>
          <form onSubmit={handleSubmit}>
            {Object.entries(inputTypes).map(([key, value]) => (
              <div className="input-field" key={key}>
                <label htmlFor={key}>{key}</label>
                <input
                  type={value}
                  id={key}
                  name={key}
                  value={formData[key]} 
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
            <button type="submit" className="btn-signup">
              {pageTitle}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
