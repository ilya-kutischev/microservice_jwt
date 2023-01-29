import React from 'react';
import '../styles/App.css'

const UserDetail = ({signout}) => {
    return (
        <div className='signed-user'>
            <h3>Hello, (find user) NAME</h3>
            <button className='signout-btn' onClick={signout}>Sign Out</button>
        </div>
    );
};

export default UserDetail;