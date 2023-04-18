import React, {useState} from 'react';
import '../styles/User.css'
import axios from "axios";
import MyModal from "./UI/MyModal/MyModal";

const Note = ({data, notes, setNotes}) => {
    const img = "data:image/png;base64," + data.picture;
    const [modal, setModal] = useState(false)
    const [currentNote, setCurrentNote] = useState({title: '', description: ''})

    async function editNote(e) {
        e.preventDefault()
        try {
            const editId = currentNote.id
            delete currentNote.id
            await axios.put('http://localhost:8000/user/notes',
                null,
                {
                    params: {...currentNote, note_id: editId}
                })
            setModal(false)
            setNotes(notes.map(note => note.id === editId ? {...note, ...currentNote} : note))
        } catch (e) {
            console.log(e)
        }
    }

    function openEditForm(data) {
        setCurrentNote(data)
        setModal(true)
    }

    async function deleteNote(id) {
        console.log("123123")
        try {
            const response = await axios.delete('http://localhost:8000/user/notes?note_id=' + id)
            console.log(response.status === 200 ? 'Success' : "smth went wrong")
        } catch (e) {
            console.log(e)
        }
    }

    function removeNote(id) {
        deleteNote(id)
        setNotes(notes.filter(note => note.id !== id))
    }

    return (
        <div className='note'>
            <MyModal visible={modal} setVisible={setModal}>
                <form className='edit-note-form'>
                    <label>
                        Title:
                        <input type="text"
                               value={currentNote.title}
                               onChange={(e) => setCurrentNote({...currentNote, title: e.target.value})}/>
                    </label>
                    <label>
                        Description:
                        <input type="text"
                               value={currentNote.description}
                               onChange={(e) => setCurrentNote({...currentNote, description: e.target.value})}/>
                    </label>
                    <button onClick={e => editNote(e)}>Edit</button>
                </form>
            </MyModal>
            <h3>
                {data.id}. {data.title}
            </h3>
            <div className='edit-delete'>
                <button
                    onClick={() => openEditForm({id: data.id, title: data.title, description: data.description})}>Edit
                </button>
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