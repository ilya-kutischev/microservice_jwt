import React, {useState} from 'react';
import '../styles/Forms.css'
import axios from "axios";
import {Link} from 'react-router-dom'

const SignUpForm = ({addUser}) => {
    const success = 'successfull signup';
    const [user, setUser] = useState({'email': '', 'password': ''})
    const [message, setMessage] = useState('')
    const signUpUser = async (e) => {
        e.preventDefault();
        setMessage('')
        try {
            const response = await axios.post('http://localhost:8000/users/', user)
            addUser(response.data)
            setUser({email: '', password: ''})
            setSuccess();
        }
        catch (er) {
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
                    onClick={signUpUser}
                >Sign up</button>
                <p className='message' style={{color: message===success ? 'green': 'red'}}>{message}</p>
            </div>
            <div className='toggle-form'>
                <p>Have an account?</p>
                <Link to='/signin'>Sign in</Link>
            </div>
        </form>
    );
};

export default SignUpForm;