import React, { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';
const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { DeleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className="card">
            <div className="card-body">
                <h4 className='text-center fw-bolder'>{props.note.tag}</h4>
                <h5 className="card-title">{props.note.title}</h5>
                <p className="card-text">{props.note.description}</p>
                <i className="fa-regular fa-trash-can mx-2" onClick={() => { DeleteNote(note._id); props.ShowAlert("Deleted Successfully",'success') }}></i>
                <i className="fa-regular fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
            </div>
        </div>
    )
}

export default NoteItem;
