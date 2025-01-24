import { useState, useEffect } from 'react';

export default function Javascript({ containerLoginRef, containerSignupRef }) {
 const [loginPop, setLoginPop] = useState(false);
 const [SignupPop, setSignupPop] = useState(true);
 
 function handleLoginEvent() {
   setLoginPop(true);
   setSignupPop(false);
 }
 function handleSignupEvent() {
   setLoginPop(false);
   setSignupPop(true);
 }

useEffect(()=>{
    const containerLogin = containerLoginRef.current;
    const containerSignup = containerSignupRef.current;
    
    const h2FromLogin = containerLoginRef.current.querySelector('h2');
    const LoginForm = containerLoginRef.current.querySelector('form');
    const LoginSignupBox = containerLoginRef.current.querySelector('.signup-box');
    
    const h2FromSignup = containerSignupRef.current.querySelector('h2');
    const SignupForm = containerSignupRef.current.querySelector('form');
    const SignSignupBox = containerSignupRef.current.querySelector('.signup-box');
    
    console.log('inside of useEffect')
    
  if (loginPop) {
    setTimeout(function() {
     containerLogin.style.transform = 'rotate(0deg)';
    }, 500);
    setTimeout(function() {
      LoginSignupBox.style.padding = '20px 40px';
    }, 800);
    containerLogin.style.zIndex = '10';
    containerLogin.style.top = '20%';
    containerLogin.style.left = '100%';
    LoginForm.style.opacity = '1';
    setTimeout(function() {
    containerLogin.style.left = '0';
    }, 200);
    h2FromLogin.style.transform = 'rotate(0deg)';
    h2FromLogin.style.boxShadow = 'none';
    setTimeout(function() {
      h2FromLogin.style.letterSpacing = '5px';
    }, 500);
  } else {
    setTimeout(function() {
     containerLogin.style.transform = 'rotate(180deg)';
    }, 500);
    setTimeout(function() {
      LoginSignupBox.style.padding = '20px';
    }, 800);
    containerLogin.style.zIndex = '1';
    containerLogin.style.top = '42%';
    containerLogin.style.left = '-100%';
    LoginForm.style.opacity = '0';
    setTimeout(function() {
    containerLogin.style.left = '0';
    }, 200);
    h2FromLogin.style.transform = 'rotate(180deg)';
    h2FromLogin.style.boxShadow = '1px 1px 5px #ececec';
    setTimeout(function() {
      h2FromLogin.style.letterSpacing = '1px';
    }, 500);
  }
   if (SignupPop) {
    setTimeout(function() {
     containerSignup.style.transform = 'rotate(0deg)';
    }, 500);
    setTimeout(function() {
      SignSignupBox.style.padding = '20px 40px';
    }, 800);
    containerSignup.style.zIndex = '10';
    containerSignup.style.top = '8%';
    containerSignup.style.left = '100%';
    SignupForm.style.opacity = '1';
    setTimeout(function() {
    containerSignup.style.left = '0';
    }, 200);
    
     h2FromSignup.style.transform = 'rotate(0deg)';
     h2FromSignup.style.boxShadow = 'none';
     setTimeout(function() {
      h2FromSignup.style.letterSpacing = '5px';
     }, 500);
    
  } else {
    setTimeout(function() {
     containerSignup.style.transform = 'rotate(180deg)';
    }, 500);
    setTimeout(function() {
      SignSignupBox.style.padding = '20px';
    }, 800);
    containerSignup.style.zIndex = '1';
    containerSignup.style.top = '15%';
    containerSignup.style.left = '-100%';
    SignupForm.style.opacity = '0';
    setTimeout(function() {
    containerSignup.style.left = '0';
    }, 200);
    h2FromSignup.style.transform = 'rotate(180deg)';
    h2FromSignup.style.boxShadow ='1px 1px 5px #ececec';
    setTimeout(function() {
      h2FromSignup.style.letterSpacing = '1px';
    }, 500);
  }
  
}, [loginPop, SignupPop]);

  return { handleLoginEvent, handleSignupEvent };
}