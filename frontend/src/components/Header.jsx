import React, {useEffect, useState} from 'react';
import '../styles/Header.css'
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
const Header = ({token, signout}) => {

    const navigate = useNavigate()
    const info = useLocation()
    const [toggleBtn, setToggleBtn] = useState('')

    const [user, setUser] = useState({})
    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user');
            setUser(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        setToggleBtn(info.pathname)
        if (token!=='') {
            getUser()
        }
    },[token])

    function handleSignUp(e) {
        e.preventDefault();
        navigate('/signup')
        setToggleBtn('/signup')
    }
    function handleSignIn(e) {
        e.preventDefault();
        navigate('/signin')
        setToggleBtn('/signin')
    }

    function handleSignOut(e) {
        e.preventDefault();
        signout()
        navigate('/signin')
        setToggleBtn('/signin')
    }


    return (
        <div className='header'>
            {
                token
                ?
                    <div className='auth'>
                        <div className='hello'>{user.email}</div>

                        <div className='signout'>
                            <button className='signout-btn' onClick={handleSignOut}>Sign out</button>
                        </div>
                    </div>
                :
                    <div className='not-auth'>
                        {/*{*/}
                        {/*    toggleBtn==='/signin'*/}
                        {/*    ?  <div className='signup'>*/}
                        {/*            <button className='signup-btn' onClick={handleSignUp}>Sign up</button>*/}
                        {/*       </div>*/}
                        {/*    :  <div className='signin'>*/}
                        {/*            <button className='signin-btn' onClick={handleSignIn}>Sign in</button>*/}
                        {/*       </div>*/}
                        {/*}*/}
                        Not authorized
                    </div>
            }


        </div>
    );
};

export default Header;