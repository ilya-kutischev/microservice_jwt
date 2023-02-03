import React, {useState} from "react";
import Cookies from 'universal-cookie';
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
// import './styles/Forms.css'
import './styles/App.css'
import UserDetail from "./components/UserDetail";
import NoteList from "./components/NoteList";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import NotesPage from "./pages/NotesPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import Header from "./components/Header";

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
        <div className='page'>
            <BrowserRouter>
                <Header token={token} signout={signout}></Header>
                <div className='main__content'>
                    <Routes>
                        <Route path='' element={<NotesPage token={token}/>}/>
                        <Route path='/signup' element={<SignUpPage addUser={addNewUser}/>}/>
                        <Route path='/signin' element={<SignInPage signin={signin}/>}/>
                        <Route path='*' element={<NotesPage token={token}/>}/>
                    </Routes>
                </div>

            </BrowserRouter>
        </div>
        // <div className='app'>
        //     <div className='forms'>
        //         <SignUpForm addUser={addNewUser}/>
        //         {
        //             token
        //             ? <UserDetail signout={signout}/>
        //             : <SignInForm signin={signin}/>
        //         }
        //     </div>
        //     {token
        //         ? <NoteList token={token}/>
        //         : <h3>Not authenticated</h3>
        //     }
        // </div>
    );

}

export default App;
