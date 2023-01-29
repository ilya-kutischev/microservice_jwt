import React, {useState} from 'react';
import '../styles/Forms.css'
import axios from "axios";
import addUser from '../components/UserList.jsx'
const LoginForm = () => {
    const [user, setUser] = useState({'email': '', 'password': ''})
    const [message, setMessage] = useState('')
    const loginUser = async (e) => {
        e.preventDefault();
        setMessage('')
        axios.post('http://localhost:8000/users/', user).catch(er=> {
            setError(er.response.data.detail)
        })
        setUser({email: '', password: ''})
        setSuccess();


    }

    const setSuccess = () => {

        setMessage('successfull login')
    }

    const setError = (m) => {
        setMessage(m)
    }
    return (
        <form className='login-form form'>
            <label>
                Email:
                <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                />
            </label>
            <div className='btn-mes'>
                <button
                    className='form-btn'
                    onClick={loginUser}
                >Login</button>
                <p className='login-message' style={{color: message==='successfull login' ? 'green': 'red'}}>{message}</p>
            </div>


        </form>
    );
};

export default LoginForm;