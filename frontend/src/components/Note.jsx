import React from 'react';
import '../styles/User.css'
import updateNotes from './NoteList'
import axios from "axios";
const Note = ({updateNotes, data}) => {
    const img = "data:image/png;base64," + data.picture;

    function editNote(id) {
        console.log("TODO " + id)
    }

    async function deleteNote(id) {
        try {
            const response = await axios.delete('http://localhost:8000/user/notes?note_id=' + id)
            console.log(response.status===200 ? 'Success' : "smth went wrong")
        } catch (e) {
            console.log(e)
        }
    }

    function removeNote(id) {
        deleteNote(id)
        updateNotes(id)
    }

    return (
        <div className='note'>
            <h3>
                {data.id}. {data.title}
            </h3>
            <div className='edit-delete'>
                <button onClick={() => editNote(data.id)}>Edit</button>
                <button onClick={() => removeNote(data.id)}>Delete</button>
            </div>
            <h4>
                {data.description}
            </h4>
            <div className='image__container'>
                <img id='image' src={img}/>
            </div>
            <h4>{data.latex}</h4>
        </div>
    );
};

export default Note;