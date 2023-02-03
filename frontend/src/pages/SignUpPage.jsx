import React from 'react';
import SignUpForm from "../components/SignUpForm";

const SignUpPage = ({addUser}) => {
    return (
        <div>
            <SignUpForm addUser={addUser}></SignUpForm>
        </div>
    );
};

export default SignUpPage;