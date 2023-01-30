import React, {useEffect, useState} from 'react';
import Note from "./Note";
import '../styles/User.css'
import axios from "axios";

const NoteList = ({token}) => {
    const [notes, setNotes] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const getNotes = async (tok) => {
        try {
            axios.defaults.headers.common['Authorization'] = "Bearer " + tok;
            const response = await axios.get('http://localhost:8000/user/notes')
            setNotes(response.data)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        if (token) {
            setIsLoading(true)
            getNotes(token)
            setIsLoading(false)
        }
    }, [token])
    return (
        <div className='notes'>
            {
                notes.length
                ? notes.map(note => <Note key={note.id} data={note}/>)
                : <h3>You don't have any notes yet</h3>
            }
        </div>
    );
};

export default NoteList;