import React from 'react';
import SignUpForm from "../components/SignUpForm";
import '../styles/Forms.css'

const SignUpPage = ({addUser}) => {
    return (
        <div className='form__wrapper'>
            <h3>Sign Up</h3>
            <SignUpForm addUser={addUser}></SignUpForm>
        </div>
    );
};

export default SignUpPage;