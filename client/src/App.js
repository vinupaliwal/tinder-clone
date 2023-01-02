
import { useState } from 'react';
import './App.css';
import {GoogleLogin} from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import instance from './components/axios';
import './components/Login.css';
import {GoogleOAuthProvider} from '@react-oauth/google';
import Header from './components/Header';
import SwipeButtons from './components/SwipeButtons';
import TinderCards from './components/TinderCards';


function App() {
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  );

  const Login=()=>{
    const onSigninSuccess = async(userCredentialResponse) => {
      alert("You have been logged in successfully");
      console.log(userCredentialResponse);
      var decoded = jwt_decode(userCredentialResponse.credential);
      console.log(decoded);
      // console.clear();
      console.log(decoded.email);
      const user = {
          email:decoded.email,
          name:decoded.name,
          profilePicture:decoded.picture
      }
      console.log(user);
      try{
          const res = await instance.post("/register",user);
          setLoginData(res.data);
          localStorage.setItem('loginData', JSON.stringify(res.data));
          console.log(res.data);
      }catch(err){
         console.log(err);
      }
  };
  return (
    <div className="login">
      <div className='login-logo'>
         <img src='https://1000logos.net/wp-content/uploads/2018/07/Tinder-logo-768x432.png' alt=''/>
      </div>
       <GoogleLogin
          onSuccess={onSigninSuccess}
          onError={() => {
            console.log('Login Failed');
          }}
        /> 
      <button className="MuiButtonBase-root MuiButton-root MuiButton-text" tabindex="0" type="submit">
         <span className="MuiButton-label" onClick={()=>setLoginData({email:"vinup3431@gmail.com"})}>Demo login</span><span class="MuiTouchRipple-root"></span>
      </button>
    </div>
  );
  }
  return (
    <div className="App">
    { !loginData?(
    <GoogleOAuthProvider clientId="1025198237355-ppv8l3tei7obopkkstognqmdstsam3ft.apps.googleusercontent.com">
        <Login/>
    </GoogleOAuthProvider>
    ):( <>
      <Header user={loginData} />
      <TinderCards/>
      <SwipeButtons/>
    </>)
    }
    
    </div>
  );
}

export default App;

// clinetId = 1025198237355-ppv8l3tei7obopkkstognqmdstsam3ft.apps.googleusercontent.com
