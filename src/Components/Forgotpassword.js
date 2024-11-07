import Img from "./pHilMckacking (1).png";
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import './forgotpassword.css'


const Forgotpassword = () => {
    const [email, setEmail] = useState('');
    const [message] = useState(null);
    const [loading] = useState(false);


    const handlePasswordReset = async (email) => {
        try {
            const response = await axios.post('https://backendma-2.onrender.com/api/reset-password', {
                email,
            });
            console.log('Password Reset Email Sent:', response.data);
        } catch (error) {
            console.error('Reset Password Error:', error.response.data);
        }
    };

    return (
        <div className="Forgot">
            <div><img className="forgotpassword__logo" src={Img} alt="Logo" /></div>
            <div className="forgotpassword__page">
                <div className="forgotpassword__content">
                    <h2><b>Forgot Your Password</b></h2><br />
                    <p>Enter the email address associated with your account to reset your password</p><br />
                    {message && <p className="forgotpassword__success">{message}</p>}
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter Email"
                        className="forgotpassword__input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className="forgotpassword__btn" disabled={loading} onClick={handlePasswordReset}>
                        {loading ? 'Sending...' : 'Reset Password'}
                    </button>
                    <br />
                    <p>Remember your password?<i><Link to="/">Login</Link></i></p>
                </div>
            </div>
        </div>
    );
};

export default Forgotpassword;