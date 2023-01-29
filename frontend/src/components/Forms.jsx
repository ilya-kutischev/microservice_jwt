import React from 'react';
import '../styles/Forms.css'
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
const Forms = () => {
    return (
        <div className='forms'>
            <LoginForm/>
            <SignUpForm/>
        </div>
    );
};

export default Forms;