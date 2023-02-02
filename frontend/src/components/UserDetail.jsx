import React, {useEffect, useState} from 'react';
import '../styles/App.css'
import axios from "axios";

const UserDetail = ({signout}) => {
    const [user, setUser] = useState({})
    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user');
            setUser(response.data)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getUser()
    },[])
    return (
        <div className='signed-user'>
            <h3>Hello, {user.email}</h3>
            <button className='signout-btn' onClick={signout}>Sign Out</button>
        </div>
    );
};

export default UserDetail;