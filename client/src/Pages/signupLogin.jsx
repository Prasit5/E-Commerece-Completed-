import React, { useState } from 'react'
import './CSS/signupLogin.css'
export const SignupLogin = () => {

  const [state, setState] = useState("Login");
  const [formData,setFormData] = useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler = (e)=>{
      setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login = async () =>{
    console.log("Login Function executed", formData);

    let responseData;

    await fetch('https://server-6o7b.onrender.com/login', {
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token)
      window.location.replace("/");
    }
    else{
      alert(responseData.errors)
    }
  }

  const signup = async () =>{
    console.log("Sign up Function executed", formData);
    let responseData;

    await fetch('https://server-6o7b.onrender.com/signup', {
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token)
      window.location.replace("/");
    }
    else{
      alert(responseData.errors)
    }
  }


  return (
    <div className='signupLogin'>
        <div className="signupLoginContainer">
            <h1>{state}</h1>
            <div className="signupLoginFields">
                {state==="Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type='text' placeholder='Your Name' />:<></>}
                <input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='Email Address' />
                <input name='password' value={formData.password} onChange={changeHandler} type='password' placeholder='Password' />
            </div>
            <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
            {state==="Sign Up"
            ?<p className='signupLoginLogin'>Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span></p>
            :<p className='signupLoginLogin'>Create an account <span onClick={()=>{setState("Sign Up")}}> Click here</span></p>}
            <div className="signupLoginAgree">
            <input type='checkbox' name='' id='' />
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
            </div>
        </div>
    </div>
  )
}

export default SignupLogin
