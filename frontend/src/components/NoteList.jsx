import React, {useEffect, useMemo, useState} from 'react';
import Note from "./Note";
import '../styles/User.css'
import axios from "axios";

const NoteList = ({token}) => {
    const [notes, setNotes] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [newNote, setNewNote] = useState({title: '', description: ''})
    const [picture, setPicture] = useState('')
    const getNotes = async (tok) => {
        try {
            axios.defaults.headers.common['Authorization'] = "Bearer " + tok;
            const response = await axios.get('http://localhost:8000/user/notes')
            setNotes(response.data)
        } catch (e) {
            console.log(e)
        }
    }
    useMemo(() => {
        if (token) {
            console.log(isLoading)
            setIsLoading(true)
            getNotes(token)
            setIsLoading(false)
        }
    }, [token, isLoading])


    const updateNotes = (id) => {
        setNotes(notes.filter((note) => note.id!==id))
    }

    async function addNote(e) {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:8000/user/notes',
                {picture},
                {
                    params: newNote,
                headers: {"Content-Type": "multipart/form-data; boundary=----WebKitFormBoundarylYOPyhSdQzPwOOlB"}
                })
            console.log(response)
            setIsLoading(null)
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div className='notes'>
            <form encType="multipart/form-data" className='note-form'>
                <label>
                    Title:
                    <input type="text"
                    value={newNote.title}
                    onChange={(e) => setNewNote({...newNote, title: e.target.value})}/>
                </label>
                <label>
                    Description:
                    <input type="text"
                    value={newNote.description}
                    onChange={(e)=> setNewNote({...newNote, description: e.target.value})}/>
                </label>
                <label>
                    Picture:
                    <input type="file"
                    onChange={(e)=>setPicture(e.target.files[0])}/>
                </label>
                <button onClick={(e) => addNote(e)}>Create</button>
            </form>

            {
                notes.length
                ? notes.map(note => <Note setIsLoading={setIsLoading} updateNotes={(id) => updateNotes(id)} key={note.id} data={note}/>)
                : <h3>You don't have any notes yet</h3>
            }
        </div>
    );
};

export default NoteList;