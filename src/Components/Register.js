
import React, { useState, } from "react";
import { Link } from "react-router-dom";
import Img from "./pHilMckacking (1).png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/authSlice';
import axios from 'axios';
import './Register.css'


const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");


    const handleSignUp = async (event) => {
        event.preventDefault();
        if (password !== confirmpassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            const response = await axios.post('https://backendma-2.onrender.com/api/signup', {
                email,
                password,
                firstName: name,
            });
            console.log('Sign Up Successful:', response.data);
    
            dispatch(setUser({ name, email }));
            console.log('User state updated');
    
            navigate('/');
            console.log('Navigated to home'); 
        } catch (error) {
            if (error.response) {
                console.error('Sign Up Error:', error.response.data);
            } else {
                console.error('Sign Up Error:', error.message);
            }
        }
    };
    
    console.log({ email, password, firstName: name });

    return (
        <div className="register">
            <div className="register__page">
                <div>
                    <img className="register__logo" src={Img} alt="Logo" />
                </div>
                <div className="Register__content">
                    <h2>
                        <b>Register</b>
                    </h2>
                    <p>Create an account Today</p>

                    <input
                        onChange={(e) => {
                            setname(e.target.value);
                        }}
                        type="text"
                        id="text"
                        name="name"
                        value={name}
                        placeholder="Enter firstName"
                        className="register__input"
                        required
                    />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        placeholder="Enter Email"
                        className="register__input"
                        required
                        onChange={(e) => {
                            setemail(e.target.value);
                        }}
                    />
                    <input
                        value={password}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter Password"
                        className="register__input"
                        minLength="6"
                        required
                        onChange={(e) => {
                            setpassword(e.target.value);
                        }}
                    />
                    <input
                        value={confirmpassword}
                        type="password"
                        id="Confirm password"
                        name="Confirm password"
                        placeholder="Confirm Password"
                        className="register__input"
                        minLength="6"
                        required
                        onChange={(e) => {
                            setconfirmpassword(e.target.value);
                        }}
                    />
                    <button
                        type="submit"
                        className="Register__btn"
                        onClick={handleSignUp}
                    >
                        Create Account
                    </button>

                    <p><br />
                        Already have an account?
                        <b>
                            <i>
                                <Link to="/">Login here!</Link></i>
                        </b>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;