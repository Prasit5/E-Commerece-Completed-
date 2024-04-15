import React from 'react'
import './CSS/signupLogin.css'
export const signupLogin = () => {
  return (
    <div className='signupLogin'>
        <div className="signupLoginContainer">
            <h1>Sign Up</h1>
            <div className="signupLoginFields">
                <input type='text' placeholder='Your Name' />
                <input type='email' placeholder='Email Address' />
                <input type='password' placeholder='Password' />
            </div>
            <button>Continue</button>
            <p className='signupLoginLogin'>Already have an account? <span>Login here</span></p>
            <div className="signupLoginAgree">
            <input type='checkbox' name='' id='' />
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
            </div>
        </div>
    </div>
  )
}

export default signupLogin
