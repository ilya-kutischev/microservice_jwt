import React, {useEffect, useState} from 'react';
import User from "./User";
import axios from 'axios'
import "../styles/UserList.css"

const UserList = ({users, setUsers, token}) => {

    const [curUser, setCurUser] = useState(null)
    const getUsers = async () => {
        const response = await axios.get('http://localhost:8000/users/');
        setUsers(response.data);
    }
    useEffect( () => {
        console.log('effect')
        getUsers();
    }, [])
    const getUserByToken = async (token) => {
        if (token) {
            const response = await axios.get('http://localhost:8000/user?token=' + token);
            console.log(response)
            setCurUser(response.data.id)
        }
    }
    useEffect(()=> {
        getUserByToken(token)
    },[token])
    return (
        <div className='userList'>
            {users.map(el => curUser===el.id ? <User key={el.id} {...el} token={token}/> : <User key={el.id} {...el} token=''/>)}
        </div>
    );
};

export default UserList;