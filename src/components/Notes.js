import React, { useContext, useRef, useState } from 'react'
import noteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Notes(props) {
    const navigate = useNavigate();
    let context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    const ref = useRef(null);
    const refClose = useRef(null);
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
        }
        else{
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])

    const updateNote = (currentnote) => {
        ref.current.click()
        setNote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag });
    }


    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.ShowAlert("Updated notes successfully", 'success');
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <>
            <AddNote ShowAlert={props.ShowAlert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Edit
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel"> Edit Note </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} minLength={5} onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} minLength={5} onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} required />
                                    {/* <select class="form-select mb-3" aria-label=".form-select-lg example" onChange={onChange}>
                                        <option selected>Select your tag</option>
                                        <option value={"General"}>General</option>
                                        <option value={"Personal"}>Personal</option>
                                        <option value={"Professional"}>Professional</option>
                                        <option value={"Education"}>Education</option>
                                        <option value={"others"}>Others</option>
                                    </select> */}
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length <= 5 || note.edescription.length <= 5} type="button" onClick={handleClick} className="btn btn-primary" >Update Notes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-3">
                <h2 className='text-center'>Your Notes</h2>
                <div className="row">
                    <div className="container">
                        {notes.length === 0 && "No notes to show"}
                    </div>
                    {notes.map((note) => {
                        return (
                            <div className="col-md-3 my-3" key={note._id}>
                                <NoteItem updateNote={updateNote} note={note} ShowAlert={props.ShowAlert} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
