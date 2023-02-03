import React from 'react';
import SignInForm from "../components/SignInForm";

const SignInPage = ({signin}) => {
    return (
        <div className='form__wrapper'>
            <h3>Sign In</h3>
            <SignInForm signin={signin}/>
        </div>
    );
};

export default SignInPage;