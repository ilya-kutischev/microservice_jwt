import React from 'react';
import NoteList from "../components/NoteList";

const NotesPage = ({token}) => {
    return (
        <div>
            {token
                ? <NoteList token={token}/>
                : null
            }
        </div>
    );
};

export default NotesPage;