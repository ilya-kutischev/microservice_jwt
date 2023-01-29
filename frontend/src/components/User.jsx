import React from 'react';
import '../styles/User.css'
import NoteList from "./NoteList";
const User = ({id, email, token}) => {
    return (
        <div className='user'>
            <h3> {id}. {email} </h3>
            {
                token
                ? <NoteList token={token}/>
                : <></>
            }

            {/*<button className='open-btn' onClick={openUser}>Открыть</button>*/}
        </div>
    );
};

export default User;