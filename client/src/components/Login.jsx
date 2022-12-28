import React, { useState } from 'react';
import {GoogleLogin,googleLogout} from '@react-oauth/google';
// import {useGoogleLogin} from '@react-oauth/google';
import axios from "axios"
import jwt_decode from "jwt-decode";
import './Login.css';
import Home from './Home';
import { Navigate} from 'react-router-dom';
import instance from './axios';

function Login() {
    const [showloginButton, setShowloginButton] = useState(true);
    const [showlogoutButton, setShowlogoutButton] = useState(false);
    const [email, setEmail] = useState("");
    // const login = useGoogleLogin({
    //     onSuccess: async respose => {
    //         try {
    //             const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
    //                 headers: {
    //                     "Authorization": `Bearer ${respose.access_token}`
    //                 }
    //             })
    //             console.log(res.data)
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
    // });
    
    const onSigninSuccess = async(userCredentialResponse) => {
        alert("You have been logged in successfully");
        console.log(userCredentialResponse);
        var decoded = jwt_decode(userCredentialResponse.credential);
        console.log(decoded);
        // console.clear();
        setEmail(decoded.email);
        console.log(email);
        setShowloginButton(false);
        setShowlogoutButton(true);
        const user = {
            email:decoded.email,
            name:decoded.name,
            profilePicture:decoded.picture
        }
        try{
            const res = await instance.post("/register",user);
            console.log(res.data);
        }catch(err){
           console.log(err);
        }
    };
    const onSignoutSuccess = () => {
                googleLogout()
                alert("You have been logged out successfully");
                // console.clear();
                setShowloginButton(true);
                setShowlogoutButton(false);
            };
    
    console.log(showloginButton);
    return (
        <div className="login">
          <div className='login-logo'>
             <img src='https://1000logos.net/wp-content/uploads/2018/07/Tinder-logo-768x432.png' alt=''/>
          </div>
          {/* <button className="MuiButtonBase-root MuiButton-root MuiButton-text" tabindex="0" type="submit">
             <span className="MuiButton-label">Sign In</span><span class="MuiTouchRipple-root"></span>
          </button> */}
           <GoogleLogin
                  onSuccess={onSigninSuccess}
                  onError={() => {
                    console.log('Login Failed');
                  }}
            /> 
          <button className="MuiButtonBase-root MuiButton-root MuiButton-text" tabindex="0" type="submit">
             <span className="MuiButton-label">Demo login</span><span class="MuiTouchRipple-root"></span>
          </button>
            <header className="App-header">
                {/* <button onClick={login}>
                    <i class="fa-brands fa-google"></i>
                    Continue with google
                </button> */}
               
               { showlogoutButton ? <Navigate to={`/home/${email}`}/>
                : null }

            </header>
        </div>
    );
}

export default Login;