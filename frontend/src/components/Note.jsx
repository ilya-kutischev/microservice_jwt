import React from 'react';
import '../styles/User.css'

const Note = ({data}) => {
    const img = "data:image/png;base64," + data.picture;
    return (
        <div className='note'>
            <h3>
                {data.id}. {data.title}
            </h3>
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