import React, {useState} from 'react';
import '../styles/Forms.css'
import axios from "axios";

const LoginForm = ({addUser}) => {
    const success = 'successfull login';
    const [user, setUser] = useState({'email': '', 'password': ''})
    const [message, setMessage] = useState('')
    const loginUser = async (e) => {
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
                    onClick={loginUser}
                >Login</button>
                <p className='message' style={{color: message===success ? 'green': 'red'}}>{message}</p>
            </div>
        </form>
    );
};

export default LoginForm;