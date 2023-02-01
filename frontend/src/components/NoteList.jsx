import React, {useEffect, useMemo, useRef, useState} from 'react';
import Note from "./Note";
import '../styles/User.css'
import axios from "axios";
import MyModal from "./UI/MyModal/MyModal";
import Canvas from "./UI/Canvas/Canvas";
import CanvasDraw from "react-canvas-draw";

const NoteList = ({token}) => {
    const [notes, setNotes] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [newNote, setNewNote] = useState({title: '', description: ''})
    const [picture, setPicture] = useState('')
    const [mySelect, setMySelect] = useState('Upload file')
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
    }, [token])

    async function addNote(e) {
        e.preventDefault()
        if (picture==='') {
            console.log("no picture")
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/user/notes',
                {picture},
                {
                    params: newNote,
                headers: {"Content-Type": "multipart/form-data; boundary=----WebKitFormBoundarylYOPyhSdQzPwOOlB"}
                })

            setNotes([...notes, response.data.message])
            setNewNote({title: '', description: ''})
            setMySelect("Upload file")
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
                <select value={mySelect} onChange={e => {
                    setMySelect(e.target.value);
                    setPicture('')}
                }>
                    <option>Upload file</option>
                    <option>Draw now</option>
                </select >
                {
                    mySelect==="Upload file"
                    ?
                        <label>
                            <input type="file"
                                onChange={(e)=> setPicture(e.target.files[0])}/>
                        </label>
                    : <Canvas setPicture={setPicture} />
                }
                {/*<MyModal visible={canvas} setVisible={setCanvas}>*/}
                {/*    <Canvas/>*/}
                {/*</MyModal>*/}
                <button onClick={(e) => addNote(e)}>Create</button>
            </form>

            {
                notes.length
                ? notes.map(note => <Note notes={notes} setNotes={setNotes} key={note.id} data={note}/>)
                : <h3>You don't have any notes yet</h3>
            }
        </div>
    );
};

export default NoteList;