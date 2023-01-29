import React from 'react';
import '../styles/Forms.css'
const SignUpForm = () => {
    return (
        <form className='signup-form form'>
            <label>
                Email:
                <input type="email"/>
            </label>
            <label>
                Password:
                <input type="password"/>
            </label>
            <button className="form-btn">Sign in</button>
        </form>
    );
};

export default SignUpForm;