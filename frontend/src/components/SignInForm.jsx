import React, {useState} from 'react';
import '../styles/Forms.css'
import axios from "axios";


const SignInForm = ({signin}) => {
    const success = 'successfull signin';
    const [user, setUser] = useState({
        'username': '',
        'password': ''
    })
    const [message, setMessage] = useState('')
    const signInUser = async (e) => {
        e.preventDefault();
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
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                />
            </label>
            <div className='btn-mes'>
                <button
                    className='form-btn'
                    onClick={signInUser}
                >Sign in
                </button>
                <p className='message' style={{color: message===success ? 'green': 'red'}}>{message}</p>
            </div>
        </form>
    );
};

export default SignInForm;