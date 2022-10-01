import React, { useRef, useState } from 'react'
import firebase from './config'


const App = () => {
 const numberRef = useRef();
 const codeRef = useRef()
 const configureCaptcha = () =>{
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.onSignInSubmit();
        console.log("Recaptca varified")
      },
      defaultCountry: "IN"
    });
  }
 const onSignInSubmit = (e) => {
    e.preventDefault()
    configureCaptcha()
    const phoneNumber = "+919145298086"
    
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
         
          window.confirmationResult = confirmationResult;
          console.log("OTP has been sent")
          // ...
        }).catch((error) => {
          // Error; SMS not sent
          // ...
          console.log("SMS not sent")
        });
  }
const  onSubmitOTP = (e) =>{
    e.preventDefault()
    const code = "685786"
    console.log(code)
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(JSON.stringify(user))
      alert("User is verified")
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }
  return (
   
       <div>
        <h2>Login Form</h2>
        <form onSubmit={onSignInSubmit}>
          <div id="sign-in-button"></div>
          <input type="number" name="mobile" placeholder="Mobile number" required ref={numberRef} />
          <button type="submit">Submit</button>
        </form>

        <h2>Enter OTP</h2>
        <form onSubmit={onSubmitOTP}>
          <input type="number" name="otp" placeholder="OTP Number" required ref={codeRef} />
          <button type="submit">Submit</button>
        </form>
      </div>
 
  )
}

export default App