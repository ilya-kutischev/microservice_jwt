import React, {useState} from 'react';
import Note from "./Note";
import '../styles/User.css'

const NoteList = ({token}) => {
    const [notes, setNotes] = useState([])
    return (
        <div className='notes'>
            <Note/>
            <Note/>
        </div>
    );
};

export default NoteList;