import React, {useState} from 'react';
import '../styles/Forms.css'
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";


const SignInForm = ({signin}) => {
    const success = 'successfull signin';
    const [user, setUser] = useState({
        'username': '',
        'password': ''
    })
    const [message, setMessage] = useState('')


    const navigate = useNavigate()


    const validateEmail = (email) => {
        if (email==='') {
            return false
        }
        return true;
    }
    const validatePassword = (pass) => {
        if (pass==='') {
            return false
        }
        return true;
    }


    const validateForm = () => {
        if (!validateEmail(user.email)) {
            return {status : false, message: 'bad email'}
        }
        if (!validatePassword(user.password)) {
            return {status : false, message: 'bad password'}
        }
        return {status: true}
    }
    const signInUser = async (e) => {
        e.preventDefault();
        const validation = validateForm()
        console.log(validation)
        if (!validation.status) {
            setError(validation.message)
            return;
        }
        setMessage('')
        try {
            const response = await axios.post('http://localhost:8000/token', user,
                {
                    'headers':
                        {"Content-Type": "multipart/form-data"}
                })
            console.log(response)
            signin(response.data.access_token)
            setSuccess()
            navigate('/')

        } catch (er) {
            console.log(er)
            setError(er.response.data.detail)
        }
    }

    const setSuccess = () => {
        setMessage(success)
    }

    const setError = (m) => {
        setMessage(m)
    }

    return (
        <form className='form'>
            <label>
                Email:
                <input
                    type="email"
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                />
            </label>
            <label>
                Password:
                <input
                    required
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                />
            </label>
            <div className='btn-mes'>
                <button
                    className='form-btn'
                    onClick={signInUser}
                >Sign in</button>
                <p className='message' style={{color: message===success ? 'green': 'red'}}>{message}</p>
            </div>
            <div className='toggle-form'>
                <p>No account?</p>
                <Link to='/signup'>Sign up</Link>
            </div>
        </form>
    );
};

export default SignInForm;