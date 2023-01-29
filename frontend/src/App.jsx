import UserList from "./components/UserList";
import React, {useState} from "react";
import Cookies from 'universal-cookie';
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import './styles/Forms.css'
import './styles/App.css'
import UserDetail from "./components/UserDetail";

function App() {
    const cookies = new Cookies();
    const [users, setUsers] = useState([{id: 0, email: '', password: ''}])
    const maxAge = 3023;
    const [token, setToken] = useState(cookies.get('access_token') || '')
    const addNewUser = (newUser) => {
        setUsers([...users, newUser])
    }

    const signin = (tok) => {
        cookies.set("access_token", tok, {maxAge: maxAge})
        setToken(tok)
    }

    const signout = () => {
        cookies.remove('access_token')
        setToken('')
    }

    return (
        <div className='app'>
            <div className='forms'>
                <LoginForm addUser={addNewUser}/>
                {
                    token
                    ? <UserDetail signout={signout}/>
                    : <SignUpForm signin={signin}/>
                }
            </div>
            <UserList users={users} setUsers={setUsers} token={token}/>
        </div>
    );

}

export default App;
