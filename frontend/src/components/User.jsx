import React from 'react';
import '../styles/User.css'
const User = ({id, email, openUser}) => {
    return (
        <div className='user'>
            <h3> {id}. {email} </h3>
            <button className='open-btn' onClick={openUser}>Открыть</button>
        </div>
    );
};

export default User;