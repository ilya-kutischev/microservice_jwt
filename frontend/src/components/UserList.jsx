import React, {useEffect, useState} from 'react';
import User from "./User";
import axios from 'axios'
import "../styles/UserList.css"

const UserList = () => {
    const [users, setUsers] = useState([])
    const getUsers = async () => {
        const response = await axios.get('http://localhost:8000/users/');
        setUsers(response.data);
    }
    useEffect( () => {
        getUsers();
    }, [users])

    return (
        <div className='userList'>

            {users.map(el => <User key={el.id} {...el}/>)}

        </div>
    );
};

export default UserList;