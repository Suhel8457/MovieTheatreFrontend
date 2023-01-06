/* eslint-disable no-undef */
import React, { useState } from 'react'
import axios from 'axios';
import '../styleslogin/entire.css';
import baseUrl from '../environment/baseUrl';
import LandingPage from '../landingPage/LandingPage';
import Settings from '../settingslogin/Settings';
// import Header from './Header';
import SignUpAdmin from '../signUp/SignUpAdmin';
import SignUpUser from '../signUp/SignUpUser';
import { Link, Navigate, useHistory, useNavigate } from 'react-router-dom';






const LogIn = () => {



    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(null);

    function handleInput(e) {
        // Validating Email
        setEmail(e.target.value);
        var x = document.getElementById("email");
        var pass = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (x.value.match(pass)) {
            document.getElementById("emailLabel").innerHTML = "";
        }
        else {
            document.getElementById("emailLabel").innerHTML = "Please enter valid email address";
            x.value = '';
            document.getElementById("email").focus();
        }






    }
    function handleInput1(e) {
        setPassword(e.target.value);
        // Validating password
        var y = document.getElementById("password");
        if (y.value.length == 0) {
            document.getElementById("passwordLabel").innerHTML = "Password is required"
        }
        else {
            document.getElementById("passwordLabel").innerHTML = "";
        }
    }

    // Comparing the Email and Password entered by the user with database data.
    async function log(e) {


        const response = await axios.get(`${baseUrl}/user/${email}/${password}`);
        const response1 = await axios.get(`${baseUrl}/user/settings/${email}/${password}`);
        console.log(response1.data.code);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("code", response1.data.code);

        if (response.data === false || response.data === null) {
            document.getElementById("logInAlert").innerHTML = "Invalid Email/Password";
        }
        else {
            if (response1.data.role === "ADMIN") {
                navigate("/adminlandingpage");
            }
            else {
                navigate("/mainUser");
            }

        }

    }


    const handleSubmit = (e) => {
        e.preventDefault();
    }

    //JSX element
    return (
        <div className='signup-up'>
            <div className='signup-user-container '>
                <div className='buttons'>
                    <button type="submit" className='first'><a href="/">Sign in</a></button>
                    <button type="submit" className='second'><a href="/registerUser">Sign up</a></button>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='login'>
                        <div className='email'>
                            <div className='flex-item-single'>
                                <label htmlFor='email' id='emailLabel'>Email</label><br />
                                <input type="text" className="email" name='email' id='email' autoComplete='off' onBlur={(e) => handleInput(e)} />                            </div>
                            <label id='emailLabel' style={{ color: "red" }}></label>
                            <label id="emailLabel1" ></label>
                        </div>
                        <div className='password'>
                            <div className='flex-item-single'>
                                <label htmlFor='password' id='passwordLabel'>Password</label><br />
                                <input type="password" className="password" name='password' id='password' autoComplete='off' onBlur={(e) => handleInput1(e)} />
                            </div><label id='passwordLabel' style={{ color: "red" }}></label>
                        </div>
                        <div id="forgetDiv">
                            <a href="/forgetPassword" id='forgetStyle'>forgot password?</a><br />
                            <button className='login-submit' type="submit" onClick={(e) => log(e)}>Log in</button>
                        </div>
                    </div>
                    <div id='logInAlert' style={{ color: "red" }}></div>
                </form>


            </div>
        </div>
    )

}

export default LogIn;

