import React, {useState} from "react";
import Cookies from 'universal-cookie';
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import './styles/Forms.css'
import './styles/App.css'
import UserDetail from "./components/UserDetail";
import NoteList from "./components/NoteList";

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
                <SignUpForm addUser={addNewUser}/>
                {
                    token
                    ? <UserDetail signout={signout}/>
                    : <SignInForm signin={signin}/>
                }
            </div>
            {token
                ? <NoteList token={token}/>
                : <h3>Not authenticated</h3>
            }

            {/*<UserList users={users} setUsers={setUsers} token={token}/>*/}
        </div>
    );

}

export default App;
