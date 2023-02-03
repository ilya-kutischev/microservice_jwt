import React from 'react';
import SignInForm from "../components/SignInForm";

const SignInPage = ({signin}) => {
    return (
        <div>
            < SignInForm signin={signin}/>
        </div>
    );
};

export default SignInPage;