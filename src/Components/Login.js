import React, { useState } from "react";
import { setUser } from "../Redux/authSlice";
import { useDispatch } from "react-redux";
import axios from 'axios';
import Img from "./pHilMckacking (1).png";
import './Login.css'

import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
    
        try {
            const response = await axios.post('https://backendma-2.onrender.com/api/login', {
                email,
                password,
            });
    
            console.log('Login response:', response); 
            console.log('Response data:', response.data);
    
            if (response.data) {
                dispatch(setUser({ email }));
                navigate('/');
            } else {
                console.error('Login failed: No data in response');
            }
    
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response);
            } else {
                console.error('Error:', error.message);
            }
        }
    };
    

    return (
        <div className="login">
            <div className="login__page">
                <div>
                    <img className="login__logo" src={Img} alt="Logo" />
                </div>
                <div className="login__content">
                    <h2>
                        <b>Login</b>
                    </h2>
                    <p>Welcome</p>

                    <input
                        type="email"
                        id="email"
                        value={email}
                        name="email"
                        placeholder="Enter Email"
                        className="login__input"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        placeholder="Enter Password"
                        className="login__input"
                        minLength="6"
                        required
                    />
                    <p>
                        <b><i>
                            <Link className="login__forgot-txt" to="/forgotpassword">
                                Forgot Password?
                            </Link>
                        </i></b>
                    </p>
                    <button type="submit" className="login__btn" onClick={handleLogin}>
                        Login
                    </button>
                    <>
                        <p><br />
                            Don't have an account?
                            <b>
                                <Link to="/register"><i>Register here!</i></Link>
                            </b>
                        </p>
                    </>
                </div>
            </div>
        </div>
    );
};

export default Login