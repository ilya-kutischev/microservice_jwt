import React from 'react';
import NoteList from "../components/NoteList";

const NotesPage = ({token}) => {
    return (
        <div>
            {token
                ? <NoteList token={token}/>
                : <h3>Not authenticated</h3>
            }
        </div>
    );
};

export default NotesPage;